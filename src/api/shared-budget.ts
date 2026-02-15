/**
 * Shared Budget API for Taboola Backstage
 *
 * Manage shared budgets across campaigns.
 */

import type { HttpClient } from '../utils/http.js';
import type {
  CreateSharedBudgetRequest,
  SharedBudget,
  SharedBudgetBaseListResponse,
  UpdateSharedBudgetRequest,
} from '../types/shared-budget.js';

/**
 * Shared Budget management API
 */
export class SharedBudgetAPI {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get a shared budget by ID
   *
   * @param accountId - Account ID
   * @param sharedBudgetId - Shared budget ID
   *
   * @example
   * ```typescript
   * const budget = await client.sharedBudgets.get('my-account', '123');
   * console.log(budget.name, budget.spending_limit);
   * ```
   */
  async get(accountId: string, sharedBudgetId: string): Promise<SharedBudget> {
    return this.http.get<SharedBudget>(
      `${accountId}/shared-budget/${sharedBudgetId}`
    );
  }

  /**
   * List all shared budgets (base/partial fields)
   *
   * Returns a lightweight list with id, name, and status.
   *
   * @param accountId - Account ID
   *
   * @example
   * ```typescript
   * const { results } = await client.sharedBudgets.listBase('my-account');
   * for (const budget of results) {
   *   console.log(budget.name, budget.status);
   * }
   * ```
   */
  async listBase(accountId: string): Promise<SharedBudgetBaseListResponse> {
    return this.http.get<SharedBudgetBaseListResponse>(
      `${accountId}/shared-budget/base`
    );
  }

  /**
   * Create a new shared budget
   *
   * @param accountId - Account ID
   * @param budget - Shared budget configuration
   *
   * @example
   * ```typescript
   * const budget = await client.sharedBudgets.create('my-account', {
   *   name: 'Q1 Budget',
   *   marketing_objective: 'DRIVE_WEBSITE_TRAFFIC',
   *   spending_limit_model: 'MONTHLY',
   *   spending_limit: 5000,
   *   daily_cap: 200,
   * });
   * console.log('Created shared budget:', budget.id);
   * ```
   */
  async create(
    accountId: string,
    budget: CreateSharedBudgetRequest
  ): Promise<SharedBudget> {
    return this.http.post<SharedBudget>(
      `${accountId}/shared-budget`,
      budget
    );
  }

  /**
   * Update an existing shared budget
   *
   * @param accountId - Account ID
   * @param sharedBudgetId - Shared budget ID
   * @param updates - Fields to update
   *
   * @example
   * ```typescript
   * const budget = await client.sharedBudgets.update('my-account', '123', {
   *   spending_limit: 10000,
   *   daily_cap: 500,
   * });
   * ```
   */
  async update(
    accountId: string,
    sharedBudgetId: string,
    updates: UpdateSharedBudgetRequest
  ): Promise<SharedBudget> {
    return this.http.put<SharedBudget>(
      `${accountId}/shared-budget/${sharedBudgetId}`,
      updates
    );
  }
}
