/**
 * Publishers API tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { PublishersAPI } from '../../../src/api/publishers.js';
import { createMockHttpClient, mockHttpClientAsType, type MockHttpClient } from '../../helpers/mock-http.js';

describe('PublishersAPI', () => {
  let mockHttp: MockHttpClient;
  let publishersApi: PublishersAPI;
  const accountId = 'test-account';

  beforeEach(() => {
    mockHttp = createMockHttpClient();
    publishersApi = new PublishersAPI(mockHttpClientAsType(mockHttp));
  });

  describe('list', () => {
    it('should list all publishers', async () => {
      const mockResponse = {
        results: [
          { site: 'site1.com', site_id: 'site-1', is_blocked: false },
          { site: 'site2.com', site_id: 'site-2', is_blocked: true },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await publishersApi.list(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/publishers`);
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getBlocked', () => {
    it('should get blocked publishers (object response)', async () => {
      const mockResponse = {
        results: [
          { site: 'blocked1.com', site_id: 'blocked-1' },
          { site: 'blocked2.com', site_id: 'blocked-2' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await publishersApi.getBlocked(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/block-publisher`);
      expect(result).toEqual(mockResponse.results);
    });

    it('should get blocked publishers (array response)', async () => {
      const mockResponse = [
        { site: 'blocked1.com', site_id: 'blocked-1' },
      ];
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await publishersApi.getBlocked(accountId);

      expect(result).toEqual(mockResponse);
    });

    it('should return empty array when results is undefined', async () => {
      mockHttp.get.mockResolvedValue({});

      const result = await publishersApi.getBlocked(accountId);

      expect(result).toEqual([]);
    });
  });

  describe('updateBlocked', () => {
    it('should update blocked publishers', async () => {
      const request = { sites: ['site1.com', 'site2.com'] };
      const mockResponse = {
        results: [
          { site: 'site1.com', site_id: 'site-1' },
          { site: 'site2.com', site_id: 'site-2' },
        ],
      };
      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await publishersApi.updateBlocked(accountId, request);

      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/block-publisher`, request);
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('blockPublisher', () => {
    it('should block a single publisher', async () => {
      const currentBlocked = {
        results: [{ site: 'existing.com', site_id: 'existing' }],
      };
      const updatedBlocked = {
        results: [
          { site: 'existing.com', site_id: 'existing' },
          { site: 'newblock.com', site_id: 'newblock' },
        ],
      };
      mockHttp.get.mockResolvedValue(currentBlocked);
      mockHttp.post.mockResolvedValue(updatedBlocked);

      const result = await publishersApi.blockPublisher(accountId, 'newblock.com');

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/block-publisher`);
      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/block-publisher`, {
        sites: ['existing.com', 'newblock.com'],
      });
      expect(result).toEqual(updatedBlocked.results);
    });

    it('should return current list if already blocked', async () => {
      const currentBlocked = {
        results: [{ site: 'existing.com', site_id: 'existing' }],
      };
      mockHttp.get.mockResolvedValue(currentBlocked);

      const result = await publishersApi.blockPublisher(accountId, 'existing.com');

      expect(mockHttp.post).not.toHaveBeenCalled();
      expect(result).toEqual(currentBlocked.results);
    });
  });

  describe('unblockPublisher', () => {
    it('should unblock a single publisher', async () => {
      const currentBlocked = {
        results: [
          { site: 'site1.com', site_id: 'site-1' },
          { site: 'site2.com', site_id: 'site-2' },
        ],
      };
      const updatedBlocked = {
        results: [{ site: 'site2.com', site_id: 'site-2' }],
      };
      mockHttp.get.mockResolvedValue(currentBlocked);
      mockHttp.post.mockResolvedValue(updatedBlocked);

      const result = await publishersApi.unblockPublisher(accountId, 'site1.com');

      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/block-publisher`, {
        sites: ['site2.com'],
      });
      expect(result).toEqual(updatedBlocked.results);
    });
  });

  describe('clearBlocked', () => {
    it('should clear all blocked publishers', async () => {
      const mockResponse = { results: [] };
      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await publishersApi.clearBlocked(accountId);

      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/block-publisher`, {
        sites: [],
      });
      expect(result).toEqual([]);
    });
  });
});
