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

        const amountInCents = totalAmount >= 100 ? Math.round(totalAmount * 100) : totalAmount;

        if (!amountInCents || amountInCents < 50) {
          return new Response(JSON.stringify({ error: 'Invalid amount' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Créer PaymentIntent pour le pack one-shot
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

        let subscriptionId = null;

        // Si Care activé, créer un Customer + Subscription
        if (careEnabled && email) {
          try {
            // Créer Customer
            const customerResponse = await fetch('https://api.stripe.com/v1/customers', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                'email': email,
                'name': name || '',
                'metadata[source]': 'Tomorrow.Online',
                'metadata[pack]': pack || 'STARTER'
              }).toString()
            });

            const customer = await customerResponse.json();

            if (customer.id) {
              // Créer Subscription avec le produit "Tomorrow Care"
              // ID du prix : price_XXXXXX (à configurer dans Stripe Dashboard)
              const subscriptionResponse = await fetch('https://api.stripe.com/v1/subscriptions', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                  'customer': customer.id,
                  'items[0][price]': 'price_1Sw4eZHhyPxNNlpwkdXD1AFF',
                  'payment_behavior': 'default_incomplete',
                  'payment_settings[save_default_payment_method]': 'on_subscription',
                  'expand[]': 'latest_invoice.payment_intent',
                  'metadata[pack]': pack || 'STARTER',
                  'metadata[payment_intent_id]': paymentIntent.id
                }).toString()
              });

              const subscription = await subscriptionResponse.json();
              subscriptionId = subscription.id;
              console.log('Subscription created:', subscriptionId);
            }
          } catch (subError) {
            console.error('Subscription error:', subError);
          }
        }

        return new Response(JSON.stringify({
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          subscriptionId: subscriptionId
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
