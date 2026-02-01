/**
 * First Party Audiences API
 *
 * Manage first party audience onboarding, allowing you to upload
 * your own customer data (email, phone, device IDs) for targeting.
 */

import type { HttpClient } from '../utils/http.js';
import type {
  FirstPartyAudience,
  CreateFirstPartyAudienceRequest,
  AddRemoveUsersRequest,
  AddRemoveUsersResponse,
} from '../types/audience.js';
import type { ListResponse } from '../types/common.js';

/**
 * First Party Audiences API for audience onboarding
 */
export class FirstPartyAudiencesAPI {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all first party audiences
   *
   * @param accountId - Account ID
   * @returns List of first party audiences
   *
   * @example
   * ```typescript
   * const audiences = await client.firstPartyAudiences.list('my-account');
   * for (const audience of audiences) {
   *   console.log(`${audience.name}: ${audience.status} (${audience.size} users)`);
   * }
   * ```
   */
  async list(accountId: string): Promise<FirstPartyAudience[]> {
    const response = await this.http.get<ListResponse<FirstPartyAudience>>(
      `${accountId}/audience-onboarding/first-party-audiences`
    );
    return response.results;
  }

  /**
   * Get a single first party audience
   *
   * @param accountId - Account ID
   * @param audienceId - Audience ID
   * @returns First party audience details
   */
  async get(accountId: string, audienceId: string): Promise<FirstPartyAudience> {
    return this.http.get<FirstPartyAudience>(
      `${accountId}/audience-onboarding/first-party-audiences/${audienceId}`
    );
  }

  /**
   * Create a first party audience
   *
   * After creation, use addUsers() to populate the audience with identifiers.
   *
   * @param accountId - Account ID
   * @param audience - Audience configuration
   * @returns Created audience
   *
   * @example
   * ```typescript
   * const audience = await client.firstPartyAudiences.create('my-account', {
   *   name: 'High-Value Customers',
   *   description: 'Customers with LTV > $1000',
   *   source_type: 'CRM',
   *   ttl_days: 90
   * });
   *
   * // Then add users
   * await client.firstPartyAudiences.addUsers('my-account', audience.id, {
   *   add: [
   *     { identifier_type: 'EMAIL_SHA256', identifier_value: 'sha256hash1' },
   *     { identifier_type: 'EMAIL_SHA256', identifier_value: 'sha256hash2' },
   *   ]
   * });
   * ```
   */
  async create(
    accountId: string,
    audience: CreateFirstPartyAudienceRequest
  ): Promise<FirstPartyAudience> {
    return this.http.post<FirstPartyAudience>(
      `${accountId}/audience-onboarding/first-party-audiences`,
      audience
    );
  }

  /**
   * Add or remove users from a first party audience
   *
   * Users are identified by hashed identifiers (email, phone, device ID).
   * It's recommended to use SHA256 hashed values for privacy.
   *
   * @param accountId - Account ID
   * @param audienceId - Audience ID
   * @param request - Add/remove request with user identifiers
   * @returns Operation result with counts
   *
   * @example
   * ```typescript
   * // Add users
   * const result = await client.firstPartyAudiences.addUsers('my-account', 'audience-1', {
   *   add: [
   *     { identifier_type: 'EMAIL_SHA256', identifier_value: 'sha256hash1' },
   *     { identifier_type: 'EMAIL_SHA256', identifier_value: 'sha256hash2' },
   *   ]
   * });
   * console.log(`Added ${result.added_count} users`);
   *
   * // Remove users
   * const result2 = await client.firstPartyAudiences.addUsers('my-account', 'audience-1', {
   *   remove: [
   *     { identifier_type: 'EMAIL_SHA256', identifier_value: 'sha256hash3' },
   *   ]
   * });
   * console.log(`Removed ${result2.removed_count} users`);
   * ```
   */
  async addUsers(
    accountId: string,
    audienceId: string,
    request: AddRemoveUsersRequest
  ): Promise<AddRemoveUsersResponse> {
    return this.http.post<AddRemoveUsersResponse>(
      `${accountId}/audience-onboarding/first-party-audiences/${audienceId}/add-remove`,
      request
    );
  }

  /**
   * Remove users from a first party audience
   *
   * Convenience method that wraps addUsers with only remove operations.
   *
   * @param accountId - Account ID
   * @param audienceId - Audience ID
   * @param request - Remove request with user identifiers
   * @returns Operation result with counts
   */
  async removeUsers(
    accountId: string,
    audienceId: string,
    request: Pick<AddRemoveUsersRequest, 'remove'>
  ): Promise<AddRemoveUsersResponse> {
    return this.addUsers(accountId, audienceId, request);
  }
}
