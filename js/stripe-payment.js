// ========================================
// STRIPE PAYMENT INTEGRATION
// Pre-authorization (capture_method: manual)
// ========================================

// Configuration Stripe (MODE TEST)
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Sw2QQHhyPxNNlpw0twD0qfP74lx2DfSoyY3Zw9Unkqx1zcTW8EaoSdpbWbMS8tSwICgJiZfDaMHlpgtYXv2HZWx00GtHoIERg';
const STRIPE_WORKER_URL = 'https://tomorrow-stripe.t-martella.workers.dev';

// Initialiser Stripe
let stripe = null;
let elements = null;
let cardElement = null;
let paymentIntentId = null;

// Initialiser Stripe quand le SDK est prêt
function initStripe() {
  if (typeof Stripe !== 'undefined' && !stripe) {
    stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
    console.log('✅ Stripe initialisé');
    return true;
  }
  return false;
}

// Essayer d'initialiser au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStripe);
} else {
  initStripe();
}

// Réessayer après un délai si Stripe n'est pas encore chargé
setTimeout(initStripe, 1000);

// Fonction pour créer l'étape de paiement
function createPaymentStep() {
  // Tenter d'initialiser Stripe si pas encore fait
  if (!stripe) {
    initStripe();
  }
  
  if (!stripe) {
    console.error('❌ Stripe non initialisé - SDK non chargé');
    showError('Erreur: Stripe non disponible. Rafraîchissez la page.');
    return;
  }

  console.log('🔄 Création du Payment Element...');

  // Calculer le total
  const total = calculateTotal();
  
  // Créer le PaymentIntent d'abord
  createPaymentIntentForElements(total);
}

// Créer le PaymentIntent et initialiser Elements
async function createPaymentIntentForElements(total) {
  try {
    const careEnabled = document.getElementById('care-checkbox')?.checked || false;
    
    console.log('📤 Envoi requête PaymentIntent:', {
      pack: formData.selectedPack,
      total: total,
      care: careEnabled
    });
    
    const response = await fetch(`${STRIPE_WORKER_URL}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pack: formData.selectedPack || 'STARTER',
        upsells: formData.upsells || {},
        email: formData.email || '',
        name: formData.brandName || '',
        briefData: {
          brandName: formData.brandName || '',
          pitch: formData.pitch || '',
          archetype: formData.archetype || ''
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur Worker:', errorText);
      throw new Error(`Worker error: ${response.status}`);
    }

    const { clientSecret, paymentIntentId: piId } = await response.json();
    paymentIntentId = piId;

    console.log('✅ PaymentIntent créé:', paymentIntentId);

    // Créer les Stripe Elements avec le clientSecret
    const appearance = {
      theme: 'stripe',
      variables: {
        colorPrimary: '#FF5500',
        colorBackground: '#FFFFFF',
        colorText: '#000000',
        colorDanger: '#CC0000',
        fontFamily: 'Space Grotesk, sans-serif',
        borderRadius: '8px'
      }
    };

    elements = stripe.elements({ clientSecret, appearance });
    
    // Créer le Payment Element
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
    
    console.log('✅ Payment Element monté');
    
  } catch (error) {
    console.error('❌ Erreur création PaymentIntent:', error);
    showError('Erreur lors de l\'initialisation du paiement. Vérifiez la console.');
  }
}

// Fonction pour soumettre le paiement
async function submitPayment() {
  if (!stripe || !elements) {
    console.error('❌ Stripe non initialisé');
    showError('Erreur d\'initialisation du paiement');
    return false;
  }

  const submitButton = document.getElementById('submit-payment-btn');
  const loader = document.getElementById('payment-loader');
  
  // Afficher le loader
  submitButton.disabled = true;
  loader.classList.remove('hidden');

  try {
    // 1. Créer le PaymentIntent via le Worker
    const total = calculateTotal();
    const careEnabled = document.getElementById('care-checkbox')?.checked || false;
    
    const response = await fetch(`${STRIPE_WORKER_URL}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pack: formData.selectedPack,
        upsells: formData.upsells,
        email: formData.email,
        name: formData.brandName,
        briefData: {
          brandName: formData.brandName,
          pitch: formData.pitch,
          archetype: formData.archetype
        }
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du paiement');
    }

    const { clientSecret, paymentIntentId: piId } = await response.json();
    paymentIntentId = piId;

    console.log('✅ PaymentIntent créé:', paymentIntentId);

    // 2. Confirmer le paiement avec Stripe Elements
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, // Pas de redirect, on gère tout côté client
        receipt_email: formData.email
      },
      redirect: 'if_required'
    });

    if (error) {
      // Erreur de paiement
      console.error('❌ Erreur paiement:', error);
      showError(error.message);
      submitButton.disabled = false;
      loader.classList.add('hidden');
      return false;
    }

    // 3. Paiement autorisé (pre-auth) !
    console.log('✅ Paiement pré-autorisé !');
    
    // 4. Si Care activé, créer la subscription
    if (careEnabled) {
      await createCareSubscription();
    }

    // 5. Envoyer le brief par email (Web3Forms)
    await sendBriefEmail();

    // 6. Afficher l'écran de succès
    showSuccessScreen();

    return true;

  } catch (error) {
    console.error('❌ Erreur:', error);
    showError('Une erreur est survenue. Veuillez réessayer.');
    submitButton.disabled = false;
    loader.classList.add('hidden');
    return false;
  }
}

// Créer la subscription Care si activée
async function createCareSubscription() {
  // TODO: Implémenter si besoin
  console.log('🔄 Care subscription à implémenter');
}

// Envoyer le brief par email
async function sendBriefEmail() {
  const briefData = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `[Tomorrow.Online] Brief - ${formData.brandName}`,
    from_name: formData.brandName,
    email: formData.email,
    message: formatBriefForEmail(),
    payment_intent_id: paymentIntentId
  };

  await fetch(FORM_ACTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(briefData)
  });

  console.log('✅ Brief envoyé par email');
}

// Formater le brief pour l'email
function formatBriefForEmail() {
  const total = calculateTotal();
  const pack = PACKS.find(p => p.id === formData.selectedPack);
  
  let message = `
🎯 NOUVEAU BRIEF REÇU
━━━━━━━━━━━━━━━━━━━━━━

📦 PACK SÉLECTIONNÉ
${pack.name} - ${pack.price}€ HT

💳 PAIEMENT
Montant total: ${total}€ HT
Statut: PRÉ-AUTORISÉ (à capturer manuellement)
ID Stripe: ${paymentIntentId}

👤 CLIENT
Nom: ${formData.brandName}
Email: ${formData.email}

📝 BRIEF
Pitch: ${formData.pitch || 'Non renseigné'}
Archétype: ${formData.archetype || 'Non renseigné'}
Copywriting: ${formData.copywriting === 'me' ? 'Client fourni' : 'Tomorrow rédige'}

━━━━━━━━━━━━━━━━━━━━━━
⚡ Chrono démarre demain matin au call de validation
  `;

  return message;
}

// Afficher une erreur
function showError(message) {
  const errorDiv = document.getElementById('payment-error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(() => errorDiv.classList.add('hidden'), 5000);
  }
}

// Calculer le total (fonction à adapter selon ton formulaire)
function calculateTotal() {
  // Utiliser la fonction calculateTotals() du formulaire si disponible
  if (typeof window.calculateTotals === 'function') {
    const totals = window.calculateTotals();
    return totals.price;
  }
  
  // Sinon calculer manuellement
  const pack = PACKS.find(p => p.id === formData.selectedPack);
  let total = pack ? pack.price : 0;

  // Ajouter les upsells
  const upsellList = UPSELLS[formData.selectedPack] || [];
  upsellList.forEach(u => {
    if (formData.upsells[u.id]) {
      if (u.hasQty) {
        total += u.price * (formData.pagesSupQty || 1);
      } else if (u.hasLangs) {
        const langCount = formData.multiLangues ? formData.multiLangues.length : 0;
        if (langCount > 0) {
          total += u.price;
          if (langCount > 1) total += (langCount - 1) * 20;
        }
      } else {
        total += u.price;
      }
    }
  });

  // Ajouter Care si coché
  const careCheckbox = document.getElementById('care-checkbox');
  if (careCheckbox && careCheckbox.checked) {
    total += 39; // Care 39€/mois (premier mois)
  }

  return total;
}

// Afficher l'écran de succès
function showSuccessScreen() {
  // Passer à l'étape succès (step 7 ou 8 selon ton formulaire)
  // À adapter selon ta structure
  console.log('✅ Afficher écran de succès');
  // Tu peux appeler la fonction existante de ton formulaire
  if (typeof finalizeForm === 'function') {
    finalizeForm();
  }
}

// Export des fonctions
window.createPaymentStep = createPaymentStep;
window.submitPayment = submitPayment;
