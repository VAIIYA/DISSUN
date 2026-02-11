import { NextResponse } from 'next/server'
import { getBlogsCollection } from '@/lib/db'
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const collection = await getBlogsCollection()
        const blog = await collection.findOne({ _id: params.id })
        if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
        return NextResponse.json(blog)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json()
        const collection = await getBlogsCollection()

        const updateData = {
            ...data,
            updatedAt: new Date()
        }

        // Convert status change to publishedAt if needed
        if (data.status === 'published' && !data.publishedAt) {
            updateData.publishedAt = new Date()
        }

        await collection.updateOne(
            { _id: params.id },
            { $set: updateData }
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const collection = await getBlogsCollection()
        await collection.deleteOne({ _id: params.id })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
    }
}
