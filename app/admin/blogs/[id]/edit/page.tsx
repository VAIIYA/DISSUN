'use client'

import { useState, useEffect } from 'react'
import BlogEditForm from '@/components/admin/BlogEditForm'

export default function AdminEditBlogPage({ params }: { params: { id: string } }) {
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/blogs/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setBlog(data)
                setLoading(false)
            })
    }, [params.id])

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-400 font-bold italic">Loading post data...</div>
        </div>
    )

    return <BlogEditForm id={params.id} initialData={blog} />
}
