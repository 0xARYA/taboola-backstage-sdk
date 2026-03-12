/**
 * Targeting API tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TargetingAPI } from '../../../src/api/targeting.js';
import {
  createMockHttpClient,
  mockHttpClientAsType,
  type MockHttpClient,
} from '../../helpers/mock-http.js';

describe('TargetingAPI', () => {
  let mockHttp: MockHttpClient;
  let targetingApi: TargetingAPI;
  const accountId = 'test-account';
  const campaignId = 'campaign-123';

  beforeEach(() => {
    mockHttp = createMockHttpClient();
    targetingApi = new TargetingAPI(mockHttpClientAsType(mockHttp));
  });

  describe('getPostalCodes', () => {
    it('should get postal code targeting', async () => {
      const mockResponse = {
        type: 'INCLUDE',
        collection: ['10001', '10002'],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await targetingApi.getPostalCodes(accountId, campaignId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/postal_code`
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updatePostalCodes', () => {
    it('should update postal code targeting', async () => {
      const request = {
        type: 'INCLUDE' as const,
        collection: ['10001', '10002'],
      };
      const mockResponse = { ...request };
      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await targetingApi.updatePostalCodes(accountId, campaignId, request);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/postal_code`,
        request
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMarketplaceAudiences', () => {
    it('should get marketplace audience targeting', async () => {
      const mockResponse = {
        collection: [{ collection: [123], type: 'INCLUDE' }],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await targetingApi.getMarketplaceAudiences(accountId, campaignId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/audience_segments`
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateMarketplaceAudiences', () => {
    it('should update marketplace audience targeting', async () => {
      const request = {
        collection: [{ collection: [123], type: 'INCLUDE' as const }],
      };
      mockHttp.post.mockResolvedValue(request);

      const result = await targetingApi.updateMarketplaceAudiences(accountId, campaignId, request);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/audience_segments`,
        request
      );
      expect(result).toEqual(request);
    });
  });

  describe('getCustomAudiences', () => {
    it('should get custom audience targeting', async () => {
      const mockResponse = {
        collection: [{ collection: [456], type: 'INCLUDE' }],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await targetingApi.getCustomAudiences(accountId, campaignId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/custom_audience`
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateCustomAudiences', () => {
    it('should update custom audience targeting', async () => {
      const request = {
        collection: [{ collection: [456], type: 'INCLUDE' as const }],
      };
      mockHttp.post.mockResolvedValue(request);

      const result = await targetingApi.updateCustomAudiences(accountId, campaignId, request);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/custom_audience`,
        request
      );
      expect(result).toEqual(request);
    });
  });

  describe('getLookalikeAudiences', () => {
    it('should get lookalike audience targeting', async () => {
      const mockResponse = {
        collection: [{ collection: [{ rule_id: 1, similarity_level: 3 }], type: 'INCLUDE' }],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await targetingApi.getLookalikeAudiences(accountId, campaignId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/lookalike_audience`
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateLookalikeAudiences', () => {
    it('should update lookalike audience targeting', async () => {
      const request = {
        collection: [
          { collection: [{ rule_id: 1, similarity_level: 3 }], type: 'INCLUDE' as const },
        ],
      };
      mockHttp.post.mockResolvedValue(request);

      const result = await targetingApi.updateLookalikeAudiences(accountId, campaignId, request);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/lookalike_audience`,
        request
      );
      expect(result).toEqual(request);
    });
  });

  describe('getContextual', () => {
    it('should get contextual targeting', async () => {
      const mockResponse = {
        collection: [{ collection: [789], type: 'INCLUDE' }],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await targetingApi.getContextual(accountId, campaignId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/contextual_segments`
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateContextual', () => {
    it('should update contextual targeting', async () => {
      const request = {
        collection: [{ collection: [789], type: 'INCLUDE' as const }],
      };
      mockHttp.post.mockResolvedValue(request);

      const result = await targetingApi.updateContextual(accountId, campaignId, request);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/contextual_segments`,
        request
      );
      expect(result).toEqual(request);
    });
  });

  describe('getFirstPartyAudiences', () => {
    it('should get first party audience targeting', async () => {
      const mockResponse = {
        collection: [{ collection: [111], type: 'INCLUDE' }],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await targetingApi.getFirstPartyAudiences(accountId, campaignId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/my_audiences`
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateFirstPartyAudiences', () => {
    it('should update first party audience targeting', async () => {
      const request = {
        collection: [{ collection: [111], type: 'INCLUDE' as const }],
      };
      mockHttp.post.mockResolvedValue(request);

      const result = await targetingApi.updateFirstPartyAudiences(accountId, campaignId, request);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/my_audiences`,
        request
      );
      expect(result).toEqual(request);
    });
  });

  describe('getMarkingLabels', () => {
    it('should get marking labels targeting', async () => {
      const mockResponse = {
        collection: [{ collection: ['label-1', 'label-2'], type: 'INCLUDE' }],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await targetingApi.getMarkingLabels(accountId, campaignId);

      expect(mockHttp.get).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/marking_labels`
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateMarkingLabels', () => {
    it('should update marking labels targeting', async () => {
      const request = {
        collection: [{ collection: ['label-1', 'label-2'], type: 'INCLUDE' as const }],
      };
      mockHttp.post.mockResolvedValue(request);

      const result = await targetingApi.updateMarkingLabels(accountId, campaignId, request);

      expect(mockHttp.post).toHaveBeenCalledWith(
        `${accountId}/campaigns/${campaignId}/targeting/marking_labels`,
        request
      );
      expect(result).toEqual(request);
    });
  });
});
