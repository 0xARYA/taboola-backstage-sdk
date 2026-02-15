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
    it('should get realtime campaign report by hour', async () => {
      const mockResponse = {
        results: [
          { hour: '00:00', clicks: 50, impressions: 5000, spent: 25.00 },
        ],
        recordCount: 1,
        metadata: {},
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await reportsApi.realtimeCampaign(accountId, 'by_hour', {
        start_date: '2024-01-15T00:00:00',
        end_date: '2024-01-15T23:59:59',
      });

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/realtime-campaign-summary/dimensions/by_hour?start_date=2024-01-15T00%3A00%3A00&end_date=2024-01-15T23%3A59%3A59`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get realtime campaign report by campaign with filters', async () => {
      const mockResponse = { results: [], recordCount: 0, metadata: {} };
      mockHttp.get.mockResolvedValue(mockResponse);

      await reportsApi.realtimeCampaign(accountId, 'by_campaign', {
        start_date: '2024-01-15T00:00:00',
        end_date: '2024-01-15T23:59:59',
        campaign: '101,102',
        platform: 'DESK',
        country: 'US',
        site_id: '5001',
      });

      expect(mockHttp.get).toHaveBeenCalledWith(
        expect.stringContaining(`${accountId}/reports/realtime-campaign-summary/dimensions/by_campaign?`)
      );
      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('campaign=101%2C102'));
      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('platform=DESK'));
      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('country=US'));
      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('site_id=5001'));
    });

    it('should support fetch_config parameter', async () => {
      const mockResponse = { results: [], recordCount: 0, metadata: {} };
      mockHttp.get.mockResolvedValue(mockResponse);

      await reportsApi.realtimeCampaign(accountId, 'by_campaign', {
        start_date: '2024-01-15T00:00:00',
        end_date: '2024-01-15T23:59:59',
        fetch_config: true,
      });

      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('fetch_config=true'));
    });

    it('should support all realtime campaign dimensions', async () => {
      const mockResponse = { results: [], recordCount: 0, metadata: {} };
      mockHttp.get.mockResolvedValue(mockResponse);

      const dimensions = [
        'by_hour', 'by_campaign', 'by_site', 'by_country', 'by_platform',
        'by_campaign_by_hour', 'by_campaign_by_site', 'by_campaign_by_country',
        'by_campaign_by_platform', 'by_campaign_by_country_by_platform', 'by_platform_by_country',
      ] as const;

      for (const dimension of dimensions) {
        await reportsApi.realtimeCampaign(accountId, dimension, {
          start_date: '2024-01-15T00:00:00',
          end_date: '2024-01-15T23:59:59',
        });

        expect(mockHttp.get).toHaveBeenCalledWith(
          expect.stringContaining(`/dimensions/${dimension}?`)
        );
      }
    });
  });

  describe('realtimeAds', () => {
    it('should get realtime ads report by item', async () => {
      const mockResponse = {
        results: [
          { item: '1001', item_name: 'Ad 1', clicks: 25, impressions: 2500 },
        ],
        recordCount: 1,
        metadata: {},
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await reportsApi.realtimeAds(accountId, 'by_item', {
        start_date: '2024-01-15T00:00:00',
        end_date: '2024-01-15T23:59:59',
        item: '1001,1002',
      });

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/reports/realtime-top-campaign-content/dimensions/by_item?start_date=2024-01-15T00%3A00%3A00&end_date=2024-01-15T23%3A59%3A59&item=1001%2C1002`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get realtime ads report with all filters', async () => {
      const mockResponse = { results: [], recordCount: 0, metadata: {} };
      mockHttp.get.mockResolvedValue(mockResponse);

      await reportsApi.realtimeAds(accountId, 'by_item', {
        start_date: '2024-01-15T00:00:00',
        end_date: '2024-01-15T23:59:59',
        item: '1001',
        campaign: '101',
        platform: 'PHON',
        country: 'GB',
        site_id: '5001',
      });

      expect(mockHttp.get).toHaveBeenCalledWith(
        expect.stringContaining(`${accountId}/reports/realtime-top-campaign-content/dimensions/by_item?`)
      );
      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('item=1001'));
      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('campaign=101'));
      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('platform=PHON'));
      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('country=GB'));
      expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('site_id=5001'));
    });

    it('should support by_item_by_smallest_time_bucket dimension', async () => {
      const mockResponse = { results: [], recordCount: 0, metadata: {} };
      mockHttp.get.mockResolvedValue(mockResponse);

      await reportsApi.realtimeAds(accountId, 'by_item_by_smallest_time_bucket', {
        start_date: '2024-01-15T00:00:00',
        end_date: '2024-01-15T23:59:59',
        item: '1001',
      });

      expect(mockHttp.get).toHaveBeenCalledWith(
        expect.stringContaining('/dimensions/by_item_by_smallest_time_bucket?')
      );
    });
  });
});
