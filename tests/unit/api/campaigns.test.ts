/**
 * Campaigns API tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { CampaignsAPI } from '../../../src/api/campaigns.js';
import { createMockHttpClient, mockHttpClientAsType, type MockHttpClient } from '../../helpers/mock-http.js';

describe('CampaignsAPI', () => {
  let mockHttp: MockHttpClient;
  let campaignsApi: CampaignsAPI;
  const accountId = 'test-account';
  const campaignId = 'campaign-123';

  beforeEach(() => {
    mockHttp = createMockHttpClient();
    campaignsApi = new CampaignsAPI(mockHttpClientAsType(mockHttp));
  });

  describe('list', () => {
    it('should list campaigns without options', async () => {
      const mockResponse = {
        results: [
          { id: 'campaign-1', name: 'Campaign 1' },
          { id: 'campaign-2', name: 'Campaign 2' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await campaignsApi.list(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/campaigns/`);
      expect(result).toEqual(mockResponse);
    });

    it('should list campaigns with pagination options', async () => {
      const mockResponse = { results: [] };
      mockHttp.get.mockResolvedValue(mockResponse);

      await campaignsApi.list(accountId, { page: 2, pageSize: 50 });

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/campaigns/?page=2&page_size=50`);
    });

    it('should list campaigns with filter options', async () => {
      const mockResponse = { results: [] };
      mockHttp.get.mockResolvedValue(mockResponse);

      await campaignsApi.list(accountId, { status: 'RUNNING' });

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/campaigns/?status=RUNNING`);
    });
  });

  describe('get', () => {
    it('should get a single campaign', async () => {
      const mockCampaign = { id: campaignId, name: 'Test Campaign' };
      mockHttp.get.mockResolvedValue(mockCampaign);

      const result = await campaignsApi.get(accountId, campaignId);

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/campaigns/${campaignId}`);
      expect(result).toEqual(mockCampaign);
    });
  });

  describe('create', () => {
    it('should create a campaign', async () => {
      const createRequest = {
        name: 'New Campaign',
        branding_text: 'My Brand',
        cpc: 0.5,
        spending_limit: 1000,
        spending_limit_model: 'MONTHLY' as const,
        marketing_objective: 'DRIVE_WEBSITE_TRAFFIC' as const,
      };
      const mockCampaign = { id: 'new-campaign', ...createRequest };
      mockHttp.post.mockResolvedValue(mockCampaign);

      const result = await campaignsApi.create(accountId, createRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/campaigns/`, createRequest);
      expect(result).toEqual(mockCampaign);
    });
  });

  describe('update', () => {
    it('should update a campaign', async () => {
      const updateRequest = { cpc: 0.75 };
      const mockCampaign = { id: campaignId, cpc: 0.75 };
      mockHttp.post.mockResolvedValue(mockCampaign);

      const result = await campaignsApi.update(accountId, campaignId, updateRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}`,
        updateRequest
      );
      expect(result).toEqual(mockCampaign);
    });
  });

  describe('delete', () => {
    it('should delete a campaign', async () => {
      mockHttp.delete.mockResolvedValue(undefined);

      await campaignsApi.delete(accountId, campaignId);

      expect(mockHttp.delete).toHaveBeenCalledWith(`${accountId}/campaigns/${campaignId}`);
    });
  });

  describe('pause', () => {
    it('should pause a campaign', async () => {
      const mockCampaign = { id: campaignId, is_active: false };
      mockHttp.post.mockResolvedValue(mockCampaign);

      const result = await campaignsApi.pause(accountId, campaignId);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}`,
        { is_active: false }
      );
      expect(result).toEqual(mockCampaign);
    });
  });

  describe('unpause', () => {
    it('should unpause a campaign', async () => {
      const mockCampaign = { id: campaignId, is_active: true };
      mockHttp.post.mockResolvedValue(mockCampaign);

      const result = await campaignsApi.unpause(accountId, campaignId);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}`,
        { is_active: true }
      );
      expect(result).toEqual(mockCampaign);
    });
  });

  describe('duplicate', () => {
    it('should duplicate a campaign', async () => {
      const mockCampaign = { id: 'new-campaign', name: 'Campaign Copy' };
      mockHttp.post.mockResolvedValue(mockCampaign);

      const result = await campaignsApi.duplicate(accountId, campaignId, 'Campaign Copy');

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/duplicate`,
        { name: 'Campaign Copy' }
      );
      expect(result).toEqual(mockCampaign);
    });
  });

  describe('bulkUpdate', () => {
    it('should bulk update campaigns', async () => {
      const bulkRequest = {
        campaigns: [
          { campaign_id: 'campaign-1', update: { is_active: false } },
          { campaign_id: 'campaign-2', update: { cpc: 0.6 } },
        ],
      };
      const mockResponse = { results: [] };
      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await campaignsApi.bulkUpdate(accountId, bulkRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(`${accountId}/campaigns/bulk`, bulkRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('patch', () => {
    it('should patch a campaign collection', async () => {
      const patchRequest = [
        { op: 'ADD' as const, path: '/country_targeting/value', value: 'US' },
      ];
      const mockCampaign = { id: campaignId };
      mockHttp.patch.mockResolvedValue(mockCampaign);

      const result = await campaignsApi.patch(accountId, campaignId, 'targeting', patchRequest);

      expect(mockHttp.patch).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting`,
        patchRequest
      );
      expect(result).toEqual(mockCampaign);
    });
  });
});
