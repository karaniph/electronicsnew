import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession(userId: string, priceId: string) {
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/circuits/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/circuits/payment-cancel`,
      metadata: {
        userId: userId,
      },
    });

    return { url: checkoutSession.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createSubscriptionCheckoutSession(userId: string, priceId: string) {
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/circuits/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/circuits/subscription-cancel`,
      metadata: {
        userId: userId,
      },
    });

    return { url: checkoutSession.url };
  } catch (error) {
    console.error('Error creating subscription checkout session:', error);
    throw error;
  }
}

export async function retrieveCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    throw error;
  }
}
