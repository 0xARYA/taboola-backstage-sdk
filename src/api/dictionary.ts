/**
 * Dictionary API
 *
 * Reference data and enum values for the Taboola Backstage API.
 * Provides lists of countries, platforms, operating systems, browsers,
 * audience segments, and other reference data needed for targeting.
 */

import type { HttpClient } from '../utils/http.js';
import type {
  Country,
  Region,
  DMA,
  PostalCode,
  Platform,
  OperatingSystemInfo,
  OSVersion,
  Browser,
  DayOfWeek,
  MinimumCPC,
  MarketplaceAudience,
  LookalikeAudience,
  ContextualSegment,
  DictionaryListResponse,
  CampaignEnums,
  ItemEnums,
  PostalCodeSearchParams,
  ImageLibraryLanguage,
  ImageTaxonomy,
} from '../types/dictionary.js';

/**
 * Dictionary API for reference data
 */
export class DictionaryAPI {
  constructor(private readonly http: HttpClient) {}

  // ===== Geographic =====

  /**
   * Get list of all supported countries
   */
  async getCountries(): Promise<Country[]> {
    const response = await this.http.get<DictionaryListResponse<Country>>(
      'resources/countries'
    );
    return response.results;
  }

  /**
   * Get regions/states within a country
   *
   * @param countryCode - Country code (e.g., 'US', 'GB')
   */
  async getRegions(countryCode: string): Promise<Region[]> {
    const response = await this.http.get<DictionaryListResponse<Region>>(
      `resources/countries/${countryCode}/regions`
    );
    return response.results;
  }

  /**
   * Get DMAs (Designated Market Areas) for a country
   * Note: Only available for US
   *
   * @param countryCode - Country code (typically 'US')
   */
  async getDMAs(countryCode: string): Promise<DMA[]> {
    const response = await this.http.get<DictionaryListResponse<DMA>>(
      `resources/countries/${countryCode}/dma`
    );
    return response.results;
  }

  /**
   * Get postal codes for a country
   *
   * @param countryCode - Country code (e.g., 'US', 'GB')
   * @param params - Optional search and pagination parameters
   */
  async getPostalCodes(
    countryCode: string,
    params?: PostalCodeSearchParams
  ): Promise<PostalCode[]> {
    const searchParams = new URLSearchParams();
    if (params?.search) {
      searchParams.set('search', params.search);
    }
    if (params?.page !== undefined) {
      searchParams.set('page', String(params.page));
    }
    if (params?.page_size !== undefined) {
      searchParams.set('page_size', String(params.page_size));
    }

    const queryString = searchParams.toString();
    const path = `resources/countries/${countryCode}/postal`;
    const url = queryString ? `${path}?${queryString}` : path;

    const response = await this.http.get<DictionaryListResponse<PostalCode>>(url);
    return response.results;
  }

  // ===== Device Targeting =====

  /**
   * Get list of supported platforms
   */
  async getPlatforms(): Promise<Platform[]> {
    const response = await this.http.get<DictionaryListResponse<Platform>>(
      'resources/platforms'
    );
    return response.results;
  }

  /**
   * Get list of supported operating systems
   */
  async getOperatingSystems(): Promise<OperatingSystemInfo[]> {
    const response = await this.http.get<DictionaryListResponse<OperatingSystemInfo>>(
      'resources/operating-systems'
    );
    return response.results;
  }

  /**
   * Get list of iOS versions for targeting
   */
  async getIOSVersions(): Promise<OSVersion[]> {
    const response = await this.http.get<DictionaryListResponse<OSVersion>>(
      'resources/operating-systems/IOS/versions'
    );
    return response.results;
  }

  /**
   * Get list of Android versions for targeting
   */
  async getAndroidVersions(): Promise<OSVersion[]> {
    const response = await this.http.get<DictionaryListResponse<OSVersion>>(
      'resources/operating-systems/ANDROID/versions'
    );
    return response.results;
  }

  /**
   * Get list of supported browsers
   */
  async getBrowsers(): Promise<Browser[]> {
    const response = await this.http.get<DictionaryListResponse<Browser>>(
      'resources/browsers'
    );
    return response.results;
  }

  // ===== Enums =====

  /**
   * Get campaign property enums (statuses, bid strategies, etc.)
   */
  async getCampaignEnums(): Promise<CampaignEnums> {
    return this.http.get<CampaignEnums>('resources/campaigns-properties/enums');
  }

  /**
   * Get item property enums (statuses, types, etc.)
   */
  async getItemEnums(): Promise<ItemEnums> {
    return this.http.get<ItemEnums>('resources/items-properties/enums');
  }

  /**
   * Get days of week for activity scheduling
   */
  async getDaysOfWeek(): Promise<DayOfWeek[]> {
    const response = await this.http.get<DictionaryListResponse<DayOfWeek>>(
      'resources/days-of-week'
    );
    return response.results;
  }

  // ===== Possible Values =====

  /**
   * Get possible values for campaign category
   */
  async getCampaignCategories(): Promise<string[]> {
    const response = await this.http.get<DictionaryListResponse<{ value: string }>>(
      'resources/campaigns-properties/category/possible-values'
    );
    return response.results.map((r) => r.value);
  }

  /**
   * Get possible values for item status
   */
  async getItemStatuses(): Promise<string[]> {
    const response = await this.http.get<DictionaryListResponse<{ value: string }>>(
      'resources/items-properties/status/possible-values'
    );
    return response.results.map((r) => r.value);
  }

  /**
   * Get possible values for item CTA (call-to-action)
   */
  async getItemCTAs(): Promise<string[]> {
    const response = await this.http.get<DictionaryListResponse<{ value: string }>>(
      'resources/items-properties/cta/possible-values'
    );
    return response.results.map((r) => r.value);
  }

  /**
   * Get minimum CPC values per country/platform
   */
  async getMinimumCPCs(): Promise<MinimumCPC[]> {
    const response = await this.http.get<DictionaryListResponse<MinimumCPC>>(
      'resources/minimum-cpc'
    );
    return response.results;
  }

  // ===== Image Library =====

  /**
   * Get supported languages for image library search
   */
  async getImageLibraryLanguages(): Promise<ImageLibraryLanguage[]> {
    const response = await this.http.get<DictionaryListResponse<ImageLibraryLanguage>>(
      'resources/image-library/languages'
    );
    return response.results;
  }

  /**
   * Get image taxonomies for categorizing images
   *
   * @param accountId - Account ID
   */
  async getImageTaxonomies(accountId: string): Promise<ImageTaxonomy[]> {
    const response = await this.http.get<DictionaryListResponse<ImageTaxonomy>>(
      `${accountId}/images/taxonomies`
    );
    return response.results;
  }

  // ===== Audience Targeting =====

  /**
   * Get marketplace audience segments available for targeting
   *
   * @param accountId - Account ID
   */
  async getMarketplaceAudiences(accountId: string): Promise<MarketplaceAudience[]> {
    const response = await this.http.get<DictionaryListResponse<MarketplaceAudience>>(
      `${accountId}/dictionary/audience/segments`
    );
    return response.results;
  }

  /**
   * Get marketplace audience segments for a specific country
   *
   * @param accountId - Account ID
   * @param countryCode - Country code (e.g., 'US', 'GB')
   */
  async getMarketplaceAudiencesByCountry(
    accountId: string,
    countryCode: string
  ): Promise<MarketplaceAudience[]> {
    const response = await this.http.get<DictionaryListResponse<MarketplaceAudience>>(
      `${accountId}/dictionary/audience/segments/${countryCode}`
    );
    return response.results;
  }

  /**
   * Get lookalike audiences available for targeting
   *
   * @param accountId - Account ID
   */
  async getLookalikeAudiences(accountId: string): Promise<LookalikeAudience[]> {
    const response = await this.http.get<DictionaryListResponse<LookalikeAudience>>(
      `${accountId}/dictionary/lookalike-audiences`
    );
    return response.results;
  }

  /**
   * Get lookalike audiences for a specific country
   *
   * @param accountId - Account ID
   * @param countryCode - Country code (e.g., 'US', 'GB')
   */
  async getLookalikeAudiencesByCountry(
    accountId: string,
    countryCode: string
  ): Promise<LookalikeAudience[]> {
    const response = await this.http.get<DictionaryListResponse<LookalikeAudience>>(
      `${accountId}/dictionary/lookalike-audiences/${countryCode}`
    );
    return response.results;
  }

  /**
   * Get contextual segments available for targeting
   *
   * @param accountId - Account ID
   */
  async getContextualSegments(accountId: string): Promise<ContextualSegment[]> {
    const response = await this.http.get<DictionaryListResponse<ContextualSegment>>(
      `${accountId}/dictionary/contextual-segments`
    );
    return response.results;
  }
}
