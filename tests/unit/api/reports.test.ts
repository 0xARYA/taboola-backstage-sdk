/**
 * Reports API tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ReportsAPI } from '../../../src/api/reports.js';
import { createMockHttpClient, mockHttpClientAsType, type MockHttpClient } from '../../helpers/mock-http.js';

describe('ReportsAPI', () => {
  let mockHttp: MockHttpClient;
  let reportsApi: ReportsAPI;
  const accountId = 'test-account';

  beforeEach(() => {
    mockHttp = createMockHttpClient();
    reportsApi = new ReportsAPI(mockHttpClientAsType(mockHttp));
  });

  describe('campaignSummary', () => {
    it('should get campaign summary report by day', async () => {
      const mockResponse = {
        results: [
          { date: '2024-01-01', clicks: 100, impressions: 10000, spent: 50.00 },
          { date: '2024-01-02', clicks: 120, impressions: 12000, spent: 60.00 },
        ],
        recordCount: 2,
        metadata: {},
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await reportsApi.campaignSummary(accountId, 'day', {
        start_date: '2024-01-01',
        end_date: '2024-01-31',
      });

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/campaign-summary/dimensions/day?start_date=2024-01-01&end_date=2024-01-31`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get campaign summary report with filters', async () => {
      const mockResponse = { results: [], recordCount: 0, metadata: {} };
      mockHttp.get.mockResolvedValue(mockResponse);

      await reportsApi.campaignSummary(accountId, 'campaign', {
        start_date: '2024-01-01',
        end_date: '2024-01-31',
        campaign: '12345',
        country: 'US',
        platform: 'DESK',
      });

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/campaign-summary/dimensions/campaign?start_date=2024-01-01&end_date=2024-01-31&campaign=12345&country=US&platform=DESK`
      );
    });

    it('should get campaign summary report with conversions', async () => {
      const mockResponse = { results: [], recordCount: 0, metadata: {} };
      mockHttp.get.mockResolvedValue(mockResponse);

      await reportsApi.campaignSummary(accountId, 'day', {
        start_date: '2024-01-01',
        end_date: '2024-01-31',
        include_conversions: 'all',
      });

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/campaign-summary/dimensions/day?start_date=2024-01-01&end_date=2024-01-31&include_conversions=all`
      );
    });

    it('should support different dimensions', async () => {
      const mockResponse = { results: [], recordCount: 0, metadata: {} };
      mockHttp.get.mockResolvedValue(mockResponse);

      const dimensions = ['day', 'week', 'month', 'campaign', 'site', 'country', 'platform'] as const;

      for (const dimension of dimensions) {
        await reportsApi.campaignSummary(accountId, dimension, {
          start_date: '2024-01-01',
          end_date: '2024-01-31',
        });

        expect(mockHttp.get).toHaveBeenCalledWith(
          expect.stringContaining(`/dimensions/${dimension}?`)
        );
      }
    });
  });

  describe('topCampaignContent', () => {
    it('should get top campaign content report', async () => {
      const mockResponse = {
        results: [
          { item_id: 'item-1', item_name: 'Ad 1', clicks: 500, impressions: 50000 },
          { item_id: 'item-2', item_name: 'Ad 2', clicks: 400, impressions: 40000 },
        ],
        recordCount: 2,
        metadata: {},
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await reportsApi.topCampaignContent(accountId, {
        start_date: '2024-01-01',
        end_date: '2024-01-31',
      });

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/top-campaign-content/dimensions/item_breakdown?start_date=2024-01-01&end_date=2024-01-31`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get top campaign content with filters', async () => {
      const mockResponse = { results: [], recordCount: 0, metadata: {} };
      mockHttp.get.mockResolvedValue(mockResponse);

      await reportsApi.topCampaignContent(accountId, {
        start_date: '2024-01-01',
        end_date: '2024-01-31',
        campaign: '12345',
        limit: 100,
        include_conversions: 'all',
      });

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/top-campaign-content/dimensions/item_breakdown?start_date=2024-01-01&end_date=2024-01-31&campaign=12345&limit=100&include_conversions=all`
      );
    });
  });

  describe('realtimeCampaign', () => {
    it('should get realtime campaign report', async () => {
      const mockResponse = {
        results: [
          { campaign_id: 'c1', campaign_name: 'Campaign 1', clicks: 50, impressions: 5000 },
        ],
        timestamp: '2024-01-15T12:00:00Z',
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await reportsApi.realtimeCampaign(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/realtime/campaign-summary`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get realtime campaign report with campaign filter', async () => {
      const mockResponse = { results: [], timestamp: '' };
      mockHttp.get.mockResolvedValue(mockResponse);

      await reportsApi.realtimeCampaign(accountId, { campaign: '12345' });

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/realtime/campaign-summary?campaign=12345`
      );
    });
  });

  describe('realtimeAds', () => {
    it('should get realtime ads report', async () => {
      const mockResponse = {
        results: [
          { item_id: 'i1', item_name: 'Ad 1', clicks: 25, impressions: 2500 },
        ],
        timestamp: '2024-01-15T12:00:00Z',
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await reportsApi.realtimeAds(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/realtime/ads`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get realtime ads report with campaign filter', async () => {
      const mockResponse = { results: [], timestamp: '' };
      mockHttp.get.mockResolvedValue(mockResponse);

      await reportsApi.realtimeAds(accountId, { campaign: '12345' });

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/realtime/ads?campaign=12345`
      );
    });
  });
});
