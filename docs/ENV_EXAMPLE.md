# Environment Variables

Copy these to your `.env.local` file:

```bash
# ═══════════════════════════════════════════════════════════════════════════════
# SHOPIFY STORE DOMAIN
# ═══════════════════════════════════════════════════════════════════════════════
# Your Shopify store domain (without https://)
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# ═══════════════════════════════════════════════════════════════════════════════
# STOREFRONT API TOKEN (Public - used by the frontend)
# ═══════════════════════════════════════════════════════════════════════════════
# Source: Shopify Admin → Settings → Apps and sales channels → Headless app
# This is a PUBLIC token - safe to expose (read-only access)
VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-api-token

# ═══════════════════════════════════════════════════════════════════════════════
# ADMIN API TOKEN (Private - used ONLY for setup script)
# ═══════════════════════════════════════════════════════════════════════════════
# Source: Shopify Admin → Settings → Apps and sales channels → Create Custom App
# ⚠️  NEVER commit or expose to frontend!
# Only used by: npm run setup:shopify
SHOPIFY_ADMIN_TOKEN=shpat_your-admin-api-token

# ═══════════════════════════════════════════════════════════════════════════════
# PRODUCT HANDLE
# ═══════════════════════════════════════════════════════════════════════════════
VITE_FEATURED_PRODUCT_HANDLE=love-le-nouveau
```

---

## Token Setup Guide

You need **two different apps** in Shopify:

### 1. Headless Sales Channel (Storefront API - Public)

This provides the **public** read-only token for your frontend.

1. Go to **Shopify Admin** → **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app** → Name it "Headless"
3. Or use the existing "Headless" channel if already created
4. Go to **API credentials** → Copy the **Storefront API access token**
5. This becomes `VITE_SHOPIFY_STOREFRONT_TOKEN`

**Required Storefront API Scopes:**
- `unauthenticated_read_product_listings`
- `unauthenticated_read_product_inventory`
- `unauthenticated_read_metaobjects`

### 2. Custom App (Admin API - Private)

This provides the **private** token for running the setup script.

1. Go to **Shopify Admin** → **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app** → Name it "CMS Setup Script"
3. Go to **Configuration** → **Admin API integration**
4. Enable these scopes:
   - `read_metaobject_definitions` / `write_metaobject_definitions`
   - `read_metaobjects` / `write_metaobjects`
   - `read_products` / `write_products`
5. Click **Install app** → Copy the **Admin API access token**
6. This becomes `SHOPIFY_ADMIN_TOKEN`

---

## Running the Setup Script

Once you have both tokens in `.env.local`:

```bash
npm run setup:shopify
```

This will:
1. Create all metaobject definitions (Hero, Site Settings, Scent Notes, Features)
2. Create product metafield definitions
3. Seed initial content with your current site data

After running, go to **Shopify Admin** → **Content** → **Metaobjects** to edit your content!
