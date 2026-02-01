/**
 * Common types shared across the SDK
 */

/**
 * Targeting type - specifies inclusion/exclusion behavior
 */
export type TargetingType = 'ALL' | 'INCLUDE' | 'EXCLUDE';

/**
 * Generic targeting object used across various targeting fields
 */
export interface TargetingValue<T = string> {
  type: TargetingType;
  value: T[] | null;
  href?: string | null;
}

/**
 * Multi-targeting state for audience segments
 */
export type MultiTargetingState = 'ALL' | 'EXISTS' | 'NOT_EXISTS';

/**
 * Multi-targeting object used for audience targeting
 */
export interface MultiTargeting {
  state: MultiTargetingState;
  value: unknown[] | null;
  href?: string | null;
}

/**
 * Pagination parameters for list endpoints
 */
export interface PaginationParams {
  page?: number;
  page_size?: number;
}

/**
 * Standard list response wrapper
 */
export interface ListResponse<T> {
  results: T[];
  metadata?: {
    total?: number;
    count?: number;
  };
}

/**
 * Date string in YYYY-MM-DD format
 */
export type DateString = string;

/**
 * Currency codes (ISO 4217)
 * Common values: USD, EUR, GBP, JPY, AUD, CAD
 */
export type CurrencyCode = string;

/**
 * Approval states for campaigns and items
 */
export type ApprovalState = 'APPROVED' | 'PENDING' | 'REJECTED';

/**
 * Status values for campaigns
 */
export type CampaignStatus =
  | 'RUNNING'
  | 'PAUSED'
  | 'PENDING_APPROVAL'
  | 'REJECTED'
  | 'FROZEN'
  | 'PENDING_START_DATE'
  | 'EXPIRED'
  | 'TERMINATED'
  | 'DEPLETED'
  | 'DEPLETED_MONTHLY';

/**
 * Status values for items
 */
export type ItemStatus =
  | 'RUNNING'
  | 'CRAWLING'
  | 'CRAWLING_ERROR'
  | 'NEED_TO_EDIT'
  | 'PAUSED'
  | 'STOPPED'
  | 'PENDING_APPROVAL'
  | 'REJECTED';

/**
 * Pricing models
 */
export type PricingModel = 'CPC' | 'CPM' | 'VCPM' | 'CPV' | 'CPA';

/**
 * Spending limit models
 */
export type SpendingLimitModel = 'MONTHLY' | 'ENTIRE' | 'DAILY' | 'NONE';

/**
 * Daily ad delivery models
 */
export type DailyAdDeliveryModel = 'ACCELERATED' | 'BALANCED' | 'STRICT';

/**
 * Marketing objectives
 */
export type MarketingObjective =
  | 'DRIVE_WEBSITE_TRAFFIC'
  | 'BRAND_AWARENESS'
  | 'DRIVE_PURCHASES'
  | 'GENERATE_LEADS'
  | 'DRIVE_APP_INSTALLS'
  | 'MAX_CONVERSIONS';

/**
 * Bid strategies
 */
export type BidStrategy =
  | 'FIXED'
  | 'SMART'
  | 'TARGET_CPA'
  | 'MAX_CONVERSIONS'
  | 'TARGET_ROAS';

/**
 * Traffic allocation modes
 */
export type TrafficAllocationMode = 'OPTIMIZED' | 'EVEN';

/**
 * Platform types
 */
export type PlatformType = 'DESK' | 'PHON' | 'TBLT';

/**
 * Connection types
 */
export type ConnectionType = 'WIFI' | 'CELLULAR';

/**
 * Operating systems
 */
export type OperatingSystem = 'WINDOWS' | 'MACOSX' | 'LINUX' | 'IOS' | 'ANDROID';

/**
 * Call-to-action button types
 */
export type CTAType =
  | 'NONE'
  | 'APPLY_NOW'
  | 'BOOK_NOW'
  | 'CONTACT_US'
  | 'DOWNLOAD'
  | 'GET_OFFER'
  | 'GET_QUOTE'
  | 'INSTALL'
  | 'LEARN_MORE'
  | 'ORDER_NOW'
  | 'PLAY_NOW'
  | 'READ_MORE'
  | 'SEE_MORE'
  | 'SHOP_NOW'
  | 'SIGN_UP'
  | 'SUBSCRIBE'
  | 'WATCH_MORE';

/**
 * Item types
 */
export type ItemType = 'ITEM' | 'RSS' | 'RSS_CHILD' | 'VIDEO';

/**
 * External brand safety providers
 */
export type BrandSafetyProvider = 'IAS' | 'DV' | 'MOAT' | 'NONE';

/**
 * Report dimension types
 */
export type ReportDimension =
  | 'day'
  | 'week'
  | 'month'
  | 'campaign'
  | 'campaign_day'
  | 'campaign_week'
  | 'campaign_month'
  | 'site'
  | 'site_day'
  | 'country'
  | 'country_day'
  | 'platform'
  | 'platform_day'
  | 'browser'
  | 'browser_day'
  | 'os_family'
  | 'os_family_day'
  | 'item_breakdown';
