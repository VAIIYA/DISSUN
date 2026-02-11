export interface Product {
  _id: string
  id: string
  title: string
  slug: string
  brand: string
  category: string
  model?: string | null
  referenceNumber?: string | null
  description?: string | null
  price: number
  stock: number
  ean?: string | null
  sku?: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  images?: ProductImage[]
}

export interface ContactMessage {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface BlogPost {
  _id?: string;
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or Markdown
  featuredImage?: string;
  isFeatured: boolean;
  status: 'draft' | 'published';
  author: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  _id: string
  id: string
  url: string
  alt?: string | null
  productId: string
  order: number
}

export interface Order {
  _id: string
  id: string
  userId?: string
  email: string
  totalAmount: number
  paymentStatus: string
  stripeId?: string
  createdAt: Date
  updatedAt: Date
  orderItems?: OrderItem[]
}

export interface OrderItem {
  _id: string
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  product?: Product
}