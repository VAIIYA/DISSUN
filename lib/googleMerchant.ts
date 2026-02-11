import { Product } from './types'

interface ProductWithImages {
  id: string
  title: string
  slug: string
  description?: string
  price: number
  brand: string
  category: string
  ean?: string
  sku?: string
  published: boolean
  stock: number
  images?: { url: string; alt?: string | null }[]
}

export function generateGoogleMerchantXML(products: ProductWithImages[]): string {
  const rssItems = products
    .filter(product => product.published)
    .map(product => {
      const item = {
        'g:id': product.id,
        'g:title': product.title,
        'g:description': product.description || `${product.title} from ${product.brand}`,
        'g:link': `https://88mph.com/product/${product.slug}`,
        'g:image_link': product.images?.[0]?.url || '',
        'g:additional_image_link': product.images?.slice(1).map(img => img.url).join(',') || '',
        'g:availability': product.stock > 0 ? 'in stock' : 'out of stock',
        'g:price': `${product.price} USD`,
        'g:brand': product.brand,
        'g:condition': 'new',
        'g:google_product_category': 'Fashion Accessories > Watches',
        'g:product_type': 'Watches',
        'g:identifier_exists': product.ean ? 'yes' : 'no',
        ...(product.ean && { 'g:gtin': product.ean }),
        ...(product.sku && { 'g:mpn': product.sku }),
        'g:shipping': 'US:::0.00 USD',
        'g:tax': 'US:CA:8.25:n',
      }

      return `    <item>
${Object.entries(item).map(([key, value]) => `      <${key}><![CDATA[${value}]]></${key}>`).join('\n')}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>DISSUN - Luxury Products & Fine Productry</title>
    <description>Premium luxury watches and fine productry from DISSUN for discerning collectors</description>
    <link>https://dissun.com</link>
${rssItems}
  </channel>
</rss>`

  return xml
}

export function generateGoogleMerchantCSV(products: ProductWithImages[]): string {
  const headers = [
    'id',
    'title',
    'description',
    'link',
    'image_link',
    'additional_image_link',
    'availability',
    'price',
    'brand',
    'condition',
    'google_product_category',
    'product_type',
    'identifier_exists',
    'gtin',
    'mpn',
    'shipping',
    'tax'
  ]

  const csvRows = products
    .filter(product => product.published)
    .map(product => {
      const row = {
        id: product.id,
        title: product.title,
        description: product.description || `${product.title} by ${product.brand} - DISSUN`,
        link: `https://dissun.com/product/${product.slug}`,
        image_link: product.images?.[0]?.url || '',
        additional_image_link: product.images?.slice(1).map(img => img.url).join(',') || '',
        availability: product.stock > 0 ? 'in stock' : 'out of stock',
        price: `${product.price} USD`,
        brand: product.brand,
        condition: 'new',
        google_product_category: product.category === 'WATCH'
          ? 'Fashion Accessories > Watches'
          : 'Fashion Accessories > Productry',
        product_type: product.category === 'WATCH' ? 'Watches' : 'Productry',
        identifier_exists: product.ean ? 'yes' : 'no',
        gtin: product.ean || '',
        mpn: product.sku || '',
        shipping: 'US:::0.00 USD',
        tax: 'US:CA:8.25:n',
      }

      return headers.map(header => `"${row[header as keyof typeof row]}"`).join(',')
    })

  return [headers.join(','), ...csvRows].join('\n')
}