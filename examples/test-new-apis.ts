/**
 * Test script to verify new SDK APIs with real credentials
 */

import { TaboolaClient } from '../src/index.js';

async function main() {
  const clientId = process.env.TABOOLA_CLIENT_ID;
  const clientSecret = process.env.TABOOLA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Error: TABOOLA_CLIENT_ID and TABOOLA_CLIENT_SECRET environment variables are required');
    console.error('Please create a .env file with your credentials');
    process.exit(1);
  }

  const client = new TaboolaClient({
    clientId,
    clientSecret,
    debug: true,
    timeout: 120000,
  });

  try {
    console.log('\n=== Testing New Taboola Backstage SDK APIs ===\n');

    // Get current account for testing
    const account = await client.accounts.getCurrent();
    console.log(`Using account: ${account.account_id}\n`);

    // Get allowed accounts
    const { results: allowedAccounts } = await client.accounts.getAllowed();
    const advertiserAccount = allowedAccounts.find(a =>
      a.partner_types.includes('ADVERTISER') && a.account_id !== account.account_id
    ) || account;
    const accountId = advertiserAccount.account_id;

    // ===== Test Dictionary API =====
    console.log('=== Dictionary API ===\n');

    console.log('1. Getting countries...');
    const countries = await client.dictionary.getCountries();
    console.log(`   Found ${countries.length} countries`);
    console.log(`   First 3: ${countries.slice(0, 3).map(c => c.name).join(', ')}`);

    console.log('\n2. Getting platforms...');
    const platforms = await client.dictionary.getPlatforms();
    console.log(`   Found ${platforms.length} platforms`);
    console.log(`   Platforms: ${platforms.map(p => p.name).join(', ')}`);

    console.log('\n3. Getting operating systems...');
    try {
      const operatingSystems = await client.dictionary.getOperatingSystems();
      console.log(`   Found ${operatingSystems.length} operating systems`);
    } catch (e) {
      console.log(`   Not available: ${(e as Error).message}`);
    }

    console.log('\n4. Getting browsers...');
    try {
      const browsers = await client.dictionary.getBrowsers();
      console.log(`   Found ${browsers.length} browsers`);
    } catch (e) {
      console.log(`   Not available: ${(e as Error).message}`);
    }

    console.log('\n5. Getting campaign enums...');
    try {
      const campaignEnums = await client.dictionary.getCampaignEnums();
      console.log(`   Bid strategies: ${campaignEnums.bid_strategy?.slice(0, 3).map(e => e.value).join(', ')}...`);
    } catch (e) {
      console.log(`   Not available: ${(e as Error).message}`);
    }

    // ===== Test Publishers API =====
    console.log('\n=== Publishers API ===\n');

    console.log('1. Listing publishers...');
    try {
      const publishers = await client.publishers.list(accountId);
      console.log(`   Found ${publishers.length} publishers`);
      if (publishers.length > 0) {
        console.log(`   First: ${publishers[0]?.site} (ID: ${publishers[0]?.site_id})`);
      }
    } catch (e) {
      console.log(`   Not available (requires admin network): ${(e as Error).message}`);
    }

    console.log('\n2. Getting blocked publishers...');
    try {
      const blocked = await client.publishers.getBlocked(accountId);
      console.log(`   ${blocked.length} publishers blocked at account level`);
    } catch (e) {
      console.log(`   Not available: ${(e as Error).message}`);
    }

    // ===== Test Pixel API =====
    console.log('\n=== Pixel API ===\n');

    console.log('1. Listing conversion rules...');
    try {
      const conversionRules = await client.pixel.listConversionRules(accountId);
      console.log(`   Found ${conversionRules.length} conversion rules`);
      if (conversionRules.length > 0) {
        console.log(`   First: ${conversionRules[0]?.display_name} (${conversionRules[0]?.status})`);
      }
    } catch (e) {
      console.log(`   Not available: ${(e as Error).message}`);
    }

    console.log('\n2. Listing custom audience rules...');
    try {
      const audienceRules = await client.pixel.listCustomAudienceRules(accountId);
      console.log(`   Found ${audienceRules.length} custom audience rules`);
    } catch (e) {
      console.log(`   Not available: ${(e as Error).message}`);
    }

    // ===== Test Reports API =====
    console.log('\n=== Reports API ===\n');

    // Calculate date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    console.log('1. Getting campaign summary report (by day)...');
    try {
      const summaryReport = await client.reports.campaignSummary(accountId, 'day', {
        start_date: formatDate(startDate) as `${number}-${number}-${number}`,
        end_date: formatDate(endDate) as `${number}-${number}-${number}`,
      });
      console.log(`   Found ${summaryReport.results.length} rows`);
      if (summaryReport.results.length > 0) {
        const firstRow = summaryReport.results[0];
        console.log(`   First row - Date: ${firstRow?.date}, Clicks: ${firstRow?.clicks}, Spent: $${firstRow?.spent}`);
      }
    } catch (e) {
      console.log(`   Report not available: ${(e as Error).message}`);
    }

    console.log('\n2. Getting realtime campaign report...');
    try {
      const realtimeReport = await client.reports.realtimeCampaign(accountId);
      console.log(`   Found ${realtimeReport.results.length} campaigns in realtime data`);
    } catch (e) {
      console.log(`   Realtime report not available: ${(e as Error).message}`);
    }

    // ===== Test Targeting API (requires a campaign) =====
    console.log('\n=== Targeting API ===\n');

    const { results: campaigns } = await client.campaigns.list(accountId);
    if (campaigns.length > 0) {
      const campaignId = campaigns[0]!.id;
      console.log(`Testing with campaign: ${campaignId}`);

      console.log('\n1. Getting postal code targeting...');
      try {
        const postalTargeting = await client.targeting.getPostalCodes(accountId, campaignId);
        console.log(`   Type: ${postalTargeting.type}, Values: ${postalTargeting.values?.length || 0}`);
      } catch (e) {
        console.log(`   Not available: ${(e as Error).message}`);
      }

      console.log('\n2. Getting marketplace audience targeting...');
      try {
        const audienceTargeting = await client.targeting.getMarketplaceAudiences(accountId, campaignId);
        console.log(`   Type: ${audienceTargeting.type}, Segments: ${audienceTargeting.collection?.length || 0}`);
      } catch (e) {
        console.log(`   Not available: ${(e as Error).message}`);
      }

      console.log('\n3. Getting contextual targeting...');
      try {
        const contextualTargeting = await client.targeting.getContextual(accountId, campaignId);
        console.log(`   Type: ${contextualTargeting.type}, Segments: ${contextualTargeting.collection?.length || 0}`);
      } catch (e) {
        console.log(`   Not available: ${(e as Error).message}`);
      }
    } else {
      console.log('No campaigns available for targeting tests');
    }

    // ===== Test Combined Audiences API =====
    console.log('\n=== Combined Audiences API ===\n');

    console.log('1. Listing available audiences...');
    try {
      const available = await client.combinedAudiences.listAvailable(accountId);
      console.log(`   Found ${available.length} available audiences`);
    } catch (e) {
      console.log(`   Not available: ${(e as Error).message}`);
    }

    console.log('\n2. Listing combined audiences...');
    try {
      const combined = await client.combinedAudiences.list(accountId);
      console.log(`   Found ${combined.length} combined audiences`);
    } catch (e) {
      console.log(`   Not available: ${(e as Error).message}`);
    }

    // ===== Test First Party Audiences API =====
    console.log('\n=== First Party Audiences API ===\n');

    console.log('1. Listing first party audiences...');
    try {
      const firstParty = await client.firstPartyAudiences.list(accountId);
      console.log(`   Found ${firstParty.length} first party audiences`);
    } catch (e) {
      console.log(`   Not available: ${(e as Error).message}`);
    }

    console.log('\n=== All API tests completed! ===\n');
  } catch (error) {
    console.error('\n=== Test failed ===');
    console.error(error);
    process.exit(1);
  }
}

main();
