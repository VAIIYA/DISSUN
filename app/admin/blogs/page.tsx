'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit2, Trash2, ExternalLink } from 'lucide-react'

interface BlogPost {
    _id: string
    title: string
    slug: string
    status: 'draft' | 'published'
    publishedAt?: string
    createdAt: string
}

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs')
            if (res.ok) {
                const data = await res.json()
                setBlogs(data)
            }
        } catch (error) {
            console.error('Error fetching blogs:', error)
        } finally {
            setLoading(false)
        }
    }

    const deleteBlog = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return

        try {
            const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setBlogs(blogs.filter(b => b._id !== id))
            }
        } catch (error) {
            console.error('Error deleting blog:', error)
        }
    }

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 italic">Blogs</h1>
                    <p className="text-gray-500 text-sm font-medium">Manage your website stories and announcements.</p>
                </div>
                <Link
                    href="/admin/blogs/new"
                    className="inline-flex items-center px-4 py-2 bg-metamask-orange text-white rounded-xl hover:bg-metamask-orange/90 transition-colors shadow-sm font-bold gap-2 text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add New Post
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
                <div className="p-6 border-b border-black/5">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            className="w-full pl-10 pr-4 py-2 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-metamask-orange/20 text-sm font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Post Title</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-bold italic">Loading blogs...</td>
                                </tr>
                            ) : filteredBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-bold italic">No blogs found.</td>
                                </tr>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-extrabold text-gray-900 group-hover:text-metamask-orange transition-colors">{blog.title}</span>
                                                <span className="text-xs text-gray-400 font-medium">/{blog.slug}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${blog.status === 'published'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-500 italic">
                                            {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/blog/${blog.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-gray-400 hover:text-metamask-orange hover:bg-metamask-orange/5 rounded-lg transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/blogs/${blog._id}/edit`}
                                                    className="p-2 text-gray-400 hover:text-metamask-orange hover:bg-metamask-orange/5 rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteBlog(blog._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
