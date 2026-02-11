import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json()

    if (!productId || !quantity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

const product = await db.products.findUnique({
  where: { _id: productId },
  include: {
    images: true
  }
})

if (!product) {
  return NextResponse.json({ error: 'Product not found' }, { status: 404 })
}

if (product.stock < quantity) {
  return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 })
}

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: product.description || undefined,
              images: product.images.length > 0 ? [product.images[0].url] : undefined,
            },
            unit_amount: Math.round(product.price * 100), // Stripe expects cents
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel`,
      metadata: {
        productId: product.id,
        quantity: quantity.toString(),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}