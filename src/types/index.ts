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
  BulkCampaignUpdateRequest,
  AttributionConfig,
  Campaign,
  CampaignConversionRule,
  CampaignConversionRules,
  CampaignBase,
  CampaignBaseListResponse,
  CampaignListResponse,
  CampaignPatchRequest,
  CampaignReachEstimatorRequest,
  CampaignReachEstimatorResponse,
  CampaignTargetingCollection,
  CreateCampaignRequest,
  DuplicateCampaignRequest,
  DuplicateSettings,
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
  BulkCreateItemData,
  BulkCreateItemsRequest,
  BulkCreateItemsResponse,
  BulkDeleteItemsRequest,
  BulkUpdateItemsRequest,
  CampaignItem,
  CampaignItemListResponse,
  Coordinates, // eslint-disable-line @typescript-eslint/no-deprecated
  CreateItemRequest,
  CreativeFocus, // eslint-disable-line @typescript-eslint/no-deprecated
  CreativeFocusType, // eslint-disable-line @typescript-eslint/no-deprecated
  CTA,
  ImageLibraryItem,
  ImageLibrarySearchParams,
  ImageLibrarySearchResponse,
  ImageUploadResponse,
  ItemPolicyReview,
  ItemVerificationPixel,
  ItemViewabilityTag,
  PerformanceVideoData,
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
  BlockedPublishersResponse,
  Publisher,
  PublisherListResponse,
  UpdateBlockedPublishersRequest,
} from './publisher.js';

// Targeting types
export type {
  AudienceTargeting,
  ContextualTargeting,
  FirstPartyAudienceTargeting,
  LookalikeAudienceItem,
  LookalikeAudienceTargeting,
  MarkingLabelsTargeting,
  PostalCodeTargeting,
  TargetingRestriction,
  UpdateAudienceTargetingRequest,
  UpdateContextualTargetingRequest,
  UpdateFirstPartyAudienceTargetingRequest,
  UpdateLookalikeAudienceTargetingRequest,
  UpdateMarkingLabelsTargetingRequest,
  UpdatePostalCodeTargetingRequest,
} from './targeting.js';

// Audience types
export type {
  AudienceUserClusterItem,
  AudienceUserIdentity,
  AudienceUsersRequest,
  AvailableAudience,
  AvailableAudiencesResponse,
  CombinedAudience,
  CombinedAudienceListResponse,
  CombinedAudienceRule,
  CreateCombinedAudienceRequest,
  CreateFirstPartyAudienceRequest,
  FirstPartyAudience,
  UpdateCombinedAudienceRequest,
} from './audience.js';

// Pixel types
export type {
  ConversionCategory,
  ConversionCondition,
  ConversionConditionPredicate,
  ConversionEffect,
  ConversionRule,
  ConversionRuleListResponse,
  ConversionRuleStatus,
  ConversionRuleType,
  ConversionRuleWithData,
  ConversionRuleWithDataListResponse,
  CreateConversionRuleRequest,
  CreateCustomAudienceRuleRequest,
  CustomAudienceCondition,
  CustomAudienceConditionOperator,
  CustomAudienceConditionType,
  CustomAudienceRule,
  CustomAudienceRuleListResponse,
  CustomAudienceRuleStatus,
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
