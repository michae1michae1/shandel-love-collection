// Shopify Storefront Cart API - Mutations and Helpers

import { shopifyClient } from './client';
import type {
  Cart,
  CartLineInput,
  CartLineUpdateInput,
  CartCreateResponse,
  CartLinesAddResponse,
  CartLinesUpdateResponse,
  CartLinesRemoveResponse,
  CartQueryResponse,
} from '../../types/cart';

/**
 * Normalize a variant ID to Shopify's GID format.
 * Accepts:
 *   - "gid://shopify/ProductVariant/12345" (already valid, returned as-is)
 *   - "12345" (numeric string, prefixed with GID)
 *   - "12345678901234" (long numeric, prefixed with GID)
 */
export function normalizeVariantId(variantId: string): string {
  if (variantId.startsWith('gid://')) {
    return variantId;
  }
  return `gid://shopify/ProductVariant/${variantId}`;
}

// ----- Variant Availability Lookup -----

const VARIANT_AVAILABILITY_QUERY = `
  query VariantAvailability($id: ID!) {
    node(id: $id) {
      ... on ProductVariant {
        id
        availableForSale
        quantityAvailable
      }
    }
  }
`;

export interface VariantAvailability {
  id: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
}

interface VariantAvailabilityResponse {
  node: {
    id: string;
    availableForSale: boolean;
    quantityAvailable?: number;
  } | null;
}

/**
 * Fetch a product variant's availability by its GID.
 * Normalizes the ID automatically.
 */
export async function getVariantAvailability(
  variantId: string
): Promise<VariantAvailability | null> {
  const normalizedId = normalizeVariantId(variantId);
  
  // DEBUG: Log what we're sending to Shopify
  console.log('[getVariantAvailability] Input ID:', variantId);
  console.log('[getVariantAvailability] Normalized ID:', normalizedId);
  
  const response = await shopifyClient.query<VariantAvailabilityResponse>(
    VARIANT_AVAILABILITY_QUERY,
    { id: normalizedId }
  );

  // DEBUG: Log the raw response from Shopify
  console.log('[getVariantAvailability] Shopify response:', response);

  if (!response?.node) {
    console.warn('[getVariantAvailability] No node returned - variant may not exist or not be published to Storefront API');
    return null;
  }

  return {
    id: response.node.id,
    availableForSale: response.node.availableForSale,
    quantityAvailable: response.node.quantityAvailable ?? null,
  };
}

// Fragment for consistent cart fields across all operations
const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              title
              handle
            }
            image {
              url
              altText
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

// Create a new cart with optional initial line items
const CART_CREATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

// Add lines to an existing cart
const CART_LINES_ADD_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

// Update line quantities in a cart
const CART_LINES_UPDATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

// Remove lines from a cart
const CART_LINES_REMOVE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

// Query to fetch an existing cart by ID
const CART_QUERY = `
  ${CART_FRAGMENT}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`;

/**
 * Create a new cart with initial line items
 */
export async function createCart(lines: CartLineInput[]): Promise<Cart | null> {
  const response = await shopifyClient.query<CartCreateResponse>(
    CART_CREATE_MUTATION,
    { input: { lines } }
  );

  if (response?.cartCreate.userErrors.length) {
    console.error('Cart create errors:', response.cartCreate.userErrors);
    return null;
  }

  return response?.cartCreate.cart ?? null;
}

/**
 * Add lines to an existing cart
 */
export async function addToCart(cartId: string, lines: CartLineInput[]): Promise<Cart | null> {
  const response = await shopifyClient.query<CartLinesAddResponse>(
    CART_LINES_ADD_MUTATION,
    { cartId, lines }
  );

  if (response?.cartLinesAdd.userErrors.length) {
    console.error('Cart add errors:', response.cartLinesAdd.userErrors);
    return null;
  }

  return response?.cartLinesAdd.cart ?? null;
}

/**
 * Update line quantities in a cart
 */
export async function updateCartLines(
  cartId: string,
  lines: CartLineUpdateInput[]
): Promise<Cart | null> {
  const response = await shopifyClient.query<CartLinesUpdateResponse>(
    CART_LINES_UPDATE_MUTATION,
    { cartId, lines }
  );

  if (response?.cartLinesUpdate.userErrors.length) {
    console.error('Cart update errors:', response.cartLinesUpdate.userErrors);
    return null;
  }

  return response?.cartLinesUpdate.cart ?? null;
}

/**
 * Remove lines from a cart
 */
export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<Cart | null> {
  const response = await shopifyClient.query<CartLinesRemoveResponse>(
    CART_LINES_REMOVE_MUTATION,
    { cartId, lineIds }
  );

  if (response?.cartLinesRemove.userErrors.length) {
    console.error('Cart remove errors:', response.cartLinesRemove.userErrors);
    return null;
  }

  return response?.cartLinesRemove.cart ?? null;
}

/**
 * Fetch an existing cart by ID
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  const response = await shopifyClient.query<CartQueryResponse>(
    CART_QUERY,
    { cartId }
  );

  return response?.cart ?? null;
}
