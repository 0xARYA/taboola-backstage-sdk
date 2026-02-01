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
  BlockedPublisher,
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
   *
   * @param accountId - Account ID
   * @returns List of publishers with blocking status
   *
   * @example
   * ```typescript
   * const publishers = await client.publishers.list('my-account');
   * console.log(`Found ${publishers.length} publishers`);
   * ```
   */
  async list(accountId: string): Promise<Publisher[]> {
    const response = await this.http.get<PublisherListResponse>(
      `${accountId}/publishers`
    );
    return response.results;
  }

  /**
   * Get blocked publishers at the account level
   *
   * @param accountId - Account ID
   * @returns List of blocked publishers
   *
   * @example
   * ```typescript
   * const blocked = await client.publishers.getBlocked('my-account');
   * console.log(`${blocked.length} publishers blocked at account level`);
   * ```
   */
  async getBlocked(accountId: string): Promise<BlockedPublisher[]> {
    const response = await this.http.get<BlockedPublishersResponse | BlockedPublisher[]>(
      `${accountId}/block-publisher`
    );
    // Handle both array and object response formats
    if (Array.isArray(response)) {
      return response;
    }
    // Defensive fallback for unexpected API responses
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return response.results ?? [];
  }

  /**
   * Update blocked publishers at the account level
   *
   * This replaces the current list of blocked publishers with the
   * provided list. To add to existing blocks, first get the current
   * list and append.
   *
   * @param accountId - Account ID
   * @param sites - Array of site names to block
   * @returns Updated list of blocked publishers
   *
   * @example
   * ```typescript
   * // Block specific publishers
   * await client.publishers.updateBlocked('my-account', {
   *   sites: ['site1.com', 'site2.com']
   * });
   *
   * // Add to existing blocks
   * const current = await client.publishers.getBlocked('my-account');
   * const currentSites = current.map(p => p.site);
   * await client.publishers.updateBlocked('my-account', {
   *   sites: [...currentSites, 'newsite.com']
   * });
   * ```
   */
  async updateBlocked(
    accountId: string,
    request: UpdateBlockedPublishersRequest
  ): Promise<BlockedPublisher[]> {
    const response = await this.http.post<BlockedPublishersResponse>(
      `${accountId}/block-publisher`,
      request
    );
    return response.results;
  }

  /**
   * Block a single publisher at the account level
   *
   * Convenience method that adds a publisher to the existing block list.
   *
   * @param accountId - Account ID
   * @param site - Site name to block
   * @returns Updated list of blocked publishers
   */
  async blockPublisher(accountId: string, site: string): Promise<BlockedPublisher[]> {
    const current = await this.getBlocked(accountId);
    const currentSites = current.map((p) => p.site);

    if (currentSites.includes(site)) {
      return current; // Already blocked
    }

    return this.updateBlocked(accountId, {
      sites: [...currentSites, site],
    });
  }

  /**
   * Unblock a single publisher at the account level
   *
   * Convenience method that removes a publisher from the block list.
   *
   * @param accountId - Account ID
   * @param site - Site name to unblock
   * @returns Updated list of blocked publishers
   */
  async unblockPublisher(accountId: string, site: string): Promise<BlockedPublisher[]> {
    const current = await this.getBlocked(accountId);
    const filteredSites = current
      .map((p) => p.site)
      .filter((s) => s !== site);

    return this.updateBlocked(accountId, {
      sites: filteredSites,
    });
  }

  /**
   * Clear all blocked publishers at the account level
   *
   * @param accountId - Account ID
   * @returns Empty list
   */
  async clearBlocked(accountId: string): Promise<BlockedPublisher[]> {
    return this.updateBlocked(accountId, { sites: [] });
  }
}
