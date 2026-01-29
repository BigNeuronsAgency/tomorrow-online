// ========================================
// FORMULAIRE 7 ÉTAPES - TOMORROW.ONLINE
// ========================================

// Global state
var currentStep = 1;
var totalSteps = 7;
var currentConsoleMessage = 'SYSTEM READY';
var fileStore = [];
var countdownTimer = null;
var countdownStarted = false;

// Form action URLs
const FORM_ACTION_URL = 'https://formsubmit.co/mf.phan@bigneurons.com';
const FORM_ACTION_URL_UPSELL = 'https://formsubmit.co/mf.phan@bigneurons.com';
const BRAND_RED = '#FF3333';

// Data constants
var PACKS = [
  { id: 'MAQUETTE', name: 'PACK MAQUETTE', price: 900, delay: 12, desc: 'Design Only // Pas de code' },
  { id: 'STARTER', name: 'PACK STARTER', price: 980, delay: 24, desc: 'Landing Page // Vitrine' },
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
              
              <div class="care-box">
                <h3 class="care-title">Offre Care</h3>
                <p class="care-desc">Hébergement, mises à jour de sécurité et modifications mineures (1h/mois).</p>
                <label class="care-toggle" onclick="window.toggleCare()">
                  <span class="care-price font-mono">+90€/mois</span>
                  <span class="care-switch ${formData.care ? 'active' : ''}"></span>
                </label>
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
              
              <button onclick="window.submitForm()" id="submitBtn" class="btn btn-submit">
                Bloquer mon slot 🔒
              </button>
              
              <div class="submit-note">
                <p class="submit-note-small font-mono">Aucun paiement requis maintenant.</p>
                <p class="submit-note-highlight font-mono">
                  Nous analysons d'abord votre brief et vous paierez uniquement après validation, demain matin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  // Step 7: Success Upsells
  if (currentStep === 7) {
    var totalSuccessUpsells = 0;
    var bundleSelected = formData.upsellsSuccess['tomorrowSucces'];
    UPSELLS_SUCCESS.forEach(u => {
      if (formData.upsellsSuccess[u.id]) {
        if (u.id === 'tomorrowSucces') {
          totalSuccessUpsells += u.price;
        } else if (!bundleSelected) {
          totalSuccessUpsells += u.price;
          if (u.id === 'socialMedia' && formData.socialNetworkExtra) totalSuccessUpsells += 80;
        }
      }
    });
    
    // Séparer le bundle des autres options
    var bundleUpsell = UPSELLS_SUCCESS.find(u => u.isBundle);
    var regularUpsells = UPSELLS_SUCCESS.filter(u => !u.isBundle);
    
    return `
      <div class="form-step step-7">
        <div class="success-header">
          <div>
            <h2 class="step-title">BOOSTEZ VOTRE LANCEMENT</h2>
            <p class="success-subtitle">Profitez d'options exclusives pour maximiser l'impact de votre nouveau site</p>
          </div>
          <div class="countdown-box">
            <div class="countdown-label font-mono">Offre limitée</div>
            <div id="countdown" class="countdown font-mono">02:00</div>
          </div>
        </div>
        
        <div class="success-grid">
          ${regularUpsells.map(u => renderSuccessCard(u)).join('')}
        </div>
        
        ${bundleUpsell ? `
          <div class="success-grid-bundle">
            ${renderSuccessCard(bundleUpsell)}
          </div>
        ` : ''}
        
        ${totalSuccessUpsells > 0 ? `
          <div class="success-total">
            <span class="success-total-label">TOTAL OPTIONS</span>
            <span class="success-total-value">${totalSuccessUpsells}€</span>
          </div>
        ` : ''}
        
        <div class="success-actions">
          <button onclick="window.skipSuccessUpsells()" class="btn btn-outline">PASSER →</button>
        </div>
      </div>
    `;
  }
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
  
  if (preserveScroll && scrollPos > 0) {
    var scrollContainer = container.querySelector('.modal-body');
    if (scrollContainer) scrollContainer.scrollTop = scrollPos;
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
  draw(true);
};

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
  draw(true);
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
  if (currentStep > 1 && currentStep < 7) {
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
    
    // Cacher WhatsApp widget si présent
    var whatsappWidget = document.querySelector('.whatsapp-widget, #whatsapp-widget, [class*="whatsapp"], [id*="whatsapp"]');
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
  unlockScroll();
  
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
  formDataObj.append("_captcha", "false");
  formDataObj.append("_template", "table");
  formDataObj.append("_autoresponse", "Merci pour votre confiance. Votre brief a bien été reçu. Un membre de l'équipe vous appellera demain entre 09H00 et 10H00 pour validation.");
  formDataObj.append("_subject", "🚀 NOUVEAU LEAD - " + (dataToSend.brandName || "Projet Inconnu"));
  formDataObj.append("_cc", "mf.phan@bigneurons.com,t.martella@bigneurons.com,a.escare@bigneurons.com");
  
  for (var key in dataToSend) {
    formDataObj.append(key, JSON.stringify(dataToSend[key]));
  }
  
  // FormSubmit.co ne supporte PAS les fichiers binaires (erreur 500)
  // On envoie juste les noms de fichiers pour info
  if (fileStore.length > 0) {
    formDataObj.append("fichiers_count", fileStore.length);
    formDataObj.append("fichiers_names", fileStore.map(f => f.name).join(', '));
    formDataObj.append("fichiers_sizes", fileStore.map(f => (f.size / 1024).toFixed(1) + 'KB').join(', '));
    console.log('📎 Files info sent:', fileStore.map(f => f.name).join(', '));
  }
  
  console.log('📧 Sending form with', fileStore.length, 'files info (no upload)');
  
  fetch(FORM_ACTION_URL, { method: 'POST', body: formDataObj })
    .then(response => {
      console.log('📧 Response status:', response.status);
      if (response.ok) {
        console.log('✅ Form submitted successfully');
        currentStep = 7;
        draw();
      } else {
        console.error('❌ Form submission failed:', response.statusText);
        alert("Erreur de transmission. Veuillez réessayer.");
        if (btn) btn.innerHTML = "Bloquer mon slot 🔒";
      }
    })
    .catch(error => {
      console.error('❌ Fetch error:', error);
      alert("Erreur de transmission.");
      if (btn) btn.innerHTML = "Bloquer mon slot 🔒";
    });
};

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
// INIT
// ========================================

document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") window.closeModal();
});
