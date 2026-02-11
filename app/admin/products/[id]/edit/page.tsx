import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { ProductEditForm } from '@/components/admin/ProductEditForm'

async function getProduct(id: string) {
  const product = await db.products.findUnique({
    where: { _id: id },
    include: {
      images: true
    }
  })
  return product
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/admin/login')
  }

  const product = await getProduct(params.id) as any

  if (!product) {
    redirect('/admin/products')
  }

  return (
    <div className="min-h-screen bg-luxury-gray">
      <div className="bg-luxury-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-luxury-black">Edit Product</h1>
              <p className="mt-1 text-sm text-gray-600">{product.title}</p>
            </div>
            <a
              href="/admin/products"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Products
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductEditForm product={product} />
      </div>
    </div>
  )
}