import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { total } = body

    if (!total) {
      return NextResponse.json(
        { success: false, message: 'Total amount missing' },
        { status: 400 }
      )
    }

    const amount = Math.round(Number(total) * 100) // convert to paise

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    })

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error('Razorpay error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create Razorpay order',
      },
      { status: 500 }
    )
  }
}