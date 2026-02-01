/**
 * Reports API
 *
 * Access Taboola Backstage reporting data including Campaign Summary,
 * Top Campaign Content, and Realtime reports.
 */

import type { HttpClient } from '../utils/http.js';
import type { ReportDimension } from '../types/common.js';
import type {
  CampaignSummaryReport,
  CampaignSummaryReportParams,
  TopCampaignContentReport,
  TopCampaignContentReportParams,
  RealtimeCampaignReport,
  RealtimeAdsReport,
  RealtimeReportParams,
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
   * The Realtime Campaign report shows current day performance metrics
   * for campaigns, updated frequently throughout the day.
   *
   * @param accountId - Account ID
   * @param params - Optional filter parameters
   * @returns Realtime campaign report
   *
   * @example
   * ```typescript
   * const report = await client.reports.realtimeCampaign('my-account');
   * console.log(`Data as of: ${report.timestamp}`);
   *
   * for (const campaign of report.results) {
   *   console.log(`${campaign.campaign_name}: ${campaign.clicks} clicks today`);
   * }
   * ```
   */
  async realtimeCampaign(
    accountId: string,
    params?: RealtimeReportParams
  ): Promise<RealtimeCampaignReport> {
    const searchParams = new URLSearchParams();

    if (params?.campaign) {
      searchParams.set('campaign', params.campaign);
    }

    const queryString = searchParams.toString();
    const path = `${accountId}/reports/realtime/campaign-summary`;
    const url = queryString ? `${path}?${queryString}` : path;

    return this.http.get<RealtimeCampaignReport>(url);
  }

  /**
   * Get Realtime Ads Report
   *
   * The Realtime Ads report shows current day performance metrics
   * for individual items (ads), updated frequently throughout the day.
   *
   * @param accountId - Account ID
   * @param params - Optional filter parameters
   * @returns Realtime ads report
   *
   * @example
   * ```typescript
   * const report = await client.reports.realtimeAds('my-account');
   * console.log(`Data as of: ${report.timestamp}`);
   *
   * for (const ad of report.results) {
   *   console.log(`${ad.item_name}: ${ad.clicks} clicks, ${ad.impressions} impressions`);
   * }
   * ```
   */
  async realtimeAds(
    accountId: string,
    params?: RealtimeReportParams
  ): Promise<RealtimeAdsReport> {
    const searchParams = new URLSearchParams();

    if (params?.campaign) {
      searchParams.set('campaign', params.campaign);
    }

    const queryString = searchParams.toString();
    const path = `${accountId}/reports/realtime/ads`;
    const url = queryString ? `${path}?${queryString}` : path;

    return this.http.get<RealtimeAdsReport>(url);
  }
}
