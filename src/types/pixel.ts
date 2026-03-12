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
  id: number;
  display_name: string;
  advertiser_id: string;
  type: ConversionRuleType;
  status: ConversionRuleStatus;
  event_name: string | null;
  category: ConversionCategory | null;
  description: string | null;
  look_back_window: number;
  view_through_look_back_window: number | null;
  condition: ConversionCondition;
  effects: ConversionEffect[];
  include_in_total_conversions: boolean;
  exclude_from_campaigns: boolean;
  last_modified_by: string;
  last_modified_at: string;
}

/**
 * Conversion rule status
 */
export type ConversionRuleStatus = 'ACTIVE' | 'DISABLED' | 'ARCHIVED';

/**
 * Conversion rule type
 *
 * - BASIC: URL-based conversion rules using the condition object
 * - EVENT_BASED: Custom event-based rules using event_name
 */
export type ConversionRuleType = 'BASIC' | 'EVENT_BASED';

/**
 * Conversion category
 */
export type ConversionCategory =
  | 'VIEW_CONTENT'
  | 'SEARCH'
  | 'ADD_TO_CART'
  | 'ADD_TO_WISHLIST'
  | 'START_CHECKOUT'
  | 'ADD_PAYMENT_INFO'
  | 'MAKE_PURCHASE'
  | 'LEAD'
  | 'COMPLETE_REGISTRATION'
  | 'APP_INSTALL'
  | 'OTHER';

/**
 * Condition for matching conversions (tree structure)
 *
 * For a single condition, property/predicate/value are set directly.
 * For multiple conditions, the parent has predicate 'OR' and individual
 * conditions are in the children array.
 */
export interface ConversionCondition {
  property: string | null;
  predicate: ConversionConditionPredicate;
  value: string | null;
  children: ConversionCondition[];
}

/**
 * Condition predicate
 */
export type ConversionConditionPredicate =
  | 'CONTAINS'
  | 'EQUALS'
  | 'OR';

/**
 * Effect of matching a conversion rule
 */
export interface ConversionEffect {
  type: string;
  data: string;
}

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
  event_name?: string | undefined;
  category?: ConversionCategory | undefined;
  description?: string | undefined;
  look_back_window?: number | undefined;
  view_through_look_back_window?: number | undefined;
  condition?: ConversionCondition | undefined;
  effects?: ConversionEffect[] | undefined;
  include_in_total_conversions?: boolean | undefined;
  exclude_from_campaigns?: boolean | undefined;
}

/**
 * Request to update a conversion rule
 *
 * Note: type and advertiser_id are final and cannot be changed after creation.
 */
export interface UpdateConversionRuleRequest {
  display_name?: string | undefined;
  status?: ConversionRuleStatus | undefined;
  category?: ConversionCategory | undefined;
  description?: string | undefined;
  look_back_window?: number | undefined;
  view_through_look_back_window?: number | undefined;
  condition?: ConversionCondition | undefined;
  effects?: ConversionEffect[] | undefined;
  include_in_total_conversions?: boolean | undefined;
  exclude_from_campaigns?: boolean | undefined;
}

// ===== Custom Audience Rules =====

/**
 * Custom audience rule for building audiences from pixel data
 */
export interface CustomAudienceRule {
  id: string;
  display_name: string;
  status: CustomAudienceRuleStatus;
  conditions: CustomAudienceCondition[];
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
 * Condition for custom audience rules
 */
export interface CustomAudienceCondition {
  type: CustomAudienceConditionType;
  operator: CustomAudienceConditionOperator;
  value: string;
  parameter?: string | undefined;
}

/**
 * Custom audience condition type
 */
export type CustomAudienceConditionType = 'URL' | 'URL_PARAMETER' | 'EVENT_NAME' | 'EVENT_PARAMETER';

/**
 * Custom audience condition operator
 */
export type CustomAudienceConditionOperator =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'CONTAINS'
  | 'NOT_CONTAINS'
  | 'STARTS_WITH'
  | 'ENDS_WITH'
  | 'REGEX';

/**
 * Response for listing custom audience rules
 */
export type CustomAudienceRuleListResponse = ListResponse<CustomAudienceRule>;

/**
 * Request to create a custom audience rule
 */
export interface CreateCustomAudienceRuleRequest {
  display_name: string;
  conditions: CustomAudienceCondition[];
  ttl_days?: number | undefined;
}

/**
 * Request to update a custom audience rule
 */
export interface UpdateCustomAudienceRuleRequest {
  display_name?: string | undefined;
  status?: CustomAudienceRuleStatus | undefined;
  conditions?: CustomAudienceCondition[] | undefined;
  ttl_days?: number | undefined;
}

// ===== Conversion Rule with Data =====

/**
 * Conversion rule wrapped with performance data
 *
 * Returned by the /data endpoint which wraps each rule
 * with last_received and total_received metrics.
 */
export interface ConversionRuleWithData {
  last_received: string | null;
  total_received: number;
  unip_conversion_rule: ConversionRule;
}

/**
 * Response for listing conversion rules with data
 */
export type ConversionRuleWithDataListResponse = ListResponse<ConversionRuleWithData>;
