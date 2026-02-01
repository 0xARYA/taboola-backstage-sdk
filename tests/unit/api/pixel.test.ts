/**
 * Pixel API tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { PixelAPI } from '../../../src/api/pixel.js';
import { createMockHttpClient, mockHttpClientAsType, type MockHttpClient } from '../../helpers/mock-http.js';

describe('PixelAPI', () => {
  let mockHttp: MockHttpClient;
  let pixelApi: PixelAPI;
  const accountId = 'test-account';

  beforeEach(() => {
    mockHttp = createMockHttpClient();
    pixelApi = new PixelAPI(mockHttpClientAsType(mockHttp));
  });

  describe('listConversionRules', () => {
    it('should list all conversion rules', async () => {
      const mockResponse = {
        results: [
          { id: 'rule-1', display_name: 'Purchase', status: 'ACTIVE' },
          { id: 'rule-2', display_name: 'Sign Up', status: 'ACTIVE' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await pixelApi.listConversionRules(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/conversion_rule`
      );
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getConversionRule', () => {
    it('should get a single conversion rule', async () => {
      const mockRule = { id: 'rule-1', display_name: 'Purchase' };
      mockHttp.get.mockResolvedValue(mockRule);

      const result = await pixelApi.getConversionRule(accountId, 'rule-1');

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/conversion_rule/rule-1`
      );
      expect(result).toEqual(mockRule);
    });
  });

  describe('listConversionRulesWithData', () => {
    it('should list conversion rules with performance data', async () => {
      const mockResponse = {
        results: [
          { id: 'rule-1', display_name: 'Purchase', conversions_30d: 100 },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await pixelApi.listConversionRulesWithData(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/conversion_rule/data`
      );
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('createConversionRule', () => {
    it('should create a conversion rule', async () => {
      const createRequest = {
        display_name: 'New Purchase Rule',
        type: 'EVENT_BASED' as const,
        category: 'PURCHASE' as const,
        event_name: 'purchase',
        conditions: [],
        effect: {
          type: 'FIXED_VALUE' as const,
          value: 10,
          currency: 'USD',
          value_parameter: null,
        },
      };
      const mockRule = { id: 'new-rule', ...createRequest };
      mockHttp.post.mockResolvedValue(mockRule);

      const result = await pixelApi.createConversionRule(accountId, createRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/conversion_rule`,
        createRequest
      );
      expect(result).toEqual(mockRule);
    });
  });

  describe('updateConversionRule', () => {
    it('should update a conversion rule', async () => {
      const updateRequest = { display_name: 'Updated Rule' };
      const mockRule = { id: 'rule-1', display_name: 'Updated Rule' };
      mockHttp.post.mockResolvedValue(mockRule);

      const result = await pixelApi.updateConversionRule(accountId, 'rule-1', updateRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/conversion_rule/rule-1`,
        updateRequest
      );
      expect(result).toEqual(mockRule);
    });
  });

  describe('archiveConversionRule', () => {
    it('should archive a conversion rule', async () => {
      const mockRule = { id: 'rule-1', status: 'ARCHIVED' };
      mockHttp.post.mockResolvedValue(mockRule);

      const result = await pixelApi.archiveConversionRule(accountId, 'rule-1');

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/conversion_rule/rule-1`,
        { status: 'ARCHIVED' }
      );
      expect(result).toEqual(mockRule);
    });
  });

  describe('unarchiveConversionRule', () => {
    it('should unarchive a conversion rule', async () => {
      const mockRule = { id: 'rule-1', status: 'ACTIVE' };
      mockHttp.post.mockResolvedValue(mockRule);

      const result = await pixelApi.unarchiveConversionRule(accountId, 'rule-1');

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/conversion_rule/rule-1`,
        { status: 'ACTIVE' }
      );
      expect(result).toEqual(mockRule);
    });
  });

  describe('listCustomAudienceRules', () => {
    it('should list all custom audience rules', async () => {
      const mockResponse = {
        results: [
          { id: 'aud-rule-1', display_name: 'All Visitors', status: 'ACTIVE' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await pixelApi.listCustomAudienceRules(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/custom_audience_rule`
      );
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getCustomAudienceRule', () => {
    it('should get a single custom audience rule', async () => {
      const mockRule = { id: 'aud-rule-1', display_name: 'All Visitors' };
      mockHttp.get.mockResolvedValue(mockRule);

      const result = await pixelApi.getCustomAudienceRule(accountId, 'aud-rule-1');

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/custom_audience_rule/aud-rule-1`
      );
      expect(result).toEqual(mockRule);
    });
  });

  describe('createCustomAudienceRule', () => {
    it('should create a custom audience rule', async () => {
      const createRequest = {
        display_name: 'Cart Abandoners',
        conditions: [
          { type: 'EVENT_NAME' as const, operator: 'EQUALS' as const, value: 'add_to_cart' },
        ],
        ttl_days: 7,
      };
      const mockRule = { id: 'new-aud-rule', ...createRequest };
      mockHttp.post.mockResolvedValue(mockRule);

      const result = await pixelApi.createCustomAudienceRule(accountId, createRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/custom_audience_rule`,
        createRequest
      );
      expect(result).toEqual(mockRule);
    });
  });

  describe('updateCustomAudienceRule', () => {
    it('should update a custom audience rule', async () => {
      const updateRequest = { display_name: 'Updated Audience' };
      const mockRule = { id: 'aud-rule-1', display_name: 'Updated Audience' };
      mockHttp.post.mockResolvedValue(mockRule);

      const result = await pixelApi.updateCustomAudienceRule(accountId, 'aud-rule-1', updateRequest);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/custom_audience_rule/aud-rule-1`,
        updateRequest
      );
      expect(result).toEqual(mockRule);
    });
  });

  describe('pauseCustomAudienceRule', () => {
    it('should pause a custom audience rule', async () => {
      const mockRule = { id: 'aud-rule-1', status: 'PAUSED' };
      mockHttp.post.mockResolvedValue(mockRule);

      const result = await pixelApi.pauseCustomAudienceRule(accountId, 'aud-rule-1');

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/custom_audience_rule/aud-rule-1`,
        { status: 'PAUSED' }
      );
      expect(result).toEqual(mockRule);
    });
  });

  describe('resumeCustomAudienceRule', () => {
    it('should resume a custom audience rule', async () => {
      const mockRule = { id: 'aud-rule-1', status: 'ACTIVE' };
      mockHttp.post.mockResolvedValue(mockRule);

      const result = await pixelApi.resumeCustomAudienceRule(accountId, 'aud-rule-1');

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/custom_audience_rule/aud-rule-1`,
        { status: 'ACTIVE' }
      );
      expect(result).toEqual(mockRule);
    });
  });

  describe('archiveCustomAudienceRule', () => {
    it('should archive a custom audience rule', async () => {
      const mockRule = { id: 'aud-rule-1', status: 'ARCHIVED' };
      mockHttp.post.mockResolvedValue(mockRule);

      const result = await pixelApi.archiveCustomAudienceRule(accountId, 'aud-rule-1');

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/universal_pixel/custom_audience_rule/aud-rule-1`,
        { status: 'ARCHIVED' }
      );
      expect(result).toEqual(mockRule);
    });
  });
});
