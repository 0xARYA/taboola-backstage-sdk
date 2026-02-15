/**
 * Campaign Items (Ads) API for Taboola Backstage
 */

import type { HttpClient } from '../utils/http.js';
import type {
  BulkCreateItemsRequest,
  BulkCreateItemsResponse,
  BulkDeleteItemsRequest,
  BulkUpdateItemsRequest,
  CampaignItem,
  CampaignItemListResponse,
  CreateItemRequest,
  RSSChildItem,
  RSSChildrenListResponse,
  UpdateItemRequest,
} from '../types/index.js';

/**
 * Options for listing campaign items
 */
export interface ListItemsOptions {
  /** Page number (1-indexed) */
  page?: number;
  /** Number of results per page */
  pageSize?: number;
  /** Filter by status */
  status?: string;
  /** Filter by approval state */
  approvalState?: string;
}

/**
 * Campaign Items (Ads) management API
 */
export class ItemsAPI {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all items for a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param options - Pagination and filter options
   *
   * @example
   * ```typescript
   * const { results } = await client.items.list('my-account', '12345');
   * for (const item of results) {
   *   console.log(item.title, item.status);
   * }
   * ```
   */
  async list(
    accountId: string,
    campaignId: string,
    options: ListItemsOptions = {}
  ): Promise<CampaignItemListResponse> {
    const searchParams = new URLSearchParams();

    if (options.page !== undefined) {
      searchParams.set('page', options.page.toString());
    }
    if (options.pageSize !== undefined) {
      searchParams.set('page_size', options.pageSize.toString());
    }
    if (options.status !== undefined) {
      searchParams.set('status', options.status);
    }
    if (options.approvalState !== undefined) {
      searchParams.set('approval_state', options.approvalState);
    }

    const query = searchParams.toString();
    const path = `${accountId}/campaigns/${campaignId}/items/${query ? `?${query}` : ''}`;

    return this.http.get<CampaignItemListResponse>(path);
  }

  /**
   * Get a single item by ID
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param itemId - Item ID
   *
   * @example
   * ```typescript
   * const item = await client.items.get('my-account', '12345', '67890');
   * console.log(item.title, item.url);
   * ```
   */
  async get(accountId: string, campaignId: string, itemId: string): Promise<CampaignItem> {
    return this.http.get<CampaignItem>(`${accountId}/campaigns/${campaignId}/items/${itemId}`);
  }

  /**
   * Create a new item (ad) in a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param item - Item data
   *
   * @example
   * ```typescript
   * const item = await client.items.create('my-account', '12345', {
   *   url: 'https://example.com/landing-page',
   *   title: 'Check Out Our Amazing Product!',
   *   thumbnail_url: 'https://example.com/image.jpg',
   *   description: 'Learn more about our product',
   *   cta: { cta_type: 'LEARN_MORE' },
   * });
   * console.log('Created item:', item.id);
   * ```
   */
  async create(
    accountId: string,
    campaignId: string,
    item: CreateItemRequest
  ): Promise<CampaignItem> {
    return this.http.post<CampaignItem>(`${accountId}/campaigns/${campaignId}/items/`, item);
  }

  /**
   * Update an existing item (static or motion ad)
   *
   * Submit only the fields you want to update. Fields that are omitted or null
   * will remain unchanged. The endpoint automatically detects the item type.
   *
   * Note: While status is CRAWLING, the Item is in a read-only state - no fields can be modified.
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param itemId - Item ID
   * @param updates - Fields to update (partial)
   *
   * @example Update a static item
   * ```typescript
   * const item = await client.items.update('my-account', '12345', '67890', {
   *   title: 'Updated Title!',
   *   is_active: true,
   * });
   * ```
   *
   * @example Update a motion ad
   * ```typescript
   * const item = await client.items.update('my-account', '12345', '67890', {
   *   title: 'Updated Motion Ad Title',
   *   description: 'New description',
   *   performance_video_data: {
   *     video_url: 'https://example.com/video.mp4',
   *     fallback_url: 'https://example.com/fallback.jpg',
   *   },
   * });
   * ```
   *
   * @example Pause an item (alternatively, use pause() method)
   * ```typescript
   * const item = await client.items.update('my-account', '12345', '67890', {
   *   is_active: false,
   * });
   * ```
   */
  async update(
    accountId: string,
    campaignId: string,
    itemId: string,
    updates: UpdateItemRequest
  ): Promise<CampaignItem> {
    return this.http.post<CampaignItem>(
      `${accountId}/campaigns/${campaignId}/items/${itemId}`,
      updates
    );
  }

  /**
   * Delete an item from a campaign
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param itemId - Item ID
   *
   * @example
   * ```typescript
   * await client.items.delete('my-account', '12345', '67890');
   * ```
   */
  async delete(accountId: string, campaignId: string, itemId: string): Promise<void> {
    await this.http.delete(`${accountId}/campaigns/${campaignId}/items/${itemId}`);
  }

  /**
   * Pause an item
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param itemId - Item ID
   *
   * @example
   * ```typescript
   * await client.items.pause('my-account', '12345', '67890');
   * ```
   */
  async pause(accountId: string, campaignId: string, itemId: string): Promise<CampaignItem> {
    return this.update(accountId, campaignId, itemId, { is_active: false });
  }

  /**
   * Unpause (resume) an item
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param itemId - Item ID
   *
   * @example
   * ```typescript
   * await client.items.unpause('my-account', '12345', '67890');
   * ```
   */
  async unpause(accountId: string, campaignId: string, itemId: string): Promise<CampaignItem> {
    return this.update(accountId, campaignId, itemId, { is_active: true });
  }

  /**
   * Create multiple items at once (mass create)
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param items - Array of items to create
   *
   * @example
   * ```typescript
   * const response = await client.items.bulkCreate('my-account', '12345', {
   *   items: [
   *     { url: 'https://example.com/page1', title: 'Title 1', thumbnail_url: '...' },
   *     { url: 'https://example.com/page2', title: 'Title 2', thumbnail_url: '...' },
   *   ],
   * });
   * console.log('Created', response.results.length, 'items');
   * ```
   */
  async bulkCreate(
    accountId: string,
    campaignId: string,
    request: BulkCreateItemsRequest
  ): Promise<BulkCreateItemsResponse> {
    return this.http.post<BulkCreateItemsResponse>(
      `${accountId}/campaigns/${campaignId}/items/mass`,
      request
    );
  }

  /**
   * Bulk create items across multiple campaigns
   *
   * @param accountId - Account ID
   * @param items - Array of items with campaign IDs
   *
   * @example
   * ```typescript
   * await client.items.bulkCreateAcrossCampaigns('my-account', [
   *   { campaign_id: '12345', url: '...', title: '...' },
   *   { campaign_id: '12346', url: '...', title: '...' },
   * ]);
   * ```
   */
  async bulkCreateAcrossCampaigns(
    accountId: string,
    items: (CreateItemRequest & { campaign_id: string })[]
  ): Promise<BulkCreateItemsResponse> {
    return this.http.put<BulkCreateItemsResponse>(`${accountId}/items/bulk`, { items });
  }

  /**
   * Bulk update items across multiple campaigns
   *
   * @param accountId - Account ID
   * @param request - Bulk update request
   *
   * @example
   * ```typescript
   * await client.items.bulkUpdate('my-account', {
   *   items: [
   *     { id: '67890', campaign_id: '12345', update: { is_active: false } },
   *     { id: '67891', campaign_id: '12346', update: { is_active: false } },
   *   ],
   * });
   * ```
   */
  async bulkUpdate(
    accountId: string,
    request: BulkUpdateItemsRequest
  ): Promise<CampaignItemListResponse> {
    return this.http.post<CampaignItemListResponse>(`${accountId}/items/bulk`, request);
  }

  /**
   * Bulk delete items across multiple campaigns
   *
   * @param accountId - Account ID
   * @param request - Bulk delete request
   *
   * @example
   * ```typescript
   * await client.items.bulkDelete('my-account', {
   *   items: [
   *     { id: '67890', campaign_id: '12345' },
   *     { id: '67891', campaign_id: '12346' },
   *   ],
   * });
   * ```
   */
  async bulkDelete(accountId: string, request: BulkDeleteItemsRequest): Promise<void> {
    await this.http.delete(`${accountId}/items/bulk`, {
      json: request,
    });
  }

  /**
   * Get children of an RSS item
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param itemId - Parent RSS item ID
   *
   * @example
   * ```typescript
   * const { results } = await client.items.listRSSChildren('my-account', '12345', '67890');
   * ```
   */
  async listRSSChildren(
    accountId: string,
    campaignId: string,
    itemId: string
  ): Promise<RSSChildrenListResponse> {
    return this.http.get<RSSChildrenListResponse>(
      `${accountId}/campaigns/${campaignId}/items/${itemId}/children/`
    );
  }

  /**
   * Get a specific RSS child item
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param itemId - Parent RSS item ID
   * @param childId - Child item ID
   */
  async getRSSChild(
    accountId: string,
    campaignId: string,
    itemId: string,
    childId: string
  ): Promise<RSSChildItem> {
    return this.http.get<RSSChildItem>(
      `${accountId}/campaigns/${campaignId}/items/${itemId}/children/${childId}`
    );
  }

  /**
   * Update an RSS child item
   *
   * @param accountId - Account ID
   * @param campaignId - Campaign ID
   * @param itemId - Parent RSS item ID
   * @param childId - Child item ID
   * @param updates - Fields to update
   */
  async updateRSSChild(
    accountId: string,
    campaignId: string,
    itemId: string,
    childId: string,
    updates: UpdateItemRequest
  ): Promise<RSSChildItem> {
    return this.http.post<RSSChildItem>(
      `${accountId}/campaigns/${campaignId}/items/${itemId}/children/${childId}`,
      updates
    );
  }
}
