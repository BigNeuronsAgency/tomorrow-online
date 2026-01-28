// ========================================
// CUSTOM CURSOR
// ========================================

let cursor;
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

function initCursor() {
  cursor = document.getElementById('cursor');
  
  if (!cursor) return;
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor movement
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, [onclick], .card, .hero-stat');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

// Export for global access
window.initCursor = initCursor;
