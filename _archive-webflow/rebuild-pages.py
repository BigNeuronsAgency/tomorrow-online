#!/usr/bin/env python3
"""
Script FINAL pour RECONSTRUIRE les pages avec le header/footer de la home.
"""

import sys, re
from pathlib import Path

def rebuild_page(filepath):
    """Reconstruit une page avec header/footer propres."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraire le <head>
    head_match = re.search(r'<head>.*?</head>', content, re.DOTALL)
    if not head_match:
        print(f"❌ {filepath.name}: pas de <head>")
        return False
    head = head_match.group(0)
    
    # Extraire le CONTENU (tout après </nav> jusqu'à <footer>)
    content_match = re.search(r'</nav>.*?(<div|<section|<main)', content, re.DOTALL)
    if content_match:
        start_idx = content_match.end() - len(content_match.group(1))
        footer_match = re.search(r'<footer', content[start_idx:])
        if footer_match:
            main_content = content[start_idx:start_idx + footer_match.start()]
        else:
            main_content = content[start_idx:]
    else:
        print(f"❌ {filepath.name}: contenu introuvable")
        return False
    
    # Nouveau HTML
    new_html = f'''<!DOCTYPE html>
<html lang="fr">
{head}
<body>
  
  <!-- Custom Cursor -->
  <div class="custom-cursor" id="cursor"></div>
  
  <!-- Grid Background -->
  <div class="bg-grid-fixed"></div>
  
  <!-- Header -->
  <header class="header">
    <nav class="nav">
      <div class="nav-logo" onclick="window.location.href='index.html'">
        <img src="images/TO-logo.webp" alt="Tomorrow.Online" class="logo">
      </div>
      
      <div class="nav-links">
        <a href="process-24h.html" class="nav-link">Process</a>
        <a href="realisations.html" class="nav-link">Réalisations</a>
        <div class="nav-dropdown">
          <span class="nav-link nav-link-dropdown">
            Ressources
            <span class="dropdown-arrow">▼</span>
          </span>
          <div class="dropdown-content">
            <a href="la-vision-tomorrow.html">🔮 Notre Vision</a>
            <a href="notre-histoire.html">🏢 Qui sommes-nous</a>
            <a href="comparatif-solutions-web.html">⚡ Comparatif Solutions</a>
            <a href="migrations.html">🔄 Migrations CMS</a>
          </div>
        </div>
      </div>
      
      <div class="nav-cta">
        <button class="btn btn-primary" onclick="openModal()">
          Réserver mon créneau
        </button>
      </div>
      
      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
        <span class="hamburger"></span>
      </button>
    </nav>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
      <a href="process-24h.html">Process</a>
      <a href="realisations.html">Réalisations</a>
      <div class="mobile-dropdown" onclick="toggleMobileDropdown(this)">
        <span>Ressources ▼</span>
        <div class="mobile-dropdown-content">
          <a href="la-vision-tomorrow.html">🔮 Notre Vision</a>
          <a href="notre-histoire.html">🏢 Qui sommes-nous</a>
          <a href="comparatif-solutions-web.html">⚡ Comparatif Solutions</a>
          <a href="migrations.html">🔄 Migrations CMS</a>
        </div>
      </div>
      <button class="btn btn-primary" onclick="openModal()">Réserver</button>
    </div>
  </header>
  
  <!-- CONTENU ORIGINAL -->
{main_content}
  
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="images/TO-logo.webp" alt="Tomorrow.Online" class="footer-logo">
          <p class="footer-tagline font-mono">
            La première agence web "NO-WAIT" en France.<br>
            Designed for speed. Powered by intelligence.
          </p>
        </div>
        
        <div class="footer-links">
          <h4 class="footer-title font-mono">Services</h4>
          <ul class="footer-list">
            <li><a href="process-24h.html">Process 24H</a></li>
            <li><a href="realisations.html">Réalisations</a></li>
            <li><a href="comparatif-solutions-web.html">Comparatif</a></li>
            <li><a href="migrations.html">Migrations</a></li>
          </ul>
        </div>
        
        <div class="footer-links">
          <h4 class="footer-title font-mono">À Propos</h4>
          <ul class="footer-list">
            <li><a href="la-vision-tomorrow.html">La Vision</a></li>
            <li><a href="notre-histoire.html">Notre Histoire</a></li>
          </ul>
        </div>
        
        <div class="footer-links">
          <h4 class="footer-title font-mono">Réseau & Contact</h4>
          <ul class="footer-list">
            <li><a href="https://www.bigneurons.com" target="_blank">Groupe Big Neurons <span class="external-icon">↗</span></a></li>
            <li><a href="mentions-legales.html">Mentions Légales</a></li>
            <li><a href="mailto:hello@tomorrow.online">Contact Ops</a></li>
          </ul>
        </div>
      </div>
      
      <!-- Video Footer Link -->
      <div class="footer-video-link">
        <button class="video-link-btn" onclick="openVideoModal()">
          Comment on voit les acheteurs de templates
        </button>
      </div>
      
      <div class="footer-bottom">
        <p class="footer-copyright font-mono">
          © 2026 TOMORROW AGENCY. UNE MARQUE DE SAS BIG NEURONS. TOMORROW.ONLINE EST LA PREMIÈRE AGENCE WEB "NO-WAIT" EN FRANCE. DESIGNED FOR SPEED. POWERED BY INTELLIGENCE.
        </p>
        <div class="footer-status font-mono">
          SYSTEM STATUS: OPERATIONAL
        </div>
      </div>
    </div>
  </footer>
  
  <!-- Modal Formulaire -->
  <div id="bookingModal" class="modal hidden">
    <div class="modal-overlay" onclick="window.closeModal()"></div>
    <div class="modal-container">
      <div id="modalContent" class="modal-content"></div>
    </div>
  </div>
  
  <!-- Video Modal -->
  <div id="videoModal" class="modal hidden">
    <div class="modal-overlay" onclick="closeVideoModal()"></div>
    <div class="video-modal-content">
      <button class="video-modal-close" onclick="closeVideoModal()">✕</button>
      <div style="padding:56.25% 0 0 0;position:relative;">
        <iframe id="videoIframe" src="" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Tomorrow.Online"></iframe>
      </div>
    </div>
  </div>
  
  <!-- Scripts -->
  <script src="js/cursor.js"></script>
  <script src="js/animations.js"></script>
  <script src="js/navigation.js"></script>
  <script src="js/marquee.js"></script>
  <script src="js/main.js"></script>
  <script src="js/formulaire.js"></script>
  
  <script>
    if (typeof initCursor === 'function') initCursor();
    if (typeof initAnimations === 'function') initAnimations();
    if (typeof initSmoothScroll === 'function') initSmoothScroll();
    
    function openVideoModal() {{
      const modal = document.getElementById('videoModal');
      const iframe = document.getElementById('videoIframe');
      iframe.src = 'https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1';
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }}
    function closeVideoModal() {{
      const modal = document.getElementById('videoModal');
      const iframe = document.getElementById('videoIframe');
      iframe.src = '';
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }}
    window.openVideoModal = openVideoModal;
    window.closeVideoModal = closeVideoModal;
  </script>
  
</body>
</html>'''
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"✅ {filepath.name}")
    return True

# Main
base = Path("/Users/secondmac/Downloads/TOMORROW ONLINE/tomorrow-site")
pages = [
    "mentions-legales.html",
    "migrations.html",
    "la-vision-tomorrow.html",
    "process-24h.html",
    "realisations.html",
    "notre-histoire.html",
    "comparatif-solutions-web.html"
]

print("🔥 Reconstruction COMPLÈTE avec header/footer de index.html...")
print()

for page in pages:
    filepath = base / page
    if filepath.exists():
        rebuild_page(filepath)

print()
print("✨ TERMINÉ")
