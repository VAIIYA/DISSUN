import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'
import { ProductList } from '@/components/admin/ProductList'

async function getProducts() {
  const products = await db.products.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      images: true
    }
  })
  return products
}

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/admin/login')
  }

  const products = await getProducts() as any[]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your store's inventory.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-luxury-gold text-luxury-black font-semibold rounded hover:bg-luxury-black hover:text-luxury-gold transition-colors"
        >
          Add New Product
        </Link>
      </div>

      <ProductList products={products} />
    </div>
  )
}