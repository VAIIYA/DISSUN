'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'
import { useState, useMemo } from 'react'
import { BRANDS } from '@/lib/brands'

interface ProductWithImages {
  id: string
  title: string
  brand: string
  category: string
  price: number
  stock: number
  ean?: string
  sku?: string
  published: boolean
  createdAt: Date
  images: { url: string }[]
}

interface ProductListProps {
  products: ProductWithImages[]
}

type Category = 'WATCH' | 'JEWELLERY' | 'ACCESSORY' | 'PREOWNED'
type Status = 'ALL' | 'PUBLISHED' | 'DRAFT'

export function ProductList({ products }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL')
  const [selectedStatus, setSelectedStatus] = useState<Status>('ALL')
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'stock' | 'createdAt'>('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = searchTerm === '' ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ean?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory

      const matchesStatus = selectedStatus === 'ALL' ||
        (selectedStatus === 'PUBLISHED' && product.published) ||
        (selectedStatus === 'DRAFT' && !product.published)

      const matchesBrand = selectedBrand === 'ALL' || product.brand === selectedBrand

      return matchesSearch && matchesCategory && matchesStatus && matchesBrand
    })

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy]
      let bValue: any = b[sortBy]

      if (sortBy === 'title') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder])

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', className: 'bg-red-100 text-red-800' }
    if (stock <= 5) return { label: 'Low Stock', className: 'bg-yellow-100 text-yellow-800' }
    return { label: 'In Stock', className: 'bg-green-100 text-green-800' }
  }

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header with filters */}
      <div className="px-6 py-4 border-b border-gray-200 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Products ({filteredAndSortedProducts.length})
          </h2>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-luxury-gold text-luxury-black font-medium rounded hover:bg-luxury-black hover:text-luxury-gold transition-colors"
          >
            Add Product
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title, EAN, or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | 'ALL')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold"
          >
            <option value="ALL">All Categories</option>
            <option value="WATCH">Healthes</option>
            <option value="JEWELLERY">Coffee</option>
            <option value="ACCESSORY">Supplements</option>
            <option value="PREOWNED">Pre-Owned</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Status)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold"
          >
            <option value="ALL">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold"
          >
            <option value="ALL">All Brands</option>
            {BRANDS.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center space-x-1">
                  <span>Product</span>
                  {sortBy === 'title' && (
                    <span className="text-luxury-gold">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  {sortBy === 'price' && (
                    <span className="text-luxury-gold">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center space-x-1">
                  <span>Stock</span>
                  {sortBy === 'stock' && (
                    <span className="text-luxury-gold">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock)
              return (
                <tr key={product.id} className={`hover:bg-gray-50 ${stockStatus.label === 'Out of Stock' ? 'bg-red-50/30' : stockStatus.label === 'Low Stock' ? 'bg-yellow-50/30' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 relative">
                        <Image
                          src={product.images[0]?.url || '/placeholder.jpg'}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        {!product.published && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                        {product.ean && (
                          <div className="text-xs text-gray-400 font-mono">EAN: {product.ean}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-luxury-gold/10 text-luxury-black border border-luxury-gold/20">
                      {product.brand}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' :
                        product.stock <= 5 ? 'text-yellow-600' : 'text-gray-900'
                        }`}>
                        {product.stock}
                      </span>
                      {product.stock <= 5 && product.stock > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          ⚠️ Low
                        </span>
                      )}
                      {product.stock === 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          ❌ Out
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}
                      >
                        {product.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-luxury-gold hover:text-luxury-black mr-4 transition-colors"
                    >
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-900 transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500">
            {products.length === 0
              ? 'No products found.'
              : 'No products match your current filters.'}
          </p>
          {products.length === 0 ? (
            <Link
              href="/admin/products/new"
              className="mt-4 inline-block px-4 py-2 bg-luxury-black text-white rounded hover:bg-luxury-gold hover:text-luxury-black transition-colors"
            >
              Add Your First Product
            </Link>
          ) : (
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('ALL')
                setSelectedStatus('ALL')
                setSelectedBrand('ALL')
              }}
              className="mt-4 inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}