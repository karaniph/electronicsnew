import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
// import { retrieveCheckoutSession } from '@/lib/stripe';
// import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'You must be logged in' },
      { status: 401 }
    );
  }
  
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');
  
  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }
  
  try {
    const checkoutSession = await retrieveCheckoutSession(sessionId);
    
    if (checkoutSession.payment_status === 'paid') {
      // Update user subscription tier to premium
      await prisma.user.update({
        where: { id: session.user.id },
        data: { subscriptionTier: 'premium' }
      });
      
      // Record the purchase
      await prisma.purchase.create({
        data: {
          userId: session.user.id,
          productId: 'premium_circuits',
          amount: 5.99,
          currency: 'USD',
          status: 'completed',
          paymentIntentId: checkoutSession.payment_intent as string
        }
      });
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error processing payment success:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}
