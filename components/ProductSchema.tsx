import { Product } from '@/lib/types'

interface ProductWithImages {
  id: string
  title: string
  description?: string
  price: number
  brand: string
  category: string
  ean?: string
  sku?: string
  published: boolean
  stock: number
  createdAt: Date
  updatedAt: Date
  images: { url: string; alt?: string | null }[]
}

interface ProductSchemaProps {
  product: ProductWithImages
}

export function ProductSchema({ product }: ProductSchemaProps) {
  // Generate Schema.org Product markup
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description || `${product.title} from ${product.brand}`,
    image: product.images.map(img => img.url),
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    category: product.category === 'WATCH' ? 'Health' : 'Productry',
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'USD',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      condition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'DISSUN',
        },
    },
    aggregateRating: product.published ? {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '1',
    } : undefined,
    ...(product.ean && {
      gtin13: product.ean,
      gtin: product.ean,
    }),
    ...(product.sku && {
      sku: product.sku,
    }),
    // Google Merchant Center specific fields
    identifier: product.id,
    itemCondition: 'https://schema.org/NewCondition',
    // Custom fields for internal use
    customFields: {
      stockQuantity: product.stock,
      published: product.published,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}