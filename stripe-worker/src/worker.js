export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const url = new URL(request.url);
    
    if (url.pathname === '/create-payment-intent') {
      try {
        const body = await request.json();
        const { pack, totalAmount, email, name, careEnabled } = body;

        // Convertir en centimes si nécessaire
        const amountInCents = totalAmount >= 100 ? Math.round(totalAmount * 100) : totalAmount;

        if (!amountInCents || amountInCents < 50) {
          return new Response(JSON.stringify({ error: 'Invalid amount' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Créer PaymentIntent via Stripe API
        const stripeResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            'amount': amountInCents.toString(),
            'currency': 'eur',
            'capture_method': 'manual',
            'metadata[pack]': pack || 'STARTER',
            'metadata[email]': email || '',
            'metadata[name]': name || '',
            'metadata[careEnabled]': careEnabled ? 'true' : 'false',
            'automatic_payment_methods[enabled]': 'true',
          }).toString()
        });

        const paymentIntent = await stripeResponse.json();

        if (paymentIntent.error) {
          console.error('Stripe error:', paymentIntent.error);
          return new Response(JSON.stringify({ error: paymentIntent.error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
