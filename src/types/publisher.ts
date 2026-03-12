/**
 * Publisher API Types
 *
 * Types for Taboola Backstage API publisher targeting and blocking.
 */

import type { CurrencyCode, ListResponse } from './common.js';

/**
 * Publisher information
 */
export interface Publisher {
  id: number;
  name: string;
  account_id: string;
  partner_types?: string[];
  type?: string;
  campaign_types?: string[];
  currency?: CurrencyCode;
  time_zone_name?: string;
}

/**
 * Response for listing publishers
 */
export type PublisherListResponse = ListResponse<Publisher>;

/**
 * Response for blocked publishers
 */
export interface BlockedPublishersResponse {
  sites: string[];
}

/**
 * Request to update blocked publishers at account level
 */
export interface UpdateBlockedPublishersRequest {
  sites: string[];
}

/**
 * Publisher bid modifier
 */
export interface PublisherBidModifierItem {
  site: string;
  cpc_modification: number;
}

/**
 * Publisher targeting patch operation
 */
export interface PublisherTargetingPatch {
  op: 'add' | 'remove' | 'replace';
  path: string;
  value: string | string[] | number;
}
