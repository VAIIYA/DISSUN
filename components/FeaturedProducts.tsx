import { db } from '@/lib/db'
import { ProductCard } from './ProductCard'
import Link from 'next/link'

async function getFeaturedProducts() {
  const products = await db.products.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 8,
    include: {
      images: true
    }
  })
  return products
}

export async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="py-24 bg-metamask-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-metamask-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-metamask-orange/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="mb-16 animate-fade-in flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-metamask-orange font-extrabold tracking-tight uppercase text-sm mb-4 block">
              The Collection
            </span>
            <h2 className="metamask-heading leading-none">
              Featured <span className="text-metamask-orange">Essentials</span>
            </h2>
            <p className="metamask-subheading mt-6">
              Our curated selection of health supplements and premium coffee blends to power your daily performance.
            </p>
          </div>

          <Link
            href="/health"
            className="btn-secondary whitespace-nowrap"
          >
            View All Collection
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}