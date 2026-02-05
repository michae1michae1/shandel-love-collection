# Environment Variables

Copy these to your `.env.local` file:

```bash
# Shopify Storefront API Configuration

# Your Shopify store domain (without https://)
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Storefront API public access token
# Get this from: Shopify Admin > Settings > Apps > Develop apps > Your app > API credentials
VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token

# Product handle for the featured pre-order product
VITE_FEATURED_PRODUCT_HANDLE=love-le-nouveau
```

## How to Get Your Tokens

1. Go to **Shopify Admin** → **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app**
3. Configure **Storefront API scopes** (see SHOPIFY_SETUP_GUIDE.md)
4. Install the app and copy the **Storefront API access token**
