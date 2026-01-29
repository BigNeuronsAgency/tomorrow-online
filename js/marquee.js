// ========================================
// MARQUEE AVEC ACCÉLÉRATION
// ========================================

function initMarqueeSpeed() {
  const marqueeContent = document.querySelector('.marquee-content');
  
  if (!marqueeContent) {
    console.log('Marquee content not found');
    return;
  }
  
  // Vitesse normale (15s = rapide)
  marqueeContent.style.animationDuration = '15s';
  
  // Observer pour déclencher accélération
  function checkMarqueePosition() {
    const rect = marqueeContent.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    // Chercher le texte "LA VITESSE EST UNE FONCTIONNALITÉ"
    const text = marqueeContent.textContent || marqueeContent.innerText;
    const targetPhrase = "LA VITESSE EST UNE FONCTIONNALITÉ";
    const startPhrase = "SOYEZ IMPATIENT";
    
    // Position approximative du "É" dans le viewport
    // On accélère quand le "É" approche du bord droit
    const contentWidth = marqueeContent.scrollWidth / 2; // Divisé par 2 car dupliqué
    const scrolled = -rect.left; // Distance scrollée depuis le début
    
    // Position du "É" de FONCTIONNALITÉ (environ à 70% du texte)
    const ePosition = (scrolled + contentWidth * 0.7) % contentWidth;
    const eInViewport = ePosition > scrolled && ePosition < scrolled + viewportWidth;
    const eNearRightEdge = ePosition > scrolled + viewportWidth * 0.85;
    
    // Position du "S" de SOYEZ (environ à 10% du texte)
    const sPosition = (scrolled + contentWidth * 0.1) % contentWidth;
    const sNearLeftEdge = sPosition < scrolled + viewportWidth * 0.15 && sPosition > scrolled;
    
    // Accélérer quand "É" proche bord droit, ralentir quand "S" touche bord gauche
    if (eNearRightEdge && !sNearLeftEdge) {
      marqueeContent.style.animationDuration = '8s'; // ACCÉLÉRATION
    } else {
      marqueeContent.style.animationDuration = '15s'; // Normal
    }
    
    requestAnimationFrame(checkMarqueePosition);
  }
  
  checkMarqueePosition();
  console.log('Marquee speed with acceleration initialized');
}

window.initMarqueeSpeed = initMarqueeSpeed;
