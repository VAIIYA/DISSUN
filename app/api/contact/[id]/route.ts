import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ObjectId } from 'mongodb'

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params

        await db.messages.delete({
            where: { _id: new ObjectId(id) }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete message error:', error)
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        )
    }
}
