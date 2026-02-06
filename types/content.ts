// CMS Content Types for Shopify Metaobjects and Product Data

export interface HeroContent {
  badgeText: string;
  titleLine1: string;
  titleLine2: string;
  backgroundVideoUrl: string | null;
  backgroundPosterUrl: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string | null;
}

export interface SiteSettings {
  brandName: string;
  brandTagline: string;
  brandDescription: string;
  instagramUrl: string | null;
  twitterUrl: string | null;
  facebookUrl: string | null;
  newsletterHeading: string;
  newsletterText: string;
  copyrightText: string;
}

export interface ScentNote {
  id: string;
  title: string;
  description: string;
  colorClass: string;
  order: number;
}

export interface ProductFeature {
  id: string;
  iconName: 'leaf' | 'truck' | 'sparkles' | string;
  title: string;
  subtitle: string;
  order: number;
}

export interface ProductImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ProductPrice {
  amount: string;
  currencyCode: string;
}

export interface ProductData {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  images: ProductImage[];
  priceRange: {
    minVariantPrice: ProductPrice;
    maxVariantPrice: ProductPrice;
  };
  compareAtPriceRange: {
    minVariantPrice: ProductPrice;
    maxVariantPrice: ProductPrice;
  } | null;
  variants: {
    id: string;
    title: string;
    price: ProductPrice;
    availableForSale: boolean;
  }[];
  // Custom metafields
  subtitle: string | null;
  sizeLabel: string | null;
  saleBadge: string | null;
  shortDescription: string | null;
  extendedDescription: string | null;
  ratingText: string | null;
  sectionEyebrow: string | null;
  sectionTitle: string | null;
  sectionDescription: string | null;
  featuredProductImage: ProductImage | null;
  lifestyleImage: ProductImage | null;
  imageCaption: string | null;
  imageQuote: string | null;
  scentNotes: ScentNote[];
  features: ProductFeature[];
}

// Default/Fallback content when Shopify is not configured
export const DEFAULT_HERO_CONTENT: HeroContent = {
  badgeText: 'Dropping Spring 2026',
  titleLine1: 'Love Transforms',
  titleLine2: 'Everything.',
  backgroundVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-water-splashing-on-a-black-background-4074-large.mp4',
  backgroundPosterUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1920',
  primaryCtaText: 'Claim Your Bottle',
  primaryCtaLink: '#pre-order',
  secondaryCtaText: 'Discover the Scent',
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: 'Shandel Love',
  brandTagline: 'Collection',
  brandDescription: 'We create intimate sensory experiences. Crafting small-batch fragrances that resonate with the human form.',
  instagramUrl: null,
  twitterUrl: null,
  facebookUrl: null,
  newsletterHeading: 'Newsletter',
  newsletterText: 'Join for early access to future drops and events.',
  copyrightText: '© 2024 Shandel Love Collection. All Rights Reserved.',
};

export const DEFAULT_SCENT_NOTES: ScentNote[] = [
  { id: '1', title: 'Top Notes', description: 'Bright Citrus, Sun-kissed Bergamot', colorClass: 'bg-orange-100', order: 1 },
  { id: '2', title: 'Heart Notes', description: 'Soft Lavender, Fresh Rose', colorClass: 'bg-rose-200', order: 2 },
  { id: '3', title: 'Base Notes', description: 'Velvety Maple, Warm Vanilla', colorClass: 'bg-rose-900', order: 3 },
];

export const DEFAULT_PRODUCT_FEATURES: ProductFeature[] = [
  { id: '1', iconName: 'leaf', title: 'Organic', subtitle: 'Natural Ingredients', order: 1 },
  { id: '2', iconName: 'truck', title: 'Priority', subtitle: 'Fast Delivery', order: 2 },
  { id: '3', iconName: 'sparkles', title: 'EXCLUSIVE', subtitle: 'Limited pre-orders', order: 3 },
];

export const DEFAULT_PRODUCT_DATA: ProductData = {
  id: 'default-product',
  handle: 'love-le-nouveau',
  title: 'Love "Le Nouveau"',
  description: 'A natural and organic blend of bright citrus and sun-kissed bergamot.',
  descriptionHtml: '<p>A natural and organic blend of bright citrus and sun-kissed bergamot.</p>',
  images: [],
  priceRange: {
    minVariantPrice: { amount: '185.00', currencyCode: 'USD' },
    maxVariantPrice: { amount: '185.00', currencyCode: 'USD' },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: '220.00', currencyCode: 'USD' },
    maxVariantPrice: { amount: '220.00', currencyCode: 'USD' },
  },
  variants: [
    { id: 'default-variant', title: 'Default', price: { amount: '185.00', currencyCode: 'USD' }, availableForSale: true },
  ],
  subtitle: 'Eau De Parfum',
  sizeLabel: '50ml 1.7oz',
  saleBadge: 'Early Access',
  shortDescription: 'Housed in French glass and crowned with carved travertine stone. This fragrance is a natural and organic blend of bright citrus and sun-kissed bergamot melting into a velvety sweetness of maple and vanilla.',
  extendedDescription: 'Soft whispers of lavender and rose drift through each breath, wrapping you in warmth of serenity.',
  ratingText: '5-Star User Rating!',
  sectionEyebrow: 'The Experience',
  sectionTitle: 'A Trail of LOVE.',
  sectionDescription: 'Love "Le Nouveau" is a scent crafted to uplift the spirit, calm the heart, and leave a trail of LOVE wherever you go. Organic & Natural ingredients only.',
  featuredProductImage: null,
  lifestyleImage: {
    url: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=1000',
    altText: 'Fragrance application',
    width: 1000,
    height: 1250,
  },
  imageCaption: 'The Muse',
  imageQuote: '"Love transforms everything."',
  scentNotes: DEFAULT_SCENT_NOTES,
  features: DEFAULT_PRODUCT_FEATURES,
};
