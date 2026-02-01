/**
 * Combined Audiences API
 *
 * Manage combined audiences that combine multiple audience types
 * (custom, lookalike, marketplace, first-party) with AND/OR logic.
 */

import type { HttpClient } from '../utils/http.js';
import type {
  CombinedAudience,
  CombinedAudienceListResponse,
  CreateCombinedAudienceRequest,
  UpdateCombinedAudienceRequest,
  AvailableAudience,
  AvailableAudiencesResponse,
} from '../types/audience.js';

/**
 * Combined Audiences API for managing combined audiences
 */
export class CombinedAudiencesAPI {
  constructor(private readonly http: HttpClient) {}

  /**
   * List available audiences for combining
   *
   * Returns all audiences that can be used in combined audience rules,
   * including custom, lookalike, marketplace, and first-party audiences.
   *
   * @param accountId - Account ID
   * @returns List of available audiences
   *
   * @example
   * ```typescript
   * const available = await client.combinedAudiences.listAvailable('my-account');
   * console.log(`${available.length} audiences available for combining`);
   * ```
   */
  async listAvailable(accountId: string): Promise<AvailableAudience[]> {
    const response = await this.http.get<AvailableAudiencesResponse>(
      `${accountId}/combined-audiences/available`
    );
    return response.results;
  }

  /**
   * List all combined audiences
   *
   * @param accountId - Account ID
   * @returns List of combined audiences
   *
   * @example
   * ```typescript
   * const audiences = await client.combinedAudiences.list('my-account');
   * for (const audience of audiences) {
   *   console.log(`${audience.name}: ${audience.status}`);
   * }
   * ```
   */
  async list(accountId: string): Promise<CombinedAudience[]> {
    const response = await this.http.get<CombinedAudienceListResponse>(
      `${accountId}/combined-audiences`
    );
    return response.results;
  }

  /**
   * Get a single combined audience
   *
   * @param accountId - Account ID
   * @param audienceId - Combined audience ID
   * @returns Combined audience details
   */
  async get(accountId: string, audienceId: string): Promise<CombinedAudience> {
    return this.http.get<CombinedAudience>(
      `${accountId}/combined-audiences/${audienceId}`
    );
  }

  /**
   * Create a combined audience
   *
   * @param accountId - Account ID
   * @param audience - Combined audience configuration
   * @returns Created combined audience
   *
   * @example
   * ```typescript
   * const audience = await client.combinedAudiences.create('my-account', {
   *   name: 'High-Value Engaged Users',
   *   description: 'Users who are both high-value and engaged',
   *   include_rules: [
   *     {
   *       audience_type: 'CUSTOM_AUDIENCE',
   *       audiences: [{ id: 'custom-1', name: null }]
   *     },
   *     {
   *       audience_type: 'LOOKALIKE_AUDIENCE',
   *       audiences: [{ id: 'lookalike-1', name: null }]
   *     }
   *   ],
   *   exclude_rules: [
   *     {
   *       audience_type: 'CUSTOM_AUDIENCE',
   *       audiences: [{ id: 'converters', name: null }]
   *     }
   *   ]
   * });
   * ```
   */
  async create(
    accountId: string,
    audience: CreateCombinedAudienceRequest
  ): Promise<CombinedAudience> {
    return this.http.post<CombinedAudience>(
      `${accountId}/combined-audiences`,
      audience
    );
  }

  /**
   * Update a combined audience
   *
   * @param accountId - Account ID
   * @param audienceId - Combined audience ID
   * @param updates - Fields to update
   * @returns Updated combined audience
   */
  async update(
    accountId: string,
    audienceId: string,
    updates: UpdateCombinedAudienceRequest
  ): Promise<CombinedAudience> {
    return this.http.post<CombinedAudience>(
      `${accountId}/combined-audiences/${audienceId}`,
      updates
    );
  }
}
