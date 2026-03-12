/**
 * Account types for Taboola Backstage API
 */

import type { CurrencyCode, ListResponse } from './common.js';

/**
 * Partner types
 */
export type PartnerType = 'PUBLISHER' | 'ADVERTISER';

/**
 * Account types
 */
export type AccountType = 'PARTNER' | 'NETWORK';

/**
 * Campaign types available to account
 */
export type CampaignType = 'PAID' | 'VIDEO';

/**
 * Account details response
 */
export interface Account {
  /** Numeric account ID */
  id: number;
  /** Account display name */
  name: string;
  /** Alphabetic account ID used in API paths */
  account_id: string;
  /** Types of partnerships */
  partner_types: PartnerType[];
  /** Account type */
  type: AccountType;
  /** Available campaign types */
  campaign_types: CampaignType[];
  /** Account currency */
  currency: CurrencyCode;
  /** Account time zone name */
  time_zone_name?: string;
}

/**
 * Advertiser account in network
 */
export interface AdvertiserAccount {
  /** Numeric account ID */
  id: number;
  /** Account display name */
  name: string;
  /** Alphabetic account ID */
  account_id: string;
  /** Partner types */
  partner_types: PartnerType[];
  /** Account type */
  type: AccountType;
  /** Campaign types */
  campaign_types: CampaignType[];
  /** Account currency */
  currency: CurrencyCode;
  /** Account time zone name */
  time_zone_name?: string;
}

/**
 * Response for allowed accounts list
 */
export type AllowedAccountsResponse = ListResponse<Account>;

/**
 * Response for network advertisers list
 */
export type NetworkAdvertisersResponse = ListResponse<AdvertiserAccount>;
