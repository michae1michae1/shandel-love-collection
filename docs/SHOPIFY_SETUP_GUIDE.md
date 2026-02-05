# Shopify CMS Setup Guide

This guide walks you through setting up Shopify as the headless CMS for the Shandel Love Collection app.

## Prerequisites

1. Shopify store with Basic plan or higher
2. Access to Shopify Admin
3. Storefront API access token (public)

---

## Step 1: Create Storefront API Access Token

1. Go to **Shopify Admin** → **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app**
3. Name it "Shandel Love Headless"
4. Click **Configure Storefront API scopes**
5. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_content`
   - `unauthenticated_read_metaobjects`
6. Click **Save** → **Install app**
7. Copy the **Storefront API access token**
8. Add to your `.env.local`:
   ```
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_TOKEN=your-token-here
   ```

---

## Step 2: Create Metaobject Definitions

### 2.1 Hero Section Metaobject

1. Go to **Settings** → **Custom data** → **Metaobject definitions**
2. Click **Add definition**
3. Configure:
   - **Name**: `Hero Section`
   - **Type**: `hero_section`
   - **Access**: Storefronts (enable)

4. Add these fields:

| Field Name | Type | Required |
|------------|------|----------|
| Badge Text | Single line text | Yes |
| Title Line 1 | Single line text | Yes |
| Title Line 2 | Single line text | Yes |
| Background Video URL | URL | No |
| Background Poster | File (Images) | Yes |
| Primary CTA Text | Single line text | Yes |
| Primary CTA Link | Single line text | Yes |
| Secondary CTA Text | Single line text | No |

5. Click **Save**

### 2.2 Site Settings Metaobject

1. Click **Add definition**
2. Configure:
   - **Name**: `Site Settings`
   - **Type**: `site_settings`
   - **Access**: Storefronts (enable)

3. Add these fields:

| Field Name | Type | Required |
|------------|------|----------|
| Brand Name | Single line text | Yes |
| Brand Tagline | Single line text | Yes |
| Brand Description | Multi-line text | Yes |
| Instagram URL | URL | No |
| Twitter URL | URL | No |
| Facebook URL | URL | No |
| Newsletter Heading | Single line text | Yes |
| Newsletter Text | Single line text | Yes |
| Copyright Text | Single line text | Yes |

4. Click **Save**

### 2.3 Scent Note Metaobject

1. Click **Add definition**
2. Configure:
   - **Name**: `Scent Note`
   - **Type**: `scent_note`
   - **Access**: Storefronts (enable)

3. Add these fields:

| Field Name | Type | Required |
|------------|------|----------|
| Title | Single line text | Yes |
| Description | Single line text | Yes |
| Color Class | Single line text | Yes |
| Order | Integer | Yes |

4. Click **Save**

### 2.4 Product Feature Metaobject

1. Click **Add definition**
2. Configure:
   - **Name**: `Product Feature`
   - **Type**: `product_feature`
   - **Access**: Storefronts (enable)

3. Add these fields:

| Field Name | Type | Required |
|------------|------|----------|
| Icon Name | Single line text | Yes |
| Title | Single line text | Yes |
| Subtitle | Single line text | Yes |
| Order | Integer | Yes |

4. Click **Save**

---

## Step 3: Create Metaobject Entries

### 3.1 Create Hero Section Entry

1. Go to **Content** → **Metaobjects** → **Hero Section**
2. Click **Add entry**
3. Fill in:
   - Badge Text: `Dropping Spring 2026`
   - Title Line 1: `Love Transforms`
   - Title Line 2: `Everything.`
   - Background Poster: Upload your hero image
   - Background Video URL: Your video URL (optional)
   - Primary CTA Text: `Claim Your Bottle`
   - Primary CTA Link: `#pre-order`
   - Secondary CTA Text: `Discover the Scent`
4. Click **Save**

### 3.2 Create Site Settings Entry

1. Go to **Content** → **Metaobjects** → **Site Settings**
2. Click **Add entry**
3. Fill in:
   - Brand Name: `Shandel Love`
   - Brand Tagline: `Collection`
   - Brand Description: `We create intimate sensory experiences. Crafting small-batch fragrances that resonate with the human form.`
   - Instagram URL: Your Instagram URL
   - Twitter URL: Your Twitter URL
   - Facebook URL: Your Facebook URL
   - Newsletter Heading: `Newsletter`
   - Newsletter Text: `Join for early access to future drops and events.`
   - Copyright Text: `© 2024 Shandel Love Collection. All Rights Reserved.`
4. Click **Save**

### 3.3 Create Scent Note Entries (3 total)

**Entry 1 - Top Notes:**
- Title: `Top Notes`
- Description: `Bright Citrus, Sun-kissed Bergamot`
- Color Class: `bg-orange-100`
- Order: `1`

**Entry 2 - Heart Notes:**
- Title: `Heart Notes`
- Description: `Soft Lavender, Fresh Rose`
- Color Class: `bg-rose-200`
- Order: `2`

**Entry 3 - Base Notes:**
- Title: `Base Notes`
- Description: `Velvety Maple, Warm Vanilla`
- Color Class: `bg-rose-900`
- Order: `3`

### 3.4 Create Product Feature Entries (3 total)

**Entry 1 - Organic:**
- Icon Name: `leaf`
- Title: `Organic`
- Subtitle: `Natural Ingredients`
- Order: `1`

**Entry 2 - Priority:**
- Icon Name: `truck`
- Title: `Priority`
- Subtitle: `Fast Delivery`
- Order: `2`

**Entry 3 - Exclusive:**
- Icon Name: `sparkles`
- Title: `EXCLUSIVE`
- Subtitle: `Limited pre-orders`
- Order: `3`

---

## Step 4: Create Product Metafield Definitions

1. Go to **Settings** → **Custom data** → **Products**
2. Click **Add definition** for each:

| Name | Namespace & Key | Type |
|------|-----------------|------|
| Subtitle | `custom.subtitle` | Single line text |
| Size Label | `custom.size_label` | Single line text |
| Sale Badge | `custom.sale_badge` | Single line text |
| Short Description | `custom.short_description` | Multi-line text |
| Extended Description | `custom.extended_description` | Multi-line text |
| Rating Text | `custom.rating_text` | Single line text |
| Section Eyebrow | `custom.section_eyebrow` | Single line text |
| Section Title | `custom.section_title` | Single line text |
| Section Description | `custom.section_description` | Rich text |
| Lifestyle Image | `custom.lifestyle_image` | File (Images) |
| Image Caption | `custom.image_caption` | Single line text |
| Image Quote | `custom.image_quote` | Single line text |
| Scent Notes | `custom.scent_notes` | List of metaobject references (scent_note) |
| Features | `custom.features` | List of metaobject references (product_feature) |

---

## Step 5: Create the Product

1. Go to **Products** → **Add product**
2. Fill in standard fields:
   - Title: `Love "Le Nouveau"`
   - Description: Your product description
   - Price: `185.00`
   - Compare at price: `220.00`
   - Add product images

3. Scroll down to **Metafields** section and fill in:
   - Subtitle: `Eau De Parfum`
   - Size Label: `50ml 1.7oz`
   - Sale Badge: `Early Access`
   - Short Description: `Housed in French glass and crowned with carved travertine stone...`
   - Extended Description: `Soft whispers of lavender and rose drift through each breath...`
   - Rating Text: `5-Star User Rating!`
   - Section Eyebrow: `The Experience`
   - Section Title: `A Trail of LOVE.`
   - Section Description: Your detailed description
   - Lifestyle Image: Upload the muse/lifestyle photo
   - Image Caption: `The Muse`
   - Image Quote: `"Love transforms everything."`
   - Scent Notes: Link to your 3 scent_note entries
   - Features: Link to your 3 product_feature entries

4. Click **Save**

---

## Step 6: Set Up Policy Pages

1. Go to **Settings** → **Policies**
2. Fill in or use templates for:
   - Privacy policy
   - Terms of service
   - Shipping policy
   - Refund policy

These pages will be automatically available at:
- `https://your-store.myshopify.com/policies/privacy-policy`
- `https://your-store.myshopify.com/policies/terms-of-service`
- `https://your-store.myshopify.com/policies/shipping-policy`
- `https://your-store.myshopify.com/policies/refund-policy`

---

## Verification

After completing setup, your app should:
1. Fetch hero content from Shopify
2. Display product info from Shopify
3. Show scent notes and features from metaobjects
4. Display site settings in navbar/footer
5. Link to Shopify policy pages

If content doesn't load, the app will fall back to default placeholder content.
