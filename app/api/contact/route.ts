import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const { name, email, subject, message } = data

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const newMessage = await db.messages.create({
            data: {
                name,
                email,
                subject,
                message,
            }
        })

        return NextResponse.json({ success: true, message: newMessage })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}
