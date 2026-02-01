/**
 * Mock HTTP client for testing
 */

import { vi } from 'vitest';
import type { HttpClient } from '../../src/utils/http.js';

export interface MockHttpClient {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
  request: ReturnType<typeof vi.fn>;
}

export function createMockHttpClient(): MockHttpClient {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
    request: vi.fn(),
  };
}

export function mockHttpClientAsType(mock: MockHttpClient): HttpClient {
  return mock as unknown as HttpClient;
}
