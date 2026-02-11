'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'

interface BuyNowButtonProps {
  product: Product
}

export function BuyNowButton({ product }: BuyNowButtonProps) {
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleBuyNow = async () => {
    if (product.stock <= 0) return

    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to create checkout session. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleBuyNow}
        className={`w-full py-5 px-8 font-semibold text-lg uppercase tracking-wide relative overflow-hidden ${
          product.stock > 0
            ? 'bg-luxury-black text-luxury-white hover:bg-luxury-gold hover:text-luxury-black'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        } transition-all duration-500 group hover-lift`}
        disabled={loading || product.stock <= 0}
      >
        {/* Background animation */}
        <div
          className={`absolute inset-0 bg-luxury-gold transition-transform duration-300 ${
            isHovered && product.stock > 0 ? 'translate-x-0' : '-translate-x-full'
          }`}
        />

        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center space-x-3">
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>
                {product.stock > 0 ? 'Buy Now' : 'Out of Stock'}
              </span>
              {product.stock > 0 && (
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          )}
        </span>

        {/* Subtle border animation */}
        <div
          className={`absolute inset-0 border border-luxury-gold/50 transition-all duration-300 ${
            isHovered && product.stock > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
      </button>

      {/* Additional info */}
      {product.stock > 0 && (
        <p
          className={`text-center text-sm text-gray-600 mt-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Secure checkout powered by Stripe
        </p>
      )}
    </div>
  )
}