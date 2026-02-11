import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { db } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const sig = headers().get('stripe-signature')

    if (!sig) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      const productId = session.metadata?.productId
      const quantity = parseInt(session.metadata?.quantity || '1')

      if (productId) {
        // Create order
        const order = await db.orders.create({
          data: {
            email: session.customer_details?.email || '',
            totalAmount: (session.amount_total || 0) / 100, // Convert from cents
            paymentStatus: 'PAID',
            stripeId: session.id,
          }
        })

        // Create order item
        const { getCollection } = await import('@/lib/db');
        const orderItemsCollection = await getCollection('orderItems');
        await orderItemsCollection.insertOne({
          orderId: order._id.toString(),
          productId,
          quantity,
          price: (session.amount_total || 0) / 100 / quantity,
        })

        // Update product stock
        const productsCollection = await getCollection('products');
        await productsCollection.updateOne(
          { _id: productId },
          { $inc: { stock: -quantity } }
        )

        console.log('Order created:', order._id)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}