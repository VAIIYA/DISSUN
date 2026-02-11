const { createClient } = require('@libsql/client');
const { drizzle } = require('drizzle-orm/libsql');
const { sql } = require('drizzle-orm');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: '.env' });

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const products = [
    {
        id: 'health-1',
        title: 'Immune Boost Daily',
        slug: 'immune-boost-daily',
        brand: 'DISSUN',
        category: 'health',
        description: 'High-potency vitamin C and zinc supplement for daily immune support.',
        price: 29.99,
        stock: 100,
        published: 1,
    },
    {
        id: 'health-2',
        title: 'Peak Focus Nootropic',
        slug: 'peak-focus-nootropic',
        brand: 'DISSUN',
        category: 'health',
        description: 'Advance formula to support mental clarity and focus.',
        price: 45.00,
        stock: 50,
        published: 1,
    },
    {
        id: 'coffee-1',
        title: 'DISSUN Dark Roast',
        slug: 'dissun-dark-roast',
        brand: 'DISSUN',
        category: 'coffee',
        description: 'Rich, bold, and smoky artisanal dark roast coffee.',
        price: 18.50,
        stock: 200,
        published: 1,
    },
    {
        id: 'coffee-2',
        title: 'Early Fire Light Roast',
        slug: 'early-fire-light-roast',
        brand: 'DISSUN',
        category: 'coffee',
        description: 'Bright and energetic light roast to fire up your morning.',
        price: 19.50,
        stock: 150,
        published: 1,
    },
];

const productImages = [
    { id: 'img-1', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800', productId: 'health-1', order: 0 },
    { id: 'img-2', url: 'https://images.unsplash.com/photo-1550572017-ed20015ade7a?w=800', productId: 'health-2', order: 0 },
    { id: 'img-3', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800', productId: 'coffee-1', order: 0 },
    { id: 'img-4', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', productId: 'coffee-2', order: 0 },
];

async function seed() {
    console.log('Seeding database...');

    try {
        // We use raw SQL because we might not have all types available in a simple script
        for (const p of products) {
            await client.execute({
                sql: `INSERT OR REPLACE INTO product (id, title, slug, brand, category, description, price, stock, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [p.id, p.title, p.slug, p.brand, p.category, p.description, p.price, p.stock, p.published],
            });
        }

        for (const img of productImages) {
            await client.execute({
                sql: `INSERT OR REPLACE INTO productImage (id, url, productId, "order") VALUES (?, ?, ?, ?)`,
                args: [img.id, img.url, img.productId, img.order],
            });
        }

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        process.exit(0);
    }
}

seed();
