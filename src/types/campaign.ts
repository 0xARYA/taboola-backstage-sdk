/**
 * Campaign types for Taboola Backstage API
 */

import type {
  ApprovalState,
  BidStrategy,
  BrandSafetyProvider,
  CampaignStatus,
  CurrencyCode,
  DailyAdDeliveryModel,
  DateString,
  MarketingObjective,
  MultiTargeting,
  PricingModel,
  SpendingLimitModel,
  TargetingValue,
  TrafficAllocationMode,
} from './common.js';

/**
 * Publisher bid modifier entry
 */
export interface PublisherBidModifier {
  /** Publisher ID */
  publisher_id: string;
  /** Bid modifier value (1.0 = no change, 1.5 = +50%, 0.5 = -50%) */
  modifier: number;
}

/**
 * Publisher bid modifier collection
 */
export interface PublisherBidModifierCollection {
  values: PublisherBidModifier[];
}

/**
 * Publisher bid strategy modifier entry
 */
export interface PublisherBidStrategyModifier {
  /** Publisher ID */
  publisher_id: string;
  /** Target CPA for this publisher */
  target_cpa?: number;
}

/**
 * Publisher bid strategy modifier collection
 */
export interface PublisherBidStrategyModifierCollection {
  values: PublisherBidStrategyModifier[];
}

/**
 * External brand safety configuration
 */
export interface ExternalBrandSafety {
  /** Brand safety provider type */
  type: BrandSafetyProvider;
  /** Provider-specific values */
  values: string[];
}

/**
 * Verification pixel configuration
 */
export interface VerificationPixel {
  /** Pixel type */
  type: string;
  /** Pixel URL or code */
  value: string;
}

/**
 * Viewability tag configuration
 */
export interface ViewabilityTag {
  /** Tag type */
  type: string;
  /** Tag value */
  value: string;
}

/**
 * Activity schedule rule for day-parting
 */
export interface ActivityScheduleRule {
  /** Day of week (SUNDAY, MONDAY, etc.) */
  day: string;
  /** Start hour (0-23) */
  from_hour: number;
  /** End hour (0-23) */
  until_hour: number;
}

/**
 * Activity schedule configuration
 */
export interface ActivitySchedule {
  /** Schedule mode */
  mode: 'ALWAYS' | 'CUSTOM';
  /** Schedule rules (only when mode is CUSTOM) */
  rules: ActivityScheduleRule[];
  /** Timezone for the schedule */
  time_zone: string | null;
}

/**
 * Policy review status
 */
export interface PolicyReview {
  /** Rejection reason if rejected */
  reject_reason: string | null;
}

/**
 * Full Campaign object
 */
export interface Campaign {
  /** Unique campaign ID */
  id: string;
  /** Account ID the campaign belongs to */
  advertiser_id: string;
  /** Campaign name */
  name: string;
  /** Branding text shown with ads */
  branding_text: string;
  /** Tracking code appended to URLs */
  tracking_code?: string;
  /** Pricing model */
  pricing_model: PricingModel;
  /** Cost per click */
  cpc: number;
  /** Daily spending cap (0 = no cap) */
  daily_cap: number;
  /** Daily delivery model */
  daily_ad_delivery_model: DailyAdDeliveryModel;
  /** Total spending limit */
  spending_limit: number;
  /** Spending limit period */
  spending_limit_model: SpendingLimitModel;
  /** Target CPA goal */
  cpa_goal: number;
  /** Country targeting */
  country_targeting: TargetingValue;
  /** Sub-country (region) targeting */
  sub_country_targeting: TargetingValue;
  /** DMA targeting (US only) */
  dma_country_targeting?: TargetingValue;
  /** Region targeting */
  region_country_targeting?: TargetingValue;
  /** City targeting */
  city_targeting?: TargetingValue;
  /** Postal code targeting */
  postal_code_targeting: TargetingValue;
  /** Contextual targeting */
  contextual_targeting?: TargetingValue;
  /** Platform targeting */
  platform_targeting: TargetingValue;
  /** Publisher targeting (blocking) */
  publisher_targeting: TargetingValue;
  /** OS targeting */
  os_targeting: TargetingValue;
  /** Connection type targeting */
  connection_type_targeting: TargetingValue;
  /** Browser targeting */
  browser_targeting?: TargetingValue;
  /** Auto publisher targeting */
  auto_publisher_targeting?: TargetingValue;
  /** Publisher bid modifiers */
  publisher_bid_modifier: PublisherBidModifierCollection;
  /** Publisher bid strategy modifiers */
  publisher_bid_strategy_modifiers: PublisherBidStrategyModifierCollection;
  /** Campaign profile ID */
  campaign_profile?: string | null;
  /** Internal comments */
  comments: string;
  /** Total amount spent */
  spent: number;
  /** Bid strategy */
  bid_strategy?: BidStrategy;
  /** @deprecated Use bid_strategy instead */
  bid_type?: string;
  /** Traffic allocation mode */
  traffic_allocation_mode: TrafficAllocationMode;
  /** A/B test end date */
  traffic_allocation_ab_test_end_date?: DateString | null;
  /** External brand safety config */
  external_brand_safety: ExternalBrandSafety;
  /** Campaign start date */
  start_date: DateString | null;
  /** Campaign end date */
  end_date: DateString;
  /** Approval state */
  approval_state: ApprovalState;
  /** Whether campaign is active */
  is_active: boolean;
  /** Campaign status */
  status: CampaignStatus;
  /** Marketplace audience targeting */
  audience_segments_multi_targeting: MultiTargeting;
  /** Custom audience targeting */
  custom_audience_targeting: MultiTargeting;
  /** Marking label targeting */
  marking_label_multi_targeting?: MultiTargeting;
  /** Lookalike audience targeting */
  lookalike_audience_targeting: MultiTargeting;
  /** Contextual segments targeting */
  contextual_segments_targeting?: MultiTargeting;
  /** Marketing objective */
  marketing_objective: MarketingObjective;
  /** Verification pixel config */
  verification_pixel?: VerificationPixel;
  /** Viewability tag config */
  viewability_tag?: ViewabilityTag;
  /** Activity schedule */
  activity_schedule: ActivitySchedule;
  /** Policy review status */
  policy_review: PolicyReview;
  /** Account currency */
  currency?: CurrencyCode;
  /** Campaign type (ReadOnly) */
  type?: string;
  /** Campaign learning/optimization state (ReadOnly) */
  learning_state?: string;
  /** Campaign groups (ReadOnly) */
  campaign_groups?: string[];
  /** Start date in UTC (ReadOnly) */
  start_date_in_utc?: DateString | null;
  /** End date in UTC (ReadOnly) */
  end_date_in_utc?: DateString | null;
}

/**
 * Campaign creation request
 */
export interface CreateCampaignRequest {
  /** Campaign name (required) */
  name: string;
  /** Branding text (required) */
  branding_text: string;
  /** Cost per click */
  cpc?: number;
  /** Spending limit */
  spending_limit?: number;
  /** Spending limit model */
  spending_limit_model?: SpendingLimitModel;
  /** Marketing objective (required) */
  marketing_objective: MarketingObjective;
  /** Daily cap */
  daily_cap?: number;
  /** Daily ad delivery model */
  daily_ad_delivery_model?: DailyAdDeliveryModel;
  /** Bid strategy */
  bid_strategy?: BidStrategy;
  /** CPA goal */
  cpa_goal?: number;
  /** Country targeting */
  country_targeting?: TargetingValue;
  /** Platform targeting */
  platform_targeting?: TargetingValue;
  /** OS targeting */
  os_targeting?: TargetingValue;
  /** Start date */
  start_date?: DateString;
  /** End date */
  end_date?: DateString;
  /** Tracking code */
  tracking_code?: string;
  /** Comments */
  comments?: string;
  /** Traffic allocation mode */
  traffic_allocation_mode?: TrafficAllocationMode;
}

/**
 * Campaign update request
 */
export interface UpdateCampaignRequest {
  /** Campaign name */
  name?: string;
  /** Branding text */
  branding_text?: string;
  /** Cost per click */
  cpc?: number;
  /** Spending limit */
  spending_limit?: number;
  /** Spending limit model */
  spending_limit_model?: SpendingLimitModel;
  /** Daily cap */
  daily_cap?: number;
  /** Daily ad delivery model */
  daily_ad_delivery_model?: DailyAdDeliveryModel;
  /** Bid strategy */
  bid_strategy?: BidStrategy;
  /** CPA goal */
  cpa_goal?: number;
  /** Country targeting */
  country_targeting?: TargetingValue;
  /** Platform targeting */
  platform_targeting?: TargetingValue;
  /** OS targeting */
  os_targeting?: TargetingValue;
  /** Start date */
  start_date?: DateString;
  /** End date */
  end_date?: DateString;
  /** Whether campaign is active */
  is_active?: boolean;
  /** Tracking code */
  tracking_code?: string;
  /** Comments */
  comments?: string;
  /** Activity schedule */
  activity_schedule?: ActivitySchedule;
}

/**
 * Campaign list response
 */
export interface CampaignListResponse {
  results: Campaign[];
  metadata?: {
    total: number;
    count: number;
  };
}

/**
 * Bulk campaign update request item
 */
export interface BulkCampaignUpdate {
  /** Campaign ID to update */
  campaign_id: string;
  /** Fields to update */
  update: UpdateCampaignRequest;
}

/**
 * Bulk campaign update request
 */
export interface BulkCampaignUpdateRequest {
  campaigns: BulkCampaignUpdate[];
}

/**
 * Campaign patch operation
 */
export type PatchOperation = 'ADD' | 'REMOVE' | 'REPLACE';

/**
 * Campaign patch request for collections
 */
export interface CampaignPatchRequest {
  /** Operation type */
  op: PatchOperation;
  /** Path to the field */
  path: string;
  /** Value to set */
  value: unknown;
}

/**
 * Campaign reach estimation request
 */
export interface CampaignReachEstimatorRequest {
  /** Country codes */
  country_targeting?: string[];
  /** Platform types */
  platform_targeting?: string[];
  /** Daily budget */
  daily_cap?: number;
  /** CPC bid */
  cpc?: number;
}

/**
 * Campaign reach estimation response
 */
export interface CampaignReachEstimatorResponse {
  /** Estimated daily impressions */
  estimated_impressions: number;
  /** Estimated daily clicks */
  estimated_clicks: number;
  /** Estimated daily reach */
  estimated_reach: number;
}

/**
 * Partial campaign entity with base fields only
 *
 * Returned by the /campaigns/base endpoint for lighter-weight listing.
 */
export interface CampaignBase {
  /** Unique campaign ID */
  id: string;
  /** Advertiser account ID */
  advertiser_id: string;
  /** Advertiser name */
  advertiser_name?: string;
  /** Advertiser description */
  advertiser_description?: string;
  /** Campaign name */
  name: string;
  /** Branding text */
  branding_text: string;
  /** Policy/approval state */
  policy_state?: string;
  /** Campaign status */
  status: CampaignStatus;
  /** Creation time */
  create_time?: string;
  /** Total amount spent */
  total_spent?: number;
  /** Campaign type */
  type?: string;
  /** Marketing objective */
  marketing_objective?: MarketingObjective;
  /** Campaign groups */
  campaign_groups?: string[];
}

/**
 * Campaign base list response
 */
export interface CampaignBaseListResponse {
  results: CampaignBase[];
  metadata?: {
    total?: number;
    count?: number;
  };
}

/**
 * Campaign targeting collection (e.g., publisher whitelist)
 */
export interface CampaignTargetingCollection {
  type: string;
  value: string[];
  href?: string | null;
}
