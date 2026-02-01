/**
 * Account API for Taboola Backstage
 */

import type { HttpClient } from '../utils/http.js';
import type {
  Account,
  AdvertiserAccount,
  AllowedAccountsResponse,
  NetworkAdvertisersResponse,
} from '../types/index.js';

/**
 * Account management API
 */
export class AccountsAPI {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get current account details
   *
   * Returns details of your primary account including the account_id
   * needed for most API operations.
   *
   * @example
   * ```typescript
   * const account = await client.accounts.getCurrent();
   * console.log(account.account_id); // 'my-account-id'
   * ```
   */
  async getCurrent(): Promise<Account> {
    return this.http.get<Account>('users/current/account');
  }

  /**
   * Get all allowed accounts for the current user
   *
   * Returns all accounts the current API credentials have access to.
   *
   * @example
   * ```typescript
   * const { results } = await client.accounts.getAllowed();
   * for (const account of results) {
   *   console.log(account.name, account.account_id);
   * }
   * ```
   */
  async getAllowed(): Promise<AllowedAccountsResponse> {
    return this.http.get<AllowedAccountsResponse>('users/current/allowed-accounts');
  }

  /**
   * Get advertiser accounts in a network
   *
   * For network accounts, returns all advertiser accounts within the network.
   *
   * @param accountId - Network account ID
   *
   * @example
   * ```typescript
   * const { results } = await client.accounts.getNetworkAdvertisers('my-network');
   * for (const advertiser of results) {
   *   console.log(advertiser.name);
   * }
   * ```
   */
  async getNetworkAdvertisers(accountId: string): Promise<NetworkAdvertisersResponse> {
    return this.http.get<NetworkAdvertisersResponse>(`${accountId}/advertisers`);
  }

  /**
   * Get a specific advertiser account
   *
   * @param accountId - Account ID to retrieve
   *
   * @example
   * ```typescript
   * const account = await client.accounts.get('my-account-id');
   * console.log(account.currency);
   * ```
   */
  async get(accountId: string): Promise<AdvertiserAccount> {
    // Use the allowed accounts endpoint and filter
    const allowed = await this.getAllowed();
    const account = allowed.results.find((a) => a.account_id === accountId);
    if (!account) {
      throw new Error(`Account not found: ${accountId}`);
    }
    return account;
  }
}
