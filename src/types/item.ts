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
}

/**
 * Create campaign item request (static ads only)
 *
 * Used with the single-item create endpoint: `POST /campaigns/{campaign_id}/items/`
 *
 * Only the `url` field is accepted. The item is created with a status of CRAWLING
 * (read-only state). Poll until the status changes to RUNNING or NEED_TO_EDIT,
 * then use `update()` to modify fields like title, thumbnail, CTA, etc.
 *
 * For creating items with more fields upfront, or for motion ads,
 * use `bulkCreateAcrossCampaigns()` instead.
 *
 * @example
 * ```typescript
 * const item = await client.items.create('my-account', '12345', {
 *   url: 'https://example.com/landing-page',
 * });
 * // Item is now in CRAWLING state - poll until ready
 * ```
 */
export interface CreateItemRequest {
  /** Landing page URL (required) */
  url: string;
}

/**
 * Item data for bulk creation endpoints
 *
 * Used with bulk create endpoints that support both static ads and motion ads:
 * - `bulkCreate()` — mass create within a single campaign
 * - `bulkCreateAcrossCampaigns()` — create across multiple campaigns
 *
 * @example Static ad
 * ```typescript
 * { url: 'https://example.com', title: 'My Ad', thumbnail_url: '...' }
 * ```
 *
 * @example Motion ad
 * ```typescript
 * { url: 'https://example.com', title: 'My Ad', performance_video_data: { video_url: '...', fallback_url: '...' } }
 * ```
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
  /**
   * Performance video data (motion ads only)
   * Contains video_url (MP4) and fallback_url (JPG/PNG)
   */
  performance_video_data?: PerformanceVideoData;
}

/**
 * Performance video data for motion ads
 */
export interface PerformanceVideoData {
  /** URL to the video file (MP4 format) */
  video_url: string;
  /** URL to the fallback image (JPG/PNG format) */
  fallback_url: string;
}

/**
 * Update campaign item request
 *
 * Submit only the fields you want to update. Fields that are omitted or null
 * will remain unchanged.
 *
 * Note: While status is CRAWLING, the Item is in a read-only state - no fields can be modified.
 *
 * @example Update a static item
 * ```typescript
 * await client.items.update('account-id', 'campaign-id', 'item-id', {
 *   title: 'Updated Title',
 *   is_active: true,
 * });
 * ```
 *
 * @example Update a motion ad
 * ```typescript
 * await client.items.update('account-id', 'campaign-id', 'item-id', {
 *   title: 'Updated Motion Ad',
 *   performance_video_data: {
 *     video_url: 'https://example.com/video.mp4',
 *     fallback_url: 'https://example.com/fallback.jpg',
 *   },
 * });
 * ```
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
  creative_focus?: CreativeFocus;
  /** Verification pixel */
  verification_pixel?: ItemVerificationPixel;
  /** Viewability tag */
  viewability_tag?: ItemViewabilityTag;
  /** Custom tracking data */
  custom_data?: string;
  /** Third-party tracking pixels */
  third_party_tags?: string[];
  /**
   * Performance video data (motion ads only)
   * Contains video_url (MP4) and fallback_url (JPG/PNG)
   */
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
