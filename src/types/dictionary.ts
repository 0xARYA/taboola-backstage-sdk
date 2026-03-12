/**
 * Dictionary API Types
 *
 * Types for Taboola Backstage API reference/dictionary data.
 */

/**
 * Country for geo targeting
 */
export interface Country {
  name: string;
  value: string;
}

/**
 * Region/state within a country
 */
export interface Region {
  name: string;
  value: string;
}

/**
 * DMA (Designated Market Area) - US only
 */
export interface DMA {
  name: string;
  value: string;
  country: string;
}

/**
 * Postal code for geo targeting
 */
export interface PostalCode {
  name: string;
  value: string;
  country: string;
}

/**
 * Platform for device targeting
 */
export interface Platform {
  name: string;
  value: string;
}

/**
 * Operating system for device targeting
 */
export interface OperatingSystemInfo {
  name: string;
  value: string;
}

/**
 * OS version for device targeting
 */
export interface OSVersion {
  name: string;
  value: string;
  os_family: string;
}

/**
 * Browser for device targeting
 */
export interface Browser {
  name: string;
  value: string;
}

/**
 * Day of week for activity scheduling
 */
export interface DayOfWeek {
  name: string;
  value: string;
}

/**
 * Minimum CPC value per country/platform
 */
export interface MinimumCPC {
  country: string;
  platform: string;
  currency: string;
  min_cpc: number;
}

/**
 * Marketplace audience segment
 */
export interface MarketplaceAudience {
  taboola_audience_id: number;
  audience_name: string;
  description: string | null;
  data_partner: string | null;
  data_partner_audience_id: string | null;
  allowed_countries: string[];
  data_partner_group?: string | null;
  taxonomy_categories?: string[] | null;
  audience_size?: number | null;
}

/**
 * Lookalike audience
 */
export interface LookalikeAudience {
  rule_id: number;
  audience_name: string;
  similarity_level_to_size: Record<number, number> | null;
}

/**
 * Contextual segment
 */
export interface ContextualSegment {
  id: number;
  label: string;
  description: string | null;
  taxonomy: string | null;
  provider?: string | null;
  allowed_countries?: string[] | null;
  size?: number | null;
}

/**
 * Generic dictionary response wrapper
 */
export interface DictionaryListResponse<T> {
  results: T[];
}

/**
 * Campaign property enums response
 */
export type CampaignEnums = Record<string, EnumValue[]>;

/**
 * Item property enums response
 */
export type ItemEnums = Record<string, EnumValue[]>;

/**
 * Enum value object
 */
export interface EnumValue {
  name: string;
  value: string;
  description: string | null;
}

/**
 * Postal code search params
 */
export interface PostalCodeSearchParams {
  search?: string | undefined;
  page?: number | undefined;
  page_size?: number | undefined;
}

/**
 * Supported image library language
 */
export interface ImageLibraryLanguage {
  name: string;
  value: string;
}

/**
 * Image taxonomy
 */
export interface ImageTaxonomy {
  id: string;
  name: string;
  parent_id: string | null;
  has_children: boolean;
}
