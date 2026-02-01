/**
 * Campaign Item (Ad) types for Taboola Backstage API
 */

import type { ApprovalState, CTAType, ItemStatus, ItemType } from './common.js';

/**
 * Creative focus type
 * @deprecated Use automatic cropping instead
 */
export type CreativeFocusType = 'AUTOMATIC' | 'CUSTOM';

/**
 * Coordinates for custom creative focus
 * @deprecated
 */
export interface Coordinates {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

/**
 * Creative focus configuration
 * @deprecated
 */
export interface CreativeFocus {
  type: CreativeFocusType;
  coordinates: Coordinates | null;
}

/**
 * CTA (Call to Action) configuration
 */
export interface CTA {
  /** CTA button type */
  cta_type: CTAType;
  /** Custom CTA text (if applicable) */
  cta_text?: string;
}

/**
 * Verification pixel for item
 */
export interface ItemVerificationPixel {
  /** Pixel type */
  type: string;
  /** Pixel URL */
  url: string;
}

/**
 * Viewability tag for item
 */
export interface ItemViewabilityTag {
  /** Tag type */
  type: string;
  /** Tag value */
  value: string;
}

/**
 * Policy review status for item
 */
export interface ItemPolicyReview {
  /** Rejection reason if rejected */
  reject_reason: string | null;
}

/**
 * Full Campaign Item (Ad) object
 */
export interface CampaignItem {
  /** Unique item ID */
  id: string;
  /** Campaign ID this item belongs to */
  campaign_id: string;
  /** Item type */
  type: ItemType;
  /** Landing page URL */
  url: string;
  /** Thumbnail image URL */
  thumbnail_url: string;
  /** Ad title/headline */
  title: string;
  /** Ad description */
  description?: string;
  /** Approval state */
  approval_state: ApprovalState;
  /** Whether item is active */
  is_active: boolean;
  /** Item status */
  status: ItemStatus;
  /** Policy review status */
  policy_review: ItemPolicyReview;
  /** CTA button configuration */
  cta: CTA | null;
  /**
   * Creative focus configuration
   * @deprecated
   */
  creative_focus?: CreativeFocus;
  /** Verification pixel */
  verification_pixel?: ItemVerificationPixel;
  /** Viewability tag */
  viewability_tag?: ItemViewabilityTag;
  /** Custom data for tracking */
  custom_data?: string;
  /** Fallback URL */
  fallback_url?: string;
  /** Third-party tracking pixel URLs */
  third_party_tags?: string[];
  /** RSS feed URL (for RSS items) */
  rss_url?: string;
  /** Parent item ID (for RSS children) */
  parent_id?: string;
}

/**
 * Create campaign item request
 */
export interface CreateItemRequest {
  /** Landing page URL (required) */
  url: string;
  /** Ad title/headline (required) */
  title: string;
  /** Thumbnail image URL (required unless uploading) */
  thumbnail_url?: string;
  /** Ad description */
  description?: string;
  /** CTA configuration */
  cta?: CTA;
  /** Custom tracking data */
  custom_data?: string;
  /** Third-party tracking pixels */
  third_party_tags?: string[];
  /** RSS feed URL (creates RSS item) */
  rss_url?: string;
}

/**
 * Update campaign item request
 */
export interface UpdateItemRequest {
  /** Ad title */
  title?: string;
  /** Ad description */
  description?: string;
  /** Thumbnail image URL */
  thumbnail_url?: string;
  /** Whether item is active */
  is_active?: boolean;
  /** CTA configuration */
  cta?: CTA;
  /** Custom tracking data */
  custom_data?: string;
  /** Third-party tracking pixels */
  third_party_tags?: string[];
}

/**
 * Campaign item list response
 */
export interface CampaignItemListResponse {
  results: CampaignItem[];
  metadata?: {
    total: number;
    count: number;
  };
}

/**
 * Bulk item creation request
 */
export interface BulkCreateItemsRequest {
  items: CreateItemRequest[];
}

/**
 * Bulk item creation response
 */
export interface BulkCreateItemsResponse {
  results: CampaignItem[];
  failed?: {
    item: CreateItemRequest;
    error: string;
  }[];
}

/**
 * Bulk item update request (across campaigns)
 */
export interface BulkUpdateItemsRequest {
  items: {
    /** Item ID */
    id: string;
    /** Campaign ID */
    campaign_id: string;
    /** Fields to update */
    update: UpdateItemRequest;
  }[];
}

/**
 * Bulk item delete request (across campaigns)
 */
export interface BulkDeleteItemsRequest {
  items: {
    /** Item ID */
    id: string;
    /** Campaign ID */
    campaign_id: string;
  }[];
}

/**
 * RSS child item
 */
export interface RSSChildItem extends CampaignItem {
  /** Parent RSS item ID */
  parent_id: string;
}

/**
 * RSS children list response
 */
export interface RSSChildrenListResponse {
  results: RSSChildItem[];
  metadata?: {
    total: number;
    count: number;
  };
}

/**
 * Image upload response
 */
export interface ImageUploadResponse {
  /** URL of the uploaded image */
  url: string;
  /** Image width */
  width: number;
  /** Image height */
  height: number;
}

/**
 * Image library search parameters
 */
export interface ImageLibrarySearchParams {
  /** Search query */
  query: string;
  /** Number of results */
  limit?: number;
  /** Result offset */
  offset?: number;
}

/**
 * Image library item
 */
export interface ImageLibraryItem {
  /** Image ID */
  id: string;
  /** Preview URL */
  preview_url: string;
  /** Full URL */
  url: string;
  /** Image width */
  width: number;
  /** Image height */
  height: number;
  /** Image source */
  source: string;
}

/**
 * Image library search response
 */
export interface ImageLibrarySearchResponse {
  results: ImageLibraryItem[];
  total: number;
}
