'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Settings,
    Search,
    PlusCircle,
    Eye,
    LogOut,
    Mail,
    BookOpen
} from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    {
        name: 'Products',
        href: '/admin/products',
        icon: Package,
        children: [
            { name: 'All Products', href: '/admin/products', icon: Package },
            { name: 'Add New', href: '/admin/products/new', icon: PlusCircle },
        ]
    },
    { name: 'Blogs', href: '/admin/blogs', icon: BookOpen }, // Added Blogs navigation item
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
    { name: 'SEO & Feeds', href: '/admin/seo', icon: Search },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col w-64 bg-[#23282d] text-gray-300 min-h-screen">
            <div className="flex items-center justify-center h-16 bg-[#1d2327]">
                <Link href="/" className="flex items-center space-x-2 text-white hover:text-metamask-orange transition-colors">
                    <Eye size={20} />
                    <span className="font-bold tracking-tight uppercase">DISSUN</span>
                </Link>
            </div>

            <nav className="flex-1 mt-4 px-2 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || (item.children?.some(child => pathname === child.href))

                    return (
                        <div key={item.name}>
                            <Link
                                href={item.href}
                                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-luxury-gold text-luxury-black'
                                    : 'hover:bg-[#32373c] hover:text-white'
                                    }`}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>

                            {item.children && isActive && (
                                <div className="mt-1 ml-8 space-y-1">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.name}
                                            href={child.href}
                                            className={`block px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${pathname === child.href
                                                ? 'text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-[#32373c]'
                                                }`}
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-[#32373c]">
                <button
                    onClick={() => {/* Sign out logic */ }}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-400 rounded-md hover:bg-red-900/20 hover:text-red-400 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
