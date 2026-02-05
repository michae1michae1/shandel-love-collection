import { useState, useEffect } from 'react';
import { shopifyClient } from '../lib/shopify/client';
import { SITE_SETTINGS_QUERY } from '../lib/shopify/queries';
import { transformSiteSettings } from '../lib/shopify/transformers';
import { DEFAULT_SITE_SETTINGS } from '../types/content';
import type { SiteSettings } from '../types/content';
import type { ShopifyMetaobjectsResponse } from '../types/shopify';

interface UseSiteSettingsResult {
  siteSettings: SiteSettings;
  loading: boolean;
  error: Error | null;
  isUsingFallback: boolean;
}

export function useSiteSettings(): UseSiteSettingsResult {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(!shopifyClient.configured);

  useEffect(() => {
    async function fetchSiteSettings() {
      if (!shopifyClient.configured) {
        setLoading(false);
        setIsUsingFallback(true);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await shopifyClient.query<ShopifyMetaobjectsResponse>(SITE_SETTINGS_QUERY);

        if (data?.metaobjects?.nodes?.[0]) {
          setSiteSettings(transformSiteSettings(data.metaobjects.nodes[0]));
          setIsUsingFallback(false);
        } else {
          setIsUsingFallback(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch site settings'));
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    fetchSiteSettings();
  }, []);

  return { siteSettings, loading, error, isUsingFallback };
}

export default useSiteSettings;
