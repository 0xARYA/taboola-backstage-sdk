/**
 * Publishers API
 *
 * Manage publisher targeting and blocking for Taboola campaigns.
 * Allows listing available publishers and managing blocked publishers
 * at the account level.
 */

import type { HttpClient } from '../utils/http.js';
import type {
  Publisher,
  PublisherListResponse,
  BlockedPublishersResponse,
  UpdateBlockedPublishersRequest,
} from '../types/publisher.js';

/**
 * Publishers API for managing publisher targeting
 */
export class PublishersAPI {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all available publishers for an account
   */
  async list(accountId: string): Promise<Publisher[]> {
    const response = await this.http.get<PublisherListResponse>(`${accountId}/allowed-publishers`);
    return response.results;
  }

  /**
   * Get blocked publishers at the account level
   */
  async getBlocked(accountId: string): Promise<string[]> {
    const response = await this.http.get<BlockedPublishersResponse>(`${accountId}/block-publisher`);
    return response.sites;
  }

  /**
   * Update blocked publishers at the account level
   *
   * This replaces the current list of blocked publishers with the
   * provided list.
   */
  async updateBlocked(
    accountId: string,
    request: UpdateBlockedPublishersRequest
  ): Promise<string[]> {
    const response = await this.http.post<BlockedPublishersResponse>(
      `${accountId}/block-publisher`,
      request
    );
    return response.sites;
  }

  /**
   * Block a single publisher at the account level
   */
  async blockPublisher(accountId: string, site: string): Promise<string[]> {
    const current = await this.getBlocked(accountId);

    if (current.includes(site)) {
      return current; // Already blocked
    }

    return this.updateBlocked(accountId, {
      sites: [...current, site],
    });
  }

  /**
   * Unblock a single publisher at the account level
   */
  async unblockPublisher(accountId: string, site: string): Promise<string[]> {
    const current = await this.getBlocked(accountId);
    const filteredSites = current.filter((s) => s !== site);

    return this.updateBlocked(accountId, {
      sites: filteredSites,
    });
  }

  /**
   * Clear all blocked publishers at the account level
   */
  async clearBlocked(accountId: string): Promise<string[]> {
    return this.updateBlocked(accountId, { sites: [] });
  }
}
