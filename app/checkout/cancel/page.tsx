import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Cancelled | Chronoverse',
  description: 'Your order has been cancelled.',
}

export default function CheckoutCancelPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="luxury-heading mb-4">Order Cancelled</h1>
        <p className="luxury-subheading">
          Your order has been cancelled. No charges have been made to your account.
        </p>
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