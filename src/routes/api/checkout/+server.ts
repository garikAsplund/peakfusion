import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { products } from '$lib/products'; 
import type { CartProduct } from '$lib/types';

// Initialize Stripe with your secret key from .env
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

export async function POST({ request }) {
  try {
    // 1. Get cart items sent from the frontend
    const cartItems = (await request.json()) as CartProduct[]; // Assume structure matches CartProduct

    // Basic validation - ensure it's an array
    if (!Array.isArray(cartItems)) {
      return json({ error: 'Invalid cart data format.' }, { status: 400 });
    }

    // 2. Create Stripe Line Items using YOUR server-side product data
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of cartItems) {
      // --- SECURITY CRITICAL ---
      // Find the product in YOUR backend definition to get the REAL price.
      // NEVER trust prices sent from the client-side.
      const productDefinition = products.find(
        (p) => p.id === item.product.id // Match based on the ID within the nested product object
      );

      if (!productDefinition) {
        console.warn(`Product ID ${item.product.id} not found in backend definitions. Skipping.`);
        // Or throw an error: return json({ error: `Invalid product ID: ${item.product.id}` }, { status: 400 });
        continue; // Skip this item if not found
      }

      line_items.push({
        price_data: {
          currency: 'usd', // Or your friend's currency
          product_data: {
            name: productDefinition.name,
            // Optional: Add description or images if your Product type has them
            // description: productDefinition.description,
            // images: [productDefinition.imageUrl] // Needs absolute URL or Stripe hosting
          },
          // Use the PRICE FROM YOUR SERVER-SIDE DEFINITION (in cents)
          unit_amount: productDefinition.price,
        },
        quantity: item.quantity,
      });
    }

    // Ensure there are items to checkout after validation
    if (line_items.length === 0) {
        return json({ error: 'No valid items in cart for checkout.' }, { status: 400 });
    }

    // 3. Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      // Construct URLs using the request origin for flexibility
      success_url: `${new URL(request.url).origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(request.url).origin}/checkout/failure`,
      // Optional: Collect shipping address
      // shipping_address_collection: {
      //   allowed_countries: ['US', 'CA'], // Example countries
      // },
    });

    // 4. Return the Session ID to the frontend
    return json({ sessionId: session.id });

  } catch (error: any) {
    console.error('Stripe session creation error:', error);
    // Provide a generic error message to the client
    return json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
