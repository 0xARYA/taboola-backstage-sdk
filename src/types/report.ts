/**
 * Report API Types
 *
 * Types for Taboola Backstage API reporting including
 * Campaign Summary, Top Campaign Content, and Realtime reports.
 */

import type { ReportDimension } from './common.js';

/**
 * Common report parameters
 */
export interface BaseReportParams {
  start_date: string;
  end_date: string;
}

/**
 * Campaign Summary Report parameters
 */
export interface CampaignSummaryReportParams extends BaseReportParams {
  /** Filter by specific campaign ID */
  campaign?: string | undefined;
  /** Filter by specific site (publisher) */
  site?: string | undefined;
  /** Filter by country code */
  country?: string | undefined;
  /** Filter by platform */
  platform?: string | undefined;
  /** Include custom conversion columns (comma-separated rule names or 'all') */
  include_conversions?: string | undefined;
}

/**
 * Top Campaign Content Report parameters
 */
export interface TopCampaignContentReportParams extends BaseReportParams {
  /** Filter by specific campaign ID */
  campaign?: string | undefined;
  /** Limit number of results */
  limit?: number | undefined;
  /** Include custom conversion columns */
  include_conversions?: string | undefined;
}

/**
 * Realtime Report parameters
 */
export interface RealtimeReportParams {
  /** Filter by specific campaign ID */
  campaign?: string | undefined;
}

/**
 * Campaign Summary Report response
 */
export interface CampaignSummaryReport {
  'last-used-rawdata-update-time': string;
  'last-used-rawdata-update-time-gmt-millisec': number;
  timezone: string;
  results: CampaignSummaryRow[];
  recordCount: number;
  metadata: ReportMetadata;
}

/**
 * Campaign summary report row
 */
export interface CampaignSummaryRow {
  /** Date of the data (for day/week/month dimensions) */
  date?: string | undefined;
  date_end_period?: string | undefined;
  /** Campaign ID (for campaign dimension) */
  campaign?: string | undefined;
  campaign_name?: string | undefined;
  /** Site name (for site dimension) */
  site?: string | undefined;
  site_id?: string | undefined;
  /** Country code (for country dimension) */
  country?: string | undefined;
  /** Platform (for platform dimension) */
  platform?: string | undefined;
  /** Number of clicks */
  clicks: number;
  /** Number of impressions */
  impressions: number;
  /** Number of visible impressions */
  visible_impressions: number;
  /** Total spend */
  spent: number;
  /** Click-through rate */
  ctr: number;
  /** Visible click-through rate */
  vctr: number;
  /** Cost per thousand impressions */
  cpm: number;
  /** Visible cost per thousand impressions */
  vcpm: number;
  /** Cost per click */
  cpc: number;
  /** Number of campaigns */
  campaigns_num?: number | undefined;
  /** Currency code */
  currency: string;
  /** Total conversion value */
  conversions_value: number;
  /** Return on ad spend */
  roas: number;
  /** Cost per action (all) */
  cpa: number;
  /** CPA from clicks */
  cpa_clicks: number;
  /** CPA from views */
  cpa_views: number;
  /** Number of conversion actions */
  cpa_actions_num: number;
  /** Actions from clicks */
  cpa_actions_num_from_clicks: number;
  /** Actions from views */
  cpa_actions_num_from_views: number;
  /** Conversion rate (all) */
  cpa_conversion_rate: number;
  /** Conversion rate from clicks */
  cpa_conversion_rate_clicks: number;
  /** Conversion rate from views */
  cpa_conversion_rate_views: number;
  /** Custom conversion columns (dynamic based on include_conversions) */
  [key: string]: unknown;
}

/**
 * Top Campaign Content Report response
 */
export interface TopCampaignContentReport {
  'last-used-rawdata-update-time': string;
  'last-used-rawdata-update-time-gmt-millisec': number;
  timezone: string;
  results: TopCampaignContentRow[];
  recordCount: number;
  metadata: ReportMetadata;
}

/**
 * Top campaign content report row
 */
export interface TopCampaignContentRow {
  /** Item ID */
  item: string;
  item_name: string;
  /** Thumbnail URL */
  thumbnail_url: string;
  /** Campaign ID */
  campaign: string;
  campaign_name: string;
  /** Metrics */
  clicks: number;
  impressions: number;
  visible_impressions: number;
  spent: number;
  ctr: number;
  vctr: number;
  cpm: number;
  vcpm: number;
  cpc: number;
  currency: string;
  conversions_value: number;
  roas: number;
  cpa: number;
  cpa_actions_num: number;
  cpa_conversion_rate: number;
  /** Custom conversion columns */
  [key: string]: unknown;
}

/**
 * Realtime Campaign Report response
 */
export interface RealtimeCampaignReport {
  timestamp: string;
  results: RealtimeCampaignRow[];
}

/**
 * Realtime campaign report row
 */
export interface RealtimeCampaignRow {
  campaign: string;
  campaign_name: string;
  status: string;
  clicks: number;
  impressions: number;
  spent: number;
  ctr: number;
  cpc: number;
  conversions: number;
  currency: string;
}

/**
 * Realtime Ads Report response
 */
export interface RealtimeAdsReport {
  timestamp: string;
  results: RealtimeAdsRow[];
}

/**
 * Realtime ads report row
 */
export interface RealtimeAdsRow {
  item: string;
  item_name: string;
  campaign: string;
  campaign_name: string;
  status: string;
  clicks: number;
  impressions: number;
  spent: number;
  ctr: number;
  cpc: number;
  conversions: number;
  currency: string;
}

/**
 * Report metadata
 */
export interface ReportMetadata {
  total: number;
  count: number;
  static_fields: ReportField[];
}

/**
 * Report field definition
 */
export interface ReportField {
  id: string;
  format: string | null;
  data_type: ReportDataType;
}

/**
 * Report data type
 */
export type ReportDataType = 'DATE' | 'STRING' | 'NUMERIC' | 'CURRENCY' | 'PERCENTAGE';

/**
 * Re-export ReportDimension for convenience
 */
export type { ReportDimension };
