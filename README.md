# Shandel Love Collection

A luxury fragrance pre-order experience featuring an interactive 3D product showcase and headless Shopify CMS integration.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Three.js** / React Three Fiber — 3D bottle visualization
- **Tailwind CSS** — Styling
- **Shopify Storefront API** — Headless CMS & e-commerce

## Shopify CMS Integration

Content is managed through Shopify's metaobjects and product metafields:

| Content Type | Shopify Location |
|--------------|------------------|
| Hero Section | Content → Metaobjects → `hero_section` |
| Site Settings | Content → Metaobjects → `site_settings` |
| Scent Notes | Content → Metaobjects → `scent_note` |
| Product Features | Content → Metaobjects → `product_feature` |
| Product Info | Products → Product metafields |

See [`docs/SHOPIFY_SETUP_GUIDE.md`](docs/SHOPIFY_SETUP_GUIDE.md) for detailed setup instructions.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   
   Create `.env.local` with your Shopify credentials:
   ```bash
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-token
   VITE_FEATURED_PRODUCT_HANDLE=love-le-nouveau
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Documentation

- [Environment Variables](docs/ENV_EXAMPLE.md)
- [Shopify Setup Guide](docs/SHOPIFY_SETUP_GUIDE.md)
