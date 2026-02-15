/**
 * Items API tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ItemsAPI } from '../../../src/api/items.js';
import { createMockHttpClient, mockHttpClientAsType, type MockHttpClient } from '../../helpers/mock-http.js';

describe('ItemsAPI', () => {
  let mockHttp: MockHttpClient;
  let itemsApi: ItemsAPI;
  const accountId = 'test-account';
  const campaignId = 'campaign-123';
  const itemId = 'item-456';

  beforeEach(() => {
    mockHttp = createMockHttpClient();
    itemsApi = new ItemsAPI(mockHttpClientAsType(mockHttp));
  });

  describe('list', () => {
    it('should list items without options', async () => {
      const mockResponse = {
        results: [
          { id: 'item-1', title: 'Item 1' },
          { id: 'item-2', title: 'Item 2' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await itemsApi.list(accountId, campaignId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should list items with pagination', async () => {
      const mockResponse = { results: [] };
      mockHttp.get.mockResolvedValue(mockResponse);

      await itemsApi.list(accountId, campaignId, { page: 2, pageSize: 25 });

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/?page=2&page_size=25`
      );
    });
  });

  describe('get', () => {
    it('should get a single item', async () => {
      const mockItem = { id: itemId, title: 'Test Item' };
      mockHttp.get.mockResolvedValue(mockItem);

      const result = await itemsApi.get(accountId, campaignId, itemId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/${itemId}`
      );
      expect(result).toEqual(mockItem);
    });
  });

  describe('create', () => {
    it('should create an item', async () => {
      const createRequest = {
        url: 'https://example.com/landing',
        title: 'Amazing Product',
        thumbnail_url: 'https://example.com/image.jpg',
      };
      const mockItem = { id: 'new-item', ...createRequest };
      mockHttp.post.mockResolvedValue(mockItem);

      const result = await itemsApi.create(accountId, campaignId, createRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/`,
        createRequest
      );
      expect(result).toEqual(mockItem);
    });
  });

  describe('update', () => {
    it('should update a single item field', async () => {
      const updateRequest = { title: 'Updated Title' };
      const mockItem = { id: itemId, title: 'Updated Title' };
      mockHttp.post.mockResolvedValue(mockItem);

      const result = await itemsApi.update(accountId, campaignId, itemId, updateRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/${itemId}`,
        updateRequest
      );
      expect(result).toEqual(mockItem);
    });

    it('should update multiple item fields', async () => {
      const updateRequest = {
        title: 'Updated Title',
        url: 'https://example.com/new-page',
        description: 'New description',
        is_active: true,
      };
      const mockItem = { id: itemId, ...updateRequest };
      mockHttp.post.mockResolvedValue(mockItem);

      const result = await itemsApi.update(accountId, campaignId, itemId, updateRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/${itemId}`,
        updateRequest
      );
      expect(result).toEqual(mockItem);
    });

    it('should update a motion ad with performance video data', async () => {
      const updateRequest = {
        title: 'Motion Ad',
        performance_video_data: {
          video_url: 'https://example.com/video.mp4',
          fallback_url: 'https://example.com/fallback.jpg',
        },
      };
      const mockItem = { id: itemId, ...updateRequest };
      mockHttp.post.mockResolvedValue(mockItem);

      const result = await itemsApi.update(accountId, campaignId, itemId, updateRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/${itemId}`,
        updateRequest
      );
      expect(result).toEqual(mockItem);
    });

    it('should update item with verification pixel and viewability tag', async () => {
      const updateRequest = {
        verification_pixel: {
          type: 'MOAT',
          url: 'https://example.com/pixel',
        },
        viewability_tag: {
          type: 'IAS',
          value: 'tag-value',
        },
      };
      const mockItem = { id: itemId, ...updateRequest };
      mockHttp.post.mockResolvedValue(mockItem);

      const result = await itemsApi.update(accountId, campaignId, itemId, updateRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/${itemId}`,
        updateRequest
      );
      expect(result).toEqual(mockItem);
    });
  });

  describe('delete', () => {
    it('should delete an item', async () => {
      mockHttp.delete.mockResolvedValue(undefined);

      await itemsApi.delete(accountId, campaignId, itemId);

      expect(mockHttp.delete).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/${itemId}`
      );
    });
  });

  describe('pause', () => {
    it('should pause an item', async () => {
      const mockItem = { id: itemId, is_active: false };
      mockHttp.post.mockResolvedValue(mockItem);

      const result = await itemsApi.pause(accountId, campaignId, itemId);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/${itemId}`,
        { is_active: false }
      );
      expect(result).toEqual(mockItem);
    });
  });

  describe('unpause', () => {
    it('should unpause an item', async () => {
      const mockItem = { id: itemId, is_active: true };
      mockHttp.post.mockResolvedValue(mockItem);

      const result = await itemsApi.unpause(accountId, campaignId, itemId);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/${itemId}`,
        { is_active: true }
      );
      expect(result).toEqual(mockItem);
    });
  });

  describe('bulkCreate', () => {
    it('should bulk create items', async () => {
      const bulkRequest = {
        items: [
          { url: 'https://example.com/1', title: 'Title 1', thumbnail_url: 'img1.jpg' },
          { url: 'https://example.com/2', title: 'Title 2', thumbnail_url: 'img2.jpg' },
        ],
      };
      const mockResponse = {
        results: [
          { id: 'item-1', title: 'Title 1' },
          { id: 'item-2', title: 'Title 2' },
        ],
      };
      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await itemsApi.bulkCreate(accountId, campaignId, bulkRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/items/mass`,
        bulkRequest
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('bulkUpdate', () => {
    it('should bulk update items across campaigns', async () => {
      const bulkRequest = {
        items: [
          { id: 'i1', campaign_id: 'c1', update: { is_active: false } },
        ],
      };
      const mockResponse = { results: [] };
      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await itemsApi.bulkUpdate(accountId, bulkRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/items/bulk`, bulkRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('bulkDelete', () => {
    it('should bulk delete items', async () => {
      const deleteRequest = {
        items: [
          { id: 'i1', campaign_id: 'c1' },
          { id: 'i2', campaign_id: 'c1' },
        ],
      };
      mockHttp.delete.mockResolvedValue(undefined);

      await itemsApi.bulkDelete(accountId, deleteRequest);

      expect(mockHttp.delete).toHaveBeenCalledWith(`${accountId}/items/bulk`, {
        json: deleteRequest,
      });
    });
  });
});
