import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Success | Chronoverse',
  description: 'Your order has been successfully placed.',
}

function SuccessContent({ sessionId }: { sessionId: string }) {
  // This would normally be a server component, but for simplicity we'll use client-side fetch
  // In a real app, you'd want to handle this properly with server actions or API routes

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="luxury-heading mb-4">Order Successful!</h1>
        <p className="luxury-subheading">
          Thank you for your purchase. Your order has been confirmed and you will receive a confirmation email shortly.
        </p>
      </div>

      <div className="bg-luxury-gray rounded-lg p-6 mb-8">
        <h2 className="font-playfair text-xl font-semibold mb-4">Order Details</h2>
        <p className="text-gray-600">Order ID: {sessionId}</p>
        <p className="text-gray-600">A confirmation email has been sent to your email address.</p>
      </div>

      <div className="space-y-4">
        <a href="/" className="btn-primary block">
          Continue Shopping
        </a>
        <a href="/contact" className="btn-secondary block">
          Contact Support
        </a>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="luxury-heading mb-4">Invalid Session</h1>
        <p className="text-gray-600">No session ID provided.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent sessionId={sessionId} />
    </Suspense>
  )
}