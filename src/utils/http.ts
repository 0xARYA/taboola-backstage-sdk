/**
 * HTTP client wrapper using ky
 */

import ky, { type KyInstance, type Options as KyOptions, HTTPError } from 'ky';
import type { OAuthManager } from '../auth/oauth.js';
import { parseApiError, TaboolaAuthError } from '../errors/index.js';

/** Default API base URL */
export const DEFAULT_BASE_URL = 'https://backstage.taboola.com/backstage/api/1.0';

/** Default request timeout (30 seconds) */
const DEFAULT_TIMEOUT = 30000;

/** Default retry count */
const DEFAULT_RETRIES = 3;

export interface HttpClientOptions {
  baseUrl?: string | undefined;
  timeout?: number | undefined;
  retries?: number | undefined;
  debug?: boolean | undefined;
}

/**
 * HTTP client for Taboola API requests
 */
export class HttpClient {
  private readonly client: KyInstance;
  private readonly authManager: OAuthManager;
  private readonly debug: boolean;

  constructor(authManager: OAuthManager, options: HttpClientOptions = {}) {
    this.authManager = authManager;
    this.debug = options.debug ?? false;

    this.client = ky.create({
      prefixUrl: options.baseUrl ?? DEFAULT_BASE_URL,
      timeout: options.timeout ?? DEFAULT_TIMEOUT,
      retry: {
        limit: options.retries ?? DEFAULT_RETRIES,
        methods: ['get', 'post', 'put', 'patch', 'delete'],
        statusCodes: [408, 429, 500, 502, 503, 504],
        backoffLimit: 10000,
      },
      hooks: {
        beforeRequest: [
          async (request: Request) => {
            const token = await this.authManager.getAccessToken();
            request.headers.set('Authorization', `Bearer ${token}`);
            request.headers.set('Accept', 'application/json');
          },
        ],
        afterResponse: [
          async (request, _options, response) => {
            if (this.debug) {
              console.log(`[Taboola SDK] ${request.method} ${String(response.status)} ${request.url}`);
            }

            // Handle 401 by refreshing token and retrying once
            if (response.status === 401) {
              try {
                const newToken = await this.authManager.refreshToken();
                request.headers.set('Authorization', `Bearer ${newToken}`);
                return await ky(request);
              } catch {
                throw new TaboolaAuthError('Token refresh failed');
              }
            }

            return response;
          },
        ],
      },
    });
  }

  /**
   * Make a GET request
   */
  async get<T>(path: string, options?: KyOptions): Promise<T> {
    return this.request<T>('get', path, options);
  }

  /**
   * Make a POST request
   */
  async post<T>(path: string, body?: unknown, options?: KyOptions): Promise<T> {
    return this.request<T>('post', path, { ...options, json: body });
  }

  /**
   * Make a PUT request
   */
  async put<T>(path: string, body?: unknown, options?: KyOptions): Promise<T> {
    return this.request<T>('put', path, { ...options, json: body });
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(path: string, body?: unknown, options?: KyOptions): Promise<T> {
    return this.request<T>('patch', path, { ...options, json: body });
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(path: string, options?: KyOptions): Promise<T> {
    return this.request<T>('delete', path, options);
  }

  /**
   * Internal request handler
   */
  private async request<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: string,
    options?: KyOptions
  ): Promise<T> {
    try {
      const response = await this.client[method](path, options);

      // Handle empty responses (204 No Content, etc.)
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        return undefined as T;
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        const url = error.request.url;
        let responseBody: unknown;

        try {
          responseBody = await error.response.json();
        } catch {
          try {
            responseBody = await error.response.text();
          } catch {
            responseBody = null;
          }
        }

        throw parseApiError(error.response.status, responseBody, url);
      }

      throw error;
    }
  }
}
