import type { ShopifyGraphQLResponse } from '../../types/shopify';

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

const STOREFRONT_API_VERSION = '2024-01';

interface ShopifyClientConfig {
  storeDomain: string;
  storefrontToken: string;
  apiVersion?: string;
}

class ShopifyClient {
  private endpoint: string;
  private headers: HeadersInit;
  private isConfigured: boolean;

  constructor(config: ShopifyClientConfig) {
    this.isConfigured = Boolean(config.storeDomain && config.storefrontToken);
    
    const apiVersion = config.apiVersion || STOREFRONT_API_VERSION;
    this.endpoint = `https://${config.storeDomain}/api/${apiVersion}/graphql.json`;
    
    this.headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': config.storefrontToken,
    };
  }

  get configured(): boolean {
    return this.isConfigured;
  }

  async query<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
    if (!this.isConfigured) {
      console.warn('Shopify client not configured. Using fallback data.');
      return null;
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
      }

      const json: ShopifyGraphQLResponse<T> = await response.json();

      if (json.errors && json.errors.length > 0) {
        console.error('Shopify GraphQL errors:', json.errors);
        throw new Error(json.errors[0].message);
      }

      return json.data ?? null;
    } catch (error) {
      console.error('Shopify query failed:', error);
      return null;
    }
  }
}

// Singleton instance
export const shopifyClient = new ShopifyClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  storefrontToken: SHOPIFY_STOREFRONT_TOKEN,
});

export default shopifyClient;
