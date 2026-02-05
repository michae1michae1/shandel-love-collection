// Shopify Storefront API Response Types

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyMetafield {
  key: string;
  value: string;
  type: string;
  reference?: ShopifyMetaobjectReference;
  references?: {
    nodes: ShopifyMetaobjectReference[];
  };
}

export interface ShopifyMetaobjectReference {
  id: string;
  type: string;
  fields: ShopifyMetaobjectField[];
}

export interface ShopifyMetaobjectField {
  key: string;
  value: string | null;
  type: string;
  reference?: {
    image?: ShopifyImage;
  };
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  availableForSale: boolean;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  images: {
    nodes: ShopifyImage[];
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  variants: {
    nodes: ShopifyProductVariant[];
  };
  metafields: (ShopifyMetafield | null)[];
}

export interface ShopifyMetaobject {
  id: string;
  type: string;
  handle: string;
  fields: ShopifyMetaobjectField[];
}

export interface ShopifyMetaobjectsResponse {
  metaobjects: {
    nodes: ShopifyMetaobject[];
  };
}

export interface ShopifyProductResponse {
  product: ShopifyProduct | null;
}

export interface ShopifyProductsResponse {
  products: {
    nodes: ShopifyProduct[];
  };
}

// GraphQL Error types
export interface ShopifyGraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: Record<string, unknown>;
}

export interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: ShopifyGraphQLError[];
}
