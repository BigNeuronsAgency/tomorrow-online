// ========================================
// NAVIGATION
// ========================================

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  
  if (mobileMenu && mobileBtn) {
    mobileMenu.classList.toggle('active');
    mobileBtn.classList.toggle('active');
  }
}

function toggleMobileDropdown(element) {
  element.classList.toggle('active');
}

// Close mobile menu on link click
document.addEventListener('DOMContentLoaded', () => {
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileBtn = document.querySelector('.mobile-menu-btn');
      
      if (mobileMenu && mobileBtn) {
        mobileMenu.classList.remove('active');
        mobileBtn.classList.remove('active');
      }
    });
  });
});

// Export functions
window.toggleMobileMenu = toggleMobileMenu;
window.toggleMobileDropdown = toggleMobileDropdown;
