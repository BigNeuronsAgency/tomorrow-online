// ========================================
// MARQUEE SIMPLE - Vitesse constante
// ========================================

function initMarqueeSpeed() {
  const marqueeContent = document.querySelector('.marquee-content');
  
  if (!marqueeContent) {
    console.log('Marquee content not found');
    return;
  }
  
  // Vitesse constante rapide
  marqueeContent.style.animationDuration = '15s';
  
  console.log('Marquee speed set to 15s');
}

window.initMarqueeSpeed = initMarqueeSpeed;
