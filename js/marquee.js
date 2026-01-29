// ========================================
// MARQUEE SIMPLE - Vitesse constante rapide
// ========================================

function initMarqueeSpeed() {
  const marqueeContent = document.querySelector('.marquee-content');
  
  if (!marqueeContent) {
    console.log('Marquee content not found');
    return;
  }
  
  // Vitesse constante rapide (10s au lieu de 15s)
  marqueeContent.style.animationDuration = '10s';
  
  console.log('Marquee speed set to 10s (fast)');
}

window.initMarqueeSpeed = initMarqueeSpeed;
