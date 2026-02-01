/**
 * Pixel API
 *
 * Manage Taboola Universal Pixel conversion rules and custom audience rules.
 * Conversion rules track conversions on your site, while custom audience
 * rules build retargeting audiences based on pixel events.
 */

import type { HttpClient } from '../utils/http.js';
import type {
  ConversionRule,
  ConversionRuleListResponse,
  CreateConversionRuleRequest,
  UpdateConversionRuleRequest,
  CustomAudienceRule,
  CustomAudienceRuleListResponse,
  CreateCustomAudienceRuleRequest,
  UpdateCustomAudienceRuleRequest,
  ConversionRuleWithData,
  ConversionRuleWithDataListResponse,
} from '../types/pixel.js';

/**
 * Pixel API for managing conversion and custom audience rules
 */
export class PixelAPI {
  constructor(private readonly http: HttpClient) {}

  // ===== Conversion Rules =====

  /**
   * List all conversion rules
   *
   * @param accountId - Account ID
   * @returns List of conversion rules
   *
   * @example
   * ```typescript
   * const rules = await client.pixel.listConversionRules('my-account');
   * for (const rule of rules) {
   *   console.log(`${rule.display_name}: ${rule.status}`);
   * }
   * ```
   */
  async listConversionRules(accountId: string): Promise<ConversionRule[]> {
    const response = await this.http.get<ConversionRuleListResponse>(
      `${accountId}/universal_pixel/conversion_rule`
    );
    return response.results;
  }

  /**
   * Get a single conversion rule
   *
   * @param accountId - Account ID
   * @param ruleId - Conversion rule ID
   * @returns Conversion rule details
   */
  async getConversionRule(
    accountId: string,
    ruleId: string
  ): Promise<ConversionRule> {
    return this.http.get<ConversionRule>(
      `${accountId}/universal_pixel/conversion_rule/${ruleId}`
    );
  }

  /**
   * List conversion rules with performance data
   *
   * Returns conversion rules with additional data like 30-day conversion
   * counts and values.
   *
   * @param accountId - Account ID
   * @returns List of conversion rules with data
   */
  async listConversionRulesWithData(
    accountId: string
  ): Promise<ConversionRuleWithData[]> {
    const response = await this.http.get<ConversionRuleWithDataListResponse>(
      `${accountId}/universal_pixel/conversion_rule/data`
    );
    return response.results;
  }

  /**
   * Create a conversion rule
   *
   * @param accountId - Account ID
   * @param rule - Conversion rule configuration
   * @returns Created conversion rule
   *
   * @example
   * ```typescript
   * // URL-based conversion rule
   * const rule = await client.pixel.createConversionRule('my-account', {
   *   display_name: 'Purchase Completed',
   *   type: 'URL_BASED',
   *   category: 'PURCHASE',
   *   conditions: [
   *     {
   *       type: 'URL',
   *       operator: 'CONTAINS',
   *       value: '/thank-you'
   *     }
   *   ],
   *   effect: {
   *     type: 'DYNAMIC_VALUE',
   *     value: null,
   *     currency: 'USD',
   *     value_parameter: 'order_total'
   *   },
   *   conversion_window_days: 30,
   *   view_through_window_days: 1
   * });
   *
   * // Event-based conversion rule
   * const eventRule = await client.pixel.createConversionRule('my-account', {
   *   display_name: 'Add to Cart',
   *   type: 'EVENT_BASED',
   *   category: 'ADD_TO_CART',
   *   event_name: 'add_to_cart',
   *   conditions: [],
   *   effect: {
   *     type: 'FIXED_VALUE',
   *     value: 10,
   *     currency: 'USD',
   *     value_parameter: null
   *   }
   * });
   * ```
   */
  async createConversionRule(
    accountId: string,
    rule: CreateConversionRuleRequest
  ): Promise<ConversionRule> {
    return this.http.post<ConversionRule>(
      `${accountId}/universal_pixel/conversion_rule`,
      rule
    );
  }

  /**
   * Update a conversion rule
   *
   * @param accountId - Account ID
   * @param ruleId - Conversion rule ID
   * @param updates - Fields to update
   * @returns Updated conversion rule
   */
  async updateConversionRule(
    accountId: string,
    ruleId: string,
    updates: UpdateConversionRuleRequest
  ): Promise<ConversionRule> {
    return this.http.post<ConversionRule>(
      `${accountId}/universal_pixel/conversion_rule/${ruleId}`,
      updates
    );
  }

  /**
   * Archive a conversion rule
   *
   * Archived rules stop tracking conversions but remain in the account
   * for historical reporting.
   *
   * @param accountId - Account ID
   * @param ruleId - Conversion rule ID
   * @returns Archived conversion rule
   */
  async archiveConversionRule(
    accountId: string,
    ruleId: string
  ): Promise<ConversionRule> {
    return this.updateConversionRule(accountId, ruleId, { status: 'ARCHIVED' });
  }

  /**
   * Unarchive a conversion rule
   *
   * Reactivates an archived conversion rule.
   *
   * @param accountId - Account ID
   * @param ruleId - Conversion rule ID
   * @returns Reactivated conversion rule
   */
  async unarchiveConversionRule(
    accountId: string,
    ruleId: string
  ): Promise<ConversionRule> {
    return this.updateConversionRule(accountId, ruleId, { status: 'ACTIVE' });
  }

  // ===== Custom Audience Rules =====

  /**
   * List all custom audience rules
   *
   * Custom audience rules build retargeting audiences based on pixel
   * events and page visits.
   *
   * @param accountId - Account ID
   * @returns List of custom audience rules
   *
   * @example
   * ```typescript
   * const rules = await client.pixel.listCustomAudienceRules('my-account');
   * for (const rule of rules) {
   *   console.log(`${rule.display_name}: ${rule.size} users`);
   * }
   * ```
   */
  async listCustomAudienceRules(accountId: string): Promise<CustomAudienceRule[]> {
    const response = await this.http.get<CustomAudienceRuleListResponse>(
      `${accountId}/universal_pixel/custom_audience_rule`
    );
    return response.results;
  }

  /**
   * Get a single custom audience rule
   *
   * @param accountId - Account ID
   * @param ruleId - Custom audience rule ID
   * @returns Custom audience rule details
   */
  async getCustomAudienceRule(
    accountId: string,
    ruleId: string
  ): Promise<CustomAudienceRule> {
    return this.http.get<CustomAudienceRule>(
      `${accountId}/universal_pixel/custom_audience_rule/${ruleId}`
    );
  }

  /**
   * Create a custom audience rule
   *
   * @param accountId - Account ID
   * @param rule - Custom audience rule configuration
   * @returns Created custom audience rule
   *
   * @example
   * ```typescript
   * // All visitors audience
   * const allVisitors = await client.pixel.createCustomAudienceRule('my-account', {
   *   display_name: 'All Visitors - 30 Days',
   *   conditions: [],
   *   ttl_days: 30
   * });
   *
   * // Product page visitors
   * const productViewers = await client.pixel.createCustomAudienceRule('my-account', {
   *   display_name: 'Product Page Viewers',
   *   conditions: [
   *     {
   *       type: 'URL',
   *       operator: 'CONTAINS',
   *       value: '/products/'
   *     }
   *   ],
   *   ttl_days: 14
   * });
   *
   * // Cart abandoners
   * const cartAbandoners = await client.pixel.createCustomAudienceRule('my-account', {
   *   display_name: 'Cart Abandoners',
   *   conditions: [
   *     {
   *       type: 'EVENT_NAME',
   *       operator: 'EQUALS',
   *       value: 'add_to_cart'
   *     }
   *   ],
   *   ttl_days: 7
   * });
   * ```
   */
  async createCustomAudienceRule(
    accountId: string,
    rule: CreateCustomAudienceRuleRequest
  ): Promise<CustomAudienceRule> {
    return this.http.post<CustomAudienceRule>(
      `${accountId}/universal_pixel/custom_audience_rule`,
      rule
    );
  }

  /**
   * Update a custom audience rule
   *
   * @param accountId - Account ID
   * @param ruleId - Custom audience rule ID
   * @param updates - Fields to update
   * @returns Updated custom audience rule
   */
  async updateCustomAudienceRule(
    accountId: string,
    ruleId: string,
    updates: UpdateCustomAudienceRuleRequest
  ): Promise<CustomAudienceRule> {
    return this.http.post<CustomAudienceRule>(
      `${accountId}/universal_pixel/custom_audience_rule/${ruleId}`,
      updates
    );
  }

  /**
   * Pause a custom audience rule
   *
   * Paused rules stop adding new users but retain existing audience members.
   *
   * @param accountId - Account ID
   * @param ruleId - Custom audience rule ID
   * @returns Paused custom audience rule
   */
  async pauseCustomAudienceRule(
    accountId: string,
    ruleId: string
  ): Promise<CustomAudienceRule> {
    return this.updateCustomAudienceRule(accountId, ruleId, { status: 'PAUSED' });
  }

  /**
   * Resume a paused custom audience rule
   *
   * @param accountId - Account ID
   * @param ruleId - Custom audience rule ID
   * @returns Resumed custom audience rule
   */
  async resumeCustomAudienceRule(
    accountId: string,
    ruleId: string
  ): Promise<CustomAudienceRule> {
    return this.updateCustomAudienceRule(accountId, ruleId, { status: 'ACTIVE' });
  }

  /**
   * Archive a custom audience rule
   *
   * Archived rules stop building and the audience becomes inaccessible
   * for targeting.
   *
   * @param accountId - Account ID
   * @param ruleId - Custom audience rule ID
   * @returns Archived custom audience rule
   */
  async archiveCustomAudienceRule(
    accountId: string,
    ruleId: string
  ): Promise<CustomAudienceRule> {
    return this.updateCustomAudienceRule(accountId, ruleId, { status: 'ARCHIVED' });
  }
}
