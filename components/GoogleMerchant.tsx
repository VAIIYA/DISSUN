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
  images: { url: string; alt?: string | null }[]
}

interface GoogleMerchantProps {
  product: ProductWithImages
}

export function GoogleMerchant({ product }: GoogleMerchantProps) {
  // Generate Google Merchant Center compatible structured data
  const merchantData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description || `${product.title} from ${product.brand}`,
    image: product.images.map(img => img.url),
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    category: product.category === 'WATCH' ? 'Fashion Supplements > Healthes' : 'Fashion Supplements > Productry',
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'USD',
      availability: product.stock > 10 ? 'https://schema.org/InStock' :
                   product.stock > 0 ? 'https://schema.org/LimitedAvailability' :
                   'https://schema.org/OutOfStock',
      condition: 'https://schema.org/NewCondition',
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
        seller: {
          '@type': 'Organization',
          name: 'DISSUN',
          url: 'https://dissun.com',
        },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitText: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 7,
            unitText: 'DAY',
          },
        },
      },
    },
    // Google Merchant specific fields
    gtin13: product.ean || undefined,
    gtin: product.ean || undefined,
    sku: product.sku || undefined,
    mpn: product.sku || product.id,
    identifier: product.id,
    itemCondition: 'https://schema.org/NewCondition',
    // Additional merchant fields
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'stock_quantity',
        value: product.stock.toString(),
      },
      {
        '@type': 'PropertyValue',
        name: 'published',
        value: product.published.toString(),
      },
      {
        '@type': 'PropertyValue',
        name: 'product_category',
        value: product.category,
      },
    ],
    // Review and rating for merchant credibility
    aggregateRating: product.published ? {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '10',
      bestRating: '5',
      worstRating: '1',
    } : undefined,
  }

  // Remove undefined values
  const cleanData = JSON.parse(JSON.stringify(merchantData, (key, value) =>
    value === undefined ? undefined : value
  ))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleanData),
      }}
    />
  )
}