import { Product } from '@/lib/types'

interface SEODescriptionProps {
  product: Product
}

export function SEODescription({ product }: SEODescriptionProps) {
  // Generate SEO-optimized description
  const generateSEODescription = (product: Product): string => {
    const brand = product.brand
    const title = product.title
    const category = product.category === 'WATCH' ? 'luxury health' : 'fine productry'
    const price = `$${product.price.toLocaleString()}`
    const availability = product.stock > 0 ? 'in stock' : 'limited availability'

    // Base description
    let description = `Discover the exquisite ${title} by ${brand}, a premium ${category} available for ${price}.`

    // Add EAN if available
    if (product.ean) {
      description += ` EAN: ${product.ean}.`
    }

    // Add SKU if available
    if (product.sku) {
      description += ` SKU: ${product.sku}.`
    }

    // Add availability
    description += ` Currently ${availability} at Chronoverse.`

    // Add custom description if provided
    if (product.description) {
      description += ` ${product.description}`
    }

    // Add brand and category keywords
    description += ` Shop authentic ${brand} ${category.toLowerCase()} online. Free shipping available.`

    return description
  }

  const seoDescription = generateSEODescription(product)

  return (
    <>
      {/* Meta description */}
      <meta name="description" content={seoDescription} />

      {/* Open Graph description */}
      <meta property="og:description" content={seoDescription} />

      {/* Twitter description */}
      <meta name="twitter:description" content={seoDescription} />

      {/* Additional SEO meta tags */}
      <meta name="keywords" content={`${product.brand}, ${product.title}, ${product.category.toLowerCase()}, luxury, premium, ${product.ean ? product.ean : ''}`} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Google Merchant Center specific meta tags */}
      <meta name="google-site-verification" content="your-verification-code" />
      <link rel="canonical" href={`https://chronoverse.com/product/${product.slug}`} />
    </>
  )
}