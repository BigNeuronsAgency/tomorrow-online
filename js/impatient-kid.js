// ========================================
// IMPATIENT KID - TEARS ANIMATION
// ========================================

function initImpatientKid() {
  const container = document.getElementById('impatient-kid-container');
  const eyeLeft = document.getElementById('eye-left');
  const eyeRight = document.getElementById('eye-right');
  
  if (!container || !eyeLeft || !eyeRight) {
    console.log('Impatient Kid elements not found');
    return;
  }
  
  console.log('Impatient Kid initialized - tears starting...');
  
  function createTear(eyeElement) {
    const tear = document.createElement('div');
    tear.classList.add('tear');
    
    // Position de départ (yeux)
    const rect = eyeElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    tear.style.left = (eyeElement.offsetLeft + 2) + 'px';
    tear.style.top = eyeElement.offsetTop + 'px';
    
    container.appendChild(tear);
    
    // Animation de chute avec GSAP
    if (typeof gsap !== 'undefined') {
      gsap.to(tear, {
        y: 200 + Math.random() * 50, // Tombe de 200px environ
        opacity: 0,
        scale: 0.5,
        duration: 1 + Math.random(), // Vitesse aléatoire
        ease: "power2.in",
        onComplete: () => {
          tear.remove(); // Nettoyage du DOM
        }
      });
    } else {
      // Fallback si GSAP n'est pas chargé
      tear.style.transition = 'all 1.5s ease-in';
      tear.style.transform = 'translateY(250px)';
      tear.style.opacity = '0';
      setTimeout(() => tear.remove(), 1500);
    }
  }
  
  // Générateur de larmes infini
  setInterval(() => {
    // Larmes aléatoires (gauche ou droite ou les deux)
    if (Math.random() > 0.5) createTear(eyeLeft);
    if (Math.random() > 0.5) createTear(eyeRight);
  }, 500); // Une larme toutes les 500ms
}

// Export pour initialisation globale
window.initImpatientKid = initImpatientKid;
