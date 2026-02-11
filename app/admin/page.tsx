import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

async function getDashboardData() {
  const [productCount, orderCount, totalRevenue, lowStockCount, draftCount] = await Promise.all([
    db.products.count(),
    db.orders.count(),
    db.orders.aggregate({
      where: { paymentStatus: 'PAID' },
      _sum: { totalAmount: true }
    }),
    db.products.count({
      where: {
        stock: { $gt: 0, $lte: 5 }
      }
    }),
    db.products.count({
      where: { published: false }
    })
  ])

  return {
    productCount,
    orderCount,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
    lowStockCount,
    draftCount,
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/admin/login')
  }

  const data = await getDashboardData()

  return <AdminDashboard data={data} />
}