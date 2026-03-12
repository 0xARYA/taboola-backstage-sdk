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
  DuplicateCampaignRequest,
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
   */
  async listBase(accountId: string): Promise<CampaignBaseListResponse> {
    return this.http.get<CampaignBaseListResponse>(`${accountId}/campaigns/base`);
  }

  /**
   * Get a single campaign by ID
   */
  async get(accountId: string, campaignId: string): Promise<Campaign> {
    return this.http.get<Campaign>(`${accountId}/campaigns/${campaignId}`);
  }

  /**
   * Create a new campaign
   */
  async create(accountId: string, campaign: CreateCampaignRequest): Promise<Campaign> {
    return this.http.post<Campaign>(`${accountId}/campaigns/`, campaign);
  }

  /**
   * Update an existing campaign
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
   */
  async delete(accountId: string, campaignId: string): Promise<void> {
    await this.http.delete(`${accountId}/campaigns/${campaignId}`);
  }

  /**
   * Duplicate a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID to duplicate
   * @param request - Duplication request with optional name and settings
   * @param destinationAccount - Optional destination account ID for cross-account duplication
   */
  async duplicate(
    accountId: string,
    campaignId: string,
    request: DuplicateCampaignRequest,
    destinationAccount?: string
  ): Promise<Campaign> {
    const searchParams = new URLSearchParams();
    if (destinationAccount) {
      searchParams.set('destination_account', destinationAccount);
    }
    const query = searchParams.toString();
    const path = `${accountId}/campaigns/${campaignId}/duplicate${query ? `?${query}` : ''}`;
    return this.http.post<Campaign>(path, request);
  }

  /**
   * Pause a campaign
   */
  async pause(accountId: string, campaignId: string): Promise<Campaign> {
    return this.update(accountId, campaignId, { is_active: false });
  }

  /**
   * Unpause (resume) a campaign
   */
  async unpause(accountId: string, campaignId: string): Promise<Campaign> {
    return this.update(accountId, campaignId, { is_active: true });
  }

  /**
   * Bulk update multiple campaigns
   */
  async bulkUpdate(
    accountId: string,
    updates: BulkCampaignUpdateRequest
  ): Promise<CampaignListResponse> {
    return this.http.put<CampaignListResponse>(`${accountId}/campaigns/bulk`, updates);
  }

  /**
   * Patch a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param patch - Patch operation
   */
  async patch(
    accountId: string,
    campaignId: string,
    patch: CampaignPatchRequest
  ): Promise<Campaign> {
    return this.http.patch<Campaign>(`${accountId}/campaigns/${campaignId}`, patch);
  }

  /**
   * Get all campaigns across a network
   *
   * @param networkAccountId - Network account ID
   */
  async listNetwork(networkAccountId: string): Promise<CampaignBaseListResponse> {
    return this.http.get<CampaignBaseListResponse>(`${networkAccountId}/campaigns/base`);
  }

  /**
   * Estimate campaign reach
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
