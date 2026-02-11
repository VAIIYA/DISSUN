'use client'

import { User } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function AdminHeader() {
    const { data: session } = useSession()

    return (
        <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center">
                <h2 className="text-gray-500 text-sm font-medium">Dashboard</h2>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2">Howdy, <strong>{session?.user?.name || 'Admin'}</strong></span>
                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300">
                        <User size={18} className="text-gray-500" />
                    </div>
                </div>
            </div>
        </header>
    )
}
