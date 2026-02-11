'use client'

import { useState } from 'react'
import { Trash2, Mail, User, Calendar, Tag } from 'lucide-react'

interface Message {
    _id: string
    name: string
    email: string
    subject: string
    message: string
    createdAt: string
}

export function MessageList({ initialMessages }: { initialMessages: any[] }) {
    const [messages, setMessages] = useState<Message[]>(initialMessages)

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return

        try {
            const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setMessages(messages.filter(m => m._id !== id))
            }
        } catch (error) {
            console.error('Delete error:', error)
        }
    }

    if (messages.length === 0) {
        return (
            <div className="p-12 text-center">
                <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No messages found</p>
                <p className="text-gray-400 text-sm">When customers contact you, their messages will appear here.</p>
            </div>
        )
    }

    return (
        <div className="divide-y divide-gray-100">
            {messages.map((msg) => (
                <div key={msg._id} className="p-6 hover:bg-gray-50 transition-colors group">
                    <div className="flex justify-between items-start gap-4">
                        <div className="space-y-4 flex-1">
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-1.5 text-gray-900 font-semibold">
                                    <User className="w-4 h-4 text-gray-400" />
                                    {msg.name}
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <a href={`mailto:${msg.email}`} className="hover:text-luxury-gold transition-colors">
                                        {msg.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {new Date(msg.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-luxury-gold" />
                                    {msg.subject}
                                </h3>
                                <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {msg.message}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => handleDelete(msg._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            title="Delete message"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
