/**
 * Taboola Backstage SDK Client
 *
 * Main entry point for the SDK. Creates and configures all API modules.
 */

import { OAuthManager } from './auth/oauth.js';
import { HttpClient, DEFAULT_BASE_URL } from './utils/http.js';
import { AccountsAPI } from './api/accounts.js';
import { CampaignsAPI } from './api/campaigns.js';
import { ItemsAPI } from './api/items.js';
import { DictionaryAPI } from './api/dictionary.js';
import { PublishersAPI } from './api/publishers.js';
import { TargetingAPI } from './api/targeting.js';
import { CombinedAudiencesAPI } from './api/combined-audiences.js';
import { FirstPartyAudiencesAPI } from './api/first-party-audiences.js';
import { PixelAPI } from './api/pixel.js';
import { ReportsAPI } from './api/reports.js';
import { SharedBudgetAPI } from './api/shared-budget.js';
import type { TaboolaConfig } from './types/index.js';

/**
 * Taboola Backstage API Client
 *
 * The main client for interacting with the Taboola Backstage API.
 * Provides access to all API modules through namespaced properties.
 *
 * @example
 * ```typescript
 * import { TaboolaClient } from 'taboola-backstage-sdk';
 *
 * const client = new TaboolaClient({
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 * });
 *
 * // Get current account
 * const account = await client.accounts.getCurrent();
 * console.log('Account ID:', account.account_id);
 *
 * // List campaigns
 * const { results: campaigns } = await client.campaigns.list(account.account_id);
 * console.log('Found', campaigns.length, 'campaigns');
 *
 * // Create a new campaign
 * const campaign = await client.campaigns.create(account.account_id, {
 *   name: 'My Campaign',
 *   branding_text: 'My Brand',
 *   cpc: 0.50,
 *   spending_limit: 1000,
 *   spending_limit_model: 'MONTHLY',
 *   marketing_objective: 'DRIVE_WEBSITE_TRAFFIC',
 * });
 * ```
 */
export class TaboolaClient {
  /**
   * Account management API
   */
  readonly accounts: AccountsAPI;

  /**
   * Campaign management API
   */
  readonly campaigns: CampaignsAPI;

  /**
   * Campaign items (ads) management API
   */
  readonly items: ItemsAPI;

  /**
   * Dictionary/reference data API
   */
  readonly dictionary: DictionaryAPI;

  /**
   * Publishers management API
   */
  readonly publishers: PublishersAPI;

  /**
   * Campaign targeting API
   */
  readonly targeting: TargetingAPI;

  /**
   * Combined audiences API
   */
  readonly combinedAudiences: CombinedAudiencesAPI;

  /**
   * First party audiences API
   */
  readonly firstPartyAudiences: FirstPartyAudiencesAPI;

  /**
   * Pixel conversion and custom audience rules API
   */
  readonly pixel: PixelAPI;

  /**
   * Shared budget management API
   */
  readonly sharedBudgets: SharedBudgetAPI;

  /**
   * Reports and analytics API
   */
  readonly reports: ReportsAPI;

  /**
   * Internal OAuth manager (for advanced use cases)
   */
  private readonly authManager: OAuthManager;

  /**
   * Internal HTTP client (for advanced use cases)
   */
  private readonly httpClient: HttpClient;

  /**
   * Create a new Taboola client
   *
   * @param config - Client configuration
   */
  constructor(config: TaboolaConfig) {
    if (!config.clientId) {
      throw new Error('clientId is required');
    }
    if (!config.clientSecret) {
      throw new Error('clientSecret is required');
    }

    // Initialize authentication
    this.authManager = new OAuthManager(config.clientId, config.clientSecret);

    // Initialize HTTP client
    this.httpClient = new HttpClient(this.authManager, {
      baseUrl: config.baseUrl ?? DEFAULT_BASE_URL,
      timeout: config.timeout,
      retries: config.retries,
      debug: config.debug,
    });

    // Initialize API modules
    this.accounts = new AccountsAPI(this.httpClient);
    this.campaigns = new CampaignsAPI(this.httpClient);
    this.items = new ItemsAPI(this.httpClient);
    this.dictionary = new DictionaryAPI(this.httpClient);
    this.publishers = new PublishersAPI(this.httpClient);
    this.targeting = new TargetingAPI(this.httpClient);
    this.combinedAudiences = new CombinedAudiencesAPI(this.httpClient);
    this.firstPartyAudiences = new FirstPartyAudiencesAPI(this.httpClient);
    this.pixel = new PixelAPI(this.httpClient);
    this.sharedBudgets = new SharedBudgetAPI(this.httpClient);
    this.reports = new ReportsAPI(this.httpClient);
  }

  /**
   * Get the base URL used for API requests
   */
  get baseUrl(): string {
    return DEFAULT_BASE_URL;
  }

  /**
   * Force refresh the access token
   *
   * Useful if you need to ensure a fresh token before a series of operations.
   */
  async refreshToken(): Promise<void> {
    await this.authManager.refreshToken();
  }

  /**
   * Clear the cached access token
   *
   * Forces a new token to be fetched on the next request.
   */
  clearToken(): void {
    this.authManager.clearToken();
  }
}

/**
 * Create a new Taboola client
 *
 * Convenience function for creating a new client instance.
 *
 * @param config - Client configuration
 *
 * @example
 * ```typescript
 * import { createClient } from 'taboola-backstage-sdk';
 *
 * const client = createClient({
 *   clientId: process.env.TABOOLA_CLIENT_ID!,
 *   clientSecret: process.env.TABOOLA_CLIENT_SECRET!,
 * });
 * ```
 */
export function createClient(config: TaboolaConfig): TaboolaClient {
  return new TaboolaClient(config);
}
