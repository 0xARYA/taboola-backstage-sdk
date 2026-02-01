/**
 * Test script to verify SDK connection with real API credentials
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
    timeout: 120000, // 2 minute timeout for network accounts
  });

  try {
    console.log('\n=== Testing Taboola Backstage SDK ===\n');

    // Test 1: Get current account
    console.log('1. Getting current account...');
    const account = await client.accounts.getCurrent();
    console.log('   Account ID:', account.account_id);
    console.log('   Account Name:', account.name);
    console.log('   Currency:', account.currency);
    console.log('   Partner Types:', account.partner_types.join(', '));

    // Test 2: Get allowed accounts (for network accounts)
    console.log('\n2. Getting allowed accounts...');
    const { results: allowedAccounts } = await client.accounts.getAllowed();
    console.log(`   Found ${allowedAccounts.length} allowed accounts`);

    // Pick first advertiser account for campaign testing
    const advertiserAccount = allowedAccounts.find(a =>
      a.partner_types.includes('ADVERTISER') && a.account_id !== account.account_id
    ) || account;
    console.log(`   Using account: ${advertiserAccount.account_id}`);

    // Test 3: List campaigns
    console.log('\n3. Listing campaigns...');
    const { results: campaigns } = await client.campaigns.list(advertiserAccount.account_id);
    console.log(`   Found ${campaigns.length} campaigns`);

    if (campaigns.length > 0) {
      const firstCampaign = campaigns[0];
      console.log('\n   First campaign:');
      console.log(`   - ID: ${firstCampaign?.id}`);
      console.log(`   - Name: ${firstCampaign?.name}`);
      console.log(`   - Status: ${firstCampaign?.status}`);
      console.log(`   - CPC: ${firstCampaign?.cpc}`);

      // Test 4: Get items for first campaign
      if (firstCampaign) {
        console.log(`\n4. Listing items for campaign ${firstCampaign.id}...`);
        const { results: items } = await client.items.list(
          advertiserAccount.account_id,
          firstCampaign.id
        );
        console.log(`   Found ${items.length} items`);

        if (items.length > 0) {
          const firstItem = items[0];
          console.log('\n   First item:');
          console.log(`   - ID: ${firstItem?.id}`);
          console.log(`   - Title: ${firstItem?.title}`);
          console.log(`   - Status: ${firstItem?.status}`);
        }
      }
    }

    console.log('\n=== All tests passed! ===\n');
  } catch (error) {
    console.error('\n=== Test failed ===');
    console.error(error);
    process.exit(1);
  }
}

main();
