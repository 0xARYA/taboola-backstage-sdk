/**
 * Taboola Backstage SDK
 *
 * A comprehensive TypeScript SDK for the Taboola Backstage API.
 * Provides full access to campaign management, reporting, and audience targeting.
 *
 * @packageDocumentation
 */

// Main client
export { TaboolaClient, createClient } from './client.js';

// API modules (for advanced use cases)
export { AccountsAPI } from './api/accounts.js';
export { CampaignsAPI, type ListCampaignsOptions } from './api/campaigns.js';
export { ItemsAPI, type ListItemsOptions } from './api/items.js';
export { DictionaryAPI } from './api/dictionary.js';
export { PublishersAPI } from './api/publishers.js';
export { TargetingAPI } from './api/targeting.js';
export { CombinedAudiencesAPI } from './api/combined-audiences.js';
export { FirstPartyAudiencesAPI } from './api/first-party-audiences.js';
export { PixelAPI } from './api/pixel.js';
export { ReportsAPI } from './api/reports.js';

// Auth (for advanced use cases)
export { OAuthManager } from './auth/oauth.js';

// HTTP utilities (for advanced use cases)
export { HttpClient, DEFAULT_BASE_URL, type HttpClientOptions } from './utils/http.js';

// Error classes
export {
  TaboolaError,
  TaboolaAuthError,
  TaboolaValidationError,
  TaboolaNotFoundError,
  TaboolaRateLimitError,
  TaboolaForbiddenError,
  TaboolaServerError,
  parseApiError,
} from './errors/index.js';

// All types
export type {
  // Common types
  ApprovalState,
  BidStrategy,
  BrandSafetyProvider,
  CampaignStatus,
  ConnectionType,
  CTAType,
  CurrencyCode,
  DailyAdDeliveryModel,
  DateString,
  ItemStatus,
  ItemType,
  ListResponse,
  MarketingObjective,
  MultiTargeting,
  MultiTargetingState,
  OperatingSystem,
  PaginationParams,
  PlatformType,
  PricingModel,
  ReportDimension,
  SpendingLimitModel,
  TargetingType,
  TargetingValue,
  TrafficAllocationMode,
  // Auth types
  StoredToken,
  TaboolaConfig,
  TokenResponse,
  // Account types
  Account,
  AccountType,
  AdvertiserAccount,
  AllowedAccountsResponse,
  CampaignType,
  NetworkAdvertisersResponse,
  PartnerType,
  // Campaign types
  ActivitySchedule,
  ActivityScheduleRule,
  BulkCampaignUpdate,
  BulkCampaignUpdateRequest,
  Campaign,
  CampaignListResponse,
  CampaignPatchRequest,
  CampaignReachEstimatorRequest,
  CampaignReachEstimatorResponse,
  CreateCampaignRequest,
  ExternalBrandSafety,
  PatchOperation,
  PolicyReview,
  PublisherBidModifier,
  PublisherBidModifierCollection,
  PublisherBidStrategyModifier,
  PublisherBidStrategyModifierCollection,
  UpdateCampaignRequest,
  VerificationPixel,
  ViewabilityTag,
  // Item types
  BulkCreateItemsRequest,
  BulkCreateItemsResponse,
  BulkDeleteItemsRequest,
  BulkUpdateItemsRequest,
  CampaignItem,
  CampaignItemListResponse,
  Coordinates,
  CreateItemRequest,
  CreativeFocus,
  CreativeFocusType,
  CTA,
  ImageLibraryItem,
  ImageLibrarySearchParams,
  ImageLibrarySearchResponse,
  ImageUploadResponse,
  ItemPolicyReview,
  ItemVerificationPixel,
  ItemViewabilityTag,
  RSSChildItem,
  RSSChildrenListResponse,
  UpdateItemRequest,
  // Dictionary types
  Browser,
  CampaignEnums,
  ContextualSegment,
  Country,
  DayOfWeek,
  DMA,
  ItemEnums,
  LookalikeAudience,
  MarketplaceAudience,
  MinimumCPC,
  OperatingSystemInfo,
  OSVersion,
  Platform,
  PostalCode,
  Region,
  // Publisher types
  BlockedPublisher,
  BlockedPublishersResponse,
  Publisher,
  PublisherListResponse,
  UpdateBlockedPublishersRequest,
  // Targeting types
  AudienceSegment,
  AudienceTargeting,
  ContextualSegmentValue,
  ContextualTargeting,
  FirstPartyAudienceTargeting,
  PostalCodeTargeting,
  PostalCodeValue,
  UpdateAudienceTargetingRequest,
  UpdateContextualTargetingRequest,
  UpdateFirstPartyAudienceTargetingRequest,
  UpdatePostalCodeTargetingRequest,
  // Audience types
  AddRemoveUsersRequest,
  AddRemoveUsersResponse,
  AvailableAudience,
  AvailableAudiencesResponse,
  CombinedAudience,
  CombinedAudienceListResponse,
  CombinedAudienceRule,
  CreateCombinedAudienceRequest,
  CreateFirstPartyAudienceRequest,
  FirstPartyAudience,
  FirstPartyAudienceUser,
  UpdateCombinedAudienceRequest,
  // Pixel types
  Condition,
  ConditionOperator,
  ConditionType,
  ConversionRule,
  ConversionRuleListResponse,
  ConversionRuleStatus,
  ConversionRuleType,
  ConversionRuleWithData,
  ConversionRuleWithDataListResponse,
  CreateConversionRuleRequest,
  CreateCustomAudienceRuleRequest,
  CustomAudienceRule,
  CustomAudienceRuleListResponse,
  CustomAudienceRuleStatus,
  Effect,
  EffectType,
  UpdateConversionRuleRequest,
  UpdateCustomAudienceRuleRequest,
  // Report types
  CampaignSummaryReport,
  CampaignSummaryReportParams,
  CampaignSummaryRow,
  RealtimeAdsReport,
  RealtimeAdsRow,
  RealtimeCampaignReport,
  RealtimeCampaignRow,
  RealtimeReportParams,
  ReportMetadata,
  TopCampaignContentReport,
  TopCampaignContentReportParams,
  TopCampaignContentRow,
} from './types/index.js';
