// ========================================
// STRIPE PAYMENT INTEGRATION
// Pre-authorization (capture_method: manual)
// ========================================

// Configuration Stripe (MODE TEST)
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Sw2QQHhyPxNNlpw0twD0qfP74lx2DfSoyY3Zw9Unkqx1zcTW8EaoSdpbWbMS8tSwICgJiZfDaMHlpgtYXv2HZWx00GtHoIERg';
const STRIPE_WORKER_URL = 'https://tomorrow-stripe.t-martella.workers.dev';

// Configuration Web3Forms
const WEB3FORMS_ACCESS_KEY = 'f396e653-5562-4056-80e0-58e835d7e498';
const FORM_ACTION_URL = 'https://api.web3forms.com/submit';
const TEAM_EMAIL = 't.martella@bigneurons.com';

// Codes promo valides (5% de réduction)
const PROMO_CODES = {
  'F*CK WIX': { discount: 5, type: 'percent' },
  'FUCKWIX': { discount: 5, type: 'percent' },
  'FUCK WIX': { discount: 5, type: 'percent' }
};

// État du code promo
let appliedPromoCode = null;
let promoDiscount = 0;

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

// Fonction pour appliquer un code promo
window.applyPromoCode = function() {
  const codeInput = document.getElementById('promo-code');
  const messageEl = document.getElementById('promo-message');
  const code = codeInput.value.trim().toUpperCase();
  
  if (!code) {
    messageEl.textContent = '';
    messageEl.className = 'promo-message';
    return;
  }
  
  const promo = PROMO_CODES[code];
  
  if (promo) {
    appliedPromoCode = code;
    promoDiscount = promo.discount;
    messageEl.textContent = `✓ Code appliqué : -${promo.discount}% sur le site`;
    messageEl.className = 'promo-message promo-success';
    codeInput.disabled = true;
    
    // Mettre à jour l'affichage du total
    updatePaymentSummary();
  } else {
    appliedPromoCode = null;
    promoDiscount = 0;
    messageEl.textContent = '✗ Code invalide';
    messageEl.className = 'promo-message promo-error';
  }
};

// Mettre à jour le résumé du paiement avec la réduction
function updatePaymentSummary() {
  const totals = calculateTotals();
  let finalPrice = totals.price;
  
  if (promoDiscount > 0) {
    const discount = Math.round(finalPrice * promoDiscount / 100);
    finalPrice = finalPrice - discount;
  }
  
  // Mettre à jour les affichages
  const totalEl = document.querySelector('.summary-line-total span:last-child');
  if (totalEl) {
    if (promoDiscount > 0) {
      totalEl.innerHTML = `<span style="text-decoration: line-through; opacity: 0.5;">${totals.price}€</span> ${finalPrice}€ HT`;
    } else {
      totalEl.textContent = finalPrice + '€ HT';
    }
  }
}

// Calculer le montant final avec réduction
function getFinalAmount() {
  const totals = calculateTotals();
  let finalPrice = totals.price;
  
  if (promoDiscount > 0) {
    const discount = Math.round(finalPrice * promoDiscount / 100);
    finalPrice = finalPrice - discount;
  }
  
  return finalPrice;
}

// Fonction pour créer l'étape de paiement
function createPaymentStep() {
  console.log('🔄 createPaymentStep() appelé');
  
  // Tenter d'initialiser Stripe si pas encore fait
  if (!stripe) {
    console.log('⚠️ Stripe pas encore init, tentative...');
    initStripe();
  }
  
  if (!stripe) {
    console.error('❌ Stripe non initialisé - SDK non chargé');
    showError('Erreur: Stripe non disponible. Rafraîchissez la page.');
    return;
  }
  
  console.log('✅ Stripe disponible');

  console.log('🔄 Création du Payment Element...');

  // Calculer le total avec réduction promo si applicable
  const finalAmount = getFinalAmount();
  
  // Créer le PaymentIntent d'abord
  createPaymentIntentForElements(finalAmount);
}

// Créer le PaymentIntent et initialiser Elements
async function createPaymentIntentForElements(total) {
  try {
    const careEnabled = document.getElementById('care-checkbox')?.checked || false;
    
    // Récupérer les noms des upsells sélectionnés
    const upsellsDetails = [];
    const packUpsells = UPSELLS[formData.selectedPack] || [];
    packUpsells.forEach(u => {
      if (formData.upsells[u.id]) {
        upsellsDetails.push(u.name);
      }
    });
    
    // Utiliser le montant passé (déjà avec réduction promo)
    let totalAmount = total;
    
    // Ajouter Care si coché (premier mois)
    if (careEnabled) {
      totalAmount += 39;
    }
    
    console.log('📤 Envoi requête PaymentIntent:', {
      pack: formData.selectedPack,
      totalAmount: totalAmount,
      upsellsDetails: upsellsDetails,
      careEnabled: careEnabled,
      promoCode: appliedPromoCode
    });
    
    const response = await fetch(`${STRIPE_WORKER_URL}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pack: formData.selectedPack || 'STARTER',
        totalAmount: totalAmount,
        upsellsDetails: upsellsDetails,
        careEnabled: careEnabled,
        promoCode: appliedPromoCode,
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

    elements = stripe.elements({ 
      clientSecret, 
      appearance,
      locale: 'fr'
    });
    
    // Créer le Payment Element (France par défaut)
    const paymentElement = elements.create('payment', {
      wallets: {
        applePay: 'auto',
        googlePay: 'auto'
      },
      business: {
        name: 'Tomorrow.Online'
      },
      terms: {
        card: 'never'
      }
    });
    
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
    const careEnabled = document.getElementById('care-checkbox')?.checked || false;
    
    // Récupérer les champs de facturation
    const billingName = document.getElementById('billing-name')?.value || formData.brandName || '';
    const billingCompany = document.getElementById('billing-company')?.value || '';

    // 1. Confirmer le paiement avec Stripe Elements
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: formData.email,
        payment_method_data: {
          billing_details: {
            name: billingName,
            email: formData.email,
            phone: formData.phone || '',
            address: {
              country: 'FR'
            }
          },
          metadata: {
            company: billingCompany || ''
          }
        }
      },
      redirect: 'if_required'
    });

    if (error) {
      console.error('❌ Erreur paiement:', error);
      showError(error.message);
      submitButton.disabled = false;
      loader.classList.add('hidden');
      return false;
    }

    console.log('✅ Paiement pré-autorisé !', paymentIntent);
    
    // Vérifier que le paiement est bien autorisé avant de continuer
    if (!paymentIntent || paymentIntent.status !== 'requires_capture') {
      console.error('❌ Paiement non autorisé:', paymentIntent?.status);
      showError('Le paiement n\'a pas pu être autorisé. Veuillez réessayer.');
      submitButton.disabled = false;
      loader.classList.add('hidden');
      return false;
    }

    // 2. Si Care activé, créer la subscription avec le même PaymentMethod
    if (careEnabled && paymentIntent && paymentIntent.payment_method) {
      console.log('🔄 Création abonnement Care...');
      try {
        const subscriptionResult = await createCareSubscription(paymentIntent.payment_method);
        if (subscriptionResult.success) {
          console.log('✅ Abonnement Care créé:', subscriptionResult.subscriptionId);
        } else {
          console.warn('⚠️ Abonnement Care non créé:', subscriptionResult.error);
        }
      } catch (subError) {
        console.warn('⚠️ Erreur création Care (non bloquant):', subError);
      }
    }

    // 3. Envoyer le brief par email (Web3Forms)
    await sendBriefEmail();

    // 4. Afficher l'écran de succès
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
async function createCareSubscription(paymentMethodId) {
  try {
    const response = await fetch(`${STRIPE_WORKER_URL}/create-subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email || '',
        name: formData.brandName || '',
        paymentMethodId: paymentMethodId
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Erreur création abonnement');
    }
    
    return result;
  } catch (error) {
    console.error('Erreur Care subscription:', error);
    return { success: false, error: error.message };
  }
}

// Envoyer le brief par email
async function sendBriefEmail() {
  // 1. Email à l'équipe Tomorrow (brief détaillé)
  // Web3Forms envoie toujours à l'email configuré dans le dashboard (t.martella@bigneurons.com)
  // Le champ "email" ci-dessous est l'email de reply-to (le client)
  const briefData = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `[Tomorrow.Online] Nouveau Brief - ${formData.brandName || 'Client'}`,
    from_name: formData.brandName || 'Tomorrow.Online',
    replyto: formData.email || '',
    message: formatBriefForEmail()
  };

  try {
    const response = await fetch(FORM_ACTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(briefData)
    });
    
    if (response.ok) {
      console.log('✅ Brief envoyé à l\'équipe');
    } else {
      console.error('❌ Erreur envoi brief:', await response.text());
    }
  } catch (e) {
    console.error('❌ Erreur envoi brief:', e);
  }

  // 2. Email de confirmation au client
  // Pour envoyer AU CLIENT, on utilise un autre access_key configuré pour ça
  // Ou on utilise le même mais avec le bon format
  const clientEmailData = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: 'Votre site en 24H - Slot bloqué',
    from_name: 'Tomorrow.Online',
    email: TEAM_EMAIL,
    replyto: TEAM_EMAIL,
    // Envoyer au client via le champ "to" (nécessite Pro plan) ou via "cc"
    message: `
EMAIL DE CONFIRMATION POUR: ${formData.email}

---

Bonjour et merci de votre brief sur www.tomorrow.online.

Nous l'avons bien reçu et votre slot est bloqué.

Restez près de votre téléphone, nous vous appellerons demain matin pour valider le brief avec vous : ensuite le chrono démarre.

A très bientôt,

L'équipe de Tomorrow.online
    `
  };

  try {
    await fetch(FORM_ACTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientEmailData)
    });
    console.log('✅ Email de confirmation envoyé');
  } catch (e) {
    console.error('❌ Erreur envoi confirmation:', e);
  }
}

// Formater le brief pour l'email
function formatBriefForEmail() {
  const totals = calculateTotals();
  const pack = PACKS.find(p => p.id === formData.selectedPack);
  
  // Récupérer les upsells sélectionnés
  const selectedUpsells = [];
  const packUpsells = UPSELLS[formData.selectedPack] || [];
  packUpsells.forEach(u => {
    if (formData.upsells[u.id]) {
      selectedUpsells.push(`${u.name} (+${u.price}€)`);
    }
  });
  
  let message = `
🎯 NOUVEAU BRIEF REÇU
━━━━━━━━━━━━━━━━━━━━━━

📦 PACK SÉLECTIONNÉ
${pack ? pack.name : 'Non défini'} - ${pack ? pack.price : 0}€ HT

${selectedUpsells.length > 0 ? `
📋 OPTIONS SÉLECTIONNÉES
${selectedUpsells.join('\n')}
` : ''}

${formData.care ? '✅ Tomorrow Care (39€/mois) - Abonnement souscrit\n' : ''}

💳 PAIEMENT
Montant total: ${totals.price}€ HT
Délai: ${totals.delay}
Statut: PRÉ-AUTORISÉ (à capturer manuellement)
ID Stripe: ${paymentIntentId}

👤 CLIENT
Nom de marque: ${formData.brandName || 'Non renseigné'}
Email: ${formData.email || 'Non renseigné'}
Téléphone: ${formData.phone || 'Non renseigné'}

🎯 CIBLE & POSITIONNEMENT
Pitch (1 ligne): ${formData.pitch || 'Non renseigné'}
Target: ${formData.target || 'Non renseigné'}
Archétype: ${formData.archetype || 'Non renseigné'}

✍️ COPYWRITING
${formData.copywriting === 'me' ? '📝 Client fourni le contenu' : '✨ Tomorrow rédige le contenu'}

🎨 VIBE
${formData.vibeSeriousness ? `Sérieux/Drôle: ${formatVibeData(formData.vibeSeriousness, 'seriousness')}` : ''}
${formData.vibeStyle ? `Style: ${formatVibeData(formData.vibeStyle, 'style')}` : ''}

${formData.hasDomain !== undefined ? `
🌐 DOMAINE
${formData.hasDomain ? `✅ Possède un domaine: ${formData.domainName || 'À préciser'}` : '❌ Pas de domaine (à acquérir)'}
` : ''}

${formData.multiLangues && formData.multiLangues.length > 0 ? `
🌍 LANGUES
${formData.multiLangues.join(', ')}
` : ''}

${formData.pagesSupQty > 0 ? `
📄 PAGES SUPPLÉMENTAIRES (${formData.pagesSupQty})
${formData.pagesSupNames.filter(Boolean).join(', ')}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━
⚡ Chrono démarre demain matin au call de validation
  `;

  return message;
}

// Helper function pour formater les vibes
function formatVibeData(value, type) {
  if (value === 0) return 'Neutre';
  const absValue = Math.abs(value);
  if (type === 'seriousness') {
    return value < 0 ? `+${absValue}% drôle` : `+${absValue}% sérieux`;
  }
  if (type === 'style') {
    return value < 0 ? `+${absValue}% minimaliste` : `+${absValue}% complexe`;
  }
  return value + '%';
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
window.applyPromoCode = applyPromoCode;
