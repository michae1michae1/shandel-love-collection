import { useState, useEffect } from 'react';
import { shopifyClient } from '../lib/shopify/client';
import { SCENT_NOTES_QUERY } from '../lib/shopify/queries';
import { transformScentNote } from '../lib/shopify/transformers';
import { DEFAULT_SCENT_NOTES } from '../types/content';
import type { ScentNote } from '../types/content';
import type { ShopifyMetaobjectsResponse } from '../types/shopify';

interface UseScentNotesResult {
  scentNotes: ScentNote[];
  loading: boolean;
  error: Error | null;
  isUsingFallback: boolean;
}

export function useScentNotes(): UseScentNotesResult {
  const [scentNotes, setScentNotes] = useState<ScentNote[]>(DEFAULT_SCENT_NOTES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(!shopifyClient.configured);

  useEffect(() => {
    async function fetchScentNotes() {
      if (!shopifyClient.configured) {
        setLoading(false);
        setIsUsingFallback(true);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await shopifyClient.query<ShopifyMetaobjectsResponse>(SCENT_NOTES_QUERY);

        if (data?.metaobjects?.nodes?.length) {
          const notes = data.metaobjects.nodes
            .map(transformScentNote)
            .sort((a, b) => a.order - b.order);
          setScentNotes(notes);
          setIsUsingFallback(false);
        } else {
          setIsUsingFallback(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch scent notes'));
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    fetchScentNotes();
  }, []);

  return { scentNotes, loading, error, isUsingFallback };
}

export default useScentNotes;
