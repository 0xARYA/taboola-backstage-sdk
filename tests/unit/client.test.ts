/**
 * TaboolaClient tests
 */

import { describe, it, expect } from 'vitest';
import { TaboolaClient, createClient } from '../../src/index.js';

describe('TaboolaClient', () => {
  const validConfig = {
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  describe('constructor', () => {
    it('should create a client with valid config', () => {
      const client = new TaboolaClient(validConfig);
      expect(client).toBeInstanceOf(TaboolaClient);
    });

    it('should throw error when clientId is missing', () => {
      expect(() => {
        new TaboolaClient({
          clientId: '',
          clientSecret: 'secret',
        });
      }).toThrow('clientId is required');
    });

    it('should throw error when clientSecret is missing', () => {
      expect(() => {
        new TaboolaClient({
          clientId: 'id',
          clientSecret: '',
        });
      }).toThrow('clientSecret is required');
    });

    it('should accept optional configuration', () => {
      const client = new TaboolaClient({
        ...validConfig,
        baseUrl: 'https://custom.api.com',
        timeout: 60000,
        retries: 5,
        debug: true,
      });
      expect(client).toBeInstanceOf(TaboolaClient);
    });
  });

  describe('API modules', () => {
    it('should have accounts API', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.accounts).toBeDefined();
      expect(typeof client.accounts.getCurrent).toBe('function');
    });

    it('should have campaigns API', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.campaigns).toBeDefined();
      expect(typeof client.campaigns.list).toBe('function');
      expect(typeof client.campaigns.create).toBe('function');
    });

    it('should have items API', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.items).toBeDefined();
      expect(typeof client.items.list).toBe('function');
      expect(typeof client.items.create).toBe('function');
    });

    it('should have dictionary API', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.dictionary).toBeDefined();
      expect(typeof client.dictionary.getCountries).toBe('function');
    });

    it('should have publishers API', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.publishers).toBeDefined();
      expect(typeof client.publishers.list).toBe('function');
    });

    it('should have targeting API', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.targeting).toBeDefined();
      expect(typeof client.targeting.getPostalCodes).toBe('function');
    });

    it('should have combinedAudiences API', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.combinedAudiences).toBeDefined();
      expect(typeof client.combinedAudiences.list).toBe('function');
    });

    it('should have firstPartyAudiences API', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.firstPartyAudiences).toBeDefined();
      expect(typeof client.firstPartyAudiences.list).toBe('function');
    });

    it('should have pixel API', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.pixel).toBeDefined();
      expect(typeof client.pixel.listConversionRules).toBe('function');
    });

    it('should have reports API', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.reports).toBeDefined();
      expect(typeof client.reports.campaignSummary).toBe('function');
    });
  });

  describe('baseUrl', () => {
    it('should return default base URL', () => {
      const client = new TaboolaClient(validConfig);
      expect(client.baseUrl).toBe('https://backstage.taboola.com/backstage/api/1.0');
    });
  });

  describe('token management', () => {
    it('should have refreshToken method', () => {
      const client = new TaboolaClient(validConfig);
      expect(typeof client.refreshToken).toBe('function');
    });

    it('should have clearToken method', () => {
      const client = new TaboolaClient(validConfig);
      expect(typeof client.clearToken).toBe('function');
    });
  });
});

describe('createClient', () => {
  it('should create a TaboolaClient instance', () => {
    const client = createClient({
      clientId: 'test-id',
      clientSecret: 'test-secret',
    });
    expect(client).toBeInstanceOf(TaboolaClient);
  });
});
