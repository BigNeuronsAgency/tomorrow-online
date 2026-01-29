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
  const fastSpeed = 5;    // 5s (TRÈS rapide)
  
  let currentPosition = 0;
  let isAccelerating = false;
  
  function checkPosition() {
    const transform = window.getComputedStyle(marqueeContent).transform;
    if (transform && transform !== 'none') {
      const matrix = transform.match(/matrix.*\((.+)\)/);
      if (matrix) {
        currentPosition = parseFloat(matrix[1].split(', ')[4]);
      }
    }
    
    const contentWidth = marqueeContent.scrollWidth / 2;
    const normalizedPos = Math.abs(currentPosition) % contentWidth;
    
    // Accélération AVANT que "LA VITESSE" soit visible (50%-80% du cycle)
    const speedTriggerStart = contentWidth * 0.50;
    const speedTriggerEnd = contentWidth * 0.80;
    
    const shouldAccelerate = normalizedPos >= speedTriggerStart && normalizedPos <= speedTriggerEnd;
    
    if (shouldAccelerate && !isAccelerating) {
      isAccelerating = true;
      // Changement instantané sans glitch
      marqueeContent.style.transition = 'none';
      marqueeContent.style.animationDuration = `${fastSpeed}s`;
      void marqueeContent.offsetWidth; // Force reflow
    } else if (!shouldAccelerate && isAccelerating) {
      isAccelerating = false;
      marqueeContent.style.transition = 'none';
      marqueeContent.style.animationDuration = `${normalSpeed}s`;
      void marqueeContent.offsetWidth;
    }
    
    requestAnimationFrame(checkPosition);
  }
  
  checkPosition();
  console.log('Marquee speed control initialized');
}

window.initMarqueeSpeed = initMarqueeSpeed;
