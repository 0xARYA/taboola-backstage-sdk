/**
 * Targeting API
 *
 * Manage campaign-level targeting including postal codes,
 * audience segments (marketplace, custom, lookalike), and
 * contextual targeting.
 */

import type { HttpClient } from '../utils/http.js';
import type {
  PostalCodeTargeting,
  UpdatePostalCodeTargetingRequest,
  AudienceTargeting,
  UpdateAudienceTargetingRequest,
  ContextualTargeting,
  UpdateContextualTargetingRequest,
  FirstPartyAudienceTargeting,
  UpdateFirstPartyAudienceTargetingRequest,
} from '../types/targeting.js';

/**
 * Targeting API for campaign-level targeting configuration
 */
export class TargetingAPI {
  constructor(private readonly http: HttpClient) {}

  // ===== Postal Code Targeting =====

  /**
   * Get postal code targeting for a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @returns Postal code targeting configuration
   *
   * @example
   * ```typescript
   * const targeting = await client.targeting.getPostalCodes('my-account', '12345');
   * console.log(`Targeting type: ${targeting.type}`);
   * console.log(`Postal codes: ${targeting.values.length}`);
   * ```
   */
  async getPostalCodes(
    accountId: string,
    campaignId: string
  ): Promise<PostalCodeTargeting> {
    return this.http.get<PostalCodeTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/postal_code`
    );
  }

  /**
   * Update postal code targeting for a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param targeting - Postal code targeting configuration
   * @returns Updated targeting configuration
   *
   * @example
   * ```typescript
   * await client.targeting.updatePostalCodes('my-account', '12345', {
   *   type: 'INCLUDE',
   *   values: [
   *     { postal_code: '10001', country: 'US' },
   *     { postal_code: '10002', country: 'US' },
   *   ]
   * });
   * ```
   */
  async updatePostalCodes(
    accountId: string,
    campaignId: string,
    targeting: UpdatePostalCodeTargetingRequest
  ): Promise<PostalCodeTargeting> {
    return this.http.post<PostalCodeTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/postal_code`,
      targeting
    );
  }

  // ===== Marketplace Audience Targeting =====

  /**
   * Get marketplace audience targeting for a campaign
   *
   * Marketplace audiences are third-party audience segments
   * available for targeting through Taboola's marketplace.
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @returns Audience targeting configuration
   */
  async getMarketplaceAudiences(
    accountId: string,
    campaignId: string
  ): Promise<AudienceTargeting> {
    return this.http.get<AudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/audience_segments`
    );
  }

  /**
   * Update marketplace audience targeting for a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param targeting - Audience targeting configuration
   * @returns Updated targeting configuration
   *
   * @example
   * ```typescript
   * await client.targeting.updateMarketplaceAudiences('my-account', '12345', {
   *   type: 'INCLUDE',
   *   collection: [
   *     { id: 'segment-1', name: null },
   *     { id: 'segment-2', name: null },
   *   ]
   * });
   * ```
   */
  async updateMarketplaceAudiences(
    accountId: string,
    campaignId: string,
    targeting: UpdateAudienceTargetingRequest
  ): Promise<AudienceTargeting> {
    return this.http.post<AudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/audience_segments`,
      targeting
    );
  }

  // ===== Custom Audience Targeting =====

  /**
   * Get custom audience targeting for a campaign
   *
   * Custom audiences are audiences created from pixel data
   * or uploaded lists.
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @returns Audience targeting configuration
   */
  async getCustomAudiences(
    accountId: string,
    campaignId: string
  ): Promise<AudienceTargeting> {
    return this.http.get<AudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/custom_audience`
    );
  }

  /**
   * Update custom audience targeting for a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param targeting - Audience targeting configuration
   * @returns Updated targeting configuration
   */
  async updateCustomAudiences(
    accountId: string,
    campaignId: string,
    targeting: UpdateAudienceTargetingRequest
  ): Promise<AudienceTargeting> {
    return this.http.post<AudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/custom_audience`,
      targeting
    );
  }

  // ===== Lookalike Audience Targeting =====

  /**
   * Get lookalike audience targeting for a campaign
   *
   * Lookalike audiences are modeled after your existing
   * custom audiences to find similar users.
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @returns Audience targeting configuration
   */
  async getLookalikeAudiences(
    accountId: string,
    campaignId: string
  ): Promise<AudienceTargeting> {
    return this.http.get<AudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/lookalike_audience`
    );
  }

  /**
   * Update lookalike audience targeting for a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param targeting - Audience targeting configuration
   * @returns Updated targeting configuration
   */
  async updateLookalikeAudiences(
    accountId: string,
    campaignId: string,
    targeting: UpdateAudienceTargetingRequest
  ): Promise<AudienceTargeting> {
    return this.http.post<AudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/lookalike_audience`,
      targeting
    );
  }

  // ===== Contextual Targeting =====

  /**
   * Get contextual targeting for a campaign
   *
   * Contextual targeting allows you to target based on the
   * content of the pages where your ads appear.
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @returns Contextual targeting configuration
   */
  async getContextual(
    accountId: string,
    campaignId: string
  ): Promise<ContextualTargeting> {
    return this.http.get<ContextualTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/contextual_segments`
    );
  }

  /**
   * Update contextual targeting for a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param targeting - Contextual targeting configuration
   * @returns Updated targeting configuration
   *
   * @example
   * ```typescript
   * await client.targeting.updateContextual('my-account', '12345', {
   *   type: 'INCLUDE',
   *   collection: [
   *     { id: 'context-1', name: null },
   *     { id: 'context-2', name: null },
   *   ]
   * });
   * ```
   */
  async updateContextual(
    accountId: string,
    campaignId: string,
    targeting: UpdateContextualTargetingRequest
  ): Promise<ContextualTargeting> {
    return this.http.post<ContextualTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/contextual_segments`,
      targeting
    );
  }

  // ===== First Party Audience Targeting =====

  /**
   * Get first party audience targeting for a campaign
   *
   * First party audiences are your own uploaded audience data.
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @returns First party audience targeting configuration
   */
  async getFirstPartyAudiences(
    accountId: string,
    campaignId: string
  ): Promise<FirstPartyAudienceTargeting> {
    return this.http.get<FirstPartyAudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/my_audiences`
    );
  }

  /**
   * Update first party audience targeting for a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param targeting - First party audience targeting configuration
   * @returns Updated targeting configuration
   */
  async updateFirstPartyAudiences(
    accountId: string,
    campaignId: string,
    targeting: UpdateFirstPartyAudienceTargetingRequest
  ): Promise<FirstPartyAudienceTargeting> {
    return this.http.post<FirstPartyAudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/my_audiences`,
      targeting
    );
  }
}
