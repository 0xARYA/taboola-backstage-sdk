/**
 * Shared Budget types for Taboola Backstage API
 */

import type {
  CampaignStatus,
  DailyAdDeliveryModel,
  DateString,
  MarketingObjective,
  SpendingLimitModel,
} from './common.js';

/**
 * Campaign attribute within a shared budget, showing source and value
 */
export interface SharedBudgetCampaignAttribute<T = number> {
  /** Source of the value (e.g., 'CAMPAIGN' or 'SHARED_BUDGET') */
  source: string;
  /** The attribute value */
  value: T;
}

/**
 * Campaign entry within a shared budget
 */
export interface SharedBudgetCampaign {
  /** Campaign ID */
  id: string;
  /** Campaign name */
  name: string;
  /** Campaign status */
  status: CampaignStatus;
  /** Spending limit (may be inherited from shared budget) */
  spending_limit?: SharedBudgetCampaignAttribute;
  /** Daily cap (may be inherited from shared budget) */
  daily_cap?: SharedBudgetCampaignAttribute;
}

/**
 * Full Shared Budget object
 */
export interface SharedBudget {
  /** Unique shared budget ID (ReadOnly) */
  id: string;
  /** Shared budget name */
  name: string;
  /** Status (ReadOnly) */
  status?: string;
  /** Marketing objective */
  marketing_objective: MarketingObjective;
  /** Start date */
  start_date?: DateString | null;
  /** Start date in UTC (ReadOnly) */
  start_date_in_utc?: DateString | null;
  /** End date */
  end_date?: DateString | null;
  /** End date in UTC (ReadOnly) */
  end_date_in_utc?: DateString | null;
  /** Spending limit model */
  spending_limit_model: SpendingLimitModel;
  /** Spending limit amount */
  spending_limit: number;
  /** Daily spending cap */
  daily_cap?: number;
  /** Daily ad delivery model */
  daily_ad_delivery_model?: DailyAdDeliveryModel;
  /** Whether the shared budget is active */
  is_active?: boolean;
  /** Campaigns in this shared budget */
  campaigns?: SharedBudgetCampaign[];
}

/**
 * Shared budget base (partial) entity
 */
export interface SharedBudgetBase {
  /** Shared budget ID */
  id: string;
  /** Shared budget name */
  name: string;
  /** Status */
  status?: string;
}

/**
 * Shared budget list response
 */
export interface SharedBudgetBaseListResponse {
  results: SharedBudgetBase[];
  metadata?: {
    total?: number;
    count?: number;
  };
}

/**
 * Create shared budget request
 */
export interface CreateSharedBudgetRequest {
  /** Shared budget name (required) */
  name: string;
  /** Marketing objective (required) */
  marketing_objective: MarketingObjective;
  /** Spending limit model (required) */
  spending_limit_model: SpendingLimitModel;
  /** Spending limit amount (required) */
  spending_limit: number;
  /** Start date */
  start_date?: DateString;
  /** End date */
  end_date?: DateString;
  /** Daily spending cap */
  daily_cap?: number;
  /** Daily ad delivery model */
  daily_ad_delivery_model?: DailyAdDeliveryModel;
  /** Whether the shared budget is active */
  is_active?: boolean;
  /** Campaigns to include */
  campaigns?: SharedBudgetCampaign[];
}

/**
 * Update shared budget request
 */
export interface UpdateSharedBudgetRequest {
  /** Shared budget name */
  name?: string;
  /** Spending limit model */
  spending_limit_model?: SpendingLimitModel;
  /** Spending limit amount */
  spending_limit?: number;
  /** Start date */
  start_date?: DateString;
  /** End date */
  end_date?: DateString;
  /** Daily spending cap */
  daily_cap?: number;
  /** Daily ad delivery model */
  daily_ad_delivery_model?: DailyAdDeliveryModel;
  /** Whether the shared budget is active */
  is_active?: boolean;
  /** Campaigns to include */
  campaigns?: SharedBudgetCampaign[];
}
