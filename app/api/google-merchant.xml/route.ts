import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateGoogleMerchantXML } from '@/lib/googleMerchant'

export async function GET() {
  try {
const products = await db.products.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' },
  include: {
    images: true
  }
})

    const xml = generateGoogleMerchantXML(products as any)

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating Google Merchant XML:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}