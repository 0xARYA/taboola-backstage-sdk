/**
 * First Party Audiences API
 *
 * Manage first party audience onboarding, allowing you to upload
 * your own customer data (email, phone, device IDs) for targeting.
 */

import type { HttpClient } from '../utils/http.js';
import type {
  FirstPartyAudience,
  CreateFirstPartyAudienceRequest,
  AudienceUsersRequest,
} from '../types/audience.js';
import type { ListResponse } from '../types/common.js';

/**
 * First Party Audiences API for audience onboarding
 */
export class FirstPartyAudiencesAPI {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all first party audiences
   */
  async list(accountId: string): Promise<FirstPartyAudience[]> {
    const response = await this.http.get<ListResponse<FirstPartyAudience>>(
      `${accountId}/audience_onboarding/my_audiences`
    );
    return response.results;
  }

  /**
   * Get a single first party audience
   */
  async get(accountId: string, audienceId: string): Promise<FirstPartyAudience> {
    return this.http.get<FirstPartyAudience>(
      `${accountId}/audience_onboarding/my_audiences/${audienceId}`
    );
  }

  /**
   * Create a first party audience
   */
  async create(
    accountId: string,
    audience: CreateFirstPartyAudienceRequest
  ): Promise<FirstPartyAudience> {
    return this.http.post<FirstPartyAudience>(`${accountId}/audience_onboarding/create`, audience);
  }

  /**
   * Add or remove users from a first party audience
   */
  async manageUsers(accountId: string, request: AudienceUsersRequest): Promise<void> {
    await this.http.post(`${accountId}/audience_onboarding/my_audiences/users`, request);
  }
}
