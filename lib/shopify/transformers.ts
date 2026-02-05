// Transform Shopify API responses to app content types

import type {
  ShopifyMetaobject,
  ShopifyMetaobjectField,
  ShopifyProduct,
  ShopifyMetafield,
} from '../../types/shopify';

import type {
  HeroContent,
  SiteSettings,
  ScentNote,
  ProductFeature,
  ProductData,
  ProductImage,
} from '../../types/content';

// Helper to get field value from metaobject
function getFieldValue(fields: ShopifyMetaobjectField[], key: string): string | null {
  const field = fields.find((f) => f.key === key);
  return field?.value ?? null;
}

// Helper to get image from metaobject field
function getFieldImage(fields: ShopifyMetaobjectField[], key: string): ProductImage | null {
  const field = fields.find((f) => f.key === key);
  if (field?.reference?.image) {
    const img = field.reference.image;
    return {
      url: img.url,
      altText: img.altText,
      width: img.width,
      height: img.height,
    };
  }
  return null;
}

// Helper to get metafield value
function getMetafieldValue(metafields: (ShopifyMetafield | null)[], key: string): string | null {
  const field = metafields.find((f) => f?.key === key);
  return field?.value ?? null;
}

// Helper to get metafield image reference
function getMetafieldImage(metafields: (ShopifyMetafield | null)[], key: string): ProductImage | null {
  const field = metafields.find((f) => f?.key === key);
  if (field?.reference && 'image' in field.reference) {
    const img = (field.reference as { image: ProductImage }).image;
    return img;
  }
  return null;
}

// Default poster image fallback
const DEFAULT_POSTER_URL = 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1920';

// Transform hero section metaobject
export function transformHeroContent(metaobject: ShopifyMetaobject): HeroContent {
  const fields = metaobject.fields;
  const posterImage = getFieldImage(fields, 'background_poster');
  // Also check for URL-based poster field (simpler setup without file upload)
  const posterUrl = getFieldValue(fields, 'background_poster_url');

  return {
    badgeText: getFieldValue(fields, 'badge_text') || 'Coming Soon',
    titleLine1: getFieldValue(fields, 'title_line_1') || 'Love Transforms',
    titleLine2: getFieldValue(fields, 'title_line_2') || 'Everything.',
    backgroundVideoUrl: getFieldValue(fields, 'background_video_url'),
    backgroundPosterUrl: posterImage?.url || posterUrl || DEFAULT_POSTER_URL,
    primaryCtaText: getFieldValue(fields, 'primary_cta_text') || 'Shop Now',
    primaryCtaLink: getFieldValue(fields, 'primary_cta_link') || '#pre-order',
    secondaryCtaText: getFieldValue(fields, 'secondary_cta_text'),
  };
}

// Transform site settings metaobject
export function transformSiteSettings(metaobject: ShopifyMetaobject): SiteSettings {
  const fields = metaobject.fields;

  return {
    brandName: getFieldValue(fields, 'brand_name') || 'Shandel Love',
    brandTagline: getFieldValue(fields, 'brand_tagline') || 'Collection',
    brandDescription: getFieldValue(fields, 'brand_description') || '',
    instagramUrl: getFieldValue(fields, 'instagram_url'),
    twitterUrl: getFieldValue(fields, 'twitter_url'),
    facebookUrl: getFieldValue(fields, 'facebook_url'),
    newsletterHeading: getFieldValue(fields, 'newsletter_heading') || 'Newsletter',
    newsletterText: getFieldValue(fields, 'newsletter_text') || '',
    copyrightText: getFieldValue(fields, 'copyright_text') || '',
  };
}

// Transform scent note metaobject
export function transformScentNote(metaobject: ShopifyMetaobject): ScentNote {
  const fields = metaobject.fields;

  return {
    id: metaobject.id,
    title: getFieldValue(fields, 'title') || '',
    description: getFieldValue(fields, 'description') || '',
    colorClass: getFieldValue(fields, 'color_class') || 'bg-gray-100',
    order: parseInt(getFieldValue(fields, 'order') || '0', 10),
  };
}

// Transform product feature metaobject
export function transformProductFeature(metaobject: ShopifyMetaobject): ProductFeature {
  const fields = metaobject.fields;

  return {
    id: metaobject.id,
    iconName: getFieldValue(fields, 'icon_name') || 'sparkles',
    title: getFieldValue(fields, 'title') || '',
    subtitle: getFieldValue(fields, 'subtitle') || '',
    order: parseInt(getFieldValue(fields, 'order') || '0', 10),
  };
}

// Transform Shopify product to ProductData
export function transformProduct(product: ShopifyProduct): ProductData {
  const metafields = product.metafields || [];

  // Extract scent notes from metafield references
  const scentNotesField = metafields.find((f) => f?.key === 'scent_notes');
  const scentNotes: ScentNote[] = scentNotesField?.references?.nodes
    ?.map((ref) => transformScentNote(ref as unknown as ShopifyMetaobject))
    .sort((a, b) => a.order - b.order) || [];

  // Extract features from metafield references
  const featuresField = metafields.find((f) => f?.key === 'features');
  const features: ProductFeature[] = featuresField?.references?.nodes
    ?.map((ref) => transformProductFeature(ref as unknown as ShopifyMetaobject))
    .sort((a, b) => a.order - b.order) || [];

  // Get lifestyle image
  const lifestyleImage = getMetafieldImage(metafields, 'lifestyle_image');

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    images: product.images.nodes.map((img) => ({
      url: img.url,
      altText: img.altText,
      width: img.width,
      height: img.height,
    })),
    priceRange: product.priceRange,
    compareAtPriceRange: product.compareAtPriceRange,
    variants: product.variants.nodes.map((v) => ({
      id: v.id,
      title: v.title,
      price: v.price,
      availableForSale: v.availableForSale,
    })),
    subtitle: getMetafieldValue(metafields, 'subtitle'),
    sizeLabel: getMetafieldValue(metafields, 'size_label'),
    saleBadge: getMetafieldValue(metafields, 'sale_badge'),
    shortDescription: getMetafieldValue(metafields, 'short_description'),
    extendedDescription: getMetafieldValue(metafields, 'extended_description'),
    ratingText: getMetafieldValue(metafields, 'rating_text'),
    sectionEyebrow: getMetafieldValue(metafields, 'section_eyebrow'),
    sectionTitle: getMetafieldValue(metafields, 'section_title'),
    sectionDescription: getMetafieldValue(metafields, 'section_description'),
    lifestyleImage,
    imageCaption: getMetafieldValue(metafields, 'image_caption'),
    imageQuote: getMetafieldValue(metafields, 'image_quote'),
    scentNotes,
    features,
  };
}
