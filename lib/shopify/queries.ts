// GraphQL Queries for Shopify Storefront API

// Fragment for product metafields
const PRODUCT_METAFIELDS_FRAGMENT = `
  metafields(identifiers: [
    { namespace: "custom", key: "subtitle" },
    { namespace: "custom", key: "size_label" },
    { namespace: "custom", key: "sale_badge" },
    { namespace: "custom", key: "short_description" },
    { namespace: "custom", key: "extended_description" },
    { namespace: "custom", key: "rating_text" },
    { namespace: "custom", key: "section_eyebrow" },
    { namespace: "custom", key: "section_title" },
    { namespace: "custom", key: "section_description" },
    { namespace: "custom", key: "lifestyle_image" },
    { namespace: "custom", key: "image_caption" },
    { namespace: "custom", key: "image_quote" },
    { namespace: "custom", key: "scent_notes" },
    { namespace: "custom", key: "features" }
  ]) {
    key
    value
    type
    reference {
      ... on MediaImage {
        image {
          url
          altText
          width
          height
        }
      }
    }
    references(first: 10) {
      nodes {
        ... on Metaobject {
          id
          type
          fields {
            key
            value
            type
          }
        }
      }
    }
  }
`;

// Query for a single product by handle
export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          price {
            amount
            currencyCode
          }
          availableForSale
        }
      }
      ${PRODUCT_METAFIELDS_FRAGMENT}
    }
  }
`;

// Query for hero section metaobject
export const HERO_SECTION_QUERY = `
  query HeroSection {
    metaobjects(type: "hero_section", first: 1) {
      nodes {
        id
        type
        handle
        fields {
          key
          value
          type
          reference {
            ... on MediaImage {
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

// Query for site settings metaobject
export const SITE_SETTINGS_QUERY = `
  query SiteSettings {
    metaobjects(type: "site_settings", first: 1) {
      nodes {
        id
        type
        handle
        fields {
          key
          value
          type
        }
      }
    }
  }
`;

// Query for scent notes metaobjects
export const SCENT_NOTES_QUERY = `
  query ScentNotes {
    metaobjects(type: "scent_note", first: 10, sortKey: "updated_at") {
      nodes {
        id
        type
        handle
        fields {
          key
          value
          type
        }
      }
    }
  }
`;

// Query for product features metaobjects
export const PRODUCT_FEATURES_QUERY = `
  query ProductFeatures {
    metaobjects(type: "product_feature", first: 10, sortKey: "updated_at") {
      nodes {
        id
        type
        handle
        fields {
          key
          value
          type
        }
      }
    }
  }
`;

// Query for all products (for future product page)
export const ALL_PRODUCTS_QUERY = `
  query AllProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        images(first: 1) {
          nodes {
            url
            altText
            width
            height
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
