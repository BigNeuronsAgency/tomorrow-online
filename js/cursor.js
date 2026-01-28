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
  
  // Track mouse position with scroll
  document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });
  
  // Smooth cursor movement - position exactly on mouse
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    // Center the cursor exactly on mouse position
    cursor.style.left = (cursorX - cursor.offsetWidth / 2) + 'px';
    cursor.style.top = (cursorY - cursor.offsetHeight / 2) + 'px';
    
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
