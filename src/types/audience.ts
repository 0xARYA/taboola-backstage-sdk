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
  display_name: string;
  description: string | null;
  status: CombinedAudienceStatus;
  created_at: string;
  last_modified_at: string;
  last_modified_by?: string;
  advertiser_id?: string;
  audience_size?: number | null;
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
export type CombinedAudienceType = 'Custom' | 'Lookalike' | 'Third_Party' | 'First_Party';

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
  display_name: string;
  description?: string | undefined;
  include_rules: CombinedAudienceRule[];
  exclude_rules?: CombinedAudienceRule[] | undefined;
}

/**
 * Request to update a combined audience
 */
export interface UpdateCombinedAudienceRequest {
  display_name?: string | undefined;
  description?: string | undefined;
  include_rules?: CombinedAudienceRule[] | undefined;
  exclude_rules?: CombinedAudienceRule[] | undefined;
}

/**
 * Available audience for combined audience creation
 */
export interface AvailableAudience {
  id: number;
  audience_name: string;
  data_type: CombinedAudienceType;
  size: number | null;
  status: string;
  provider?: string;
  description?: string | null;
  is_archived?: boolean;
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
  display_name: string;
  description: string | null;
  status: FirstPartyAudienceStatus;
  audience_size: number | null;
  match_rate: number | null;
  created_at: string;
  last_modified_at: string;
  last_modified_by?: string;
  ttl_in_hours: number | null;
  ttl_type?: string;
  source_type: FirstPartyAudienceSourceType;
  look_back_window?: number | null;
  category?: string | null;
  event_name?: string | null;
  exclude_from_campaigns?: boolean;
  advertiser_id?: string;
}

/**
 * First party audience status
 */
export type FirstPartyAudienceStatus = 'BUILDING' | 'READY' | 'FAILED' | 'EXPIRED' | 'ARCHIVED';

/**
 * First party audience source type
 */
export type FirstPartyAudienceSourceType = 'CRM' | 'EMAIL' | 'PHONE' | 'DEVICE_ID' | 'CUSTOM';

/**
 * Request to create a first party audience
 */
export interface CreateFirstPartyAudienceRequest {
  display_name: string;
  description?: string | undefined;
  ttl_in_hours?: number | undefined;
  source_type: FirstPartyAudienceSourceType;
}

/**
 * User identity item within a cluster
 */
export interface AudienceUserClusterItem {
  user_id: string;
  type: string;
  is_hashed: boolean;
}

/**
 * User identity cluster
 */
export interface AudienceUserIdentity {
  cluster: AudienceUserClusterItem[];
}

/**
 * Request to add or remove users from first party audience
 */
export interface AudienceUsersRequest {
  operation: 'ADD' | 'REMOVE';
  audience_id: number;
  identities: AudienceUserIdentity[];
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
