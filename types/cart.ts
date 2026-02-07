// Shopify Storefront Cart API Types

export interface CartLineMerchandise {
  id: string;
  title: string;
  product: {
    title: string;
    handle: string;
  };
  image?: {
    url: string;
    altText: string | null;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: CartLineMerchandise;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface CartCost {
  totalAmount: {
    amount: string;
    currencyCode: string;
  };
  subtotalAmount: {
    amount: string;
    currencyCode: string;
  };
  totalTaxAmount?: {
    amount: string;
    currencyCode: string;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: CartCost;
  lines: {
    nodes: CartLine[];
  };
}

// Mutation input types
export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

export interface CartLineUpdateInput {
  id: string;
  quantity: number;
}

// Mutation response types
export interface CartCreateResponse {
  cartCreate: {
    cart: Cart | null;
    userErrors: CartUserError[];
  };
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart | null;
    userErrors: CartUserError[];
  };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: Cart | null;
    userErrors: CartUserError[];
  };
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: Cart | null;
    userErrors: CartUserError[];
  };
}

export interface CartQueryResponse {
  cart: Cart | null;
}

export interface CartUserError {
  field: string[] | null;
  message: string;
  code?: string;
}
