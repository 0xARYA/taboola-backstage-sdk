/**
 * Error handling tests
 */

import { describe, it, expect } from 'vitest';
import {
  TaboolaError,
  TaboolaAuthError,
  TaboolaValidationError,
  TaboolaNotFoundError,
  TaboolaRateLimitError,
  TaboolaForbiddenError,
  TaboolaServerError,
  parseApiError,
} from '../../src/errors/index.js';

describe('Error Classes', () => {
  describe('TaboolaError', () => {
    it('should create a base error with options', () => {
      const error = new TaboolaError('Test error', {
        statusCode: 500,
        response: { detail: 'error' },
        url: 'https://api.example.com/test',
      });

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(TaboolaError);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.url).toBe('https://api.example.com/test');
      expect(error.name).toBe('TaboolaError');
    });

    it('should create a base error without options', () => {
      const error = new TaboolaError('Test error');

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBeUndefined();
      expect(error.url).toBeUndefined();
    });
  });

  describe('TaboolaAuthError', () => {
    it('should create an auth error', () => {
      const error = new TaboolaAuthError('Invalid credentials', {
        response: { error: 'invalid_grant' },
        url: 'https://api.example.com/auth',
      });

      expect(error).toBeInstanceOf(TaboolaError);
      expect(error).toBeInstanceOf(TaboolaAuthError);
      expect(error.statusCode).toBe(401);
      expect(error.name).toBe('TaboolaAuthError');
    });

    it('should use default message', () => {
      const error = new TaboolaAuthError();

      expect(error.message).toBe('Authentication failed');
    });
  });

  describe('TaboolaValidationError', () => {
    it('should create a validation error with field errors', () => {
      const fieldErrors = {
        name: ['Name is required'],
        cpc: ['CPC must be positive'],
      };
      const error = new TaboolaValidationError('Validation failed', {
        response: { errors: fieldErrors },
        url: 'https://api.example.com/campaigns',
        fieldErrors,
      });

      expect(error).toBeInstanceOf(TaboolaError);
      expect(error).toBeInstanceOf(TaboolaValidationError);
      expect(error.statusCode).toBe(400);
      expect(error.fieldErrors).toEqual(fieldErrors);
      expect(error.name).toBe('TaboolaValidationError');
    });

    it('should use default message', () => {
      const error = new TaboolaValidationError();

      expect(error.message).toBe('Validation failed');
    });
  });

  describe('TaboolaNotFoundError', () => {
    it('should create a not found error', () => {
      const error = new TaboolaNotFoundError('Campaign not found', {
        response: {},
        url: 'https://api.example.com/campaigns/123',
        resourceType: 'campaign',
        resourceId: '123',
      });

      expect(error).toBeInstanceOf(TaboolaError);
      expect(error).toBeInstanceOf(TaboolaNotFoundError);
      expect(error.statusCode).toBe(404);
      expect(error.resourceType).toBe('campaign');
      expect(error.resourceId).toBe('123');
      expect(error.name).toBe('TaboolaNotFoundError');
    });

    it('should use default message', () => {
      const error = new TaboolaNotFoundError();

      expect(error.message).toBe('Resource not found');
    });
  });

  describe('TaboolaRateLimitError', () => {
    it('should create a rate limit error', () => {
      const error = new TaboolaRateLimitError('Rate limit exceeded', {
        response: { retry_after: 60 },
        url: 'https://api.example.com/campaigns',
        retryAfter: 60,
      });

      expect(error).toBeInstanceOf(TaboolaError);
      expect(error).toBeInstanceOf(TaboolaRateLimitError);
      expect(error.statusCode).toBe(429);
      expect(error.retryAfter).toBe(60);
      expect(error.name).toBe('TaboolaRateLimitError');
    });

    it('should use default message', () => {
      const error = new TaboolaRateLimitError();

      expect(error.message).toBe('Rate limit exceeded');
    });
  });

  describe('TaboolaForbiddenError', () => {
    it('should create a forbidden error', () => {
      const error = new TaboolaForbiddenError('Access denied', {
        response: {},
        url: 'https://api.example.com/campaigns',
      });

      expect(error).toBeInstanceOf(TaboolaError);
      expect(error).toBeInstanceOf(TaboolaForbiddenError);
      expect(error.statusCode).toBe(403);
      expect(error.name).toBe('TaboolaForbiddenError');
    });

    it('should use default message', () => {
      const error = new TaboolaForbiddenError();

      expect(error.message).toBe('Access forbidden');
    });
  });

  describe('TaboolaServerError', () => {
    it('should create a server error', () => {
      const error = new TaboolaServerError('Internal server error', {
        statusCode: 500,
        response: {},
        url: 'https://api.example.com/campaigns',
      });

      expect(error).toBeInstanceOf(TaboolaError);
      expect(error).toBeInstanceOf(TaboolaServerError);
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe('TaboolaServerError');
    });

    it('should accept custom 5xx status code', () => {
      const error = new TaboolaServerError('Bad gateway', {
        statusCode: 502,
      });

      expect(error.statusCode).toBe(502);
    });

    it('should use default message and status code', () => {
      const error = new TaboolaServerError();

      expect(error.message).toBe('Server error');
      expect(error.statusCode).toBe(500);
    });
  });
});

describe('parseApiError', () => {
  const url = 'https://api.example.com/test';

  it('should parse 401 as TaboolaAuthError', () => {
    const error = parseApiError(401, { message: 'Unauthorized' }, url);

    expect(error).toBeInstanceOf(TaboolaAuthError);
    expect(error.statusCode).toBe(401);
  });

  it('should parse 403 as TaboolaForbiddenError', () => {
    const error = parseApiError(403, { message: 'Forbidden' }, url);

    expect(error).toBeInstanceOf(TaboolaForbiddenError);
    expect(error.statusCode).toBe(403);
  });

  it('should parse 404 as TaboolaNotFoundError', () => {
    const error = parseApiError(404, { message: 'Not found' }, url);

    expect(error).toBeInstanceOf(TaboolaNotFoundError);
    expect(error.statusCode).toBe(404);
  });

  it('should parse 429 as TaboolaRateLimitError', () => {
    const error = parseApiError(429, { message: 'Too many requests' }, url);

    expect(error).toBeInstanceOf(TaboolaRateLimitError);
    expect(error.statusCode).toBe(429);
  });

  it('should parse 429 with retry_after', () => {
    const error = parseApiError(429, { message: 'Too many requests', retry_after: 60 }, url);

    expect(error).toBeInstanceOf(TaboolaRateLimitError);
    expect((error as TaboolaRateLimitError).retryAfter).toBe(60);
  });

  it('should parse 400 as TaboolaValidationError', () => {
    const error = parseApiError(400, { message: 'Bad request' }, url);

    expect(error).toBeInstanceOf(TaboolaValidationError);
    expect(error.statusCode).toBe(400);
  });

  it('should parse 400 with field errors', () => {
    const fieldErrors = { name: ['required'] };
    const error = parseApiError(400, { message: 'Validation failed', errors: fieldErrors }, url);

    expect(error).toBeInstanceOf(TaboolaValidationError);
    expect((error as TaboolaValidationError).fieldErrors).toEqual(fieldErrors);
  });

  it('should parse 500 as TaboolaServerError', () => {
    const error = parseApiError(500, { message: 'Server error' }, url);

    expect(error).toBeInstanceOf(TaboolaServerError);
    expect(error.statusCode).toBe(500);
  });

  it('should parse other 5xx as TaboolaServerError', () => {
    const error = parseApiError(502, { message: 'Bad gateway' }, url);

    expect(error).toBeInstanceOf(TaboolaServerError);
    expect(error.statusCode).toBe(502);
  });

  it('should parse unknown status codes as TaboolaError', () => {
    const error = parseApiError(418, { message: "I'm a teapot" }, url);

    expect(error).toBeInstanceOf(TaboolaError);
    expect(error.statusCode).toBe(418);
  });

  it('should extract message from response body', () => {
    const error = parseApiError(400, { message: 'Custom error message' }, url);

    expect(error.message).toBe('Custom error message');
  });

  it('should handle response body with error field', () => {
    const error = parseApiError(400, { error: 'Error from error field' }, url);

    expect(error.message).toBe('Error from error field');
  });

  it('should handle response body with error_description field', () => {
    const error = parseApiError(401, { error_description: 'OAuth error description' }, url);

    expect(error.message).toBe('OAuth error description');
  });

  it('should use unknown message when body has no message', () => {
    const error = parseApiError(400, {}, url);

    expect(error.message).toBe('Unknown error');
  });

  it('should handle null response body', () => {
    const error = parseApiError(500, null, url);

    expect(error).toBeInstanceOf(TaboolaServerError);
    expect(error.message).toBe('Unknown error');
  });

  it('should handle undefined response body', () => {
    const error = parseApiError(500, undefined, url);

    expect(error).toBeInstanceOf(TaboolaServerError);
    expect(error.message).toBe('Unknown error');
  });
});
