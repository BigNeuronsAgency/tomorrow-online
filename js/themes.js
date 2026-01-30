// ========================================
// THEME SYSTEM - DARK / WHITE / RAINBOW
// ========================================

(function() {
  'use strict';
  
  // Charger le thème sauvegardé ou défaut 'dark'
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  
  // Fonction pour changer de thème
  window.setTheme = function(theme) {
    console.log('🎨 Switching to theme:', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update tous les radio buttons (desktop + mobile)
    document.querySelectorAll('input[type="radio"][name^="theme"]').forEach(radio => {
      radio.checked = radio.value === theme;
    });
    
    // Petit effet de transition
    document.body.style.transition = 'background 0.5s ease, color 0.5s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 500);
  };
  
  // Init au chargement
  document.addEventListener('DOMContentLoaded', function() {
    // S'assurer que le bon radio est checked
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    document.querySelectorAll('input[type="radio"][name^="theme"]').forEach(radio => {
      radio.checked = radio.value === currentTheme;
    });
    
    // Écouter les changements sur tous les toggles
    document.querySelectorAll('input[type="radio"][name^="theme"]').forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.checked) {
          setTheme(this.value);
        }
      });
    });
    
    console.log('🎨 Theme system initialized. Current theme:', currentTheme);
  });
  
})();
