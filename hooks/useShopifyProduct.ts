import { useState, useEffect } from 'react';
import { shopifyClient } from '../lib/shopify/client';
import { PRODUCT_BY_HANDLE_QUERY } from '../lib/shopify/queries';
import { transformProduct } from '../lib/shopify/transformers';
import { DEFAULT_PRODUCT_DATA } from '../types/content';
import type { ProductData } from '../types/content';
import type { ShopifyProductResponse } from '../types/shopify';

interface UseShopifyProductResult {
  product: ProductData;
  loading: boolean;
  error: Error | null;
  isUsingFallback: boolean;
}

export function useShopifyProduct(handle: string): UseShopifyProductResult {
  const [product, setProduct] = useState<ProductData>(DEFAULT_PRODUCT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(!shopifyClient.configured);

  useEffect(() => {
    async function fetchProduct() {
      if (!shopifyClient.configured) {
        setLoading(false);
        setIsUsingFallback(true);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await shopifyClient.query<ShopifyProductResponse>(
          PRODUCT_BY_HANDLE_QUERY,
          { handle }
        );

        if (data?.product) {
          setProduct(transformProduct(data.product));
          setIsUsingFallback(false);
        } else {
          setIsUsingFallback(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product'));
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [handle]);

  return { product, loading, error, isUsingFallback };
}

export default useShopifyProduct;
