/**
 * Campaign Item (Ad) types for Taboola Backstage API
 */

import type { ApprovalState, CTAType, ExternalMetadata, ItemStatus, ItemType } from './common.js';

/**
 * Creative focus type
 * @deprecated Use automatic cropping instead
 */
export type CreativeFocusType = 'AUTOMATIC' | 'COORDINATES';

/**
 * Coordinates for custom creative focus
 * @deprecated
 */
export interface Coordinates {
  x: number;
  y: number;
}

/**
 * Creative focus configuration
 * @deprecated
 */
export interface CreativeFocus {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  type: CreativeFocusType;
  coordinates: Coordinates | null; // eslint-disable-line @typescript-eslint/no-deprecated
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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
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
  /** Learning/optimization state (ReadOnly) */
  learning_state?: string;
  /** App install configuration */
  app_install?: Record<string, unknown>;
  /** Rating configuration */
  rating?: Record<string, unknown>;
  /** Logo configuration */
  logo?: Record<string, unknown>;
  /** Disclaimer text */
  disclaimer?: string;
  /** Creative type */
  creative_type?: string;
  /** Image orientation */
  orientation?: string;
  /** Performance video data (motion ads) */
  performance_video_data?: PerformanceVideoData;
  /** Item start date */
  start_date?: string;
  /** Item end date */
  end_date?: string;
  /** External metadata */
  external_metadata?: ExternalMetadata;
}

/**
 * Create campaign item request (static ads only)
 */
export interface CreateItemRequest {
  /** Landing page URL (required) */
  url: string;
}

/**
 * Item data for bulk creation endpoints
 */
export interface BulkCreateItemData {
  /** Landing page URL (required) */
  url: string;
  /** Ad title/headline */
  title?: string;
  /** Thumbnail image URL (static ads) */
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
  /** Performance video data (motion ads only) */
  performance_video_data?: PerformanceVideoData;
  /** Whether the item is active */
  is_active?: boolean;
  /** Creative crop configuration */
  creative_crop?: Record<string, unknown>;
  /** Verification pixel */
  verification_pixel?: ItemVerificationPixel;
  /** Viewability tag */
  viewability_tag?: ItemViewabilityTag;
}

/**
 * Performance video data for motion ads
 */
export interface PerformanceVideoData {
  /** URL to the video file (MP4 format) */
  video_url: string;
  /** URL to the fallback image (JPG/PNG format) */
  fallback_url: string;
  /** URL to the GIF preview */
  gif_url?: string;
}

/**
 * Update campaign item request
 */
export interface UpdateItemRequest {
  /** Ad title */
  title?: string;
  /** Landing page URL */
  url?: string;
  /** Ad description */
  description?: string;
  /** Thumbnail image URL (static items only) */
  thumbnail_url?: string;
  /** Whether item is active (use for pause/unpause) */
  is_active?: boolean;
  /** CTA configuration */
  cta?: CTA;
  /**
   * Creative focus configuration
   * @deprecated This field has been deprecated
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  creative_focus?: CreativeFocus;
  /** Verification pixel */
  verification_pixel?: ItemVerificationPixel;
  /** Viewability tag */
  viewability_tag?: ItemViewabilityTag;
  /** Custom tracking data */
  custom_data?: string;
  /** Third-party tracking pixels */
  third_party_tags?: string[];
  /** Performance video data (motion ads only) */
  performance_video_data?: PerformanceVideoData;
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
 * Bulk item creation request (within a single campaign)
 */
export interface BulkCreateItemsRequest {
  items: BulkCreateItemData[];
}

/**
 * Bulk item creation response
 */
export interface BulkCreateItemsResponse {
  results: CampaignItem[];
  failed?: {
    item: BulkCreateItemData;
    error: string;
  }[];
}

/**
 * Bulk item update request
 */
export interface BulkUpdateItemsRequest {
  /** Item IDs to update */
  items_to_update: number[];
  /** Baseline item with fields to apply to all items */
  baseline_item: UpdateItemRequest;
}

/**
 * Bulk item delete request
 */
export interface BulkDeleteItemsRequest {
  /** Item IDs to delete */
  items_to_update: number[];
  /** Baseline item (typically empty or with minimal fields) */
  baseline_item: Partial<UpdateItemRequest>;
}

/**
 * Bulk create items across multiple campaigns request
 */
export interface BulkCreateItemsAcrossCampaignsRequest {
  /** Campaign IDs to create items in */
  campaign_ids: number[];
  /** Items to create */
  items: BulkCreateItemData[];
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
