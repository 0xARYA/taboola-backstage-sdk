/**
 * OAuth2 authentication module for Taboola Backstage API
 */

import type { TokenResponse, StoredToken } from '../types/auth.js';
import { TaboolaAuthError } from '../errors/index.js';

/** OAuth token endpoint */
const TOKEN_URL = 'https://backstage.taboola.com/backstage/oauth/token';

/** Buffer time before token expiry to trigger refresh (5 minutes) */
const TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000;

/**
 * OAuth2 authentication manager
 * Handles token acquisition and automatic refresh
 */
export class OAuthManager {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private storedToken: StoredToken | null = null;
  private tokenPromise: Promise<string> | null = null;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Get a valid access token, refreshing if necessary
   */
  async getAccessToken(): Promise<string> {
    // If we have a valid cached token, return it
    if (this.storedToken && !this.isTokenExpired(this.storedToken)) {
      return this.storedToken.accessToken;
    }

    // If a token request is already in progress, wait for it
    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    // Fetch a new token
    this.tokenPromise = this.fetchToken();

    try {
      const token = await this.tokenPromise;
      return token;
    } finally {
      this.tokenPromise = null;
    }
  }

  /**
   * Force refresh the token (e.g., after a 401 response)
   */
  async refreshToken(): Promise<string> {
    this.storedToken = null;
    return this.getAccessToken();
  }

  /**
   * Clear the stored token
   */
  clearToken(): void {
    this.storedToken = null;
    this.tokenPromise = null;
  }

  /**
   * Check if a token is expired or about to expire
   */
  private isTokenExpired(token: StoredToken): boolean {
    return Date.now() >= token.expiresAt - TOKEN_EXPIRY_BUFFER_MS;
  }

  /**
   * Fetch a new token from the OAuth endpoint
   */
  private async fetchToken(): Promise<string> {
    const body = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'client_credentials',
    });

    let response: Response;
    try {
      response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });
    } catch (error) {
      const cause = error instanceof Error ? error : undefined;
      throw new TaboolaAuthError('Failed to connect to authentication server', {
        ...(cause ? { cause } : {}),
      });
    }

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }

      throw new TaboolaAuthError(
        `Authentication failed: ${String(response.status)} ${response.statusText}`,
        { response: errorBody }
      );
    }

    let tokenResponse: TokenResponse;
    try {
      tokenResponse = (await response.json()) as TokenResponse;
    } catch {
      throw new TaboolaAuthError('Invalid token response from server');
    }

    if (!tokenResponse.access_token) {
      throw new TaboolaAuthError('No access token in response', {
        response: tokenResponse,
      });
    }

    // Store the token with expiry time
    this.storedToken = {
      accessToken: tokenResponse.access_token,
      expiresAt: Date.now() + tokenResponse.expires_in * 1000,
    };

    return this.storedToken.accessToken;
  }
}
