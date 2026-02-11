import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0]?.url || '/placeholder.jpg'
  const getProductUrl = () => {
    return `/product/${product.id}`
  }

  return (
    <div className="group cursor-pointer animate-slide-up">
      <Link href={getProductUrl()}>
        <div className="metamask-card overflow-hidden">
          {/* Image container */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
            <Image
              src={mainImage}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Price Badge */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-metamask-black text-metamask-white px-4 py-2 rounded-full font-bold text-lg shadow-xl">
                ${product.price.toLocaleString()}
              </div>
            </div>

            {/* Category tag */}
            <div className="absolute top-4 left-4">
              <div className="bg-metamask-peach/90 backdrop-blur-sm text-metamask-black px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-black/5">
                {product.category}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start gap-2 mb-2">
              <span className="text-metamask-orange text-[10px] font-extrabold uppercase tracking-[0.2em]">
                {product.brand}
              </span>
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>

            <h3 className="font-geist text-xl font-extrabold text-metamask-black leading-tight group-hover:text-metamask-orange transition-colors duration-300 line-clamp-2">
              {product.title}
            </h3>

            <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
              <span className="text-xs font-bold text-metamask-black/40">
                {product.stock > 0 ? 'INSTOCK' : 'SOLDOUT'}
              </span>
              <div className="w-8 h-8 rounded-full bg-metamask-orange/10 flex items-center justify-center text-metamask-orange group-hover:bg-metamask-orange group-hover:text-metamask-white transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}