/**
 * Custom error classes for Taboola Backstage SDK
 */

/**
 * Base error class for all Taboola SDK errors
 */
export class TaboolaError extends Error {
  /** HTTP status code if applicable */
  readonly statusCode: number | undefined;
  /** Original error response body */
  readonly response: unknown;
  /** Request URL that caused the error */
  readonly url: string | undefined;

  constructor(
    message: string,
    options?: {
      statusCode?: number;
      response?: unknown;
      url?: string;
      cause?: Error;
    }
  ) {
    super(message, { cause: options?.cause });
    this.name = 'TaboolaError';
    this.statusCode = options?.statusCode;
    this.response = options?.response;
    this.url = options?.url;
  }
}

/**
 * Authentication error (401)
 * Thrown when OAuth token is invalid or expired
 */
export class TaboolaAuthError extends TaboolaError {
  constructor(
    message = 'Authentication failed',
    options?: {
      response?: unknown;
      url?: string;
      cause?: Error;
    }
  ) {
    super(message, { statusCode: 401, ...options });
    this.name = 'TaboolaAuthError';
  }
}

/**
 * Validation error (400)
 * Thrown when request parameters are invalid
 */
export class TaboolaValidationError extends TaboolaError {
  /** Specific field errors if available */
  readonly fieldErrors: Record<string, string[]> | undefined;

  constructor(
    message = 'Validation failed',
    options?: {
      response?: unknown;
      url?: string;
      cause?: Error;
      fieldErrors?: Record<string, string[]>;
    }
  ) {
    super(message, { statusCode: 400, ...options });
    this.name = 'TaboolaValidationError';
    this.fieldErrors = options?.fieldErrors;
  }
}

/**
 * Not found error (404)
 * Thrown when requested resource doesn't exist
 */
export class TaboolaNotFoundError extends TaboolaError {
  /** The resource type that wasn't found */
  readonly resourceType: string | undefined;
  /** The resource ID that wasn't found */
  readonly resourceId: string | undefined;

  constructor(
    message = 'Resource not found',
    options?: {
      response?: unknown;
      url?: string;
      cause?: Error;
      resourceType?: string;
      resourceId?: string;
    }
  ) {
    super(message, { statusCode: 404, ...options });
    this.name = 'TaboolaNotFoundError';
    this.resourceType = options?.resourceType;
    this.resourceId = options?.resourceId;
  }
}

/**
 * Rate limit error (429)
 * Thrown when API rate limits are exceeded
 */
export class TaboolaRateLimitError extends TaboolaError {
  /** Seconds until rate limit resets */
  readonly retryAfter: number | undefined;

  constructor(
    message = 'Rate limit exceeded',
    options?: {
      response?: unknown;
      url?: string;
      cause?: Error;
      retryAfter?: number;
    }
  ) {
    super(message, { statusCode: 429, ...options });
    this.name = 'TaboolaRateLimitError';
    this.retryAfter = options?.retryAfter;
  }
}

/**
 * Forbidden error (403)
 * Thrown when access to resource is denied
 */
export class TaboolaForbiddenError extends TaboolaError {
  constructor(
    message = 'Access forbidden',
    options?: {
      response?: unknown;
      url?: string;
      cause?: Error;
    }
  ) {
    super(message, { statusCode: 403, ...options });
    this.name = 'TaboolaForbiddenError';
  }
}

/**
 * Server error (5xx)
 * Thrown when Taboola servers encounter an error
 */
export class TaboolaServerError extends TaboolaError {
  constructor(
    message = 'Server error',
    options?: {
      statusCode?: number;
      response?: unknown;
      url?: string;
      cause?: Error;
    }
  ) {
    super(message, { statusCode: options?.statusCode ?? 500, ...options });
    this.name = 'TaboolaServerError';
  }
}

/**
 * Parse API error response and throw appropriate error class
 */
export function parseApiError(
  statusCode: number,
  response: unknown,
  url: string
): TaboolaError {
  const message = extractErrorMessage(response);

  switch (statusCode) {
    case 400: {
      const fieldErrors = extractFieldErrors(response);
      return new TaboolaValidationError(message, {
        response,
        url,
        ...(fieldErrors !== undefined ? { fieldErrors } : {}),
      });
    }
    case 401:
      return new TaboolaAuthError(message, { response, url });
    case 403:
      return new TaboolaForbiddenError(message, { response, url });
    case 404:
      return new TaboolaNotFoundError(message, { response, url });
    case 429: {
      const retryAfter = extractRetryAfter(response);
      return new TaboolaRateLimitError(message, {
        response,
        url,
        ...(retryAfter !== undefined ? { retryAfter } : {}),
      });
    }
    default:
      if (statusCode >= 500) {
        return new TaboolaServerError(message, { statusCode, response, url });
      }
      return new TaboolaError(message, { statusCode, response, url });
  }
}

/**
 * Extract error message from API response
 */
function extractErrorMessage(response: unknown): string {
  if (response && typeof response === 'object') {
    const resp = response as Record<string, unknown>;
    if (typeof resp.message === 'string') {
      return resp.message;
    }
    if (typeof resp.error === 'string') {
      return resp.error;
    }
    if (typeof resp.error_description === 'string') {
      return resp.error_description;
    }
  }
  return 'Unknown error';
}

/**
 * Extract field-level validation errors from API response
 */
function extractFieldErrors(response: unknown): Record<string, string[]> | undefined {
  if (response && typeof response === 'object') {
    const resp = response as Record<string, unknown>;
    if (resp.errors && typeof resp.errors === 'object') {
      return resp.errors as Record<string, string[]>;
    }
  }
  return undefined;
}

/**
 * Extract retry-after value from rate limit response
 */
function extractRetryAfter(response: unknown): number | undefined {
  if (response && typeof response === 'object') {
    const resp = response as Record<string, unknown>;
    if (typeof resp.retry_after === 'number') {
      return resp.retry_after;
    }
  }
  return undefined;
}
