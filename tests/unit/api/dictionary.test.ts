/**
 * Dictionary API tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { DictionaryAPI } from '../../../src/api/dictionary.js';
import { createMockHttpClient, mockHttpClientAsType, type MockHttpClient } from '../../helpers/mock-http.js';

describe('DictionaryAPI', () => {
  let mockHttp: MockHttpClient;
  let dictionaryApi: DictionaryAPI;
  const accountId = 'test-account';

  beforeEach(() => {
    mockHttp = createMockHttpClient();
    dictionaryApi = new DictionaryAPI(mockHttpClientAsType(mockHttp));
  });

  describe('getCountries', () => {
    it('should get all countries', async () => {
      const mockResponse = {
        results: [
          { name: 'United States', value: 'US' },
          { name: 'Canada', value: 'CA' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await dictionaryApi.getCountries();

      expect(mockHttp.get).toHaveBeenCalledWith('resources/countries');
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getRegions', () => {
    it('should get regions for a country', async () => {
      const mockResponse = {
        results: [
          { name: 'California', value: 'CA', country: 'US' },
          { name: 'New York', value: 'NY', country: 'US' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await dictionaryApi.getRegions('US');

      expect(mockHttp.get).toHaveBeenCalledWith('resources/countries/US/regions');
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getDMAs', () => {
    it('should get DMAs for a country', async () => {
      const mockResponse = {
        results: [
          { name: 'New York', value: '501', country: 'US' },
          { name: 'Los Angeles', value: '803', country: 'US' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await dictionaryApi.getDMAs('US');

      expect(mockHttp.get).toHaveBeenCalledWith('resources/countries/US/dma');
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getPostalCodes', () => {
    it('should get postal codes for a country', async () => {
      const mockResponse = {
        results: [
          { name: '10001', value: '10001', country: 'US' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await dictionaryApi.getPostalCodes('US');

      expect(mockHttp.get).toHaveBeenCalledWith('resources/countries/US/postal');
      expect(result).toEqual(mockResponse.results);
    });

    it('should get postal codes with search params', async () => {
      const mockResponse = { results: [] };
      mockHttp.get.mockResolvedValue(mockResponse);

      await dictionaryApi.getPostalCodes('US', { search: '100', page: 1, page_size: 50 });

      expect(mockHttp.get).toHaveBeenCalledWith(
        'resources/countries/US/postal?search=100&page=1&page_size=50'
      );
    });
  });

  describe('getPlatforms', () => {
    it('should get all platforms', async () => {
      const mockResponse = {
        results: [
          { name: 'Desktop', value: 'DESK' },
          { name: 'Mobile', value: 'PHON' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await dictionaryApi.getPlatforms();

      expect(mockHttp.get).toHaveBeenCalledWith('resources/platforms');
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getOperatingSystems', () => {
    it('should get all operating systems', async () => {
      const mockResponse = {
        results: [
          { name: 'iOS', value: 'IOS' },
          { name: 'Android', value: 'ANDROID' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await dictionaryApi.getOperatingSystems();

      expect(mockHttp.get).toHaveBeenCalledWith('resources/operating-systems');
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getBrowsers', () => {
    it('should get all browsers', async () => {
      const mockResponse = {
        results: [
          { name: 'Chrome', value: 'CHROME' },
          { name: 'Safari', value: 'SAFARI' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await dictionaryApi.getBrowsers();

      expect(mockHttp.get).toHaveBeenCalledWith('resources/browsers');
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getCampaignEnums', () => {
    it('should get campaign property enums', async () => {
      const mockResponse = {
        bid_strategy: [{ name: 'Smart', value: 'SMART' }],
        status: [{ name: 'Running', value: 'RUNNING' }],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await dictionaryApi.getCampaignEnums();

      expect(mockHttp.get).toHaveBeenCalledWith('resources/campaigns-properties/enums');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMarketplaceAudiences', () => {
    it('should get marketplace audiences for account', async () => {
      const mockResponse = {
        results: [
          { id: 'aud-1', name: 'Auto Intenders' },
          { id: 'aud-2', name: 'Tech Enthusiasts' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await dictionaryApi.getMarketplaceAudiences(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/dictionary/audience/segments`);
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe('getContextualSegments', () => {
    it('should get contextual segments for account', async () => {
      const mockResponse = {
        results: [
          { id: 'ctx-1', name: 'Sports' },
          { id: 'ctx-2', name: 'Technology' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await dictionaryApi.getContextualSegments(accountId);

      expect(mockHttp.get).toHaveBeenCalledWith(`${accountId}/dictionary/contextual-segments`);
      expect(result).toEqual(mockResponse.results);
    });
  });
});
