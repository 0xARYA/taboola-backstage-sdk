/**
 * Reports API
 *
 * Access Taboola Backstage reporting data including Campaign Summary,
 * Top Campaign Content, and Realtime reports.
 */

import type { HttpClient } from '../utils/http.js';
import type { RealtimeAdsDimension, RealtimeCampaignDimension, ReportDimension } from '../types/common.js';
import type {
  CampaignSummaryReport,
  CampaignSummaryReportParams,
  RealtimeAdsReport,
  RealtimeAdsReportParams,
  RealtimeCampaignReport,
  RealtimeCampaignReportParams,
  TopCampaignContentReport,
  TopCampaignContentReportParams,
} from '../types/report.js';

/**
 * Reports API for accessing reporting data
 */
export class ReportsAPI {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get Campaign Summary Report
   *
   * The Campaign Summary report provides aggregated performance metrics
   * across various dimensions like day, week, month, campaign, site, etc.
   *
   * @param accountId - Account ID
   * @param dimension - Report dimension (day, week, month, campaign, site, etc.)
   * @param params - Report parameters including date range and filters
   * @returns Campaign summary report with metrics
   *
   * @example
   * ```typescript
   * // Daily report for last 30 days
   * const report = await client.reports.campaignSummary('my-account', 'day', {
   *   start_date: '2024-01-01',
   *   end_date: '2024-01-31',
   * });
   *
   * for (const row of report.results) {
   *   console.log(`${row.date}: ${row.clicks} clicks, $${row.spent} spent`);
   * }
   *
   * // Campaign-level report with conversion data
   * const campaignReport = await client.reports.campaignSummary('my-account', 'campaign', {
   *   start_date: '2024-01-01',
   *   end_date: '2024-01-31',
   *   include_conversions: 'all',
   * });
   *
   * // Filtered by specific campaign
   * const filteredReport = await client.reports.campaignSummary('my-account', 'day', {
   *   start_date: '2024-01-01',
   *   end_date: '2024-01-31',
   *   campaign: '12345',
   * });
   * ```
   */
  async campaignSummary(
    accountId: string,
    dimension: ReportDimension,
    params: CampaignSummaryReportParams
  ): Promise<CampaignSummaryReport> {
    const searchParams = new URLSearchParams();
    searchParams.set('start_date', params.start_date);
    searchParams.set('end_date', params.end_date);

    if (params.campaign) {
      searchParams.set('campaign', params.campaign);
    }
    if (params.site) {
      searchParams.set('site', params.site);
    }
    if (params.country) {
      searchParams.set('country', params.country);
    }
    if (params.platform) {
      searchParams.set('platform', params.platform);
    }
    if (params.include_conversions) {
      searchParams.set('include_conversions', params.include_conversions);
    }
    if (params.include_multi_conversions !== undefined) {
      searchParams.set('include_multi_conversions', String(params.include_multi_conversions));
    }
    if (params.partner_name) {
      searchParams.set('partner_name', params.partner_name);
    }

    return this.http.get<CampaignSummaryReport>(
      `${accountId}/reports/campaign-summary/dimensions/${dimension}?${searchParams.toString()}`
    );
  }

  /**
   * Get Top Campaign Content Report
   *
   * The Top Campaign Content report shows performance metrics for individual
   * items (ads) across campaigns.
   *
   * @param accountId - Account ID
   * @param params - Report parameters including date range and filters
   * @returns Top campaign content report with item metrics
   *
   * @example
   * ```typescript
   * const report = await client.reports.topCampaignContent('my-account', {
   *   start_date: '2024-01-01',
   *   end_date: '2024-01-31',
   *   limit: 100,
   * });
   *
   * for (const item of report.results) {
   *   console.log(`${item.item_name}: ${item.clicks} clicks, CTR: ${item.ctr}%`);
   * }
   * ```
   */
  async topCampaignContent(
    accountId: string,
    params: TopCampaignContentReportParams
  ): Promise<TopCampaignContentReport> {
    const searchParams = new URLSearchParams();
    searchParams.set('start_date', params.start_date);
    searchParams.set('end_date', params.end_date);

    if (params.campaign) {
      searchParams.set('campaign', params.campaign);
    }
    if (params.limit !== undefined) {
      searchParams.set('limit', String(params.limit));
    }
    if (params.include_conversions) {
      searchParams.set('include_conversions', params.include_conversions);
    }

    return this.http.get<TopCampaignContentReport>(
      `${accountId}/reports/top-campaign-content/dimensions/item_breakdown?${searchParams.toString()}`
    );
  }

  /**
   * Get Realtime Campaign Report
   *
   * Provides performance data for campaigns in (near) real time.
   * Metrics and amounts are not accurate for billing.
   *
   * Rate limit: 10 requests per minute (429 returned if exceeded).
   *
   * @param accountId - Account ID
   * @param dimension - Report dimension (e.g. 'by_hour', 'by_campaign')
   * @param params - Report parameters including date range and filters
   * @returns Realtime campaign report
   *
   * @example
   * ```typescript
   * const report = await client.reports.realtimeCampaign('my-account', 'by_campaign', {
   *   start_date: '2024-01-15T00:00:00',
   *   end_date: '2024-01-15T23:59:59',
   * });
   *
   * for (const row of report.results) {
   *   console.log(`${row.campaign_name}: ${row.clicks} clicks, $${row.spent} spent`);
   * }
   *
   * // With filters
   * const filtered = await client.reports.realtimeCampaign('my-account', 'by_hour', {
   *   start_date: '2024-01-15T00:00:00',
   *   end_date: '2024-01-15T23:59:59',
   *   campaign: '101,102',
   *   platform: 'DESK,PHON',
   *   country: 'US',
   * });
   * ```
   */
  async realtimeCampaign(
    accountId: string,
    dimension: RealtimeCampaignDimension,
    params: RealtimeCampaignReportParams
  ): Promise<RealtimeCampaignReport> {
    const searchParams = new URLSearchParams();
    searchParams.set('start_date', params.start_date);
    searchParams.set('end_date', params.end_date);

    if (params.campaign) {
      searchParams.set('campaign', params.campaign);
    }
    if (params.platform) {
      searchParams.set('platform', params.platform);
    }
    if (params.country) {
      searchParams.set('country', params.country);
    }
    if (params.site_id) {
      searchParams.set('site_id', params.site_id);
    }
    if (params.fetch_config !== undefined) {
      searchParams.set('fetch_config', String(params.fetch_config));
    }

    return this.http.get<RealtimeCampaignReport>(
      `${accountId}/reports/realtime-campaign-summary/dimensions/${dimension}?${searchParams.toString()}`
    );
  }

  /**
   * Get Realtime Ads Report (Top Campaign Content)
   *
   * Provides performance data for ads in (near) real time.
   * Metrics and amounts are not accurate for billing.
   *
   * Rate limit: 10 requests per minute (429 returned if exceeded).
   *
   * @param accountId - Account ID
   * @param dimension - Report dimension ('by_item' or 'by_item_by_smallest_time_bucket')
   * @param params - Report parameters including date range, item IDs, and filters
   * @returns Realtime ads report
   *
   * @example
   * ```typescript
   * const report = await client.reports.realtimeAds('my-account', 'by_item', {
   *   start_date: '2024-01-15T00:00:00',
   *   end_date: '2024-01-15T23:59:59',
   *   item: '1001,1002,1003',
   * });
   *
   * for (const row of report.results) {
   *   console.log(`${row.item_name}: ${row.clicks} clicks, ${row.impressions} impressions`);
   * }
   * ```
   */
  async realtimeAds(
    accountId: string,
    dimension: RealtimeAdsDimension,
    params: RealtimeAdsReportParams
  ): Promise<RealtimeAdsReport> {
    const searchParams = new URLSearchParams();
    searchParams.set('start_date', params.start_date);
    searchParams.set('end_date', params.end_date);
    searchParams.set('item', params.item);

    if (params.campaign) {
      searchParams.set('campaign', params.campaign);
    }
    if (params.platform) {
      searchParams.set('platform', params.platform);
    }
    if (params.country) {
      searchParams.set('country', params.country);
    }
    if (params.site_id) {
      searchParams.set('site_id', params.site_id);
    }

    return this.http.get<RealtimeAdsReport>(
      `${accountId}/reports/realtime-top-campaign-content/dimensions/${dimension}?${searchParams.toString()}`
    );
  }
}
