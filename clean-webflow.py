#!/usr/bin/env python3
"""
Script BRUTAL pour SUPPRIMER TOUT le CSS inline Webflow
et garder uniquement le contenu.
"""

import re
from pathlib import Path

def clean_page(filepath):
    """Supprime TOUS les <div class="w-embed"> et leur contenu CSS inline."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Supprimer TOUS les <div class="w-embed">...</div> qui contiennent du CSS
    # Pattern greedy pour capturer le div entier
    content = re.sub(
        r'<div class="w-embed"[^>]*>.*?</div>\s*',
        '',
        content,
        flags=re.DOTALL
    )
    
    # Supprimer aussi <div class="w-embed w-script">...</div>
    content = re.sub(
        r'<div class="w-embed w-script"[^>]*>.*?</div>\s*',
        '',
        content,
        flags=re.DOTALL
    )
    
    # Supprimer les anciens scripts Webflow
    content = re.sub(
        r'<script[^>]*>!function\(o,c\).*?</script>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # Ajouter les scripts nécessaires à la fin avant </body>
    scripts = '''
  <!-- Scripts -->
  <script src="js/cursor.js"></script>
  <script src="js/animations.js"></script>
  <script src="js/navigation.js"></script>
  <script src="js/marquee.js"></script>
  <script src="js/main.js"></script>
  <script src="js/formulaire.js"></script>
  
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
  
  <script>
    if (typeof initCursor === 'function') initCursor();
    if (typeof initAnimations === 'function') initAnimations();
    if (typeof initSmoothScroll === 'function') initSmoothScroll();
    
    function openVideoModal() {
      const modal = document.getElementById('videoModal');
      const iframe = document.getElementById('videoIframe');
      iframe.src = 'https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1';
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    function closeVideoModal() {
      const modal = document.getElementById('videoModal');
      const iframe = document.getElementById('videoIframe');
      iframe.src = '';
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
    window.openVideoModal = openVideoModal;
    window.closeVideoModal = closeVideoModal;
  </script>
'''
    
    # Insérer avant </body>
    content = content.replace('</body>', f'{scripts}\n</body>')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {filepath.name}")

print("🔥 Suppression BRUTALE de tout le CSS Webflow inline...")
print()

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

migrations = [
    "migrations/wordpress.html",
    "migrations/shopify.html",
    "migrations/wix.html",
    "migrations/squarespace.html",
    "migrations/joomla.html"
]

for page in pages:
    filepath = base / page
    if filepath.exists():
        clean_page(filepath)

for mig in migrations:
    filepath = base / mig
    if filepath.exists():
        clean_page(filepath)

print()
print("✨ TERMINÉ - Tout le CSS inline Webflow supprimé")
