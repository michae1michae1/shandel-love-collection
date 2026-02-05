/**
 * Shopify Setup Script
 * 
 * This script creates all the necessary metaobject definitions and product metafield
 * definitions in your Shopify store for the Shandel Love Collection headless CMS.
 * 
 * Usage: npx tsx scripts/setup-shopify.ts
 * 
 * Required environment variables:
 * - VITE_SHOPIFY_STORE_DOMAIN: Your store domain (e.g., your-store.myshopify.com)
 * - SHOPIFY_ADMIN_TOKEN: Admin API access token (starts with shpat_)
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Configuration
const SHOPIFY_STORE_DOMAIN = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const ADMIN_API_VERSION = '2024-01';

// Validation
if (!SHOPIFY_STORE_DOMAIN) {
  console.error('❌ Missing VITE_SHOPIFY_STORE_DOMAIN in .env.local');
  process.exit(1);
}

if (!SHOPIFY_ADMIN_TOKEN) {
  console.error('❌ Missing SHOPIFY_ADMIN_TOKEN in .env.local');
  process.exit(1);
}

console.log(`\n🏪 Store: ${SHOPIFY_STORE_DOMAIN}`);
console.log(`🔑 Token: ${SHOPIFY_ADMIN_TOKEN.slice(0, 10)}...${SHOPIFY_ADMIN_TOKEN.slice(-4)}\n`);

// Types
interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
    extensions?: Record<string, unknown>;
  }>;
}

interface UserError {
  field: string[];
  message: string;
}

// GraphQL Client
async function adminQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`❌ HTTP Error: ${response.status} ${response.statusText}`);
      console.error(text);
      return null;
    }

    const json: GraphQLResponse<T> = await response.json();

    if (json.errors && json.errors.length > 0) {
      console.error('❌ GraphQL Errors:');
      json.errors.forEach((err) => {
        console.error(`   - ${err.message}`);
      });
      return null;
    }

    return json.data ?? null;
  } catch (error) {
    console.error('❌ Network Error:', error);
    return null;
  }
}

// Helper to check user errors in mutations
function checkUserErrors(userErrors: UserError[], operationName: string): boolean {
  if (userErrors && userErrors.length > 0) {
    console.error(`❌ ${operationName} failed:`);
    userErrors.forEach((err) => {
      console.error(`   - ${err.field.join('.')}: ${err.message}`);
    });
    return false;
  }
  return true;
}

// ============================================================================
// METAOBJECT DEFINITIONS
// ============================================================================

async function createHeroSectionDefinition() {
  console.log('📦 Creating Hero Section metaobject definition...');
  
  const mutation = `
    mutation CreateHeroSectionDefinition($definition: MetaobjectDefinitionCreateInput!) {
      metaobjectDefinitionCreate(definition: $definition) {
        metaobjectDefinition {
          id
          type
          name
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    definition: {
      type: 'hero_section',
      name: 'Hero Section',
      displayNameKey: 'badge_text',
      access: {
        storefront: 'PUBLIC_READ',
      },
      fieldDefinitions: [
        { key: 'badge_text', name: 'Badge Text', type: 'single_line_text_field', required: true },
        { key: 'title_line_1', name: 'Title Line 1', type: 'single_line_text_field', required: true },
        { key: 'title_line_2', name: 'Title Line 2', type: 'single_line_text_field', required: true },
        { key: 'background_video_url', name: 'Background Video URL', type: 'url' },
        { key: 'background_poster', name: 'Background Poster', type: 'file_reference', validations: [{ name: 'file_type_options', value: '["Image"]' }] },
        { key: 'primary_cta_text', name: 'Primary CTA Text', type: 'single_line_text_field', required: true },
        { key: 'primary_cta_link', name: 'Primary CTA Link', type: 'single_line_text_field', required: true },
        { key: 'secondary_cta_text', name: 'Secondary CTA Text', type: 'single_line_text_field' },
      ],
    },
  };

  interface Response {
    metaobjectDefinitionCreate: {
      metaobjectDefinition: { id: string; type: string; name: string } | null;
      userErrors: UserError[];
    };
  }

  const result = await adminQuery<Response>(mutation, variables);
  
  if (result?.metaobjectDefinitionCreate) {
    if (checkUserErrors(result.metaobjectDefinitionCreate.userErrors, 'Hero Section')) {
      console.log('   ✅ Hero Section definition created');
      return true;
    }
  }
  return false;
}

async function createSiteSettingsDefinition() {
  console.log('📦 Creating Site Settings metaobject definition...');
  
  const mutation = `
    mutation CreateSiteSettingsDefinition($definition: MetaobjectDefinitionCreateInput!) {
      metaobjectDefinitionCreate(definition: $definition) {
        metaobjectDefinition {
          id
          type
          name
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    definition: {
      type: 'site_settings',
      name: 'Site Settings',
      displayNameKey: 'brand_name',
      access: {
        storefront: 'PUBLIC_READ',
      },
      fieldDefinitions: [
        { key: 'brand_name', name: 'Brand Name', type: 'single_line_text_field', required: true },
        { key: 'brand_tagline', name: 'Brand Tagline', type: 'single_line_text_field', required: true },
        { key: 'brand_description', name: 'Brand Description', type: 'multi_line_text_field', required: true },
        { key: 'instagram_url', name: 'Instagram URL', type: 'url' },
        { key: 'twitter_url', name: 'Twitter URL', type: 'url' },
        { key: 'facebook_url', name: 'Facebook URL', type: 'url' },
        { key: 'newsletter_heading', name: 'Newsletter Heading', type: 'single_line_text_field', required: true },
        { key: 'newsletter_text', name: 'Newsletter Text', type: 'single_line_text_field', required: true },
        { key: 'copyright_text', name: 'Copyright Text', type: 'single_line_text_field', required: true },
      ],
    },
  };

  interface Response {
    metaobjectDefinitionCreate: {
      metaobjectDefinition: { id: string; type: string; name: string } | null;
      userErrors: UserError[];
    };
  }

  const result = await adminQuery<Response>(mutation, variables);
  
  if (result?.metaobjectDefinitionCreate) {
    if (checkUserErrors(result.metaobjectDefinitionCreate.userErrors, 'Site Settings')) {
      console.log('   ✅ Site Settings definition created');
      return true;
    }
  }
  return false;
}

async function createScentNoteDefinition() {
  console.log('📦 Creating Scent Note metaobject definition...');
  
  const mutation = `
    mutation CreateScentNoteDefinition($definition: MetaobjectDefinitionCreateInput!) {
      metaobjectDefinitionCreate(definition: $definition) {
        metaobjectDefinition {
          id
          type
          name
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    definition: {
      type: 'scent_note',
      name: 'Scent Note',
      displayNameKey: 'title',
      access: {
        storefront: 'PUBLIC_READ',
      },
      fieldDefinitions: [
        { key: 'title', name: 'Title', type: 'single_line_text_field', required: true },
        { key: 'description', name: 'Description', type: 'single_line_text_field', required: true },
        { key: 'color_class', name: 'Color Class (Tailwind)', type: 'single_line_text_field', required: true },
        { key: 'order', name: 'Display Order', type: 'number_integer', required: true },
      ],
    },
  };

  interface Response {
    metaobjectDefinitionCreate: {
      metaobjectDefinition: { id: string; type: string; name: string } | null;
      userErrors: UserError[];
    };
  }

  const result = await adminQuery<Response>(mutation, variables);
  
  if (result?.metaobjectDefinitionCreate) {
    if (checkUserErrors(result.metaobjectDefinitionCreate.userErrors, 'Scent Note')) {
      console.log('   ✅ Scent Note definition created');
      return true;
    }
  }
  return false;
}

async function createProductFeatureDefinition() {
  console.log('📦 Creating Product Feature metaobject definition...');
  
  const mutation = `
    mutation CreateProductFeatureDefinition($definition: MetaobjectDefinitionCreateInput!) {
      metaobjectDefinitionCreate(definition: $definition) {
        metaobjectDefinition {
          id
          type
          name
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    definition: {
      type: 'product_feature',
      name: 'Product Feature',
      displayNameKey: 'title',
      access: {
        storefront: 'PUBLIC_READ',
      },
      fieldDefinitions: [
        { key: 'icon_name', name: 'Icon Name', type: 'single_line_text_field', required: true },
        { key: 'title', name: 'Title', type: 'single_line_text_field', required: true },
        { key: 'subtitle', name: 'Subtitle', type: 'single_line_text_field', required: true },
        { key: 'order', name: 'Display Order', type: 'number_integer', required: true },
      ],
    },
  };

  interface Response {
    metaobjectDefinitionCreate: {
      metaobjectDefinition: { id: string; type: string; name: string } | null;
      userErrors: UserError[];
    };
  }

  const result = await adminQuery<Response>(mutation, variables);
  
  if (result?.metaobjectDefinitionCreate) {
    if (checkUserErrors(result.metaobjectDefinitionCreate.userErrors, 'Product Feature')) {
      console.log('   ✅ Product Feature definition created');
      return true;
    }
  }
  return false;
}

// ============================================================================
// PRODUCT METAFIELD DEFINITIONS
// ============================================================================

async function createProductMetafieldDefinitions() {
  console.log('\n📦 Creating Product metafield definitions...');
  
  const metafields = [
    { key: 'subtitle', name: 'Subtitle', type: 'single_line_text_field', description: 'Product subtitle (e.g., "Eau De Parfum")' },
    { key: 'size_label', name: 'Size Label', type: 'single_line_text_field', description: 'Size display text (e.g., "50ml 1.7oz")' },
    { key: 'sale_badge', name: 'Sale Badge', type: 'single_line_text_field', description: 'Badge text for sales (e.g., "Early Access")' },
    { key: 'short_description', name: 'Short Description', type: 'multi_line_text_field', description: 'Brief product description' },
    { key: 'extended_description', name: 'Extended Description', type: 'multi_line_text_field', description: 'Additional description (shown on larger screens)' },
    { key: 'rating_text', name: 'Rating Text', type: 'single_line_text_field', description: 'Rating display text (e.g., "5-Star User Rating!")' },
    { key: 'section_eyebrow', name: 'Section Eyebrow', type: 'single_line_text_field', description: 'Eyebrow text for product details section' },
    { key: 'section_title', name: 'Section Title', type: 'single_line_text_field', description: 'Title for product details section' },
    { key: 'section_description', name: 'Section Description', type: 'multi_line_text_field', description: 'Long description for product details' },
    { key: 'lifestyle_image', name: 'Lifestyle Image', type: 'file_reference', description: 'Lifestyle/muse image for product details' },
    { key: 'image_caption', name: 'Image Caption', type: 'single_line_text_field', description: 'Caption for lifestyle image' },
    { key: 'image_quote', name: 'Image Quote', type: 'single_line_text_field', description: 'Quote overlay on lifestyle image' },
  ];

  const mutation = `
    mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
      metafieldDefinitionCreate(definition: $definition) {
        createdDefinition {
          id
          name
          key
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  let successCount = 0;

  for (const mf of metafields) {
    const variables = {
      definition: {
        name: mf.name,
        namespace: 'custom',
        key: mf.key,
        type: mf.type,
        description: mf.description,
        ownerType: 'PRODUCT',
      },
    };

    interface Response {
      metafieldDefinitionCreate: {
        createdDefinition: { id: string; name: string; key: string } | null;
        userErrors: UserError[];
      };
    }

    const result = await adminQuery<Response>(mutation, variables);
    
    if (result?.metafieldDefinitionCreate) {
      const { userErrors, createdDefinition } = result.metafieldDefinitionCreate;
      
      // Check if it's a "already exists" error (which is okay)
      const alreadyExists = userErrors.some(e => e.message.includes('already exists'));
      
      if (userErrors.length === 0 || alreadyExists) {
        console.log(`   ✅ ${mf.name} ${alreadyExists ? '(already exists)' : 'created'}`);
        successCount++;
      } else {
        console.error(`   ❌ ${mf.name}: ${userErrors[0].message}`);
      }
    }
  }

  console.log(`   ${successCount}/${metafields.length} metafield definitions ready`);
  return successCount === metafields.length;
}

// ============================================================================
// SEED DATA (Optional)
// ============================================================================

async function seedScentNotes() {
  console.log('\n🌱 Seeding Scent Note entries...');
  
  const notes = [
    { title: 'Top Notes', description: 'Bright Citrus, Sun-kissed Bergamot', color_class: 'bg-orange-100', order: 1 },
    { title: 'Heart Notes', description: 'Soft Lavender, Fresh Rose', color_class: 'bg-rose-200', order: 2 },
    { title: 'Base Notes', description: 'Velvety Maple, Warm Vanilla', color_class: 'bg-rose-900', order: 3 },
  ];

  const mutation = `
    mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
      metaobjectCreate(metaobject: $metaobject) {
        metaobject {
          id
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  for (const note of notes) {
    const variables = {
      metaobject: {
        type: 'scent_note',
        fields: [
          { key: 'title', value: note.title },
          { key: 'description', value: note.description },
          { key: 'color_class', value: note.color_class },
          { key: 'order', value: String(note.order) },
        ],
      },
    };

    interface Response {
      metaobjectCreate: {
        metaobject: { id: string; handle: string } | null;
        userErrors: UserError[];
      };
    }

    const result = await adminQuery<Response>(mutation, variables);
    
    if (result?.metaobjectCreate) {
      if (result.metaobjectCreate.userErrors.length === 0) {
        console.log(`   ✅ ${note.title} created`);
      } else {
        const alreadyExists = result.metaobjectCreate.userErrors.some(e => 
          e.message.includes('already exists') || e.message.includes('taken')
        );
        if (alreadyExists) {
          console.log(`   ⏭️  ${note.title} (already exists)`);
        } else {
          console.error(`   ❌ ${note.title}: ${result.metaobjectCreate.userErrors[0].message}`);
        }
      }
    }
  }
}

async function seedProductFeatures() {
  console.log('\n🌱 Seeding Product Feature entries...');
  
  const features = [
    { icon_name: 'leaf', title: 'Organic', subtitle: 'Natural Ingredients', order: 1 },
    { icon_name: 'truck', title: 'Priority', subtitle: 'Fast Delivery', order: 2 },
    { icon_name: 'sparkles', title: 'EXCLUSIVE', subtitle: 'Limited pre-orders', order: 3 },
  ];

  const mutation = `
    mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
      metaobjectCreate(metaobject: $metaobject) {
        metaobject {
          id
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  for (const feature of features) {
    const variables = {
      metaobject: {
        type: 'product_feature',
        fields: [
          { key: 'icon_name', value: feature.icon_name },
          { key: 'title', value: feature.title },
          { key: 'subtitle', value: feature.subtitle },
          { key: 'order', value: String(feature.order) },
        ],
      },
    };

    interface Response {
      metaobjectCreate: {
        metaobject: { id: string; handle: string } | null;
        userErrors: UserError[];
      };
    }

    const result = await adminQuery<Response>(mutation, variables);
    
    if (result?.metaobjectCreate) {
      if (result.metaobjectCreate.userErrors.length === 0) {
        console.log(`   ✅ ${feature.title} created`);
      } else {
        const alreadyExists = result.metaobjectCreate.userErrors.some(e => 
          e.message.includes('already exists') || e.message.includes('taken')
        );
        if (alreadyExists) {
          console.log(`   ⏭️  ${feature.title} (already exists)`);
        } else {
          console.error(`   ❌ ${feature.title}: ${result.metaobjectCreate.userErrors[0].message}`);
        }
      }
    }
  }
}

async function seedSiteSettings() {
  console.log('\n🌱 Seeding Site Settings entry...');
  
  const mutation = `
    mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
      metaobjectCreate(metaobject: $metaobject) {
        metaobject {
          id
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    metaobject: {
      type: 'site_settings',
      fields: [
        { key: 'brand_name', value: 'Shandel Love' },
        { key: 'brand_tagline', value: 'Collection' },
        { key: 'brand_description', value: 'We create intimate sensory experiences. Crafting small-batch fragrances that resonate with the human form.' },
        { key: 'newsletter_heading', value: 'Newsletter' },
        { key: 'newsletter_text', value: 'Join for early access to future drops and events.' },
        { key: 'copyright_text', value: '© 2024 Shandel Love Collection. All Rights Reserved.' },
      ],
    },
  };

  interface Response {
    metaobjectCreate: {
      metaobject: { id: string; handle: string } | null;
      userErrors: UserError[];
    };
  }

  const result = await adminQuery<Response>(mutation, variables);
  
  if (result?.metaobjectCreate) {
    if (result.metaobjectCreate.userErrors.length === 0) {
      console.log('   ✅ Site Settings created');
    } else {
      const alreadyExists = result.metaobjectCreate.userErrors.some(e => 
        e.message.includes('already exists') || e.message.includes('taken')
      );
      if (alreadyExists) {
        console.log('   ⏭️  Site Settings (already exists)');
      } else {
        console.error(`   ❌ Site Settings: ${result.metaobjectCreate.userErrors[0].message}`);
      }
    }
  }
}

async function seedHeroSection() {
  console.log('\n🌱 Seeding Hero Section entry...');
  
  const mutation = `
    mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
      metaobjectCreate(metaobject: $metaobject) {
        metaobject {
          id
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    metaobject: {
      type: 'hero_section',
      fields: [
        { key: 'badge_text', value: 'Dropping Spring 2026' },
        { key: 'title_line_1', value: 'Love Transforms' },
        { key: 'title_line_2', value: 'Everything.' },
        { key: 'background_video_url', value: 'https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-water-splashing-on-a-black-background-4074-large.mp4' },
        { key: 'primary_cta_text', value: 'Claim Your Bottle' },
        { key: 'primary_cta_link', value: '#pre-order' },
        { key: 'secondary_cta_text', value: 'Discover the Scent' },
      ],
    },
  };

  interface Response {
    metaobjectCreate: {
      metaobject: { id: string; handle: string } | null;
      userErrors: UserError[];
    };
  }

  const result = await adminQuery<Response>(mutation, variables);
  
  if (result?.metaobjectCreate) {
    if (result.metaobjectCreate.userErrors.length === 0) {
      console.log('   ✅ Hero Section created');
    } else {
      const alreadyExists = result.metaobjectCreate.userErrors.some(e => 
        e.message.includes('already exists') || e.message.includes('taken')
      );
      if (alreadyExists) {
        console.log('   ⏭️  Hero Section (already exists)');
      } else {
        console.error(`   ❌ Hero Section: ${result.metaobjectCreate.userErrors[0].message}`);
      }
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('   Shandel Love Collection - Shopify CMS Setup');
  console.log('═══════════════════════════════════════════════════════════════');
  
  // Step 1: Create metaobject definitions
  console.log('\n📋 STEP 1: Creating Metaobject Definitions\n');
  
  await createHeroSectionDefinition();
  await createSiteSettingsDefinition();
  await createScentNoteDefinition();
  await createProductFeatureDefinition();

  // Step 2: Create product metafield definitions
  console.log('\n📋 STEP 2: Creating Product Metafield Definitions');
  await createProductMetafieldDefinitions();

  // Step 3: Seed initial content
  console.log('\n📋 STEP 3: Seeding Initial Content');
  
  await seedHeroSection();
  await seedSiteSettings();
  await seedScentNotes();
  await seedProductFeatures();

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('   Setup Complete! 🎉');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('\nNext steps:');
  console.log('1. Go to Shopify Admin → Products → Add product');
  console.log('2. Create "Love Le Nouveau" product with price $185 (compare at $220)');
  console.log('3. Fill in the custom metafields in the product editor');
  console.log('4. Add the Storefront API token to VITE_SHOPIFY_STOREFRONT_TOKEN');
  console.log('5. Run `npm run dev` to see your content!\n');
}

main().catch((error) => {
  console.error('\n❌ Setup failed:', error);
  process.exit(1);
});
