/**
 * Authentication types for Taboola Backstage API
 */

/**
 * Client configuration for TaboolaClient
 */
export interface TaboolaConfig {
  /** OAuth2 client ID provided by Taboola */
  clientId: string;
  /** OAuth2 client secret provided by Taboola */
  clientSecret: string;
  /** Base URL for the API (defaults to production) */
  baseUrl?: string;
  /** Enable debug logging */
  debug?: boolean;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Number of retry attempts for failed requests (default: 3) */
  retries?: number;
}

/**
 * OAuth2 token response from Taboola
 */
export interface TokenResponse {
  /** The access token to use for API requests */
  access_token: string;
  /** Token type (always "bearer") */
  token_type: 'bearer';
  /** Token lifetime in seconds (typically 43200 = 12 hours) */
  expires_in: number;
}

/**
 * Internal token storage with expiry tracking
 */
export interface StoredToken {
  /** The access token */
  accessToken: string;
  /** Timestamp when the token expires */
  expiresAt: number;
}
