// ========================================
// MARQUEE DYNAMIQUE - Accélération sur "LA VITESSE"
// ========================================

function initMarqueeSpeed() {
  const marqueeContent = document.querySelector('.marquee-content');
  
  if (!marqueeContent) {
    console.log('Marquee content not found');
    return;
  }
  
  const text = marqueeContent.textContent;
  const speedTrigger = 'LA VITESSE EST UNE FONCTIONNALITÉ';
  const normalSpeed = 30; // 30s
  const fastSpeed = 8;    // 8s (beaucoup plus rapide)
  
  // Calculer la position du texte trigger dans la boucle
  let currentPosition = 0;
  let isAccelerating = false;
  
  function checkPosition() {
    // Récupérer la position actuelle du marquee
    const transform = window.getComputedStyle(marqueeContent).transform;
    if (transform && transform !== 'none') {
      const matrix = transform.match(/matrix.*\((.+)\)/);
      if (matrix) {
        currentPosition = parseFloat(matrix[1].split(', ')[4]);
      }
    }
    
    // Calculer si on est sur la section "LA VITESSE"
    const contentWidth = marqueeContent.scrollWidth / 2; // Divisé par 2 car contenu dupliqué
    const normalizedPos = Math.abs(currentPosition) % contentWidth;
    
    // Position approximative de "LA VITESSE" dans le texte (environ 66% du cycle)
    const speedTriggerStart = contentWidth * 0.66;
    const speedTriggerEnd = contentWidth * 0.95;
    
    const shouldAccelerate = normalizedPos >= speedTriggerStart && normalizedPos <= speedTriggerEnd;
    
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

// Export pour initialisation globale
window.initMarqueeSpeed = initMarqueeSpeed;
