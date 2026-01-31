// ========================================
// EASTER EGGS - TOMORROW.ONLINE
// ========================================

// ===== 1. TITRE ONGLET DYNAMIQUE =====
let originalTitle = document.title;

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    document.title = '⏳ Le chrono tourne...';
  } else {
    document.title = originalTitle;
  }
});

// ===== 2. CURSEUR INTERACTIF MAGNÉTIQUE =====

// Fonction pour ajouter data-cursor aux mots-clefs
function initKeywordCursors() {
  const keywords = [
    { text: '24H', emoji: '⏱️', magnetic: false },
    { text: '24h', emoji: '⏱️', magnetic: false },
    { text: 'vitesse', emoji: null, magnetic: true },
    { text: 'Vitesse', emoji: null, magnetic: true },
    { text: 'brutal', emoji: null, magnetic: true },
    { text: 'Brutal', emoji: null, magnetic: true },
    { text: 'mercenaires', emoji: '⚔️', magnetic: false },
    { text: 'Mercenaires', emoji: '⚔️', magnetic: false }
  ];

  // Parcourir tous les éléments textuels
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        // Ignorer les scripts, styles, et éléments cachés
        if (node.parentElement.tagName === 'SCRIPT' || 
            node.parentElement.tagName === 'STYLE' ||
            node.parentElement.closest('.formulaire-modal')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  let textNode;
  const nodesToReplace = [];

  while (textNode = walker.nextNode()) {
    keywords.forEach(keyword => {
      if (textNode.textContent.includes(keyword.text)) {
        nodesToReplace.push({ node: textNode, keyword });
      }
    });
  }

  // Remplacer les nœuds texte par des spans interactifs
  nodesToReplace.forEach(({ node, keyword }) => {
    const parent = node.parentElement;
    const text = node.textContent;
    const regex = new RegExp(`(${keyword.text})`, 'g');
    const parts = text.split(regex);

    const fragment = document.createDocumentFragment();
    parts.forEach(part => {
      if (part === keyword.text) {
        const span = document.createElement('span');
        span.textContent = part;
        span.className = 'keyword-interactive';
        
        if (keyword.emoji) {
          span.setAttribute('data-cursor-emoji', keyword.emoji);
        }
        if (keyword.magnetic) {
          span.classList.add('magnetic');
        }
        
        fragment.appendChild(span);
      } else if (part) {
        fragment.appendChild(document.createTextNode(part));
      }
    });

    parent.replaceChild(fragment, node);
  });
}

// Attendre que le DOM soit prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initKeywordCursors);
} else {
  initKeywordCursors();
}

// Gérer les changements de curseur emoji
document.addEventListener('mouseover', function(e) {
  const target = e.target.closest('[data-cursor-emoji]');
  if (target) {
    const emoji = target.getAttribute('data-cursor-emoji');
    document.body.style.cursor = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><text x='0' y='24' font-size='24'>${emoji}</text></svg>") 16 16, auto`;
  }
});

document.addEventListener('mouseout', function(e) {
  const target = e.target.closest('[data-cursor-emoji]');
  if (target) {
    document.body.style.cursor = '';
  }
});

// Effet magnétique sur les mots "vitesse" et "brutal"
let magneticElements = [];

function initMagneticEffect() {
  magneticElements = document.querySelectorAll('.keyword-interactive.magnetic');
  
  document.addEventListener('mousemove', function(e) {
    magneticElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Zone d'attraction : 100px
      if (distance < 100) {
        const force = (100 - distance) / 100;
        const moveX = (distanceX / distance) * force * 10;
        const moveY = (distanceY / distance) * force * 10;
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        el.style.transition = 'transform 0.1s ease-out';
      } else {
        el.style.transform = 'translate(0, 0)';
        el.style.transition = 'transform 0.3s ease-out';
      }
    });
  });
}

// Init après que les keywords soient wrappés
setTimeout(initMagneticEffect, 500);

// Vibration des mots magnétiques au survol
document.addEventListener('mouseover', function(e) {
  if (e.target.classList.contains('magnetic')) {
    e.target.style.animation = 'keyword-vibrate 0.3s ease-in-out infinite';
  }
});

document.addEventListener('mouseout', function(e) {
  if (e.target.classList.contains('magnetic')) {
    e.target.style.animation = '';
  }
});

// CSS pour l'animation de vibration
const style = document.createElement('style');
style.textContent = `
  .keyword-interactive {
    display: inline-block;
    position: relative;
    cursor: pointer;
  }
  
  .keyword-interactive.magnetic {
    will-change: transform;
  }
  
  @keyframes keyword-vibrate {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-1px, -1px) rotate(-0.5deg); }
    50% { transform: translate(1px, 1px) rotate(0.5deg); }
    75% { transform: translate(-1px, 1px) rotate(-0.5deg); }
  }
`;
document.head.appendChild(style);
