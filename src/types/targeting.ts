/**
 * Targeting API Types
 *
 * Types for Taboola Backstage API campaign targeting including
 * postal codes, audience segments, and contextual targeting.
 */

import type { MultiTargetingState } from './common.js';

/**
 * Postal code targeting configuration
 */
export interface PostalCodeTargeting {
  type: 'INCLUDE' | 'EXCLUDE' | 'ALL';
  values: PostalCodeValue[];
  restrictions: PostalCodeRestrictions | null;
}

/**
 * Individual postal code value
 */
export interface PostalCodeValue {
  postal_code: string;
  country: string;
}

/**
 * Postal code targeting restrictions
 */
export interface PostalCodeRestrictions {
  max_postal_codes: number;
  supported_countries: string[];
}

/**
 * Request to update postal code targeting
 */
export interface UpdatePostalCodeTargetingRequest {
  type: 'INCLUDE' | 'EXCLUDE' | 'ALL';
  values: PostalCodeValue[];
}

/**
 * Audience segment for targeting
 */
export interface AudienceSegment {
  id: string;
  name: string | null;
}

/**
 * Audience targeting configuration (marketplace, custom, lookalike)
 */
export interface AudienceTargeting {
  collection: AudienceSegment[];
  type: MultiTargetingState;
}

/**
 * Multi-audience targeting with AND/OR logic
 */
export interface MultiAudienceTargeting {
  type: MultiTargetingState;
  collection: AudienceSegment[];
  and_collection: AudienceSegment[][];
  or_collection: AudienceSegment[][];
}

/**
 * Request to update audience targeting
 */
export interface UpdateAudienceTargetingRequest {
  type: MultiTargetingState;
  collection?: AudienceSegment[] | undefined;
  and_collection?: AudienceSegment[][] | undefined;
  or_collection?: AudienceSegment[][] | undefined;
}

/**
 * Contextual segment for targeting
 */
export interface ContextualSegmentValue {
  id: string;
  name: string | null;
}

/**
 * Contextual targeting configuration
 */
export interface ContextualTargeting {
  type: MultiTargetingState;
  collection: ContextualSegmentValue[];
}

/**
 * Request to update contextual targeting
 */
export interface UpdateContextualTargetingRequest {
  type: MultiTargetingState;
  collection: ContextualSegmentValue[];
}

/**
 * First party audience targeting
 */
export interface FirstPartyAudienceTargeting {
  type: MultiTargetingState;
  collection: AudienceSegment[];
}

/**
 * Request to update first party audience targeting
 */
export interface UpdateFirstPartyAudienceTargetingRequest {
  type: MultiTargetingState;
  collection: AudienceSegment[];
}
