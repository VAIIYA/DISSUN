import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateGoogleMerchantCSV } from '@/lib/googleMerchant'

export async function GET() {
  try {
const products = await db.products.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' },
  include: {
    images: true
  }
})

    const csv = generateGoogleMerchantCSV(products as any)

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="chronoverse-products.csv"',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating Google Merchant CSV:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}