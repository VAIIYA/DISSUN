'use client'

import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { usePathname } from 'next/navigation'

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isLoginPage = pathname === '/admin/login'

    if (isLoginPage) {
        return <div className="min-h-screen bg-[#f1f1f1]">{children}</div>
    }

    return (
        <div className="flex min-h-screen bg-[#f1f1f1]">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
