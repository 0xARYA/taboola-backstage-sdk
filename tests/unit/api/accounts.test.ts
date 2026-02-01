/**
 * Accounts API tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { AccountsAPI } from '../../../src/api/accounts.js';
import { createMockHttpClient, mockHttpClientAsType, type MockHttpClient } from '../../helpers/mock-http.js';

describe('AccountsAPI', () => {
  let mockHttp: MockHttpClient;
  let accountsApi: AccountsAPI;

  beforeEach(() => {
    mockHttp = createMockHttpClient();
    accountsApi = new AccountsAPI(mockHttpClientAsType(mockHttp));
  });

  describe('getCurrent', () => {
    it('should get current account', async () => {
      const mockAccount = {
        account_id: 'test-account',
        name: 'Test Account',
        currency: 'USD',
        partner_types: ['ADVERTISER'],
      };
      mockHttp.get.mockResolvedValue(mockAccount);

      const result = await accountsApi.getCurrent();

      expect(mockHttp.get).toHaveBeenCalledWith('users/current/account');
      expect(result).toEqual(mockAccount);
    });
  });

  describe('getAllowed', () => {
    it('should get all allowed accounts', async () => {
      const mockResponse = {
        results: [
          { account_id: 'account-1', name: 'Account 1' },
          { account_id: 'account-2', name: 'Account 2' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await accountsApi.getAllowed();

      expect(mockHttp.get).toHaveBeenCalledWith('users/current/allowed-accounts');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNetworkAdvertisers', () => {
    it('should get network advertisers', async () => {
      const mockResponse = {
        results: [
          { account_id: 'advertiser-1', name: 'Advertiser 1' },
        ],
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await accountsApi.getNetworkAdvertisers('network-id');

      expect(mockHttp.get).toHaveBeenCalledWith('network-id/advertisers');
      expect(result).toEqual(mockResponse);
    });
  });
});
