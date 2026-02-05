import { useState, useEffect } from 'react';
import { shopifyClient } from '../lib/shopify/client';
import { HERO_SECTION_QUERY } from '../lib/shopify/queries';
import { transformHeroContent } from '../lib/shopify/transformers';
import { DEFAULT_HERO_CONTENT } from '../types/content';
import type { HeroContent } from '../types/content';
import type { ShopifyMetaobjectsResponse } from '../types/shopify';

interface UseHeroContentResult {
  heroContent: HeroContent;
  loading: boolean;
  error: Error | null;
  isUsingFallback: boolean;
}

export function useHeroContent(): UseHeroContentResult {
  const [heroContent, setHeroContent] = useState<HeroContent>(DEFAULT_HERO_CONTENT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(!shopifyClient.configured);

  useEffect(() => {
    async function fetchHeroContent() {
      if (!shopifyClient.configured) {
        setLoading(false);
        setIsUsingFallback(true);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await shopifyClient.query<ShopifyMetaobjectsResponse>(HERO_SECTION_QUERY);

        if (data?.metaobjects?.nodes?.[0]) {
          setHeroContent(transformHeroContent(data.metaobjects.nodes[0]));
          setIsUsingFallback(false);
        } else {
          setIsUsingFallback(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch hero content'));
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroContent();
  }, []);

  return { heroContent, loading, error, isUsingFallback };
}

export default useHeroContent;
