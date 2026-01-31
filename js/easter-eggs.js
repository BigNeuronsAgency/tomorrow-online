// ========================================
// EASTER EGGS - TOMORROW.ONLINE
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

// ===== 1. TITRE ONGLET DYNAMIQUE =====
let originalTitle = document.title;

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    document.title = '⏳ Le chrono tourne...';
  } else {
    document.title = originalTitle;
  }
});

// ===== 2. CURSEUR INTERACTIF SUR MOTS-CLÉS =====
// Injecter les styles CSS pour les curseurs emoji
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  /* Curseur emoji chrono sur "24H" */
  body.cursor-chrono,
  body.cursor-chrono * {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext x='4' y='24' font-size='20'%3E⏱️%3C/text%3E%3C/svg%3E") 16 16, auto !important;
  }
  
  /* Curseur casque soldat sur "mercenaires" */
  body.cursor-soldier,
  body.cursor-soldier * {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext x='4' y='24' font-size='20'%3E⚔️%3C/text%3E%3C/svg%3E") 16 16, auto !important;
  }
  
  /* Animation vibration pour mots magnétiques */
  @keyframes keyword-shake {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-1px, -1px) rotate(-0.5deg); }
    50% { transform: translate(1px, 1px) rotate(0.5deg); }
    75% { transform: translate(-1px, 1px) rotate(-0.5deg); }
  }
  
  .word-vibrate {
    display: inline-block;
    animation: keyword-shake 0.3s ease-in-out infinite;
  }
`;
document.head.appendChild(cursorStyle);

let currentCursor = null;
let currentElement = null;

// Fonction pour nettoyer le curseur
function clearCursor() {
  if (currentCursor) {
    document.body.classList.remove(currentCursor);
    currentCursor = null;
  }
}

// Détecter survol des éléments contenant les mots-clés
document.addEventListener('mouseover', function(e) {
  // Ignorer le formulaire et le bandeau défilant (marquee)
  if (e.target.closest('.formulaire-modal') || 
      e.target.closest('.marquee') || 
      e.target.closest('.marquee-content')) {
    clearCursor();
    return;
  }
  
  const text = e.target.textContent || '';
  const textLower = text.toLowerCase();
  
  let newCursor = null;
  
  // Détecter les mots-clés
  if (textLower.includes('24h')) {
    newCursor = 'cursor-chrono';
    currentElement = e.target;
  } else if (textLower.includes('mercenaire')) {
    newCursor = 'cursor-soldier';
    currentElement = e.target;
  } else if (textLower.includes('vitesse') || textLower.includes('brutal')) {
    // Effet vibration (mais pas sur le bandeau défilant)
    if (!e.target.classList.contains('word-vibrate')) {
      e.target.classList.add('word-vibrate');
      currentElement = e.target;
    }
  }
  
  // Changer le curseur si nécessaire
  if (newCursor !== currentCursor) {
    clearCursor();
    if (newCursor) {
      document.body.classList.add(newCursor);
      currentCursor = newCursor;
    }
  }
});

document.addEventListener('mouseout', function(e) {
  // Retirer vibration
  if (e.target.classList.contains('word-vibrate')) {
    e.target.classList.remove('word-vibrate');
  }
  
  // Retirer curseur si on quitte l'élément qui l'a déclenché
  if (e.target === currentElement) {
    clearCursor();
    currentElement = null;
  }
});

// Sécurité : nettoyer le curseur si la souris quitte la fenêtre
document.addEventListener('mouseleave', function() {
  clearCursor();
  currentElement = null;
});
