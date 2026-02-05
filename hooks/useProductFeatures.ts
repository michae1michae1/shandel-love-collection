import { useState, useEffect } from 'react';
import { shopifyClient } from '../lib/shopify/client';
import { PRODUCT_FEATURES_QUERY } from '../lib/shopify/queries';
import { transformProductFeature } from '../lib/shopify/transformers';
import { DEFAULT_PRODUCT_FEATURES } from '../types/content';
import type { ProductFeature } from '../types/content';
import type { ShopifyMetaobjectsResponse } from '../types/shopify';

interface UseProductFeaturesResult {
  features: ProductFeature[];
  loading: boolean;
  error: Error | null;
  isUsingFallback: boolean;
}

export function useProductFeatures(): UseProductFeaturesResult {
  const [features, setFeatures] = useState<ProductFeature[]>(DEFAULT_PRODUCT_FEATURES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(!shopifyClient.configured);

  useEffect(() => {
    async function fetchFeatures() {
      if (!shopifyClient.configured) {
        setLoading(false);
        setIsUsingFallback(true);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await shopifyClient.query<ShopifyMetaobjectsResponse>(PRODUCT_FEATURES_QUERY);

        if (data?.metaobjects?.nodes?.length) {
          const featuresList = data.metaobjects.nodes
            .map(transformProductFeature)
            .sort((a, b) => a.order - b.order);
          setFeatures(featuresList);
          setIsUsingFallback(false);
        } else {
          setIsUsingFallback(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product features'));
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatures();
  }, []);

  return { features, loading, error, isUsingFallback };
}

export default useProductFeatures;
