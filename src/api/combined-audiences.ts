/**
 * Combined Audiences API
 *
 * Manage combined audiences that combine multiple audience types
 * (custom, lookalike, marketplace, first-party) with AND/OR logic.
 */

import type { HttpClient } from '../utils/http.js';
import type {
  CombinedAudience,
  CombinedAudienceListResponse,
  CreateCombinedAudienceRequest,
  UpdateCombinedAudienceRequest,
  AvailableAudience,
  AvailableAudiencesResponse,
} from '../types/audience.js';

/**
 * Combined Audiences API for managing combined audiences
 */
export class CombinedAudiencesAPI {
  constructor(private readonly http: HttpClient) {}

  /**
   * List available audiences for combining
   */
  async listAvailable(accountId: string): Promise<AvailableAudience[]> {
    const response = await this.http.get<AvailableAudiencesResponse>(
      `${accountId}/combined_audiences/resources/audiences`
    );
    return response.results;
  }

  /**
   * List all combined audiences
   */
  async list(accountId: string): Promise<CombinedAudience[]> {
    const response = await this.http.get<CombinedAudienceListResponse>(
      `${accountId}/combined_audiences`
    );
    return response.results;
  }

  /**
   * Get a single combined audience
   */
  async get(accountId: string, audienceId: string): Promise<CombinedAudience> {
    return this.http.get<CombinedAudience>(`${accountId}/combined_audiences/${audienceId}`);
  }

  /**
   * Create a combined audience
   */
  async create(
    accountId: string,
    audience: CreateCombinedAudienceRequest
  ): Promise<CombinedAudience> {
    return this.http.post<CombinedAudience>(`${accountId}/combined_audiences`, audience);
  }

  /**
   * Update a combined audience
   */
  async update(
    accountId: string,
    audienceId: string,
    updates: UpdateCombinedAudienceRequest
  ): Promise<CombinedAudience> {
    return this.http.post<CombinedAudience>(
      `${accountId}/combined_audiences/${audienceId}`,
      updates
    );
  }
}
