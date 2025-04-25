// import { Stripe } from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
//   apiVersion: '2023-10-16',
// });

// Dummy functions to prevent build errors
export async function createCheckoutSession(userId: string, priceId: string) {
  return { url: 'https://example.com/checkout-disabled' };
}

export async function createSubscriptionCheckoutSession(userId: string, priceId: string) {
  return { url: 'https://example.com/checkout-disabled' };
}

export async function retrieveCheckoutSession(sessionId: string) {
  return { id: 'dummy-session', status: 'disabled' };
}
