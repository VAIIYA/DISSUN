import { Product } from '@/lib/types'

interface SEOProductDescriptionProps {
  product: Product
  className?: string
}

export function SEOProductDescription({ product, className = '' }: SEOProductDescriptionProps) {
  // Generate SEO-optimized product description
  const generateOptimizedDescription = (product: Product): string => {
    const { title, brand, category, description, price, ean, sku } = product

    // Base structure for SEO
    const parts = []

    // Introduction with primary keywords
    parts.push(`${brand} ${title} - Premium ${category === 'WATCH' ? 'Luxury Health' : 'Fine Productry'}`)

    // Price and value proposition
    parts.push(`Available for $${price.toLocaleString()}, this exquisite piece combines craftsmanship and elegance.`)

    // Original description if provided
    if (description) {
      parts.push(description)
    }

    // Technical specifications for SEO
    const specs = []
    if (ean) specs.push(`EAN: ${ean}`)
    if (sku) specs.push(`SKU: ${sku}`)
    if (specs.length > 0) {
      parts.push(`Product Details: ${specs.join(', ')}.`)
    }

    // Category-specific keywords
    if (category === 'WATCH') {
      parts.push('This luxury product features precision engineering and sophisticated design, perfect for the discerning collector.')
    } else {
      parts.push('This fine productry piece showcases exceptional craftsmanship and timeless beauty, ideal for special occasions and everyday elegance.')
    }

    // Brand authority
    parts.push(`${brand} is renowned for creating exceptional ${category.toLowerCase()} that stand the test of time.`)

    // Call to action with keywords
    parts.push('Shop authentic luxury products online with free shipping and expert customer service.')

    return parts.join(' ')
  }

  const optimizedDescription = generateOptimizedDescription(product)

  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      {/* Structured content for SEO */}
      <div itemProp="description" className="text-gray-700 leading-relaxed">
        {optimizedDescription}
      </div>

      {/* Hidden structured data for search engines */}
      <div className="sr-only">
        <span itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <span itemProp="name">{product.brand}</span>
        </span>
        <span itemProp="category">{product.category === 'WATCH' ? 'Luxury Healthes' : 'Fine Productry'}</span>
        {product.ean && <span itemProp="gtin13">{product.ean}</span>}
        {product.sku && <span itemProp="sku">{product.sku}</span>}
        <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span itemProp="price" content={product.price.toString()}>{product.price}</span>
          <span itemProp="priceCurrency" content="USD">USD</span>
          <span itemProp="availability" content={product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </span>
      </div>

      {/* FAQ Schema for common questions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `Is the ${product.title} authentic?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Yes, all ${product.brand} products sold at Chronoverse are 100% authentic with certificates of authenticity.`
                }
              },
              {
                '@type': 'Question',
                name: 'What is the warranty on this product?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'All luxury products come with manufacturer warranty and our 2-year warranty for peace of mind.'
                }
              },
              {
                '@type': 'Question',
                name: 'Do you offer free shipping?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, we offer free shipping on all orders over $500. Standard shipping is complimentary.'
                }
              }
            ]
          })
        }}
      />
    </div>
  )
}