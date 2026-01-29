// ========================================
// MARQUEE DYNAMIQUE - Accélération précise
// ========================================

function initMarqueeSpeed() {
  const marqueeContent = document.querySelector('.marquee-content');
  
  if (!marqueeContent) {
    console.log('Marquee content not found');
    return;
  }
  
  const normalSpeed = 30; // 30s
  const fastSpeed = 4;    // 4s (TRÈS rapide)
  
  let isAccelerating = false;
  
  function checkPosition() {
    const rect = marqueeContent.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    // Récupérer le texte pour calculer les positions
    const text = marqueeContent.textContent;
    
    // Calculer position approximative du texte dans le défilement
    // Position de "LA VITESSE EST UNE FONCTIONNALITÉ" dans le texte complet
    const vitesseIndex = text.indexOf('LA VITESSE EST UNE FONCTIONNALITÉ');
    const impatientIndex = text.indexOf('SOYEZ IMPATIENT');
    
    if (vitesseIndex === -1 || impatientIndex === -1) {
      requestAnimationFrame(checkPosition);
      return;
    }
    
    // Calculer le pourcentage de position
    const totalLength = marqueeContent.scrollWidth / 2; // Divisé par 2 car contenu dupliqué
    const currentOffset = Math.abs(rect.left);
    const normalizedOffset = currentOffset % totalLength;
    
    // Position relative dans le cycle (0-1)
    const cyclePosition = normalizedOffset / totalLength;
    
    // Position de "FONCTIONNALITÉ" touche bord droit = environ 0.72 du cycle
    // Position de "SOYEZ IMPATIENT" touche bord gauche = environ 0.95 du cycle
    const shouldAccelerate = cyclePosition >= 0.72 && cyclePosition <= 0.95;
    
    if (shouldAccelerate && !isAccelerating) {
      isAccelerating = true;
      marqueeContent.style.animationDuration = `${fastSpeed}s`;
    } else if (!shouldAccelerate && isAccelerating) {
      isAccelerating = false;
      marqueeContent.style.animationDuration = `${normalSpeed}s`;
    }
    
    requestAnimationFrame(checkPosition);
  }
  
  checkPosition();
  console.log('Marquee speed control initialized');
}

window.initMarqueeSpeed = initMarqueeSpeed;
