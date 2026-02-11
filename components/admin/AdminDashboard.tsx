import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingCart, DollarSign, AlertCircle, FileText, PlusCircle, Settings, ArrowUpRight } from 'lucide-react'

interface DashboardData {
  productCount: number
  orderCount: number
  totalRevenue: number
  lowStockCount: number
  draftCount: number
}

interface AdminDashboardProps {
  data: DashboardData
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  const stats = [
    {
      label: 'Inventory',
      value: data.productCount,
      desc: 'Total products in catalog',
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Published',
      value: data.productCount - data.draftCount,
      desc: 'Live on storefront',
      icon: FileText,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Drafts',
      value: data.draftCount,
      desc: 'Work in progress',
      icon: PlusCircle,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      label: 'Low Stock',
      value: data.lowStockCount,
      desc: 'Requires attention',
      icon: AlertCircle,
      color: data.lowStockCount > 0 ? 'text-red-600' : 'text-slate-400',
      bg: data.lowStockCount > 0 ? 'bg-red-50' : 'bg-slate-50'
    },
    {
      label: 'Revenue',
      value: `$${data.totalRevenue.toLocaleString()}`,
      desc: 'Total sales volume',
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ]

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      {/* Welcome Header */}
      <div className="flex justify-between items-end border-b border-black/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-metamask-black tracking-tight">
            Dashboard
          </h1>
          <p className="text-metamask-black/40 font-bold mt-2">
            Welcome back to the DISSUN Administration Area.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-white border border-black/10 rounded-2xl font-bold text-sm hover:bg-black/5 transition-all"
          >
            Visit Site <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[2rem] border border-black/5 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-metamask-black mb-1">{stat.value}</h3>
            <p className="text-sm font-black text-metamask-black/30 uppercase tracking-widest">{stat.label}</p>
            <p className="text-xs font-bold text-metamask-black/40 mt-4 italic">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Actions Column */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-[3rem] border border-black/5 shadow-sm overflow-hidden">
            <div className="px-10 py-8 border-b border-black/5 flex items-center justify-between bg-black/[0.02]">
              <h2 className="text-xl font-black text-metamask-black flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5 text-metamask-orange" />
                Quick Actions
              </h2>
            </div>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/admin/products/new"
                className="group p-8 bg-metamask-orange/5 border border-metamask-orange/10 rounded-[2rem] hover:bg-metamask-orange hover:border-metamask-orange transition-all"
              >
                <PlusCircle className="w-10 h-10 text-metamask-orange group-hover:text-white mb-6 transition-colors" />
                <h3 className="text-lg font-black text-metamask-black group-hover:text-white transition-colors">New Essential</h3>
                <p className="text-sm font-bold text-metamask-black/40 group-hover:text-white/70 transition-colors">Add a new premium health product or coffee blend to the collection.</p>
              </Link>

              <Link
                href="/admin/products"
                className="group p-8 bg-black/5 border border-black/5 rounded-[2rem] hover:bg-metamask-black hover:border-metamask-black transition-all"
              >
                <Package className="w-10 h-10 text-metamask-black group-hover:text-metamask-orange mb-6 transition-colors" />
                <h3 className="text-lg font-black text-metamask-black group-hover:text-white transition-colors">Manage Inventory</h3>
                <p className="text-sm font-bold text-metamask-black/40 group-hover:text-white/70 transition-colors">Edit, update, or reorganize your existing products.</p>
              </Link>

              <Link
                href="/admin/messages"
                className="group p-8 bg-black/5 border border-black/5 rounded-[2rem] hover:bg-metamask-black hover:border-metamask-black transition-all"
              >
                <ShoppingCart className="w-10 h-10 text-metamask-black group-hover:text-metamask-orange mb-6 transition-colors" />
                <h3 className="text-lg font-black text-metamask-black group-hover:text-white transition-colors">Customer Inquiries</h3>
                <p className="text-sm font-bold text-metamask-black/40 group-hover:text-white/70 transition-colors">Respond to client messages and purchase requests.</p>
              </Link>

              <Link
                href="/admin/seo"
                className="group p-8 bg-black/5 border border-black/5 rounded-[2rem] hover:bg-metamask-black hover:border-metamask-black transition-all"
              >
                <Settings className="w-10 h-10 text-metamask-black group-hover:text-metamask-orange mb-6 transition-colors" />
                <h3 className="text-lg font-black text-metamask-black group-hover:text-white transition-colors">Site Configuration</h3>
                <p className="text-sm font-bold text-metamask-black/40 group-hover:text-white/70 transition-colors">Manage global settings, SEO, and legal pages.</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-10">
          <div className="bg-white rounded-[3rem] border border-black/5 shadow-sm p-10">
            <h2 className="text-xl font-black text-metamask-black mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-metamask-orange" />
              Notifications
            </h2>
            <div className="space-y-6">
              {data.lowStockCount > 0 && (
                <div className="flex gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-black text-red-900 leading-tight">Stock Warning</p>
                    <p className="text-xs font-bold text-red-700 mt-1">{data.lowStockCount} items are running low on inventory.</p>
                  </div>
                </div>
              )}
              <div className="p-6 border border-dashed border-black/10 rounded-2xl text-center">
                <p className="text-xs font-bold text-metamask-black/30 italic">No other critical alerts at this time.</p>
              </div>
            </div>
          </div>

          <div className="bg-metamask-black rounded-[3rem] p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-metamask-orange/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <h2 className="text-xl font-black mb-4 relative z-10">Admin Support</h2>
            <p className="text-sm font-bold text-white/60 mb-8 relative z-10">Need help managing your store? Contact our technical team.</p>
            <Link
              href="mailto:support@dissun.com"
              className="inline-block px-6 py-3 bg-metamask-orange rounded-xl font-bold text-sm hover:scale-105 transition-transform relative z-10"
            >
              Get Assistance
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}