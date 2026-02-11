'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductImage } from '@/lib/types'

interface ImageReorderProps {
  productId: string
  images: ProductImage[]
}

export function ImageReorder({ productId, images }: ImageReorderProps) {
  const [imageList, setImageList] = useState(images)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newImages = [...imageList]
    const draggedImage = newImages[draggedIndex]
    newImages.splice(draggedIndex, 1)
    newImages.splice(index, 0, draggedImage)

    setImageList(newImages)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    // TODO: Save new order to database
    console.log('New image order:', imageList.map(img => img._id?.toString() || img.id))
  }

  const handleDelete = (imageId: string) => {
    setImageList(prev => prev.filter(img => (img._id?.toString() || img.id) !== imageId))
    // TODO: Delete from database
  }

  const handleUpload = () => {
    // TODO: Implement image upload
    console.log('Upload new image')
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Drag and drop images here, or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB each</p>
          </div>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-luxury-gold text-luxury-black font-medium rounded hover:bg-luxury-black hover:text-luxury-gold transition-colors"
          >
            Upload Images
          </button>
        </div>
      </div>

      {/* Images Grid */}
      {imageList.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Reorder Images (drag to change order)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imageList.map((image, index) => (
              <div
                key={image._id?.toString() || image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative group cursor-move border-2 rounded-lg overflow-hidden ${
                  draggedIndex === index ? 'border-luxury-gold shadow-lg scale-105' : 'border-gray-200'
                } transition-all duration-200`}
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.url}
                    alt={image.alt || 'Product image'}
                    fill
                    className="object-cover"
                  />

                  {/* Order indicator */}
                  <div className="absolute top-2 left-2 bg-luxury-black/75 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete((image._id?.toString() || image.id)!)
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Drag indicator */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>💡 Tip: Drag images to reorder them. The first image will be the main product image.</p>
          </div>
        </div>
      )}

      {imageList.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No images uploaded yet.</p>
        </div>
      )}
    </div>
  )
}