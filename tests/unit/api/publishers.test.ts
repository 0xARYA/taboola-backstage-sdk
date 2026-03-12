/**
 * Publishers API tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { PublishersAPI } from '../../../src/api/publishers.js';
import {
  createMockHttpClient,
  mockHttpClientAsType,
  type MockHttpClient,
} from '../../helpers/mock-http.js';

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
          { id: 1, name: 'site1.com', account_id: 'site-1' },
          { id: 2, name: 'site2.com', account_id: 'site-2' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await publishersApi.list(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/allowed-publishers`);
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getBlocked', () => {
    it('should get blocked publishers', async () => {
      const mockResponse = {
        sites: ['blocked1.com', 'blocked2.com'],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await publishersApi.getBlocked(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/block-publisher`);
      expect(result).toEqual(['blocked1.com', 'blocked2.com']);
    });

    it('should return sites array from response', async () => {
      mockHttp.get.mockResolvedValue({ sites: [] });

      const result = await publishersApi.getBlocked(accountId);

      expect(result).toEqual([]);
    });
  });

  describe('updateBlocked', () => {
    it('should update blocked publishers', async () => {
      const request = { sites: ['site1.com', 'site2.com'] };
      const mockResponse = {
        sites: ['site1.com', 'site2.com'],
      };
      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await publishersApi.updateBlocked(accountId, request);

      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/block-publisher`, request);
      expect(result).toEqual(['site1.com', 'site2.com']);
    });
  });

  describe('blockPublisher', () => {
    it('should block a single publisher', async () => {
      const currentBlocked = {
        sites: ['existing.com'],
      };
      const updatedBlocked = {
        sites: ['existing.com', 'newblock.com'],
      };
      mockHttp.get.mockResolvedValue(currentBlocked);
      mockHttp.post.mockResolvedValue(updatedBlocked);

      const result = await publishersApi.blockPublisher(accountId, 'newblock.com');

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/block-publisher`);
      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/block-publisher`, {
        sites: ['existing.com', 'newblock.com'],
      });
      expect(result).toEqual(['existing.com', 'newblock.com']);
    });

    it('should return current list if already blocked', async () => {
      const currentBlocked = {
        sites: ['existing.com'],
      };
      mockHttp.get.mockResolvedValue(currentBlocked);

      const result = await publishersApi.blockPublisher(accountId, 'existing.com');

      expect(mockHttp.post).not.toHaveBeenCalled();
      expect(result).toEqual(['existing.com']);
    });
  });

  describe('unblockPublisher', () => {
    it('should unblock a single publisher', async () => {
      const currentBlocked = {
        sites: ['site1.com', 'site2.com'],
      };
      const updatedBlocked = {
        sites: ['site2.com'],
      };
      mockHttp.get.mockResolvedValue(currentBlocked);
      mockHttp.post.mockResolvedValue(updatedBlocked);

      const result = await publishersApi.unblockPublisher(accountId, 'site1.com');

      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/block-publisher`, {
        sites: ['site2.com'],
      });
      expect(result).toEqual(['site2.com']);
    });
  });

  describe('clearBlocked', () => {
    it('should clear all blocked publishers', async () => {
      const mockResponse = { sites: [] };
      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await publishersApi.clearBlocked(accountId);

      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/block-publisher`, {
        sites: [],
      });
      expect(result).toEqual([]);
    });
  });
});
