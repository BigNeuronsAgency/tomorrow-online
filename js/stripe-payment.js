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

// Initialiser Stripe au chargement
if (typeof Stripe !== 'undefined') {
  // ATTENTION : Remplace cette clé par ta vraie clé pk_test_...
  stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
  console.log('✅ Stripe initialisé');
}

// Fonction pour créer l'étape de paiement
function createPaymentStep() {
  if (!stripe) {
    console.error('❌ Stripe non initialisé');
    return;
  }

  // Calculer le total
  const total = calculateTotal();
  
  // Créer les Stripe Elements
  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#FF5500',
      colorBackground: '#000000',
      colorText: '#FFFFFF',
      colorDanger: '#FF3333',
      fontFamily: 'Space Grotesk, sans-serif',
      borderRadius: '8px'
    }
  };

  elements = stripe.elements({ appearance });
  
  // Créer le Payment Element (inclut Apple Pay / Google Pay)
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');
  
  console.log('✅ Stripe Elements créé');
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
  const pack = PACKS.find(p => p.id === formData.selectedPack);
  let total = pack ? pack.price : 0;

  // Ajouter les upsells
  if (formData.upsells) {
    Object.values(formData.upsells).forEach(upsell => {
      if (upsell && upsell.price) {
        total += upsell.price;
      }
    });
  }

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
