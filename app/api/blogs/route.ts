import { NextResponse } from 'next/server'
import { getBlogsCollection } from '@/lib/db'
import { ObjectId } from 'mongodb'

export async function GET() {
    try {
        const collection = await getBlogsCollection()
        const blogs = await collection.find({}).sort({ createdAt: -1 }).toArray()
        return NextResponse.json(blogs)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const collection = await getBlogsCollection()

        const newBlog = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
            publishedAt: data.status === 'published' ? new Date() : null
        }

        const result = await collection.insertOne(newBlog)
        return NextResponse.json({ ...newBlog, _id: result.insertedId })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
    }
}
