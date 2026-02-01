// ========================================
// FORMULAIRE 7 ÉTAPES - TOMORROW.ONLINE
// ========================================

// Global state
var currentStep = 1;
var totalSteps = 7; // Ajout de l'étape paiement
var currentConsoleMessage = 'SYSTEM READY';
var fileStore = [];
var countdownTimer = null;
var countdownStarted = false;

// Form action URLs - Web3Forms
const FORM_ACTION_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '2aeb47c5-ac88-4de0-9d2e-4025e72d2c9e';
const BRAND_RED = '#FF3333';

// Data constants
var PACKS = [
  { id: 'MAQUETTE', name: 'PACK MAQUETTE', price: 750, delay: 12, desc: 'Design Only // Pas de code' },
  { id: 'STARTER', name: 'PACK STARTER', price: 950, delay: 24, desc: 'Landing Page // Vitrine' },
  { id: 'BUSINESS', name: 'PACK BUSINESS', price: 2200, delay: 48, desc: 'Site Complet // Blog & SEO' }
];

var UPSELLS = {
  'MAQUETTE': [
    { id: 'packGraphique', name: 'Pack Graphique', price: 160, delay: 4, tooltip: 'Un Directeur Artistique senior boosté à l\'IA, s\'occupe de votre charte graphique et nous vous fournissons votre logo, votre typo et vos couleurs', desc: 'DA senior boosté IA pour votre charte complète.' },
    { id: 'pagesSup', name: 'Pages supplémentaires', price: 100, delay: 2, hasQty: true, hasNames: true, tooltip: 'On peut tout dire en une page, mais parfois on peut avoir besoin/envie de plus d\'espace', desc: 'Plus d\'espace pour développer votre contenu.' },
    { id: 'slogan', name: 'Slogan', price: 80, delay: 1, tooltip: 'On vous trouve votre "Just Do It" : Un concepteur-rédacteur senior vous propose 3 slogans mémorables', desc: '3 slogans mémorables par un CR senior.' }
  ],
  'STARTER': [
    { id: 'packGraphique', name: 'Pack Graphique', price: 160, delay: 4, tooltip: 'Un Directeur Artistique senior boosté à l\'IA, s\'occupe de votre charte graphique et nous vous fournissons votre logo, votre typo et vos couleurs', desc: 'DA senior boosté IA pour votre charte complète.' },
    { id: 'slogan', name: 'Slogan', price: 80, delay: 1, tooltip: 'On vous trouve votre "Just Do It" : Un concepteur-rédacteur senior vous propose 3 slogans mémorables', desc: '3 slogans mémorables par un CR senior.' },
    { id: 'pagesSup', name: 'Pages supplémentaires', price: 190, delay: 3, hasQty: true, hasNames: true, tooltip: 'On peut tout dire en une page, mais parfois on peut avoir besoin/envie de plus d\'espace', desc: 'Plus d\'espace pour développer votre contenu.' },
    { id: 'formulaire', name: 'Formulaire', price: 90, delay: 1, tooltip: 'On sait que vous avez aimé le notre, on vous en fait un ?', desc: 'Un formulaire comme celui-ci pour votre site.' },
    { id: 'multilingue', name: 'Multilingue', price: 130, delay: 2, hasLangs: true, tooltip: 'Donnez une dimension internationale à votre marque', desc: 'Dimension internationale. 1ère langue offerte.' },
    { id: 'setupGoogle', name: 'Setup Google', price: 90, delay: 1, tooltip: 'On vous connecte aux outils d\'analyses et de publicité google', desc: 'Analytics + Ads configurés et prêts.' },
    { id: 'darkMode', name: 'Version Dark/White', price: 35, delay: 1, tooltip: 'Modernité ou élégance, plus besoin de choisir', desc: 'Laissez vos visiteurs choisir leur ambiance.' },
    { id: 'paiement', name: 'Module de paiement (Stripe)', price: 120, delay: 2, tooltip: 'Vous comptez encaisser comment ?', desc: 'Encaissement Stripe intégré et sécurisé.' }
  ],
  'BUSINESS': [
    { id: 'packGraphique', name: 'Pack Graphique', price: 160, delay: 4, tooltip: 'Un Directeur Artistique senior boosté à l\'IA, s\'occupe de votre charte graphique et nous vous fournissons votre logo, votre typo et vos couleurs', desc: 'DA senior boosté IA pour votre charte complète.' },
    { id: 'slogan', name: 'Slogan', price: 80, delay: 1, tooltip: 'On vous trouve votre "Just Do It" : Un concepteur-rédacteur senior vous propose 3 slogans mémorables', desc: '3 slogans mémorables par un CR senior.' },
    { id: 'pagesSup', name: 'Pages supplémentaires', price: 190, delay: 3, hasQty: true, hasNames: true, tooltip: 'On peut tout dire en une page, mais parfois on peut avoir besoin/envie de plus d\'espace', desc: 'Plus d\'espace pour développer votre contenu.' },
    { id: 'formulaire', name: 'Formulaire', price: 90, delay: 1, tooltip: 'On sait que vous avez aimé le notre, on vous en fait un ?', desc: 'Un formulaire comme celui-ci pour votre site.' },
    { id: 'multilingue', name: 'Multilingue', price: 130, delay: 2, hasLangs: true, tooltip: 'Donnez une dimension internationale à votre marque', desc: 'Dimension internationale. 1ère langue offerte.' },
    { id: 'setupGoogle', name: 'Setup Google', price: 90, delay: 1, tooltip: 'On vous connecte aux outils d\'analyses et de publicité google', desc: 'Analytics + Ads configurés et prêts.' },
    { id: 'darkMode', name: 'Version Dark/White', price: 35, delay: 1, tooltip: 'Modernité ou élégance, plus besoin de choisir', desc: 'Laissez vos visiteurs choisir leur ambiance.' },
    { id: 'paiement', name: 'Module de paiement (Stripe)', price: 120, delay: 2, tooltip: 'Vous comptez encaisser comment ?', desc: 'Encaissement Stripe intégré et sécurisé.' }
  ]
};

var UPSELLS_SUCCESS = [
  { id: 'socialMedia', name: 'Pack Social Media Lancement', price: 140, hasNetwork: true, tooltip: 'Maintenant que vous avez un beau site, il faut l\'annoncer, profitez de 8 publications sur Instagram ou 6 sur LinkedIn', desc: '8 posts Instagram ou 6 posts LinkedIn pour annoncer votre lancement.' },
  { id: 'pubMeta', name: 'Pack Publicités Meta', price: 160, tooltip: 'Faites vos premières ventes avec un jeu de 6 créa performantes, adaptées à l\'algorithme Meta et surtout à votre cible', desc: '6 créas Meta performantes adaptées à votre cible.' },
  { id: 'analysePersona', name: 'Analyse Cible et Persona', price: 30, tooltip: 'Apprenez à connaître votre cible par coeur, pour leur parler en toute autonomie', desc: 'Connaissez votre cible par cœur.' },
  { id: 'packPrint', name: 'Pack Graphique Print', price: 140, tooltip: 'Votre univers digital dans la vraie vie avec 3 gabarits (carte de visite, flyer recto-verso et roll up)', desc: 'Carte de visite, flyer et roll-up pour exister IRL.' },
  { id: 'tomorrowSucces', name: 'Pack Tomorrow Succès', price: 290, originalPrice: 470, isBundle: true, tooltip: 'Tous les services précédents', desc: 'Tous les services ci-dessus réunis. Économisez 180€.' }
];

var DETAILS_DATA = {
  'MAQUETTE': { title: 'PACK MAQUETTE (12H)', included: ['Design Figma Complet', 'Direction Artistique Senior', 'Maquettes Desktop & Mobile', 'Fichiers Sources', 'Cession des droits'], excluded: ['Intégration Webflow', 'Animations', 'SEO Technique', 'Mise en ligne'] },
  'STARTER': { title: 'PACK STARTER (24H)', included: ['Design Premium', 'Développement Webflow', 'Responsive Perfect', 'Optimisation SEO de base', 'Copywriting (Textes)'], excluded: ['Système de Blog/CMS', 'Filtres avancés', 'E-commerce'] },
  'BUSINESS': { title: 'PACK BUSINESS (48H)', included: ['Site Multi-pages (max 5)', 'CMS (Blog/Réalisations)', 'Animations Avancées (GSAP)', 'SEO Technique Avancé', 'Formation Admin'], excluded: ['E-commerce complexe', 'Espace Membre'] }
};

var ARCHETYPES = [
  { id: 'innocent', icon: '☁️', name: "L'Innocent", desc: "Optimisme & Sécurité" },
  { id: 'explorer', icon: '🧭', name: "L'Explorateur", desc: "Liberté & Découverte" },
  { id: 'sage', icon: '🦉', name: "Le Sage", desc: "Vérité & Expertise" },
  { id: 'hero', icon: '🏆', name: "Le Héros", desc: "Courage & Maîtrise" },
  { id: 'outlaw', icon: '💀', name: "Le Hors-la-loi", desc: "Révolution & Disruption" },
  { id: 'magician', icon: '✨', name: "Le Magicien", desc: "Vision & Transformation" },
  { id: 'everyman', icon: '🤝', name: "Mr T-L-M", desc: "Réalisme & Connexion" },
  { id: 'lover', icon: '🌹', name: "L'Amoureux", desc: "Passion & Intimité" },
  { id: 'jester', icon: '🎭', name: "Le Bouffon", desc: "Humour & Plaisir" },
  { id: 'caregiver', icon: '🛡️', name: "Le Soignant", desc: "Service & Protection" },
  { id: 'creator', icon: '🎨', name: "Le Créateur", desc: "Innovation & Création" },
  { id: 'ruler', icon: '👑', name: "Le Dirigeant", desc: "Contrôle & Succès" }
];

// Form data
var formData = {
  brandName: '',
  pitch: '',
  competitors: '',
  target: '',
  problem: '',
  solution: '',
  whyUs: '',
  archetype: '',
  vibeSeriousness: 0,
  vibeStyle: 0,
  copywriting: 'me',
  selectedPack: '',
  upsells: {},
  pagesSupQty: 1,
  pagesSupNames: [],
  multiLangues: [],
  socialNetwork: '',
  socialNetworkExtra: false,
  upsellsSuccess: {},
  hasDomain: null,
  domainName: '',
  care: false,
  email: '',
  phone: ''
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

function calculateTotals() {
  var price = 0;
  var delay = 0;
  var pack = PACKS.find(p => p.id === formData.selectedPack);
  if (pack) {
    price += pack.price;
    delay += pack.delay;
  }
  var upsellList = UPSELLS[formData.selectedPack] || [];
  upsellList.forEach(u => {
    if (formData.upsells[u.id]) {
      if (u.hasQty) {
        price += u.price * formData.pagesSupQty;
        delay += u.delay * formData.pagesSupQty;
      } else if (u.hasLangs) {
        var langCount = formData.multiLangues.length;
        if (langCount > 0) {
          price += u.price;
          if (langCount > 1) price += (langCount - 1) * 20;
          delay += u.delay;
        }
      } else {
        price += u.price;
        delay += u.delay;
      }
    }
  });
  return { price: price, delay: delay };
}

// Export globalement pour stripe-payment.js
window.calculateTotals = calculateTotals;

function validateEmail(email) {
  return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function validatePhone(phone) {
  return String(phone).match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/);
}

function checkValidation() {
  let valid = true;
  let emailInput = document.getElementById('input-email');
  let phoneInput = document.getElementById('input-phone');
  
  if (emailInput) emailInput.style.borderColor = "#e2e8f0";
  if (phoneInput) phoneInput.style.borderColor = "#e2e8f0";
  
  if (!validateEmail(formData.email)) {
    typeConsole('ERROR: INVALID EMAIL');
    if (emailInput) {
      emailInput.style.borderColor = BRAND_RED;
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(emailInput, { x: -5 }, { x: 5, duration: 0.1, yoyo: true, repeat: 3 });
      }
    }
    valid = false;
  }
  
  if (!validatePhone(formData.phone)) {
    typeConsole('ERROR: INVALID PHONE');
    if (phoneInput) {
      phoneInput.style.borderColor = BRAND_RED;
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(phoneInput, { x: -5 }, { x: 5, duration: 0.1, yoyo: true, repeat: 3 });
      }
    }
    valid = false;
  }
  
  return valid;
}

function updateRangeLabel(input, labelId) {
  if (!input) return;
  const val = parseInt(input.value);
  const label = document.getElementById(labelId);
  if (!label) return;
  const type = labelId.includes('serious') ? 'seriousness' : 'style';
  label.innerHTML = formatVibeLabel(val, type);
  const percent = ((val + 100) * 100) / 200;
  label.style.left = `calc(${percent}% + (${8 - percent * 0.15}px))`;
}

function typeConsole(text) {
  currentConsoleMessage = text;
  var el = document.getElementById('consoleOutput');
  if (el) {
    el.innerHTML = `<span class="text-gradient">> SYSTEM:</span> ${text}`;
    el.classList.remove('animate-pulse');
    void el.offsetWidth;
    el.classList.add('animate-pulse');
  }
}

function lockScroll() {
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.overflow = '';
}

function formatVibeLabel(value, type) {
  if (value === 0) return 'Neutre';
  var absValue = Math.abs(value);
  if (type === 'seriousness') {
    return value < 0 ? `+${absValue}% Drôle` : `+${absValue}% Sérieux`;
  }
  if (type === 'style') {
    return value < 0 ? `+${absValue}% Minimaliste` : `+${absValue}% Complexe`;
  }
  return value + '%';
}

function formatVibeData(value, type) {
  if (value === 0) return 'Neutre';
  var absValue = Math.abs(value);
  if (type === 'seriousness') {
    return value < 0 ? `+${absValue}% drôle` : `+${absValue}% sérieux`;
  }
  if (type === 'style') {
    return value < 0 ? `+${absValue}% minimaliste` : `+${absValue}% complexe`;
  }
  return value + '%';
}

// ========================================
// RENDER FUNCTIONS
// ========================================

function renderHeader(progress) {
  return `
    <div class="modal-header">
      <div class="modal-header-content">
        <div class="step-indicator font-mono">STEP ${currentStep}/7</div>
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: ${progress}%"></div>
        </div>
      </div>
    </div>
  `;
}

function renderUpsellCard(u) {
  var selected = formData.upsells[u.id] || false;
  var html = `
    <div onclick="window.toggleUpsell('${u.id}')" id="ups-${u.id}" class="upsell-card ${selected ? 'selected' : ''}">
      <div class="upsell-main">
        <div class="upsell-check">${selected ? '✓' : ''}</div>
        <div class="upsell-content">
          <div class="upsell-header">
            <span class="upsell-name">${u.name}</span>
            <span class="upsell-info" title="${u.tooltip}">ⓘ</span>
          </div>
          ${u.desc ? `<p class="upsell-desc">${u.desc}</p>` : ''}
        </div>
        <span class="upsell-price">+${u.price}€</span>
      </div>
    </div>
  `;
  
  if (selected && u.hasQty) {
    html += `
      <div class="upsell-extra">
        <div class="upsell-extra-header">
          <span class="upsell-icon">📄</span>
          <label class="upsell-label">Quantité de pages :</label>
        </div>
        <input type="number" min="1" max="10" value="${formData.pagesSupQty}" 
          onchange="formData.pagesSupQty = parseInt(this.value); draw(true);" 
          class="upsell-input upsell-input-number">
        <div class="upsell-extra-divider"></div>
        <label class="upsell-label">Noms des pages :</label>
        <div class="upsell-inputs">
          ${Array.from({ length: formData.pagesSupQty }, (_, i) => 
            `<input type="text" placeholder="Page ${i + 1}" 
              value="${formData.pagesSupNames[i] || ''}" 
              onchange="formData.pagesSupNames[${i}] = this.value;" 
              class="upsell-input">`
          ).join('')}
        </div>
      </div>
    `;
  }
  
  if (selected && u.hasLangs) {
    var langIcons = { 'Anglais': '🇬🇧', 'Italien': '🇮🇹', 'Espagnol': '🇪🇸', 'Arabe': '🇸🇦', 'Russe': '🇷🇺', 'Allemand': '🇩🇪', 'Mandarin': '🇨🇳' };
    var langs = ['Anglais', 'Italien', 'Espagnol', 'Arabe', 'Russe', 'Allemand', 'Mandarin'];
    html += `
      <div class="upsell-extra">
        <div class="upsell-extra-header">
          <span class="upsell-icon">🌍</span>
          <label class="upsell-label">Langues (1ère offerte, +20€/langue sup)</label>
        </div>
        <div class="lang-grid">
          ${langs.map(l => {
            var checked = formData.multiLangues.includes(l);
            return `
              <label class="lang-option ${checked ? 'selected' : ''}">
                <input type="checkbox" ${checked ? 'checked' : ''} onchange="window.toggleLang('${l}')">
                <span class="lang-icon">${langIcons[l]}</span>
                <span class="lang-name">${l}</span>
              </label>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
  
  return html;
}

function getStepContent() {
  // Step 1: Business
  if (currentStep === 1) {
    return `
      <div class="form-step step-1">
        <div class="step-header">
          <h2 class="step-title">LE BUSINESS</h2>
          <p class="step-subtitle font-mono">Identification du sujet.</p>
        </div>
        
        <div class="step-grid">
          <div class="form-group">
            <label class="form-label">Nom de la marque</label>
            <input type="text" value="${formData.brandName}" 
              onfocus="typeConsole('IDENTIFYING BRAND...')" 
              oninput="window.updateInput('brandName', this.value)" 
              class="form-input" placeholder="Ex: Nike">
          </div>
          
          <div class="form-group">
            <label class="form-label">Concurrents</label>
            <input type="text" value="${formData.competitors}" 
              onfocus="typeConsole('SCANNING COMPETITION...')" 
              oninput="window.updateInput('competitors', this.value)" 
              class="form-input" placeholder="Qui voulez-vous dépasser ?">
          </div>
          
          <div class="form-group form-group-full">
            <label class="form-label">Le Pitch</label>
            <textarea rows="2" 
              onfocus="typeConsole('ANALYZING PITCH...')" 
              oninput="window.updateInput('pitch', this.value)" 
              class="form-textarea" 
              placeholder="Que faites-vous ? (Soyez le plus exhaustif possible)">${formData.pitch}</textarea>
          </div>
        </div>
      </div>
    `;
  }
  
  // Step 2: Target
  if (currentStep === 2) {
    return `
      <div class="form-step step-2">
        <div class="step-header">
          <h2 class="step-title">LA CIBLE</h2>
          <p class="step-subtitle font-mono">A qui doit-on parler ?</p>
        </div>
        
        <div class="step-grid">
          <div class="form-group">
            <label class="form-label">Cible Principale</label>
            <textarea rows="2" 
              onfocus="typeConsole('TARGETING AUDIENCE...')" 
              oninput="window.updateInput('target', this.value)" 
              class="form-textarea" 
              placeholder="Qui est le client idéal ?">${formData.target}</textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">La Solution</label>
            <textarea rows="2" 
              onfocus="typeConsole('DEFINING SOLUTION...')" 
              oninput="window.updateInput('solution', this.value)" 
              class="form-textarea" 
              placeholder="Comment résolvez-vous son problème ?">${formData.solution}</textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Douleur (Problème)</label>
            <textarea rows="2" 
              onfocus="typeConsole('IDENTIFYING PAIN POINTS...')" 
              oninput="window.updateInput('problem', this.value)" 
              class="form-textarea" 
              placeholder="Qu'est-ce qui l'empêche de dormir ?">${formData.problem}</textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Pourquoi vous ?</label>
            <textarea rows="2" 
              onfocus="typeConsole('CALCULATING UNFAIR ADVANTAGE...')" 
              oninput="window.updateInput('whyUs', this.value)" 
              class="form-textarea" 
              placeholder="Votre avantage injuste.">${formData.whyUs}</textarea>
          </div>
        </div>
      </div>
    `;
  }
  
  // Step 3: Archetype
  if (currentStep === 3) {
    return `
      <div class="form-step step-3">
        <div class="step-header">
          <h2 class="step-title">ARCHÉTYPE</h2>
          <p class="step-subtitle font-mono">L'identité de votre marque.</p>
        </div>
        
        <div class="archetype-grid">${ARCHETYPES.map(a => `
            <div onclick="window.selectArchetype('${a.id}')" 
              id="arch-${a.id}" 
              class="archetype-card ${formData.archetype === a.id ? 'selected' : ''}">
              <span class="archetype-icon">${a.icon}</span>
              <span class="archetype-name">${a.name}</span>
              <span class="archetype-desc">${a.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Step 4: Tone & Style
  if (currentStep === 4) {
    let fileListHTML = '';
    if (fileStore.length > 0) {
      fileListHTML = `
        <div class="file-list">
          ${fileStore.map((f, i) => `
            <div class="file-item">
              <span>${f.name.substring(0, 12)}...</span>
              <button onclick="window.removeFile(${i})" class="file-remove">×</button>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    return `
      <div class="form-step step-4">
        <div class="step-header">
          <h2 class="step-title">TONALITÉ & STYLE</h2>
          <p class="step-subtitle font-mono">Calibrage de votre site.</p>
        </div>
        
        <div class="step-grid step-grid-4">
          <div class="form-group">
            <div class="copywriting-group">
              <label class="form-label">Copywriting</label>
              <div class="copy-buttons">
                <button onclick="window.selectCopy('me')" id="copy-me" 
                  class="copy-btn ${formData.copywriting === 'me' ? 'selected' : ''}">
                  J'ai mes textes
                </button>
                <button onclick="window.selectCopy('arthur')" id="copy-arthur" 
                  class="copy-btn ${formData.copywriting === 'arthur' ? 'selected' : ''}">
                  Arthur s'en charge
                  <span class="copy-badge">Offert</span>
                </button>
              </div>
            </div>
            
            <div class="file-upload">
              <input type="file" multiple onchange="window.handleFileSelect(this)" class="file-input">
              <p class="file-label">
                📂 DRAG & DROP ASSETS<br>
                <span class="file-sublabel">Logo, Photos, Textes, Charte...</span>
              </p>
            </div>
            ${fileListHTML}
          </div>
          
          <div class="form-group">
            <div class="vibe-box">
              <label class="form-label-small">Calibrage</label>
              
              <div class="range-group">
                <div class="range-labels">
                  <span>Drôle</span>
                  <span>Sérieux</span>
                </div>
                <input type="range" min="-100" max="100" value="${formData.vibeSeriousness}" 
                  oninput="window.updateInput('vibeSeriousness', this.value, 'SERIOUSNESS...'); updateRangeLabel(this, 'label-serious')" 
                  class="range-input">
                <span id="label-serious" class="range-value">${formatVibeLabel(formData.vibeSeriousness, 'seriousness')}</span>
              </div>
              
              <div class="range-group">
                <div class="range-labels">
                  <span>Minimaliste</span>
                  <span>Complexe</span>
                </div>
                <input type="range" min="-100" max="100" value="${formData.vibeStyle}" 
                  oninput="window.updateInput('vibeStyle', this.value, 'COMPLEXITY...'); updateRangeLabel(this, 'label-style')" 
                  class="range-input">
                <span id="label-style" class="range-value">${formatVibeLabel(formData.vibeStyle, 'style')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  // Step 5: Pack Selection
  if (currentStep === 5) {
    if (!formData.selectedPack) {
      return `
        <div class="form-step step-5">
          <div class="step-header">
            <h2 class="step-title">L'OFFRE</h2>
          </div>
          
          <div class="pack-grid">
            ${PACKS.map(p => `
              <button onclick="window.selectPack('${p.id}')" class="pack-card">
                <div class="pack-header">
                  <span class="pack-name">${p.name}</span>
                  <span class="pack-price">${p.price}€</span>
                </div>
                <p class="pack-desc">${p.desc}</p>
                <div class="pack-action">Sélectionner →</div>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      return `
        <div class="form-step step-5">
          <div class="step-header">
            <h2 class="step-title">L'OFFRE</h2>
          </div>
          
          <div class="pack-selected">
            <div class="pack-selected-header">
              <div>
                <span class="pack-selected-label font-mono">Pack Sélectionné</span>
                <span class="pack-selected-name">${PACKS.find(p => p.id === formData.selectedPack).name}</span>
              </div>
              <button onclick="window.resetPack()" class="pack-change">Changer</button>
            </div>
          </div>
          
          <h3 class="upsells-title">Options supplémentaires</h3>
          <div class="upsells-list">
            ${(UPSELLS[formData.selectedPack] || []).map(u => renderUpsellCard(u)).join('')}
          </div>
        </div>
      `;
    }
  }
  
  // Step 6: Validation
  if (currentStep === 6) {
    return `
      <div class="form-step step-6">
        <div class="step-header">
          <h2 class="step-title">VALIDATION</h2>
          <p class="step-subtitle font-mono">Dernière ligne droite.</p>
        </div>
        
        <div class="step-grid">
          ${formData.selectedPack !== 'MAQUETTE' ? `
            <div class="form-group">
              <div class="domain-box">
                <p class="form-label-small">Avez-vous un nom de domaine ?</p>
                <div class="domain-buttons">
                  <button onclick="window.selectDomain(true)" id="dom-yes" 
                    class="domain-btn ${formData.hasDomain === true ? 'selected' : ''}">
                    Oui
                  </button>
                  <button onclick="window.selectDomain(false)" id="dom-no" 
                    class="domain-btn ${formData.hasDomain === false ? 'selected' : ''}">
                    Non
                  </button>
                </div>
                <div id="domain-content" class="domain-content">
                  ${formData.hasDomain === true ? `
                    <input type="text" value="${formData.domainName}" 
                      oninput="window.updateInput('domainName', this.value, 'DOMAIN INPUT...')" 
                      class="domain-input" placeholder="ex: monsite.com">
                    <p class="domain-note domain-note-success">✓ Je m'engage à fournir les accès DNS.</p>
                  ` : ''}
                  ${formData.hasDomain === false ? `
                    <p class="domain-note domain-note-warning">⚠️ Le nom de domaine reste à votre charge.</p>
                  ` : ''}
                </div>
              </div>
            </div>
          ` : '<div></div>'}
          
          <div class="form-group">
            <div class="contact-box">
              <div class="form-group">
                <label class="form-label">Email Pro <span class="required">*</span></label>
                <input type="email" id="input-email" value="${formData.email}" 
                  oninput="window.updateInput('email', this.value)" 
                  class="form-input" placeholder="hello@entreprise.com">
              </div>
              
              <div class="form-group">
                <label class="form-label">Téléphone <span class="required">*</span></label>
                <input type="tel" id="input-phone" value="${formData.phone}" 
                  oninput="window.updateInput('phone', this.value)" 
                  class="form-input" placeholder="06 00 00 00 00">
              </div>
              
              <button onclick="window.goToPaymentStep()" id="submitBtn" class="btn btn-submit">
                Continuer vers le paiement →
              </button>
              
              <div class="submit-note">
                <p class="submit-note-small font-mono">Étape suivante : Sécurisation du slot</p>
                <p class="submit-note-highlight font-mono">
                  Empreinte bancaire uniquement. Aucun débit avant livraison.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  // Step 7: Paiement (Confirmation)
  if (currentStep === 7) {
    const totals = calculateTotals();
    const pack = PACKS.find(p => p.id === formData.selectedPack);
    
    // Récupérer les upsells sélectionnés avec leurs détails
    const selectedUpsells = [];
    const packUpsells = UPSELLS[formData.selectedPack] || [];
    
    packUpsells.forEach(upsell => {
      if (formData.upsells[upsell.id]) {
        selectedUpsells.push(upsell);
      }
    });
    
    const hasUpsells = selectedUpsells.length > 0;
    
    return `
      <div class="form-step step-7">
        <div class="step-header">
          <h2 class="step-title">CONFIRMATION</h2>
          <p class="step-subtitle font-mono">Sécurisation de votre slot</p>
        </div>
        
        <div class="payment-container">
          <!-- Récapitulatif -->
          <div class="payment-summary">
            <h3 class="payment-summary-title">Récapitulatif</h3>
            
            <div class="summary-line">
              <span>${pack.name}</span>
              <span class="font-mono">${pack.price}€ HT</span>
            </div>
            
            ${hasUpsells ? `
              <div class="summary-divider"></div>
              <p class="summary-section-title">Options</p>
              ${selectedUpsells.map(upsell => `
                <div class="summary-line summary-line-small">
                  <span>${upsell.name}</span>
                  <span class="font-mono">${upsell.price}€</span>
                </div>
              `).join('')}
            ` : ''}
            
            <div class="summary-divider"></div>
            
            <div class="summary-line summary-line-total">
              <span>TOTAL HT</span>
              <span class="font-mono">${totals.price}€</span>
            </div>
            
            <div class="payment-reassurance">
              <p class="reassurance-text">
                <span class="reassurance-icon">🔒</span>
                Aucun débit avant livraison du site. Empreinte bancaire uniquement.
              </p>
            </div>
          </div>
          
          <!-- Formulaire de paiement Stripe -->
          <div class="payment-form">
            <h3 class="payment-form-title">Informations de facturation</h3>
            
            <!-- Informations de facturation -->
            <div class="billing-info">
              <div class="form-group">
                <label class="form-label-small">Nom complet *</label>
                <input type="text" id="billing-name" value="${formData.brandName || ''}" 
                  class="form-input" placeholder="Jean Dupont" required>
              </div>
              <div class="form-group">
                <label class="form-label-small">Société (optionnel)</label>
                <input type="text" id="billing-company" value="${formData.company || ''}" 
                  class="form-input" placeholder="Nom de votre entreprise">
              </div>
            </div>
            
            <!-- Code promo -->
            <div class="promo-wrapper">
              <label class="form-label-small">Code promo</label>
              <div class="promo-input-wrapper">
                <input type="text" id="promo-code" class="form-input promo-input" 
                  placeholder="Entrez votre code" maxlength="20">
                <button type="button" onclick="window.applyPromoCode()" class="btn-apply-promo">Appliquer</button>
              </div>
              <div id="promo-message" class="promo-message"></div>
            </div>
            
            <!-- Care optionnel -->
            <div class="care-checkbox-wrapper">
              <label class="care-checkbox-label">
                <input type="checkbox" id="care-checkbox" class="care-checkbox-input" ${formData.care ? 'checked' : ''}>
                <span class="care-checkbox-text">
                  <strong>Tomorrow Care</strong> - 39€/mois
                  <br>
                  <small>Hébergement, maintenance technique et 0.5j de dev/mois</small>
                </span>
              </label>
            </div>
            
            <!-- Stripe Payment Element -->
            <div id="payment-element" class="stripe-element">
              <!-- Stripe Elements will be inserted here -->
            </div>
            
            <!-- Message d'erreur -->
            <div id="payment-error" class="payment-error hidden"></div>
            
            <!-- Bouton de soumission -->
            <button onclick="window.submitPayment()" id="submit-payment-btn" class="btn btn-primary btn-submit-payment">
              <span id="payment-button-text">Sécuriser mon slot</span>
              <span id="payment-loader" class="payment-loader hidden"></span>
            </button>
            
            <p class="payment-note font-mono">
              Paiement sécurisé par Stripe.
            </p>
          </div>
        </div>
      </div>
    `;
  }
  
  // Step 8 (ancien step 7) - Success screen
}

function renderSuccessCard(u) {
  var selected = formData.upsellsSuccess[u.id] || false;
  var isBundle = u.isBundle;
  return `
    <div onclick="window.toggleSuccessUpsell('${u.id}')" 
      class="success-card ${selected ? 'selected' : ''} ${isBundle ? 'bundle' : ''}">
      ${isBundle ? '<div class="success-badge">BEST DEAL</div>' : ''}
      <div class="success-main">
        <div class="success-check">${selected ? '✓' : ''}</div>
        <div class="success-content">
          <div class="success-name-row">
            <span class="success-name">${u.name}</span>
            <span class="success-info" title="${u.tooltip}">ⓘ</span>
          </div>
          ${u.desc ? `<p class="success-desc">${u.desc}</p>` : ''}
          ${isBundle ? 
            `<div class="success-price-bundle">
              <span class="success-price-old">${u.originalPrice}€</span>
              <span class="success-price-new">${u.price}€</span>
            </div>` : 
            `<div class="success-price">${u.price}€</div>`
          }
        </div>
      </div>
      ${selected && u.hasNetwork ? `
        <div class="success-extra">
          <label class="form-label-small">Réseau de prédilection :</label>
          <div class="network-options">
            <label class="network-option">
              <input type="radio" name="socialNetwork" value="Instagram" 
                ${formData.socialNetwork === 'Instagram' ? 'checked' : ''} 
                onchange="formData.socialNetwork = this.value; draw();">
              Instagram (8 posts)
            </label>
            <label class="network-option">
              <input type="radio" name="socialNetwork" value="LinkedIn" 
                ${formData.socialNetwork === 'LinkedIn' ? 'checked' : ''} 
                onchange="formData.socialNetwork = this.value; draw();">
              LinkedIn (6 posts)
            </label>
          </div>
          <label class="network-extra">
            <input type="checkbox" ${formData.socialNetworkExtra ? 'checked' : ''} 
              onchange="formData.socialNetworkExtra = this.checked; draw();">
            Ajouter l'autre réseau (+80€)
          </label>
        </div>
      ` : ''}
    </div>
  `;
}

function draw(preserveScroll) {
  var container = document.getElementById('modalContent');
  if (!container) return;
  
  var scrollPos = preserveScroll ? container.querySelector('.modal-body')?.scrollTop || 0 : 0;
  var progress = (currentStep / totalSteps) * 100;
  var totals = calculateTotals();
  var showTotals = formData.selectedPack !== '';
  
  container.innerHTML = `
    ${renderHeader(progress)}
    
    <div class="modal-body">
      ${getStepContent()}
    </div>
    
    <div class="modal-footer">
      <div class="modal-console font-mono">
        <div class="console-left">
          <span class="console-slot">VOTRE SLOT: <span id="consoleSlotId">...</span></span>
          <span class="console-brand" id="consoleBrandName">${formData.brandName || 'NOUVELLE MARQUE'}</span>
        </div>
        <div class="console-right">
          ${showTotals ? `
            <div class="console-totals">
              <div class="console-delay">
                <span class="console-label">ESTIMATION:</span>
                <span class="console-value">${totals.delay}H</span>
              </div>
              <div class="console-price">${totals.price}€</div>
            </div>
          ` : ''}
          <div id="consoleOutput" class="console-output">
            <span class="text-gradient">> SYSTEM:</span> ${currentConsoleMessage}
          </div>
        </div>
      </div>
      
      <div class="modal-actions">
        <button onclick="window.handleCloseOrBack()" class="btn btn-back">
          <span class="back-arrow">←</span>
          <span>${currentStep === 1 ? 'FERMER' : (currentStep === 7 ? 'PASSER' : 'ABANDONNER (AVEC REGRET)')}</span>
        </button>
        
        <div class="nav-buttons">
          ${currentStep > 1 && currentStep < 7 ? 
            `<button onclick="window.prevStep()" class="btn btn-outline">← PRÉCÉDENT</button>` : 
            ''
          }
          ${currentStep < 6 ? 
            `<button onclick="window.nextStep()" class="btn btn-primary">SUIVANT →</button>` : 
            ''
          }
        </div>
      </div>
    </div>
  `;
  
  // Restaurer le scroll après le rendu
  if (preserveScroll && scrollPos > 0) {
    requestAnimationFrame(() => {
      var scrollContainer = container.querySelector('.modal-body');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollPos;
      }
    });
  }
  
  var slotEl = document.getElementById('consoleSlotId');
  if (slotEl) slotEl.innerText = Math.floor(Math.random() * 9000) + 1000;
  
  if (currentStep === 4) {
    setTimeout(() => {
      updateRangeLabel(document.querySelector('input[oninput*="vibeSeriousness"]'), 'label-serious');
      updateRangeLabel(document.querySelector('input[oninput*="vibeStyle"]'), 'label-style');
    }, 100);
  }
  
  if (currentStep === 7 && !countdownStarted) {
    startCountdown();
    countdownStarted = true;
  }
}

// ========================================
// INTERACTION FUNCTIONS
// ========================================

window.updateInput = function(key, value, consoleMsg) {
  formData[key] = value;
  if (consoleMsg) typeConsole(consoleMsg);
  if (key === 'brandName') {
    var el = document.getElementById('consoleBrandName');
    if (el) el.innerText = value || 'NOUVELLE MARQUE';
  }
};

window.selectArchetype = function(id) {
  formData.archetype = id;
  typeConsole('ARCHETYPE SELECTED');
  draw();
};

window.selectCopy = function(val) {
  formData.copywriting = val;
  typeConsole('COPYWRITING UPDATED');
  draw();
};

window.toggleUpsell = function(key) {
  formData.upsells[key] = !formData.upsells[key];
  typeConsole('OPTION UPDATED');
  
  // Mise à jour visuelle directe sans re-render complet
  var card = document.getElementById('ups-' + key);
  if (card) {
    var isSelected = formData.upsells[key];
    card.classList.toggle('selected', isSelected);
    var checkEl = card.querySelector('.upsell-check');
    if (checkEl) checkEl.textContent = isSelected ? '✓' : '';
  }
  
  // Mettre à jour le total affiché
  updateTotalDisplay();
  
  // Re-render seulement si l'upsell a des options additionnelles (hasQty, hasLangs)
  var upsell = (UPSELLS[formData.selectedPack] || []).find(u => u.id === key);
  if (upsell && (upsell.hasQty || upsell.hasLangs)) {
    draw(true);
  }
};

// Fonction pour mettre à jour l'affichage du total sans re-render
function updateTotalDisplay() {
  var totals = calculateTotals();
  var totalEl = document.querySelector('.total-price');
  if (totalEl) totalEl.textContent = totals.price + '€ HT';
  var delayEl = document.querySelector('.total-delay');
  if (delayEl) delayEl.textContent = totals.delay;
}

window.toggleSuccessUpsell = function(key) {
  formData.upsellsSuccess[key] = !formData.upsellsSuccess[key];
  if (key === 'tomorrowSucces' && formData.upsellsSuccess[key]) {
    UPSELLS_SUCCESS.forEach(u => {
      if (u.id !== 'tomorrowSucces') formData.upsellsSuccess[u.id] = false;
    });
  } else if (formData.upsellsSuccess[key] && formData.upsellsSuccess['tomorrowSucces']) {
    formData.upsellsSuccess['tomorrowSucces'] = false;
  }
  typeConsole('UPSELL UPDATED');
  draw();
};

window.toggleLang = function(lang) {
  var idx = formData.multiLangues.indexOf(lang);
  if (idx > -1) formData.multiLangues.splice(idx, 1);
  else formData.multiLangues.push(lang);
  
  // Mise à jour visuelle directe sans re-render complet
  var btn = document.querySelector('[onclick*="toggleLang(\'' + lang + '\')"]');
  if (btn) {
    btn.classList.toggle('selected', formData.multiLangues.includes(lang));
  }
  
  // Mettre à jour le total
  updateTotalDisplay();
};

window.toggleCare = function() {
  formData.care = !formData.care;
  typeConsole('CARE OPTION UPDATED');
  draw();
};

window.selectPack = function(id) {
  formData.selectedPack = id;
  typeConsole('PACK SELECTED: ' + id);
  draw();
};

window.resetPack = function() {
  formData.selectedPack = '';
  formData.upsells = {};
  typeConsole('RESET SELECTION');
  draw();
};

window.selectDomain = function(bool) {
  formData.hasDomain = bool;
  typeConsole('DOMAIN INFO UPDATED');
  draw();
};

window.handleFileSelect = function(input) {
  if (input.files.length > 0) {
    for (let f of input.files) {
      fileStore.push(f);
    }
    typeConsole('FILES UPLOADED');
    draw();
  }
  input.value = '';
};

window.removeFile = function(index) {
  fileStore.splice(index, 1);
  typeConsole('FILE REMOVED');
  draw();
};

window.nextStep = function() {
  if (currentStep < totalSteps) {
    currentStep++;
    typeConsole('STEP ' + currentStep + ' INITIALIZED');
    draw();
  }
};

window.prevStep = function() {
  if (currentStep > 1 && currentStep <= 7) {
    currentStep--;
    typeConsole('ROLLBACK TO STEP ' + currentStep);
    draw();
  }
};

window.handleCloseOrBack = function() {
  console.log('🔙 handleCloseOrBack - currentStep:', currentStep);
  if (currentStep === 1) {
    console.log('🔙 Step 1 - Closing modal');
    window.closeModal();
  }
  else if (currentStep === 7) {
    console.log('🔙 Step 7 - Skipping upsells');
    window.skipSuccessUpsells();
  }
  else {
    console.log('🔙 Other step - Showing confirm');
    const confirmed = confirm("Abandonner le projet ?");
    console.log('🔙 Confirm result:', confirmed);
    if (confirmed) {
      console.log('🔙 User confirmed - Closing modal');
      window.closeModal();
    }
  }
};

window.openModal = function(plan) {
  console.log('🔥 openModal CALLED', plan);
  
  try {
    var m = document.getElementById('bookingModal');
    var modalContent = document.getElementById('modalContent');
    
    if (!m || !modalContent) {
      console.error('🔥 MODAL ELEMENTS NOT FOUND!', { modal: !!m, content: !!modalContent });
      return;
    }
    
    console.log('🔥 bookingModal element:', m);
    
    currentStep = 1;
    formData.selectedPack = plan || '';
    
    // Force clear any stale styles/transforms
    // Stopper Lenis IMMÉDIATEMENT pour éviter le décalage
    if (window.lenis) {
      try {
        if (typeof window.lenis.stop === 'function') {
          window.lenis.stop();
          console.log('🔥 Lenis stopped IMMEDIATELY');
        }
      } catch (e) {
        console.warn('🔥 Lenis stop error:', e);
      }
    }
    
    // Retirer TOUS les transforms qui peuvent décaler la modal
    document.body.style.transform = 'none';
    document.body.style.filter = 'none';
    document.body.style.skewY = 'none';
    document.body.style.pointerEvents = '';
    document.documentElement.style.transform = 'none';
    
    // LOCK SCROLL SANS DÉCALER LE CONTENU
    // Ne PAS utiliser position:fixed + top négatif car ça décale TOUT (y compris la modal)
    // Utiliser overflow:hidden pour bloquer le scroll sans décalage
    const scrollY = window.scrollY || window.pageYOffset;
    document.body.dataset.scrollPosition = scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    
    // Stop GSAP animations
    if (typeof gsap !== 'undefined') {
      gsap.killTweensOf(document.body);
    }
    
    // Cacher WhatsApp widget si présent
    var whatsappWidget = document.querySelector('.whatsapp-float, .whatsapp-widget, #whatsapp-widget, [class*="whatsapp"], [id*="whatsapp"]');
    if (whatsappWidget) {
      whatsappWidget.style.display = 'none';
      whatsappWidget.dataset.hiddenByModal = 'true';
    }
    
    // Montrer le modal AVANT de dessiner
    m.classList.remove('hidden');
    m.style.display = 'flex';
    lockScroll();
    console.log('🔥 Modal shown, display:', m.style.display, 'classList:', m.classList.toString());
    
    // Force reflow + double RAF pour garantir le rendering
    void m.offsetWidth;
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        draw();
        console.log('🔥 draw() completed');
        console.log('🔥 Modal content innerHTML length:', modalContent.innerHTML.length);
        console.log('🔥 Modal should be visible NOW');
      });
    });
  } catch (error) {
    console.error('🔥 ERROR in openModal:', error);
  }
};

window.closeModal = function() {
  console.log('🔥 closeModal CALLED');
  var m = document.getElementById('bookingModal');
  console.log('🔥 bookingModal element:', m);
  if (m) {
    m.style.display = 'none';
    m.classList.add('hidden');
    console.log('🔥 Modal hidden');
  }
  
  // RESTAURER SCROLL (overflow:hidden au lieu de position:fixed)
  const scrollY = document.body.dataset.scrollPosition || 0;
  document.body.style.overflow = '';
  document.body.style.height = '';
  document.documentElement.style.overflow = '';
  document.body.classList.remove('modal-open');
  // Le scroll est déjà à la bonne position (pas besoin de scrollTo car on n'a pas décalé le body)
  
  unlockScroll();
  
  // Restart Lenis smooth scroll with timeout to avoid race
  setTimeout(() => {
    if (window.lenis) {
      try {
        if (typeof window.lenis.start === 'function') {
          window.lenis.start();
          console.log('🔥 Lenis restarted');
        }
      } catch (e) {
        console.warn('🔥 Lenis start error:', e);
      }
    }
  }, 200);
  
  // Ré-afficher WhatsApp widget si présent
  var whatsappWidget = document.querySelector('[data-hidden-by-modal="true"]');
  if (whatsappWidget) {
    whatsappWidget.style.display = '';
    whatsappWidget.removeAttribute('data-hidden-by-modal');
  }
};

window.submitForm = function() {
  if (!checkValidation()) return;
  
  var btn = document.getElementById('submitBtn');
  if (btn) btn.innerHTML = "TRANSMISSION...";
  typeConsole('SENDING DATA...');
  
  var totals = calculateTotals();
  var dataToSend = {
    ...formData,
    ...totals,
    vibeSeriousnessFormatted: formatVibeData(formData.vibeSeriousness, 'seriousness'),
    vibeStyleFormatted: formatVibeData(formData.vibeStyle, 'style')
  };
  
  var formDataObj = new FormData();
  formDataObj.append("access_key", WEB3FORMS_ACCESS_KEY);
  formDataObj.append("subject", "🚀 NOUVEAU LEAD - " + (dataToSend.brandName || "Projet Inconnu"));
  formDataObj.append("from_name", dataToSend.brandName || "Projet Inconnu");
  formDataObj.append("redirect", "https://tomorrow.online");
  
  // Aplatir les données
  formDataObj.append("brandName", dataToSend.brandName || '');
  formDataObj.append("email", dataToSend.email || '');
  formDataObj.append("phone", dataToSend.phone || '');
  formDataObj.append("pitch", dataToSend.pitch || '');
  formDataObj.append("competitors", dataToSend.competitors || '');
  formDataObj.append("target", dataToSend.target || '');
  formDataObj.append("problem", dataToSend.problem || '');
  formDataObj.append("solution", dataToSend.solution || '');
  formDataObj.append("whyUs", dataToSend.whyUs || '');
  formDataObj.append("archetype", dataToSend.archetype || '');
  formDataObj.append("vibeSeriousness", dataToSend.vibeSeriousnessFormatted || '');
  formDataObj.append("vibeStyle", dataToSend.vibeStyleFormatted || '');
  formDataObj.append("copywriting", dataToSend.copywriting || '');
  formDataObj.append("selectedPack", dataToSend.selectedPack || '');
  formDataObj.append("price", dataToSend.price || '0');
  formDataObj.append("delay", dataToSend.delay || '0');
  formDataObj.append("hasDomain", dataToSend.hasDomain ? 'Oui' : 'Non');
  formDataObj.append("domainName", dataToSend.domainName || '');
  formDataObj.append("care", dataToSend.care ? 'Oui' : 'Non');
  
  // Upsells en texte simple
  if (dataToSend.upsells && Object.keys(dataToSend.upsells).length > 0) {
    const upsellsText = Object.keys(dataToSend.upsells)
      .filter(k => dataToSend.upsells[k])
      .join(', ');
    formDataObj.append("upsells", upsellsText);
  }
  
  // Pages supplémentaires
  if (dataToSend.pagesSupNames && dataToSend.pagesSupNames.length > 0) {
    formDataObj.append("pagesSupNames", dataToSend.pagesSupNames.join(', '));
  }
  
  // Langues
  if (dataToSend.multiLangues && dataToSend.multiLangues.length > 0) {
    formDataObj.append("multiLangues", dataToSend.multiLangues.join(', '));
  }
  
  // PRIORITÉ 1 : Envoyer l'email D'ABORD (avec liste des fichiers)
  if (fileStore.length > 0) {
    formDataObj.append("fichiers_count", fileStore.length);
    formDataObj.append("fichiers_names", fileStore.map(f => f.name).join(', '));
    formDataObj.append("fichiers_sizes", fileStore.map(f => (f.size / 1024).toFixed(1) + 'KB').join(', '));
  }
  
  // Envoyer l'email IMMÉDIATEMENT
  sendFormData(formDataObj, btn);
  
  // PRIORITÉ 2 : Upload fichiers en arrière-plan (non-bloquant)
  if (fileStore.length > 0) {
    console.log('📤 Uploading', fileStore.length, 'files to tmpfiles.org in background...');
    
    Promise.all(fileStore.map(file => {
      const uploadData = new FormData();
      uploadData.append('file', file);
      
      return fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: uploadData
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const downloadUrl = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
          console.log('✅ Uploaded:', file.name, '→', downloadUrl);
          return { name: file.name, url: downloadUrl, size: (file.size / 1024).toFixed(1) + 'KB' };
        } else {
          console.error('❌ Upload failed for', file.name);
          return { name: file.name, url: 'FAILED', size: (file.size / 1024).toFixed(1) + 'KB' };
        }
      })
      .catch(err => {
        console.error('❌ Upload error for', file.name, err);
        return { name: file.name, url: 'ERROR', size: (file.size / 1024).toFixed(1) + 'KB' };
      });
    }))
    .then(uploadedFiles => {
      console.log('📎 All files uploaded (background):', uploadedFiles);
      
      // Envoyer un email supplémentaire avec les liens (optionnel)
      const linksFormData = new FormData();
      linksFormData.append("_captcha", "false");
      linksFormData.append("_subject", "📎 FICHIERS - " + (formData.brandName || "Projet Inconnu"));
      linksFormData.append("fichiers_links", uploadedFiles.map(f => `${f.name}: ${f.url}`).join('\n'));
      
      fetch(FORM_ACTION_URL, { method: 'POST', body: linksFormData })
        .then(() => console.log('✅ Files links email sent'))
        .catch(err => console.error('❌ Files email failed:', err));
    })
    .catch(err => {
      console.error('❌ Global upload error:', err);
    });
  }
};

function sendFormData(formDataObj, btn) {
  console.log('📧 Sending form data to Web3Forms...');
  console.log('📧 API:', FORM_ACTION_URL);
  console.log('📧 FormData keys:', Array.from(formDataObj.keys()));
  
  fetch(FORM_ACTION_URL, { 
    method: 'POST', 
    body: formDataObj,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('📧 Response:', data);
      
      if (data.success) {
        console.log('✅ Form submitted successfully to Web3Forms');
        showSuccessScreen();
      } else {
        console.error('❌ Form submission failed:', data.message);
        
        // FALLBACK: Créer un mailto avec les données
        const mailto = createMailtoFallback();
        window.location.href = mailto;
        
        alert("Le formulaire n'a pas pu être envoyé automatiquement. Votre client mail va s'ouvrir.");
        if (btn) btn.innerHTML = "Bloquer mon slot 🔒";
      }
    })
    .catch(error => {
      console.error('❌ Fetch error:', error);
      
      // FALLBACK: Créer un mailto avec les données
      const mailto = createMailtoFallback();
      window.location.href = mailto;
      
      alert("Erreur réseau. Votre client mail va s'ouvrir pour envoyer le brief.");
      if (btn) btn.innerHTML = "Bloquer mon slot 🔒";
    });
}

function createMailtoFallback() {
  const subject = encodeURIComponent('🚀 NOUVEAU LEAD - ' + (formData.brandName || 'Projet Inconnu'));
  const body = encodeURIComponent(`
BRIEF CLIENT
============

Marque: ${formData.brandName}
Email: ${formData.email}
Téléphone: ${formData.phone}

BUSINESS:
- Pitch: ${formData.pitch}
- Concurrents: ${formData.competitors}

CIBLE:
- Cible: ${formData.target}
- Problème: ${formData.problem}
- Solution: ${formData.solution}
- Pourquoi nous: ${formData.whyUs}

IDENTITÉ:
- Archétype: ${formData.archetype}
- Sérieux/Drôle: ${formatVibeData(formData.vibeSeriousness, 'seriousness')}
- Style: ${formatVibeData(formData.vibeStyle, 'style')}
- Copywriting: ${formData.copywriting}

PACK: ${formData.selectedPack}
Fichiers: ${fileStore.length > 0 ? fileStore.map(f => f.name).join(', ') : 'Aucun'}
  `);
  
  return `mailto:mf.phan@bigneurons.com?cc=t.martella@bigneurons.com,a.escare@bigneurons.com&subject=${subject}&body=${body}`;
}

function showSuccessScreen() {
  document.getElementById('modalContent').innerHTML = `
    <div class="success-screen">
      <div class="success-check-icon">✓</div>
      <h1 class="success-title">BRIEF BIEN REÇU !</h1>
      <p class="success-subtitle">Merci pour votre confiance.</p>
      
      <div class="success-report">
        <div class="report-badge">WORKFLOW AUTOMATISÉ</div>
        <div class="report-items">
          <div class="report-item done">
            <span class="report-icon">✓</span>
            <span class="report-text">Brief transmis à l'équipe</span>
          </div>
          <div class="report-item active">
            <span class="report-icon">⏳</span>
            <span class="report-text">Analyse & validation du projet</span>
          </div>
          <div class="report-item">
            <span class="report-icon">○</span>
            <span class="report-text">Appel de confirmation</span>
          </div>
          <div class="report-item">
            <span class="report-icon">○</span>
            <span class="report-text">Lancement de production</span>
          </div>
        </div>
      </div>
      
      <div class="success-next">
        <h3 class="success-next-title">ET MAINTENANT ?</h3>
        <p class="success-next-text">
          Un membre de notre équipe vous appellera <strong>demain matin entre 09h00 et 10h00</strong> 
          pour valider les détails de votre projet.
        </p>
        <p class="success-next-note">
          Consultez votre boîte mail, vous avez reçu une confirmation.
        </p>
      </div>
      
      <button onclick="window.closeModal()" class="btn btn-primary">
        RETOUR AU SITE →
      </button>
    </div>
  `;
}

window.skipSuccessUpsells = function() {
  countdownStarted = false;
  document.getElementById('modalContent').innerHTML = `
    <div class="success-screen">
      <div class="success-check-icon">✓</div>
      <h2 class="success-title">MISSION<br>PRE-ACCEPTÉE</h2>
      <p class="success-subtitle font-mono">Le compte à rebours sera lancé après validation.</p>
      
      <div class="success-report">
        <div class="report-badge">Rapport de mission</div>
        <div class="report-items font-mono">
          <div class="report-item done">
            <span class="report-icon">✓</span>
            <span class="report-text">Réception des données</span>
          </div>
          <div class="report-item done">
            <span class="report-icon">✓</span>
            <span class="report-text">Création du dossier client</span>
          </div>
          <div class="report-item done">
            <span class="report-icon">✓</span>
            <span class="report-text">Notification de l'équipe</span>
          </div>
          <div class="report-item active">
            <span class="report-icon">●</span>
            <span class="report-text">Analyse par un humain (En cours)</span>
          </div>
        </div>
      </div>
      
      <div class="success-next">
        <p class="success-next-title">Prochaine étape :</p>
        <p class="success-next-text">
          Vous recevrez un appel de validation<br>
          demain entre 09H00 et 10H00.
        </p>
        <p class="success-next-note">Le paiement s'effectuera seulement après cet appel.</p>
      </div>
      
      <button onclick="window.closeModal()" class="btn btn-primary btn-large">
        Retour au site
      </button>
    </div>
  `;
  
  if (countdownTimer) clearInterval(countdownTimer);
};

window.submitSuccessUpsells = function() {
  var formDataObj = new FormData();
  formDataObj.append("_captcha", "false");
  formDataObj.append("_template", "table");
  formDataObj.append("_subject", "🎁 UPSELLS - " + (formData.brandName || "Projet Inconnu"));
  formDataObj.append("_cc", "mf.phan@bigneurons.com,t.martella@bigneurons.com,a.escare@bigneurons.com");
  formDataObj.append("brandName", formData.brandName);
  formDataObj.append("email", formData.email);
  formDataObj.append("upsellsSuccess", JSON.stringify(formData.upsellsSuccess));
  formDataObj.append("socialNetwork", formData.socialNetwork);
  formDataObj.append("socialNetworkExtra", formData.socialNetworkExtra);
  
  fetch(FORM_ACTION_URL_UPSELL, { method: 'POST', body: formDataObj })
    .then(response => {
      window.skipSuccessUpsells();
    })
    .catch(error => {
      alert("Erreur.");
    });
};

function startCountdown() {
  var timeLeft = 120;
  if (countdownTimer) clearInterval(countdownTimer);
  
  countdownTimer = setInterval(function() {
    timeLeft--;
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    var countdownEl = document.getElementById('countdown');
    if (countdownEl) {
      countdownEl.innerText = `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      window.skipSuccessUpsells();
    }
  }, 1000);
}

// ========================================
// PAYMENT FUNCTIONS
// ========================================

window.goToPaymentStep = function() {
  // Validation de l'étape 6
  if (!formData.email || !formData.phone) {
    alert('Veuillez remplir votre email et téléphone.');
    return;
  }
  
  // Passer à l'étape 7 (paiement)
  currentStep = 7;
  typeConsole('PAYMENT STEP INITIALIZED');
  draw();
  
  // Initialiser Stripe Elements après le rendu
  setTimeout(() => {
    if (typeof window.createPaymentStep === 'function') {
      window.createPaymentStep();
    }
  }, 500);
};

// ========================================
// INIT
// ========================================

document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") window.closeModal();
});
