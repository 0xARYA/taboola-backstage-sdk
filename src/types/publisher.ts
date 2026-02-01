/**
 * Publisher API Types
 *
 * Types for Taboola Backstage API publisher targeting and blocking.
 */

import type { ListResponse } from './common.js';

/**
 * Publisher information
 */
export interface Publisher {
  site: string;
  site_id: string;
  is_blocked: boolean;
}

/**
 * Response for listing publishers
 */
export type PublisherListResponse = ListResponse<Publisher>;

/**
 * Blocked publisher at account level
 */
export interface BlockedPublisher {
  site: string;
  site_id: string;
}

/**
 * Response for blocked publishers
 */
export interface BlockedPublishersResponse {
  results: BlockedPublisher[];
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
