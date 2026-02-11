'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, Image as ImageIcon, Globe, FileText, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface BlogEditFormProps {
    id?: string
    initialData?: any
}

export default function BlogEditForm({ id, initialData }: BlogEditFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        featuredImage: initialData?.featuredImage || '',
        isFeatured: initialData?.isFeatured || false,
        status: initialData?.status || 'draft',
        author: initialData?.author || 'DISSUN',
    })

    // Auto-generate slug from title
    useEffect(() => {
        if (!id && formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            setFormData(prev => ({ ...prev, slug }))
        }
    }, [formData.title, id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(false)

        try {
            const url = id ? `/api/blogs/${id}` : '/api/blogs'
            const method = id ? 'PATCH' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                setSuccess(true)
                if (!id) {
                    const data = await res.json()
                    router.push(`/admin/blogs/${data._id}/edit`)
                }
            }
        } catch (error) {
            console.error('Error saving blog:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        setFormData(prev => ({ ...prev, [name]: val }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 italic">
                            {id ? 'Edit Post' : 'New Story'}
                        </h1>
                        <p className="text-gray-500 text-sm font-medium">Craft a beautiful narrative for your audience.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {success && (
                        <span className="flex items-center gap-2 text-green-600 font-bold text-sm animate-fade-in">
                            <CheckCircle2 className="w-4 h-4" />
                            Saved!
                        </span>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center px-6 py-3 bg-metamask-orange text-white rounded-xl hover:bg-metamask-orange/90 transition-colors shadow-lg shadow-metamask-orange/20 font-bold gap-2 text-sm disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-black/5 space-y-6">
                        <div>
                            <label className="block text-xs font-black text-metamask-orange uppercase tracking-[0.2em] mb-4">Post Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g. The Evolution of the Chronograph"
                                className="w-full text-3xl font-bold bg-transparent border-b-2 border-gray-100 focus:border-metamask-orange focus:outline-none pb-4 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black text-metamask-orange uppercase tracking-[0.2em] mb-4">Slug (URL)</label>
                            <div className="flex items-center gap-2 text-sm text-gray-400 font-bold bg-gray-50 p-4 rounded-xl">
                                <Globe className="w-4 h-4" />
                                <span>dissun.com/blog/</span>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    className="bg-transparent focus:outline-none text-metamask-black border-b border-black/10"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-metamask-orange uppercase tracking-[0.2em] mb-4">Content (HTML Supported)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                rows={15}
                                placeholder="Write your story here..."
                                className="w-full bg-metamask-peach/5 border border-black/5 rounded-2xl px-6 py-6 text-metamask-black focus:outline-none focus:ring-2 focus:ring-metamask-orange font-medium leading-relaxed"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-8">
                    {/* Status & Featured */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-black/5 space-y-6">
                        <div>
                            <label className="block text-xs font-black text-metamask-orange uppercase tracking-[0.2em] mb-4">Publishing Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-metamask-orange/20"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-black/5">
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-metamask-black uppercase tracking-wider">Featured Post</span>
                                <span className="text-xs text-gray-400 font-bold italic">Show in hero section</span>
                            </div>
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleInputChange}
                                className="w-5 h-5 accent-metamask-orange"
                            />
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-black/5 space-y-6">
                        <label className="block text-xs font-black text-metamask-orange uppercase tracking-[0.2em] mb-4">Featured Image URL</label>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="featuredImage"
                                        value={formData.featuredImage}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-black/5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-metamask-orange/20"
                                    />
                                </div>
                            </div>

                            {formData.featuredImage && (
                                <div className="aspect-video rounded-2xl overflow-hidden border border-black/5 bg-gray-100">
                                    <img src={formData.featuredImage} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-black/5 space-y-6">
                        <div>
                            <label className="block text-xs font-black text-metamask-orange uppercase tracking-[0.2em] mb-4">Short Excerpt</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="A brief summary for the listing page..."
                                className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-metamask-orange/20"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
