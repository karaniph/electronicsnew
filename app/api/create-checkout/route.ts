import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'You must be logged in' },
      { status: 401 }
    );
  }
  
  try {
    // Premium circuit templates package price ID
    const priceId = 'price_premium_circuits';
    
    const checkoutSession = await createCheckoutSession(
      session.user.id,
      priceId
    );
    
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
