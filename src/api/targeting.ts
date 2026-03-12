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
  MarkingLabelsTargeting,
  UpdateMarkingLabelsTargetingRequest,
  LookalikeAudienceTargeting,
  UpdateLookalikeAudienceTargetingRequest,
} from '../types/targeting.js';

/**
 * Targeting API for campaign-level targeting configuration
 */
export class TargetingAPI {
  constructor(private readonly http: HttpClient) {}

  // ===== Postal Code Targeting =====

  /**
   * Get postal code targeting for a campaign
   */
  async getPostalCodes(accountId: string, campaignId: string): Promise<PostalCodeTargeting> {
    return this.http.get<PostalCodeTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/postal_code`
    );
  }

  /**
   * Update postal code targeting for a campaign
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
   */
  async getMarketplaceAudiences(accountId: string, campaignId: string): Promise<AudienceTargeting> {
    return this.http.get<AudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/audience_segments`
    );
  }

  /**
   * Update marketplace audience targeting for a campaign
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
   */
  async getCustomAudiences(accountId: string, campaignId: string): Promise<AudienceTargeting> {
    return this.http.get<AudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/custom_audience`
    );
  }

  /**
   * Update custom audience targeting for a campaign
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
   */
  async getLookalikeAudiences(
    accountId: string,
    campaignId: string
  ): Promise<LookalikeAudienceTargeting> {
    return this.http.get<LookalikeAudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/lookalike_audience`
    );
  }

  /**
   * Update lookalike audience targeting for a campaign
   */
  async updateLookalikeAudiences(
    accountId: string,
    campaignId: string,
    targeting: UpdateLookalikeAudienceTargetingRequest
  ): Promise<LookalikeAudienceTargeting> {
    return this.http.post<LookalikeAudienceTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/lookalike_audience`,
      targeting
    );
  }

  // ===== Contextual Targeting =====

  /**
   * Get contextual targeting for a campaign
   */
  async getContextual(accountId: string, campaignId: string): Promise<ContextualTargeting> {
    return this.http.get<ContextualTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/contextual_segments`
    );
  }

  /**
   * Update contextual targeting for a campaign
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

  // ===== Marking Labels Targeting =====

  /**
   * Get marking labels (pixel retargeting) targeting for a campaign
   */
  async getMarkingLabels(accountId: string, campaignId: string): Promise<MarkingLabelsTargeting> {
    return this.http.get<MarkingLabelsTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/marking_labels`
    );
  }

  /**
   * Update marking labels targeting for a campaign
   */
  async updateMarkingLabels(
    accountId: string,
    campaignId: string,
    targeting: UpdateMarkingLabelsTargetingRequest
  ): Promise<MarkingLabelsTargeting> {
    return this.http.post<MarkingLabelsTargeting>(
      `${accountId}/campaigns/${campaignId}/targeting/marking_labels`,
      targeting
    );
  }
}
