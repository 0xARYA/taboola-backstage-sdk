/**
 * Report API Types
 *
 * Types for Taboola Backstage API reporting including
 * Campaign Summary, Top Campaign Content, and Realtime reports.
 */

import type { ReportDimension, RealtimeCampaignDimension, RealtimeAdsDimension } from './common.js';

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
  /** Include multi-conversion data */
  include_multi_conversions?: boolean | undefined;
  /** Filter by partner name */
  partner_name?: string | undefined;
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
 * Realtime Campaign Report parameters
 *
 * Dates use datetime format: e.g. '2023-03-28T00:00:00'
 */
export interface RealtimeCampaignReportParams {
  /** Start datetime, e.g. '2023-03-28T00:00:00' */
  start_date: string;
  /** End datetime, e.g. '2023-03-28T23:59:59' */
  end_date: string;
  /** 1 or more numeric Campaign IDs, comma-separated. E.g. '101,102,103' */
  campaign?: string | undefined;
  /** 1 or more platform enums, comma-separated. Possible values: DESK, PHON, TBLT */
  platform?: string | undefined;
  /** 1 or more 2-letter ISO-3166 country codes, comma-separated */
  country?: string | undefined;
  /** 1 or more numeric Site IDs (publisher Account IDs), comma-separated */
  site_id?: string | undefined;
  /** If true, returns additional campaign columns for by_campaign dimension (limited to 1,000 rows) */
  fetch_config?: boolean | undefined;
}

/**
 * Realtime Ads Report parameters
 *
 * Dates use datetime format: e.g. '2023-03-28T00:00:00'
 */
export interface RealtimeAdsReportParams {
  /** Start datetime, e.g. '2023-03-28T00:00:00' */
  start_date: string;
  /** End datetime, e.g. '2023-03-28T23:59:59' */
  end_date: string;
  /** 1 or more numeric Item IDs (Ad IDs), comma-separated. E.g. '1001,1002,1003' */
  item: string;
  /** 1 or more numeric Campaign IDs, comma-separated */
  campaign?: string | undefined;
  /** 1 or more platform enums, comma-separated. Possible values: DESK, PHON, TBLT */
  platform?: string | undefined;
  /** 1 or more 2-letter ISO-3166 country codes, comma-separated */
  country?: string | undefined;
  /** 1 or more numeric Site IDs (publisher Account IDs), comma-separated */
  site_id?: string | undefined;
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
  /** Hour of day (for by_hour_of_day dimension) */
  hour_of_day?: string | undefined;
  /** Campaign ID (for campaign dimension) */
  campaign?: string | undefined;
  campaign_name?: string | undefined;
  /** Content provider (for content_provider_breakdown dimension) */
  content_provider?: string | undefined;
  content_provider_name?: string | undefined;
  /** Site name (for site dimension) */
  site?: string | undefined;
  site_name?: string | undefined;
  site_id?: string | undefined;
  /** Country code (for country dimension) */
  country?: string | undefined;
  country_name?: string | undefined;
  /** Region (for region_breakdown dimension) */
  region?: string | undefined;
  /** DMA (for dma_breakdown dimension) */
  dma?: string | undefined;
  /** Platform (for platform dimension) */
  platform?: string | undefined;
  platform_name?: string | undefined;
  /** Blocking level */
  blocking_level?: string | undefined;
  /** Number of clicks */
  clicks: number;
  /** Number of impressions */
  impressions: number;
  /** Number of visible impressions */
  visible_impressions: number;
  /** Impression percentage */
  impressions_pct?: string | undefined;
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
  /** Partner name (for user_segment_breakdown dimension) */
  partner_name?: string | undefined;
  /** Audience name (for user_segment_breakdown dimension) */
  audience_name?: string | undefined;
  /** Data partner audience ID (for user_segment_breakdown dimension) */
  data_partner_audience_id?: string | undefined;
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
  /** Landing page URL */
  url: string;
  /** Campaign ID */
  campaign: string;
  campaign_name: string;
  /** Content provider (publisher) */
  content_provider?: string | undefined;
  content_provider_name?: string | undefined;
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
  /** Number of conversion actions */
  actions: number;
  /** Conversion rate */
  cvr: number;
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
  'last-used-rawdata-update-time': string;
  'last-used-rawdata-update-time-gmt-millisec': number;
  timezone: string;
  results: RealtimeCampaignRow[];
  recordCount: number;
  metadata: ReportMetadata;
}

/**
 * Realtime campaign report row
 *
 * Fields present depend on the chosen dimension.
 */
export interface RealtimeCampaignRow {
  /** Hour (for by_hour dimensions) */
  hour?: string | undefined;
  /** Campaign ID (for by_campaign dimensions) */
  campaign?: string | undefined;
  campaign_name?: string | undefined;
  /** Site name (for by_site dimensions) */
  site?: string | undefined;
  site_id?: string | undefined;
  /** Country code (for by_country dimensions) */
  country?: string | undefined;
  /** Platform (for by_platform dimensions) */
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
  /** Currency code */
  currency: string;
  /** Number of conversion actions */
  cpa_actions_num: number;
  /** Conversion rate */
  cpa_conversion_rate: number;
  /** Cost per action */
  cpa: number;
  /** Dynamic fields (e.g. from fetch_config) */
  [key: string]: unknown;
}

/**
 * Realtime Ads Report response
 */
export interface RealtimeAdsReport {
  'last-used-rawdata-update-time': string;
  'last-used-rawdata-update-time-gmt-millisec': number;
  timezone: string;
  results: RealtimeAdsRow[];
  recordCount: number;
  metadata: ReportMetadata;
}

/**
 * Realtime ads report row
 */
export interface RealtimeAdsRow {
  /** Item (ad) ID */
  item: string;
  item_name: string;
  /** Thumbnail URL */
  thumbnail_url: string;
  /** Campaign ID */
  campaign: string;
  campaign_name: string;
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
  /** Currency code */
  currency: string;
  /** Number of conversion actions */
  cpa_actions_num: number;
  /** Conversion rate */
  cpa_conversion_rate: number;
  /** Cost per action */
  cpa: number;
  /** Dynamic fields */
  [key: string]: unknown;
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
 * Re-export dimension types for convenience
 */
export type { RealtimeAdsDimension, RealtimeCampaignDimension, ReportDimension };
