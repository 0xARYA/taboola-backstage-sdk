# Taboola Backstage SDK

[![npm version](https://img.shields.io/npm/v/taboola-backstage-sdk.svg)](https://www.npmjs.com/package/taboola-backstage-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

A comprehensive TypeScript SDK for the [Taboola Backstage API](https://developers.taboola.com/backstage-api/reference). Manage campaigns, ads, targeting, audiences, pixel tracking, and reporting programmatically.

## Features

- **Full TypeScript Support** — Complete type definitions for all API endpoints, requests, and responses
- **Automatic Authentication** — OAuth2 token management with automatic refresh
- **Comprehensive API Coverage** — Campaigns, Items, Targeting, Pixel, Reports, Audiences, and more
- **Custom Error Classes** — Typed errors for auth, validation, rate limiting, and not found scenarios
- **Built-in Retry Logic** — Exponential backoff for transient failures
- **Dual Module Support** — Works with both ESM and CommonJS

## Installation

```bash
npm install taboola-backstage-sdk
```

```bash
yarn add taboola-backstage-sdk
```

```bash
pnpm add taboola-backstage-sdk
```

## Quick Start

```typescript
import { TaboolaClient } from 'taboola-backstage-sdk';

const client = new TaboolaClient({
  clientId: process.env.TABOOLA_CLIENT_ID,
  clientSecret: process.env.TABOOLA_CLIENT_SECRET,
});

// Get your account
const account = await client.accounts.getCurrent();
console.log('Account:', account.account_id);

// List campaigns
const { results: campaigns } = await client.campaigns.list(account.account_id);
console.log(`Found ${campaigns.length} campaigns`);

// Get campaign performance report
const report = await client.reports.campaignSummary(account.account_id, 'day', {
  start_date: '2024-01-01',
  end_date: '2024-01-31',
});
```

## Configuration

```typescript
const client = new TaboolaClient({
  // Required
  clientId: string,
  clientSecret: string,

  // Optional
  baseUrl?: string,    // API base URL (default: production)
  timeout?: number,    // Request timeout in ms (default: 30000)
  retries?: number,    // Retry attempts for failed requests (default: 3)
  debug?: boolean,     // Enable request/response logging
});
```

## API Reference

### Accounts

```typescript
// Get current account
const account = await client.accounts.getCurrent();

// Get all allowed accounts
const { results } = await client.accounts.getAllowed();

// Get advertisers in a network
const { results } = await client.accounts.getNetworkAdvertisers('network-id');
```

### Campaigns

```typescript
// List campaigns
const { results } = await client.campaigns.list('account-id', {
  page: 1,
  pageSize: 50,
});

// Get single campaign
const campaign = await client.campaigns.get('account-id', 'campaign-id');

// Create campaign
const campaign = await client.campaigns.create('account-id', {
  name: 'My Campaign',
  branding_text: 'My Brand',
  cpc: 0.50,
  spending_limit: 1000,
  spending_limit_model: 'MONTHLY',
  marketing_objective: 'DRIVE_WEBSITE_TRAFFIC',
});

// Update campaign
await client.campaigns.update('account-id', 'campaign-id', {
  cpc: 0.75,
  daily_cap: 500,
});

// Pause / Unpause
await client.campaigns.pause('account-id', 'campaign-id');
await client.campaigns.unpause('account-id', 'campaign-id');

// Delete
await client.campaigns.delete('account-id', 'campaign-id');

// Duplicate
const copy = await client.campaigns.duplicate('account-id', 'campaign-id', 'Copy Name');

// Bulk update
await client.campaigns.bulkUpdate('account-id', {
  campaigns: [
    { campaign_id: '123', update: { is_active: false } },
    { campaign_id: '456', update: { cpc: 0.60 } },
  ],
});

// List campaigns (base/lightweight)
const { results: base } = await client.campaigns.listBase('account-id');

// Get publisher targeting whitelist
const whitelist = await client.campaigns.getTargetingWhitelist('account-id', 'campaign-id');
```

### Items (Ads)

```typescript
// List items
const { results } = await client.items.list('account-id', 'campaign-id');

// Get single item
const item = await client.items.get('account-id', 'campaign-id', 'item-id');

// Create item
const item = await client.items.create('account-id', 'campaign-id', {
  url: 'https://example.com/landing',
  title: 'Amazing Product - Learn More',
  thumbnail_url: 'https://example.com/image.jpg',
  description: 'Discover our latest offering',
  cta: { cta_type: 'LEARN_MORE' },
});

// Update item
await client.items.update('account-id', 'campaign-id', 'item-id', {
  title: 'Updated Title',
});

// Pause / Unpause
await client.items.pause('account-id', 'campaign-id', 'item-id');
await client.items.unpause('account-id', 'campaign-id', 'item-id');

// Delete
await client.items.delete('account-id', 'campaign-id', 'item-id');

// Bulk create
const { results } = await client.items.bulkCreate('account-id', 'campaign-id', {
  items: [
    { url: 'https://example.com/1', title: 'Title 1', thumbnail_url: '...' },
    { url: 'https://example.com/2', title: 'Title 2', thumbnail_url: '...' },
  ],
});
```

### Targeting

```typescript
// Postal code targeting
const postal = await client.targeting.getPostalCodes('account-id', 'campaign-id');
await client.targeting.updatePostalCodes('account-id', 'campaign-id', {
  type: 'INCLUDE',
  values: [
    { postal_code: '10001', country: 'US' },
    { postal_code: '10002', country: 'US' },
  ],
});

// Marketplace audience targeting
const audiences = await client.targeting.getMarketplaceAudiences('account-id', 'campaign-id');
await client.targeting.updateMarketplaceAudiences('account-id', 'campaign-id', {
  type: 'INCLUDE',
  collection: [{ id: 'segment-123' }],
});

// Custom audience targeting
const custom = await client.targeting.getCustomAudiences('account-id', 'campaign-id');

// Lookalike audience targeting
const lookalike = await client.targeting.getLookalikeAudiences('account-id', 'campaign-id');

// Contextual targeting
const contextual = await client.targeting.getContextual('account-id', 'campaign-id');
await client.targeting.updateContextual('account-id', 'campaign-id', {
  type: 'INCLUDE',
  collection: [{ id: 'context-456' }],
});

// First party audience targeting
const firstParty = await client.targeting.getFirstPartyAudiences('account-id', 'campaign-id');

// Marking labels (pixel retargeting) targeting
const labels = await client.targeting.getMarkingLabels('account-id', 'campaign-id');
await client.targeting.updateMarkingLabels('account-id', 'campaign-id', {
  type: 'EXISTS',
  collection: ['label-1', 'label-2'],
});
```

### Pixel API

Manage conversion tracking and custom audience rules.

```typescript
// List conversion rules
const rules = await client.pixel.listConversionRules('account-id');

// Get single conversion rule
const rule = await client.pixel.getConversionRule('account-id', 'rule-id');

// Create conversion rule
const rule = await client.pixel.createConversionRule('account-id', {
  display_name: 'Purchase Completed',
  type: 'EVENT_BASED',
  category: 'PURCHASE',
  event_name: 'purchase',
  conditions: [],
  effect: {
    type: 'DYNAMIC_VALUE',
    currency: 'USD',
    value_parameter: 'order_total',
  },
  conversion_window_days: 30,
  view_through_window_days: 1,
});

// Archive / Unarchive
await client.pixel.archiveConversionRule('account-id', 'rule-id');
await client.pixel.unarchiveConversionRule('account-id', 'rule-id');

// Custom audience rules
const audienceRules = await client.pixel.listCustomAudienceRules('account-id');

const audienceRule = await client.pixel.createCustomAudienceRule('account-id', {
  display_name: 'Cart Abandoners',
  conditions: [
    { type: 'EVENT_NAME', operator: 'EQUALS', value: 'add_to_cart' },
  ],
  ttl_days: 7,
});

// Pause / Resume / Archive
await client.pixel.pauseCustomAudienceRule('account-id', 'rule-id');
await client.pixel.resumeCustomAudienceRule('account-id', 'rule-id');
await client.pixel.archiveCustomAudienceRule('account-id', 'rule-id');
```

### Reports

```typescript
// Campaign summary report (by dimension)
const report = await client.reports.campaignSummary('account-id', 'day', {
  start_date: '2024-01-01',
  end_date: '2024-01-31',
});

// Available dimensions: 'day', 'week', 'month', 'campaign_breakdown', 'site_breakdown',
//   'country_breakdown', 'platform_breakdown', 'by_hour_of_day', 'region_breakdown',
//   'dma_breakdown', 'campaign_day_breakdown', 'campaign_site_day_breakdown', and more
const byPlatform = await client.reports.campaignSummary('account-id', 'platform_breakdown', {
  start_date: '2024-01-01',
  end_date: '2024-01-31',
  campaign: '12345', // Optional filter
});

// Report data
for (const row of report.results) {
  console.log(`${row.date}: ${row.clicks} clicks, $${row.spent} spent, ${row.ctr}% CTR`);
}

// Top campaign content report
const topContent = await client.reports.topCampaignContent('account-id', {
  start_date: '2024-01-01',
  end_date: '2024-01-31',
  limit: 100,
});

// Realtime campaign report (rate limited: 10 req/min)
const realtime = await client.reports.realtimeCampaign('account-id', 'by_campaign', {
  start_date: '2024-01-15T00:00:00',
  end_date: '2024-01-15T23:59:59',
});

// Realtime ads report (requires item IDs)
const realtimeAds = await client.reports.realtimeAds('account-id', 'by_item', {
  start_date: '2024-01-15T00:00:00',
  end_date: '2024-01-15T23:59:59',
  item: '1001,1002',
});
```

### Publishers

```typescript
// List available publishers (requires admin network)
const publishers = await client.publishers.list('account-id');

// Get blocked publishers
const blocked = await client.publishers.getBlocked('account-id');

// Block / Unblock publishers
await client.publishers.blockPublisher('account-id', 'site.com');
await client.publishers.unblockPublisher('account-id', 'site.com');

// Bulk update blocked publishers
await client.publishers.updateBlocked('account-id', {
  sites: ['site1.com', 'site2.com'],
});

// Clear all blocks
await client.publishers.clearBlocked('account-id');
```

### Dictionary (Reference Data)

```typescript
// Geographic data
const countries = await client.dictionary.getCountries();
const regions = await client.dictionary.getRegions('US');
const dmas = await client.dictionary.getDMAs('US');

// Platform/device data
const platforms = await client.dictionary.getPlatforms();

// Audience segments
const marketplace = await client.dictionary.getMarketplaceAudiences('account-id');
const contextual = await client.dictionary.getContextualSegments('account-id');
```

### Combined Audiences

```typescript
// List available audiences for targeting
const available = await client.combinedAudiences.listAvailable('account-id');

// List combined audiences
const audiences = await client.combinedAudiences.list('account-id');

// Get single combined audience
const audience = await client.combinedAudiences.get('account-id', 'audience-id');

// Create combined audience
const audience = await client.combinedAudiences.create('account-id', {
  name: 'High Value Users',
  rules: [
    { type: 'INCLUDE', audience_id: 'audience-1' },
    { type: 'EXCLUDE', audience_id: 'audience-2' },
  ],
});
```

### Shared Budgets

```typescript
// List shared budgets (base fields)
const { results } = await client.sharedBudgets.listBase('account-id');

// Get a shared budget
const budget = await client.sharedBudgets.get('account-id', 'budget-id');

// Create shared budget
const budget = await client.sharedBudgets.create('account-id', {
  name: 'Q1 Budget',
  marketing_objective: 'DRIVE_WEBSITE_TRAFFIC',
  spending_limit_model: 'MONTHLY',
  spending_limit: 5000,
  daily_cap: 200,
});

// Update shared budget
await client.sharedBudgets.update('account-id', 'budget-id', {
  spending_limit: 10000,
});
```

### First Party Audiences

```typescript
// List first party audiences
const audiences = await client.firstPartyAudiences.list('account-id');

// Get single audience
const audience = await client.firstPartyAudiences.get('account-id', 'audience-id');

// Create first party audience
const audience = await client.firstPartyAudiences.create('account-id', {
  name: 'My Audience',
  ttl_in_days: 30,
});

// Add/remove users
await client.firstPartyAudiences.addUsers('account-id', 'audience-id', {
  operation: 'ADD',
  users: [
    { type: 'EMAIL_SHA256', id: 'hashed-email-1' },
    { type: 'EMAIL_SHA256', id: 'hashed-email-2' },
  ],
});
```

## Error Handling

The SDK provides typed error classes for different scenarios:

```typescript
import {
  TaboolaError,
  TaboolaAuthError,
  TaboolaValidationError,
  TaboolaNotFoundError,
  TaboolaRateLimitError,
  TaboolaForbiddenError,
} from 'taboola-backstage-sdk';

try {
  await client.campaigns.get('account-id', 'invalid-id');
} catch (error) {
  if (error instanceof TaboolaNotFoundError) {
    console.error('Campaign not found');
  } else if (error instanceof TaboolaAuthError) {
    console.error('Authentication failed');
  } else if (error instanceof TaboolaValidationError) {
    console.error('Validation error:', error.fieldErrors);
  } else if (error instanceof TaboolaRateLimitError) {
    console.error(`Rate limited. Retry after ${error.retryAfter}s`);
  } else if (error instanceof TaboolaForbiddenError) {
    console.error('Access denied');
  } else if (error instanceof TaboolaError) {
    console.error(`API error: ${error.message} (${error.statusCode})`);
  }
}
```

## TypeScript

All types are exported for use in your application:

```typescript
import type {
  // Core types
  Campaign,
  CampaignBase,
  CampaignItem,
  Account,
  SharedBudget,

  // Request types
  CreateCampaignRequest,
  UpdateCampaignRequest,
  CreateItemRequest,
  CreateSharedBudgetRequest,

  // Report types
  CampaignSummaryReport,
  CampaignSummaryRow,
  RealtimeCampaignReport,

  // Targeting types
  PostalCodeTargeting,
  AudienceTargeting,
  MarkingLabelsTargeting,

  // Pixel types
  ConversionRule,
  CustomAudienceRule,

  // Enums / dimension types
  MarketingObjective,
  BidStrategy,
  CampaignStatus,
  ItemStatus,
  ReportDimension,
  RealtimeCampaignDimension,
} from 'taboola-backstage-sdk';
```

## CommonJS Usage

```javascript
const { TaboolaClient } = require('taboola-backstage-sdk');

const client = new TaboolaClient({
  clientId: process.env.TABOOLA_CLIENT_ID,
  clientSecret: process.env.TABOOLA_CLIENT_SECRET,
});
```

## Requirements

- Node.js 18.0.0 or higher

## API Documentation

For detailed API documentation, see the [Taboola Backstage API Reference](https://developers.taboola.com/backstage-api/reference).

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Links

- [Taboola Backstage API Documentation](https://developers.taboola.com/backstage-api/reference)
- [npm Package](https://www.npmjs.com/package/taboola-backstage-sdk)
- [GitHub Repository](https://github.com/0xARYA/taboola-backstage-sdk)
