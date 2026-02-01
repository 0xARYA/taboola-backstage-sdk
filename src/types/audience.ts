/**
 * Audience API Types
 *
 * Types for Combined Audiences and First Party Audience Onboarding.
 */

import type { ListResponse } from './common.js';

// ===== Combined Audiences =====

/**
 * Combined audience - combines multiple audience types with AND/OR logic
 */
export interface CombinedAudience {
  id: string;
  name: string;
  description: string | null;
  status: CombinedAudienceStatus;
  created_at: string;
  updated_at: string;
  include_rules: CombinedAudienceRule[];
  exclude_rules: CombinedAudienceRule[];
}

/**
 * Combined audience status
 */
export type CombinedAudienceStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

/**
 * Rule within a combined audience
 */
export interface CombinedAudienceRule {
  audience_type: CombinedAudienceType;
  audiences: CombinedAudienceItem[];
}

/**
 * Type of audience in a combined audience rule
 */
export type CombinedAudienceType =
  | 'CUSTOM_AUDIENCE'
  | 'LOOKALIKE_AUDIENCE'
  | 'MARKETPLACE_AUDIENCE'
  | 'FIRST_PARTY_AUDIENCE';

/**
 * Individual audience item in a rule
 */
export interface CombinedAudienceItem {
  id: string;
  name: string | null;
}

/**
 * Response for listing combined audiences
 */
export type CombinedAudienceListResponse = ListResponse<CombinedAudience>;

/**
 * Request to create a combined audience
 */
export interface CreateCombinedAudienceRequest {
  name: string;
  description?: string | undefined;
  include_rules: CombinedAudienceRule[];
  exclude_rules?: CombinedAudienceRule[] | undefined;
}

/**
 * Request to update a combined audience
 */
export interface UpdateCombinedAudienceRequest {
  name?: string | undefined;
  description?: string | undefined;
  include_rules?: CombinedAudienceRule[] | undefined;
  exclude_rules?: CombinedAudienceRule[] | undefined;
}

/**
 * Available audience for combined audience creation
 */
export interface AvailableAudience {
  id: string;
  name: string;
  type: CombinedAudienceType;
  size: number | null;
  status: string;
}

/**
 * Response for listing available audiences
 */
export type AvailableAudiencesResponse = ListResponse<AvailableAudience>;

// ===== First Party Audiences =====

/**
 * First party audience for onboarding
 */
export interface FirstPartyAudience {
  id: string;
  name: string;
  description: string | null;
  status: FirstPartyAudienceStatus;
  size: number | null;
  match_rate: number | null;
  created_at: string;
  updated_at: string;
  ttl_days: number | null;
  source_type: FirstPartyAudienceSourceType;
}

/**
 * First party audience status
 */
export type FirstPartyAudienceStatus =
  | 'BUILDING'
  | 'READY'
  | 'FAILED'
  | 'EXPIRED'
  | 'ARCHIVED';

/**
 * First party audience source type
 */
export type FirstPartyAudienceSourceType =
  | 'CRM'
  | 'EMAIL'
  | 'PHONE'
  | 'DEVICE_ID'
  | 'CUSTOM';

/**
 * Request to create a first party audience
 */
export interface CreateFirstPartyAudienceRequest {
  name: string;
  description?: string | undefined;
  ttl_days?: number | undefined;
  source_type: FirstPartyAudienceSourceType;
}

/**
 * User identifier for first party audience
 */
export interface FirstPartyAudienceUser {
  identifier_type: FirstPartyIdentifierType;
  identifier_value: string;
}

/**
 * Type of user identifier
 */
export type FirstPartyIdentifierType =
  | 'EMAIL'
  | 'EMAIL_SHA256'
  | 'PHONE'
  | 'PHONE_SHA256'
  | 'DEVICE_ID'
  | 'DEVICE_ID_SHA256';

/**
 * Request to add or remove users from first party audience
 */
export interface AddRemoveUsersRequest {
  add?: FirstPartyAudienceUser[] | undefined;
  remove?: FirstPartyAudienceUser[] | undefined;
}

/**
 * Response for add/remove users operation
 */
export interface AddRemoveUsersResponse {
  added_count: number;
  removed_count: number;
  failed_count: number;
  errors: AddRemoveUserError[];
}

/**
 * Error from add/remove users operation
 */
export interface AddRemoveUserError {
  identifier: string;
  error: string;
}
