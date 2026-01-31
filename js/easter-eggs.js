// ========================================
// EASTER EGGS - TOMORROW.ONLINE
// Liste complète des easter eggs disponibles
// ========================================

// ===== EASTER EGG CONSOLE (pour les devs) =====
console.log(
  "%c TOMORROW.ONLINE ",
  "background: #000; color: #fff; font-size: 20px; padding: 10px; border-radius: 5px; font-weight: bold;"
);
console.log(
  "%cTu cherches quoi ? Un code propre ? T'es au bon endroit.\nOn recrute parfois des mercenaires. Contacte-nous.",
  "color: #666; font-size: 12px;"
);

// ===== STYLES CSS GLOBAUX =====
const easterEggStyles = document.createElement('style');
easterEggStyles.textContent = `
  /* Curseur emoji chrono sur "24H" */
  body.cursor-chrono, body.cursor-chrono * {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext x='4' y='24' font-size='20'%3E⏱️%3C/text%3E%3C/svg%3E") 16 16, auto !important;
  }
  
  /* Curseur casque soldat sur "mercenaires" */
  body.cursor-soldier, body.cursor-soldier * {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext x='4' y='24' font-size='20'%3E⚔️%3C/text%3E%3C/svg%3E") 16 16, auto !important;
  }
  
  /* Curseur Windows 95 laggy */
  body.cursor-laggy, body.cursor-laggy * {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext x='4' y='24' font-size='20'%3E⌛%3C/text%3E%3C/svg%3E") 16 16, wait !important;
  }
  
  /* Animation vibration mot */
  @keyframes keyword-shake {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-1px, -1px) rotate(-0.5deg); }
    50% { transform: translate(1px, 1px) rotate(0.5deg); }
    75% { transform: translate(-1px, 1px) rotate(-0.5deg); }
  }
  
  /* Shake écran entier */
  @keyframes screen-shake {
    0%, 100% { transform: translate(0, 0); }
    10%, 30%, 50%, 70%, 90% { transform: translate(-10px, 5px); }
    20%, 40%, 60%, 80% { transform: translate(10px, -5px); }
  }
  
  body.screen-shake {
    animation: screen-shake 0.5s ease-in-out;
  }
  
  /* Mode Terminal Matrix */
  body.matrix-mode {
    background: #000 !important;
    filter: hue-rotate(120deg) contrast(1.2);
  }
  
  body.matrix-mode * {
    color: #00FF00 !important;
    font-family: 'JetBrains Mono', 'Courier New', monospace !important;
  }
  
  /* Mode Vision Thermique */
  body.thermal-vision {
    filter: invert(1) hue-rotate(180deg) contrast(1.5) !important;
    background: #000 !important;
  }
  
  body.thermal-vision::before {
    content: '';
    position: fixed;
    inset: 0;
    background: radial-gradient(circle, rgba(255,0,0,0.3) 0%, rgba(0,0,255,0.3) 100%);
    pointer-events: none;
    z-index: 9998;
  }
  
  /* Toast notification */
  .easter-egg-toast {
    position: fixed;
    top: 100px;
    right: 30px;
    background: #FF5500;
    color: #FFF;
    padding: 15px 25px;
    border-radius: 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 14px;
    z-index: 10001;
    animation: toast-in 0.3s ease-out;
    box-shadow: 0 4px 20px rgba(255, 85, 0, 0.4);
  }
  
  @keyframes toast-in {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  /* Bulle dialogue enfant */
  .kid-bubble {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    background: #FFF;
    color: #000;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    z-index: 100;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .kid-bubble::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #FFF;
  }
  
  /* Idle overlay */
  .idle-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fade-in 1s ease-out;
  }
  
  .idle-counter {
    font-family: 'Syne', sans-serif;
    font-size: 80px;
    font-weight: 800;
    color: #FF5500;
    text-align: center;
  }
  
  .idle-message {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    color: #FFF;
    text-align: center;
    margin-top: 20px;
    max-width: 600px;
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Confettis code */
  .code-confetti {
    position: fixed;
    font-family: 'JetBrains Mono', monospace;
    font-size: 20px;
    color: #FF5500;
    pointer-events: none;
    z-index: 10000;
    animation: confetti-fall 2s ease-out forwards;
  }
  
  @keyframes confetti-fall {
    from {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    to {
      transform: translateY(500px) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(easterEggStyles);

// ===== UTILITAIRES =====
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'easter-egg-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ===== 1. TITRE ONGLET DYNAMIQUE =====
let originalTitle = document.title;

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    document.title = '⏳ Le chrono tourne...';
  } else {
    document.title = originalTitle;
  }
});

// ===== 2. CURSEURS INTERACTIFS (24H, mercenaires, vitesse, brutal) =====
// DÉSACTIVÉ SUR MOBILE - Les curseurs custom ne fonctionnent pas sur tactile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                 ('ontouchstart' in window) || 
                 (navigator.maxTouchPoints > 0);

let currentCursor = null;
let currentElement = null;

function clearCursor() {
  if (currentCursor) {
    document.body.classList.remove(currentCursor);
    currentCursor = null;
  }
}

// Seulement activer sur desktop
if (!isMobile) {
  document.addEventListener('mouseover', function(e) {
    // Ignorer formulaire, marquee, JC section
    if (e.target.closest('.formulaire-modal') || 
        e.target.closest('.marquee') || 
        e.target.closest('.marquee-content') ||
        e.target.closest('.jean-charles')) {
      clearCursor();
      return;
    }
    
    // Chercher seulement dans les éléments de type texte (h1, h2, h3, p, span, etc.)
    if (!e.target.matches('h1, h2, h3, h4, h5, h6, p, span, a, li, div.squad-desc, div.value-item')) {
      return;
    }
    
    const text = e.target.textContent || '';
    const textLower = text.toLowerCase();
    
    let newCursor = null;
    
    // Détecter mots-clés EXACTS
    if (/\b24h\b/i.test(text)) {
      newCursor = 'cursor-chrono';
      currentElement = e.target;
    } else if (/\bmercenaires?\b/i.test(text)) {
      newCursor = 'cursor-soldier';
      currentElement = e.target;
    }
    
    // Changer curseur
    if (newCursor !== currentCursor) {
      clearCursor();
      if (newCursor) {
        document.body.classList.add(newCursor);
        currentCursor = newCursor;
      }
    }
  });

  document.addEventListener('mouseout', function(e) {
    if (e.target === currentElement) {
      clearCursor();
      currentElement = null;
    }
  });

  document.addEventListener('mouseleave', function() {
    clearCursor();
    currentElement = null;
  });
}

// ===== 3. KONAMI CODE → MODE TERMINAL MATRIX =====
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
let matrixMode = false;

document.addEventListener('keydown', function(e) {
  konamiSequence.push(e.key);
  konamiSequence = konamiSequence.slice(-8);
  
  if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
    matrixMode = !matrixMode;
    
    if (matrixMode) {
      document.body.classList.add('matrix-mode');
      showToast('Access granted to the Matrix.');
    } else {
      document.body.classList.remove('matrix-mode');
      showToast('Exiting Matrix mode...');
    }
  }
});

// ===== 4. RAGE CLICK SUR L'ENFANT IMPATIENT =====
let clickCount = 0;
let clickTimer = null;
let kidRaging = false;

function initRageClick() {
  // Sélecteur plus large pour trouver l'image
  const kidImg = document.querySelector('img[src*="beimpatient"]') || document.querySelector('#kid-logo');
  if (!kidImg) {
    console.log('Kid image not found for rage click');
    return;
  }
  
  console.log('✅ Rage click initialized on kid image');
  kidImg.style.cursor = 'pointer';
  
  kidImg.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (kidRaging) return;
    
    clickCount++;
    console.log('Click count:', clickCount);
    
    if (clickTimer) clearTimeout(clickTimer);
    
    if (clickCount >= 5) {
      console.log('🔥 RAGE MODE ACTIVATED!');
      kidRaging = true;
      const originalSrc = kidImg.src;
      kidImg.src = 'images/tomorrowcolere.png';
      
      const bubble = document.createElement('div');
      bubble.className = 'kid-bubble';
      bubble.textContent = "C'est bon, on a compris, t'es pressé !";
      
      const container = kidImg.parentElement;
      const originalPosition = container.style.position;
      container.style.position = 'relative';
      container.appendChild(bubble);
      
      const resetRage = () => {
        if (!kidRaging) return;
        console.log('Resetting rage mode');
        kidImg.src = originalSrc;
        if (bubble.parentElement) bubble.remove();
        container.style.position = originalPosition;
        kidRaging = false;
        clickCount = 0;
      };
      
      setTimeout(resetRage, 3000);
      
      const scrollHandler = () => {
        resetRage();
        window.removeEventListener('scroll', scrollHandler);
      };
      window.addEventListener('scroll', scrollHandler);
    } else {
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 2000);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRageClick);
} else {
  initRageClick();
}

// ===== 5. MALÉDICTION JEAN-CHARLES - DÉSACTIVÉ =====
// L'effet sablier/lag crée un vrai sentiment de bug, supprimé pour meilleure UX

// ===== 6. EXORCISME WIX/WORDPRESS =====
let typedWord = '';
let typeTimer = null;
const bannedWords = ['wix', 'wordpress', 'squarespace'];

document.addEventListener('keydown', function(e) {
  if (e.target.matches('input, textarea')) return;
  
  typedWord += e.key.toLowerCase();
  
  if (typeTimer) clearTimeout(typeTimer);
  typeTimer = setTimeout(() => {
    typedWord = '';
  }, 1000);
  
  bannedWords.forEach(word => {
    if (typedWord.includes(word)) {
      document.body.classList.add('screen-shake');
      showToast('❌ Ici, on ne prononce pas ces mots.');
      
      setTimeout(() => {
        document.body.classList.remove('screen-shake');
      }, 500);
      
      typedWord = '';
    }
  });
});

// ===== 7. COPYRIGHT FUTURISTE =====
let copyrightInterval = null;
let copyrightActive = false;

function initFuturisticCopyright() {
  const copyright = document.querySelector('.footer-copyright');
  const footer = document.querySelector('footer');
  if (!copyright || !footer) return;
  
  let year = 2026;
  const yearPattern = /© \d{4}/;
  const originalText = copyright.textContent;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !copyrightActive) {
        console.log('🚀 Copyright futuriste activé!');
        copyrightActive = true;
        year = 2026;
        
        copyrightInterval = setInterval(() => {
          year++;
          copyright.textContent = originalText.replace(yearPattern, `© ${year}`);
        }, 100);
      } else if (!entry.isIntersecting && copyrightActive) {
        copyrightActive = false;
        if (copyrightInterval) {
          clearInterval(copyrightInterval);
          copyrightInterval = null;
        }
        copyright.textContent = originalText;
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(footer);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFuturisticCopyright);
} else {
  initFuturisticCopyright();
}

// ===== 8. VISION PREDATOR (Mode thermique) =====
let thermalVision = false;

function initThermalVision() {
  const statusBadge = document.querySelector('.status-operational');
  if (!statusBadge) {
    console.log('Status badge not found for thermal vision');
    return;
  }
  
  console.log('✅ Thermal vision initialized on:', statusBadge);
  statusBadge.style.cursor = 'pointer';
  statusBadge.style.transition = 'transform 0.2s';
  
  statusBadge.addEventListener('mouseenter', function() {
    statusBadge.style.transform = 'scale(1.1)';
  });
  
  statusBadge.addEventListener('mouseleave', function() {
    statusBadge.style.transform = 'scale(1)';
  });
  
  statusBadge.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    thermalVision = !thermalVision;
    console.log('🔥 Thermal vision toggled:', thermalVision);
    
    if (thermalVision) {
      document.body.classList.add('thermal-vision');
      showToast('🔥 Vision Thermique activée');
    } else {
      document.body.classList.remove('thermal-vision');
      showToast('🔥 Vision normale');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThermalVision);
} else {
  initThermalVision();
}

// ===== 9. SABRAGE SONORE - MEGA FEU D'ARTIFICE =====
function createFirework(x, y) {
  const symbols = ['<div>', '{', '}', '</>', '()', '[]', ';', '=', '<>', '//', '/*', '*/', '🔥', '🍾', '⚡', '✨', '💥', '🎆', '🎇', '💫', '🌟', '⭐'];
  const colors = ['#FF5500', '#FF8844', '#FFAA00', '#FFFFFF', '#00FF00', '#FF0000', '#FFD700', '#FF00FF', '#00FFFF', '#FF3366'];
  
  // EXPLOSION 1 - Cercle principal (100 particules)
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'firework-particle';
    confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    const angle = (Math.PI * 2 * i) / 100;
    const velocity = 150 + Math.random() * 350;
    const endX = Math.cos(angle) * velocity;
    const endY = Math.sin(angle) * velocity;
    
    confetti.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-family: 'JetBrains Mono', monospace;
      font-size: ${14 + Math.random() * 28}px;
      color: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none;
      z-index: 10002;
      text-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
      --end-x: ${endX}px;
      --end-y: ${endY}px;
      --rotation: ${Math.random() * 1080 - 540}deg;
      animation: firework-explode 2s ease-out forwards;
    `;
    
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  }
  
  // EXPLOSION 2 - Sparks emoji (50 particules)
  setTimeout(() => {
    for (let i = 0; i < 50; i++) {
      const spark = document.createElement('div');
      spark.textContent = ['✨', '⚡', '💫', '🔥', '🎆', '🎇', '🌟', '💥'][Math.floor(Math.random() * 8)];
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 100 + Math.random() * 250;
      
      spark.style.cssText = `
        position: fixed;
        left: ${x + (Math.random() - 0.5) * 150}px;
        top: ${y + (Math.random() - 0.5) * 150}px;
        font-size: ${30 + Math.random() * 50}px;
        pointer-events: none;
        z-index: 10001;
        --end-x: ${Math.cos(angle) * velocity}px;
        --end-y: ${Math.sin(angle) * velocity - 150}px;
        --rotation: ${Math.random() * 720}deg;
        animation: firework-explode 1.5s ease-out forwards;
      `;
      
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 1500);
    }
  }, 100);
  
  // EXPLOSION 3 - Pluie de code (70 particules tombantes)
  setTimeout(() => {
    for (let i = 0; i < 70; i++) {
      const code = document.createElement('div');
      code.textContent = ['{', '}', '<', '>', '/', ';', '()', '[]', '""', "''"][Math.floor(Math.random() * 10)];
      
      code.style.cssText = `
        position: fixed;
        left: ${x + (Math.random() - 0.5) * 400}px;
        top: ${y - 100}px;
        font-family: 'JetBrains Mono', monospace;
        font-size: ${16 + Math.random() * 24}px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        z-index: 10000;
        text-shadow: 0 0 10px currentColor;
        --end-x: ${(Math.random() - 0.5) * 100}px;
        --end-y: ${300 + Math.random() * 400}px;
        --rotation: ${Math.random() * 360}deg;
        animation: firework-explode 2.5s ease-in forwards;
      `;
      
      document.body.appendChild(code);
      setTimeout(() => code.remove(), 2500);
    }
  }, 300);
  
  // FLASH LUMINEUX
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed;
    left: ${x - 200}px;
    top: ${y - 200}px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,85,0,0.8) 0%, rgba(255,200,0,0.4) 30%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    animation: flash-boom 0.5s ease-out forwards;
  `;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 500);
}

// Ajouter les styles d'animation
const fireworkStyle = document.createElement('style');
fireworkStyle.textContent = `
  @keyframes firework-explode {
    0% {
      transform: translate(0, 0) rotate(0deg) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--end-x), var(--end-y)) rotate(var(--rotation)) scale(0);
      opacity: 0;
    }
  }
  @keyframes flash-boom {
    0% { transform: scale(0.5); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }
`;
document.head.appendChild(fireworkStyle);

function initSabrage() {
  const champagneButtons = document.querySelectorAll('button, .btn-outline, .cta-button, a');
  
  champagneButtons.forEach(btn => {
    const text = btn.textContent.toLowerCase();
    if (text.includes('champagne') || text.includes('sabrer')) {
      console.log('✅ Sabrage button found:', text.substring(0, 30));
      
      btn.addEventListener('click', function(e) {
        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Triple explosion pour effet massif
        createFirework(x, y);
        setTimeout(() => createFirework(x - 50, y - 30), 100);
        setTimeout(() => createFirework(x + 50, y - 30), 200);
        
        showToast('🍾 POP ! CHAMPAAAAGNE !!! 🎆');
        
        console.log('🍾 Sabrage triggered!');
      }, { capture: true });
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSabrage);
} else {
  initSabrage();
}

// ===== 10. IDLE "TIME IS MONEY" =====
let idleTimer = null;
let idleOverlay = null;

function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  if (idleOverlay) {
    idleOverlay.remove();
    idleOverlay = null;
  }
  
  idleTimer = setTimeout(() => {
    idleOverlay = document.createElement('div');
    idleOverlay.className = 'idle-overlay';
    
    let cents = 0;
    const counter = document.createElement('div');
    counter.className = 'idle-counter';
    counter.textContent = '0.00 €';
    
    const message = document.createElement('div');
    message.className = 'idle-message';
    message.textContent = 'Chaque seconde sans site vous coûte de l\'argent. Agissez maintenant.';
    
    idleOverlay.appendChild(counter);
    idleOverlay.appendChild(message);
    document.body.appendChild(idleOverlay);
    
    const interval = setInterval(() => {
      cents += 0.01;
      counter.textContent = cents.toFixed(2) + ' €';
    }, 10);
    
    idleOverlay.addEventListener('click', () => {
      clearInterval(interval);
      idleOverlay.remove();
      idleOverlay = null;
    });
  }, 24000);
}

document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keydown', resetIdleTimer);
document.addEventListener('scroll', resetIdleTimer);
document.addEventListener('click', resetIdleTimer);

resetIdleTimer();
