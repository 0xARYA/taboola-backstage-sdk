/**
 * Pixel API Types
 *
 * Types for Taboola Universal Pixel API including
 * conversion rules and custom audience rules.
 */

import type { ListResponse } from './common.js';

// ===== Conversion Rules =====

/**
 * Conversion rule for tracking conversions
 */
export interface ConversionRule {
  id: string;
  display_name: string;
  status: ConversionRuleStatus;
  type: ConversionRuleType;
  include_in_total_conversions: boolean;
  include_in_total_value: boolean;
  category: ConversionCategory | null;
  conversion_window_days: number;
  view_through_window_days: number;
  counting_method: CountingMethod;
  aggregation_type: AggregationType;
  default_conversion_value: number | null;
  conditions: Condition[];
  effect: Effect;
  event_name: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Conversion rule status
 */
export type ConversionRuleStatus = 'ACTIVE' | 'ARCHIVED';

/**
 * Conversion rule type
 */
export type ConversionRuleType = 'EVENT_BASED' | 'URL_BASED' | 'CUSTOM';

/**
 * Conversion category
 */
export type ConversionCategory =
  | 'PURCHASE'
  | 'LEAD'
  | 'SIGN_UP'
  | 'ADD_TO_CART'
  | 'CHECKOUT'
  | 'CONTENT_VIEW'
  | 'SEARCH'
  | 'ADD_PAYMENT_INFO'
  | 'SUBSCRIBE'
  | 'PAGE_VIEW'
  | 'COMPLETE_REGISTRATION'
  | 'OTHER';

/**
 * Counting method for conversions
 */
export type CountingMethod = 'ALL' | 'ONE';

/**
 * Aggregation type for conversion values
 */
export type AggregationType = 'SUM' | 'COUNT';

/**
 * Condition for matching conversions
 */
export interface Condition {
  type: ConditionType;
  operator: ConditionOperator;
  value: string;
  parameter?: string | undefined;
}

/**
 * Condition type
 */
export type ConditionType = 'URL' | 'URL_PARAMETER' | 'EVENT_NAME' | 'EVENT_PARAMETER';

/**
 * Condition operator
 */
export type ConditionOperator =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'CONTAINS'
  | 'NOT_CONTAINS'
  | 'STARTS_WITH'
  | 'ENDS_WITH'
  | 'REGEX';

/**
 * Effect of matching a conversion rule
 */
export interface Effect {
  type: EffectType;
  value: number | null;
  currency: string | null;
  value_parameter: string | null;
}

/**
 * Effect type
 */
export type EffectType = 'FIXED_VALUE' | 'DYNAMIC_VALUE' | 'NO_VALUE';

/**
 * Response for listing conversion rules
 */
export type ConversionRuleListResponse = ListResponse<ConversionRule>;

/**
 * Request to create a conversion rule
 */
export interface CreateConversionRuleRequest {
  display_name: string;
  type: ConversionRuleType;
  include_in_total_conversions?: boolean | undefined;
  include_in_total_value?: boolean | undefined;
  category?: ConversionCategory | undefined;
  conversion_window_days?: number | undefined;
  view_through_window_days?: number | undefined;
  counting_method?: CountingMethod | undefined;
  aggregation_type?: AggregationType | undefined;
  default_conversion_value?: number | undefined;
  conditions: Condition[];
  effect: Effect;
  event_name?: string | undefined;
}

/**
 * Request to update a conversion rule
 */
export interface UpdateConversionRuleRequest {
  display_name?: string | undefined;
  status?: ConversionRuleStatus | undefined;
  include_in_total_conversions?: boolean | undefined;
  include_in_total_value?: boolean | undefined;
  category?: ConversionCategory | undefined;
  conversion_window_days?: number | undefined;
  view_through_window_days?: number | undefined;
  counting_method?: CountingMethod | undefined;
  aggregation_type?: AggregationType | undefined;
  default_conversion_value?: number | undefined;
  conditions?: Condition[] | undefined;
  effect?: Effect | undefined;
}

// ===== Custom Audience Rules =====

/**
 * Custom audience rule for building audiences from pixel data
 */
export interface CustomAudienceRule {
  id: string;
  display_name: string;
  status: CustomAudienceRuleStatus;
  conditions: Condition[];
  ttl_days: number;
  size: number | null;
  created_at: string;
  updated_at: string;
}

/**
 * Custom audience rule status
 */
export type CustomAudienceRuleStatus = 'ACTIVE' | 'PAUSED' | 'ARCHIVED';

/**
 * Response for listing custom audience rules
 */
export type CustomAudienceRuleListResponse = ListResponse<CustomAudienceRule>;

/**
 * Request to create a custom audience rule
 */
export interface CreateCustomAudienceRuleRequest {
  display_name: string;
  conditions: Condition[];
  ttl_days?: number | undefined;
}

/**
 * Request to update a custom audience rule
 */
export interface UpdateCustomAudienceRuleRequest {
  display_name?: string | undefined;
  status?: CustomAudienceRuleStatus | undefined;
  conditions?: Condition[] | undefined;
  ttl_days?: number | undefined;
}

// ===== Conversion Rule with Data =====

/**
 * Conversion rule with additional performance data
 */
export interface ConversionRuleWithData extends ConversionRule {
  conversions_30d: number;
  conversions_value_30d: number;
  last_conversion_at: string | null;
}

/**
 * Response for listing conversion rules with data
 */
export type ConversionRuleWithDataListResponse = ListResponse<ConversionRuleWithData>;
