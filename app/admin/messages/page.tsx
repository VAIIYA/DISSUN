import { db } from '@/lib/db'
import { MessageList } from '@/components/admin/MessageList'

export const dynamic = 'force-dynamic'

async function getMessages() {
    const messages = await db.messages.findMany({
        orderBy: { createdAt: 'desc' }
    })
    return messages.map(m => ({
        ...m,
        _id: m._id.toString(),
        createdAt: m.createdAt.toISOString()
    }))
}

export default async function AdminMessagesPage() {
    const messages = await getMessages()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                    <p className="text-sm text-gray-500">Manage contact form submissions from your customers.</p>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <MessageList initialMessages={messages} />
            </div>
        </div>
    )
}
