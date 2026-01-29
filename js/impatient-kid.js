// ========================================
// IMPATIENT KID - NERVOUS SHAKE ONLY
// ========================================

function initImpatientKid() {
  const container = document.getElementById('impatient-kid-container');
  
  if (!container) {
    console.log('Impatient Kid elements not found');
    return;
  }
  
  console.log('Impatient Kid initialized - nervous shake active');
  
  // Juste le shake, pas de larmes
  // L'animation CSS .nervous-shake s'occupe de tout
}

// Export pour initialisation globale
window.initImpatientKid = initImpatientKid;
