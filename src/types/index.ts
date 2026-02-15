/**
 * Type exports for Taboola Backstage SDK
 */

// Common types
export type {
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
  RealtimeAdsDimension,
  RealtimeCampaignDimension,
  ReportDimension,
  SpendingLimitModel,
  TargetingType,
  TargetingValue,
  TrafficAllocationMode,
} from './common.js';

// Auth types
export type { StoredToken, TaboolaConfig, TokenResponse } from './auth.js';

// Account types
export type {
  Account,
  AccountType,
  AdvertiserAccount,
  AllowedAccountsResponse,
  CampaignType,
  NetworkAdvertisersResponse,
  PartnerType,
} from './account.js';

// Campaign types
export type {
  ActivitySchedule,
  ActivityScheduleRule,
  BulkCampaignUpdate,
  BulkCampaignUpdateRequest,
  Campaign,
  CampaignBase,
  CampaignBaseListResponse,
  CampaignListResponse,
  CampaignPatchRequest,
  CampaignReachEstimatorRequest,
  CampaignReachEstimatorResponse,
  CampaignTargetingCollection,
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
} from './campaign.js';

// Item types
export type {
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
} from './item.js';

// Dictionary types
export type {
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
} from './dictionary.js';

// Publisher types
export type {
  BlockedPublisher,
  BlockedPublishersResponse,
  Publisher,
  PublisherListResponse,
  UpdateBlockedPublishersRequest,
} from './publisher.js';

// Targeting types
export type {
  AudienceSegment,
  AudienceTargeting,
  ContextualSegmentValue,
  ContextualTargeting,
  FirstPartyAudienceTargeting,
  MarkingLabelsTargeting,
  PostalCodeTargeting,
  PostalCodeValue,
  UpdateAudienceTargetingRequest,
  UpdateContextualTargetingRequest,
  UpdateFirstPartyAudienceTargetingRequest,
  UpdateMarkingLabelsTargetingRequest,
  UpdatePostalCodeTargetingRequest,
} from './targeting.js';

// Audience types
export type {
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
} from './audience.js';

// Pixel types
export type {
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
} from './pixel.js';

// Shared Budget types
export type {
  CreateSharedBudgetRequest,
  SharedBudget,
  SharedBudgetBase,
  SharedBudgetBaseListResponse,
  SharedBudgetCampaign,
  SharedBudgetCampaignAttribute,
  UpdateSharedBudgetRequest,
} from './shared-budget.js';

// Report types
export type {
  CampaignSummaryReport,
  CampaignSummaryReportParams,
  CampaignSummaryRow,
  RealtimeAdsReport,
  RealtimeAdsReportParams,
  RealtimeAdsRow,
  RealtimeCampaignReport,
  RealtimeCampaignReportParams,
  RealtimeCampaignRow,
  ReportMetadata,
  TopCampaignContentReport,
  TopCampaignContentReportParams,
  TopCampaignContentRow,
} from './report.js';
