/**
 * Targeting API Types
 *
 * Types for Taboola Backstage API campaign targeting including
 * postal codes, audience segments, and contextual targeting.
 */

/**
 * Generic targeting restriction with include/exclude
 */
export interface TargetingRestriction<T> {
  collection: T[];
  type: 'INCLUDE' | 'EXCLUDE';
}

/**
 * Lookalike audience item for targeting
 */
export interface LookalikeAudienceItem {
  rule_id: number;
  similarity_level: number;
}

/**
 * Postal code targeting configuration
 */
export interface PostalCodeTargeting {
  type: 'INCLUDE' | 'EXCLUDE' | 'ALL';
  collection: string[];
}

/**
 * Request to update postal code targeting
 */
export interface UpdatePostalCodeTargetingRequest {
  type: 'INCLUDE' | 'EXCLUDE' | 'ALL';
  collection: string[];
}

/**
 * Audience targeting configuration (marketplace, custom)
 */
export interface AudienceTargeting {
  collection: TargetingRestriction<number>[];
}

/**
 * Multi-audience targeting with AND/OR logic
 */
export interface MultiAudienceTargeting {
  collection: TargetingRestriction<number>[];
}

/**
 * Request to update audience targeting
 */
export interface UpdateAudienceTargetingRequest {
  collection: TargetingRestriction<number>[];
}

/**
 * Contextual targeting configuration
 */
export interface ContextualTargeting {
  collection: TargetingRestriction<number>[];
}

/**
 * Request to update contextual targeting
 */
export interface UpdateContextualTargetingRequest {
  collection: TargetingRestriction<number>[];
}

/**
 * First party audience targeting
 */
export interface FirstPartyAudienceTargeting {
  collection: TargetingRestriction<number>[];
}

/**
 * Request to update first party audience targeting
 */
export interface UpdateFirstPartyAudienceTargetingRequest {
  collection: TargetingRestriction<number>[];
}

/**
 * Marking labels (pixel retargeting) targeting configuration
 */
export interface MarkingLabelsTargeting {
  collection: TargetingRestriction<string>[];
}

/**
 * Request to update marking labels targeting
 */
export interface UpdateMarkingLabelsTargetingRequest {
  collection: TargetingRestriction<string>[];
}

/**
 * Lookalike audience targeting configuration
 */
export interface LookalikeAudienceTargeting {
  collection: TargetingRestriction<LookalikeAudienceItem>[];
}

/**
 * Request to update lookalike audience targeting
 */
export interface UpdateLookalikeAudienceTargetingRequest {
  collection: TargetingRestriction<LookalikeAudienceItem>[];
}
