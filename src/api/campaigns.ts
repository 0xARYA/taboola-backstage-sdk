/**
 * Campaigns API for Taboola Backstage
 */

import type { HttpClient } from '../utils/http.js';
import type {
  BulkCampaignUpdateRequest,
  Campaign,
  CampaignBaseListResponse,
  CampaignListResponse,
  CampaignPatchRequest,
  CampaignReachEstimatorRequest,
  CampaignReachEstimatorResponse,
  CampaignTargetingCollection,
  CreateCampaignRequest,
  UpdateCampaignRequest,
} from '../types/index.js';

/**
 * Options for listing campaigns
 */
export interface ListCampaignsOptions {
  /** Page number (1-indexed) */
  page?: number;
  /** Number of results per page */
  pageSize?: number;
  /** Filter by status */
  status?: string;
  /** Filter by approval state */
  approvalState?: string;
}

/**
 * Campaign management API
 */
export class CampaignsAPI {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all campaigns for an account
   *
   * @param accountId - Account ID
   * @param options - Pagination and filter options
   *
   * @example
   * ```typescript
   * const { results } = await client.campaigns.list('my-account');
   * for (const campaign of results) {
   *   console.log(campaign.name, campaign.status);
   * }
   * ```
   */
  async list(accountId: string, options: ListCampaignsOptions = {}): Promise<CampaignListResponse> {
    const searchParams = new URLSearchParams();

    if (options.page !== undefined) {
      searchParams.set('page', options.page.toString());
    }
    if (options.pageSize !== undefined) {
      searchParams.set('page_size', options.pageSize.toString());
    }
    if (options.status !== undefined) {
      searchParams.set('status', options.status);
    }
    if (options.approvalState !== undefined) {
      searchParams.set('approval_state', options.approvalState);
    }

    const query = searchParams.toString();
    const path = `${accountId}/campaigns/${query ? `?${query}` : ''}`;

    return this.http.get<CampaignListResponse>(path);
  }

  /**
   * List all campaigns with base (partial) fields only
   *
   * Returns a lighter-weight response with fewer fields per campaign.
   * Useful for listing/overview pages where full campaign data is not needed.
   *
   * @param accountId - Account ID
   *
   * @example
   * ```typescript
   * const { results } = await client.campaigns.listBase('my-account');
   * for (const campaign of results) {
   *   console.log(campaign.name, campaign.status);
   * }
   * ```
   */
  async listBase(accountId: string): Promise<CampaignBaseListResponse> {
    return this.http.get<CampaignBaseListResponse>(`${accountId}/campaigns/base`);
  }

  /**
   * Get a single campaign by ID
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   *
   * @example
   * ```typescript
   * const campaign = await client.campaigns.get('my-account', '12345');
   * console.log(campaign.name, campaign.cpc);
   * ```
   */
  async get(accountId: string, campaignId: string): Promise<Campaign> {
    return this.http.get<Campaign>(`${accountId}/campaigns/${campaignId}`);
  }

  /**
   * Create a new campaign
   *
   * @param accountId - Account ID
   * @param campaign - Campaign data
   *
   * @example
   * ```typescript
   * const campaign = await client.campaigns.create('my-account', {
   *   name: 'My New Campaign',
   *   branding_text: 'My Brand',
   *   cpc: 0.50,
   *   spending_limit: 1000,
   *   spending_limit_model: 'MONTHLY',
   *   marketing_objective: 'DRIVE_WEBSITE_TRAFFIC',
   * });
   * console.log('Created campaign:', campaign.id);
   * ```
   */
  async create(accountId: string, campaign: CreateCampaignRequest): Promise<Campaign> {
    return this.http.post<Campaign>(`${accountId}/campaigns/`, campaign);
  }

  /**
   * Update an existing campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param updates - Fields to update
   *
   * @example
   * ```typescript
   * const campaign = await client.campaigns.update('my-account', '12345', {
   *   cpc: 0.75,
   *   daily_cap: 500,
   * });
   * ```
   */
  async update(
    accountId: string,
    campaignId: string,
    updates: UpdateCampaignRequest
  ): Promise<Campaign> {
    return this.http.post<Campaign>(`${accountId}/campaigns/${campaignId}`, updates);
  }

  /**
   * Delete a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   *
   * @example
   * ```typescript
   * await client.campaigns.delete('my-account', '12345');
   * ```
   */
  async delete(accountId: string, campaignId: string): Promise<void> {
    await this.http.delete(`${accountId}/campaigns/${campaignId}`);
  }

  /**
   * Duplicate a campaign
   *
   * Creates a copy of an existing campaign with a new name.
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID to duplicate
   * @param newName - Name for the new campaign
   *
   * @example
   * ```typescript
   * const newCampaign = await client.campaigns.duplicate(
   *   'my-account',
   *   '12345',
   *   'My Campaign - Copy'
   * );
   * ```
   */
  async duplicate(accountId: string, campaignId: string, newName: string): Promise<Campaign> {
    return this.http.post<Campaign>(`${accountId}/campaigns/${campaignId}/duplicate`, {
      name: newName,
    });
  }

  /**
   * Pause a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   *
   * @example
   * ```typescript
   * await client.campaigns.pause('my-account', '12345');
   * ```
   */
  async pause(accountId: string, campaignId: string): Promise<Campaign> {
    return this.update(accountId, campaignId, { is_active: false });
  }

  /**
   * Unpause (resume) a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   *
   * @example
   * ```typescript
   * await client.campaigns.unpause('my-account', '12345');
   * ```
   */
  async unpause(accountId: string, campaignId: string): Promise<Campaign> {
    return this.update(accountId, campaignId, { is_active: true });
  }

  /**
   * Bulk update multiple campaigns
   *
   * @param accountId - Account ID
   * @param updates - Array of campaign updates
   *
   * @example
   * ```typescript
   * await client.campaigns.bulkUpdate('my-account', {
   *   campaigns: [
   *     { campaign_id: '12345', update: { is_active: false } },
   *     { campaign_id: '12346', update: { is_active: false } },
   *   ],
   * });
   * ```
   */
  async bulkUpdate(
    accountId: string,
    updates: BulkCampaignUpdateRequest
  ): Promise<CampaignListResponse> {
    return this.http.put<CampaignListResponse>(`${accountId}/campaigns/bulk`, updates);
  }

  /**
   * Patch a campaign collection (targeting, bid modifiers, etc.)
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param collection - Collection name (e.g., 'publisher_targeting')
   * @param patches - Patch operations
   *
   * @example
   * ```typescript
   * await client.campaigns.patch('my-account', '12345', 'publisher_targeting', [
   *   { op: 'ADD', path: '/value', value: ['pub-123'] },
   * ]);
   * ```
   */
  async patch(
    accountId: string,
    campaignId: string,
    collection: string,
    patches: CampaignPatchRequest[]
  ): Promise<Campaign> {
    return this.http.patch<Campaign>(`${accountId}/campaigns/${campaignId}/${collection}`, patches);
  }

  /**
   * Get all campaigns across a network
   *
   * @param networkAccountId - Network account ID
   *
   * @example
   * ```typescript
   * const { results } = await client.campaigns.listNetwork('my-network');
   * ```
   */
  async listNetwork(networkAccountId: string): Promise<CampaignListResponse> {
    return this.http.get<CampaignListResponse>(`network/${networkAccountId}/campaigns`);
  }

  /**
   * Estimate campaign reach
   *
   * Get estimated impressions, clicks, and reach for a campaign configuration.
   *
   * @param accountId - Account ID
   * @param params - Targeting and budget parameters
   *
   * @example
   * ```typescript
   * const estimate = await client.campaigns.estimateReach('my-account', {
   *   country_targeting: ['US'],
   *   platform_targeting: ['DESK', 'PHON'],
   *   daily_cap: 100,
   *   cpc: 0.50,
   * });
   * console.log('Estimated clicks:', estimate.estimated_clicks);
   * ```
   */
  async estimateReach(
    accountId: string,
    params: CampaignReachEstimatorRequest
  ): Promise<CampaignReachEstimatorResponse> {
    return this.http.post<CampaignReachEstimatorResponse>(
      `${accountId}/campaigns/reach-estimate`,
      params
    );
  }

  /**
   * Get publisher targeting whitelist for a campaign
   *
   * Returns the list of publishers that are whitelisted for this campaign.
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   *
   * @example
   * ```typescript
   * const whitelist = await client.campaigns.getTargetingWhitelist('my-account', '12345');
   * console.log('Whitelisted publishers:', whitelist.value);
   * ```
   */
  async getTargetingWhitelist(
    accountId: string,
    campaignId: string
  ): Promise<CampaignTargetingCollection> {
    return this.http.get<CampaignTargetingCollection>(
      `${accountId}/campaigns/${campaignId}/targeting/publisher_targeting/whitelist`
    );
  }
}
