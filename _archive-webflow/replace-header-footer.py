#!/usr/bin/env python3
"""
Script pour remplacer COMPLÈTEMENT les headers/footers Webflow 
par ceux de index.html sur TOUTES les pages secondaires.
"""

import re
from pathlib import Path

# Header de index.html (lignes 40-90)
NEW_HEADER = '''  <!-- Header -->
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
'''

# Footer de index.html (lignes 700-757)
NEW_FOOTER = '''  <footer class="footer">
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
'''

# Header migrations avec chemins relatifs ../
MIGRATIONS_HEADER = NEW_HEADER.replace('href="', 'href="../').replace('src="images/', 'src="../images/').replace('href="../http', 'href="http')

# Footer migrations avec chemins relatifs ../
MIGRATIONS_FOOTER = NEW_FOOTER.replace('href="', 'href="../').replace('src="images/', 'src="../images/').replace('href="../http', 'href="http').replace('href="../mailto', 'href="mailto')

def replace_header_footer(filepath, is_migration=False):
    """Remplace le header et footer d'un fichier HTML."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Header à utiliser
    header = MIGRATIONS_HEADER if is_migration else NEW_HEADER
    footer = MIGRATIONS_FOOTER if is_migration else NEW_FOOTER
    
    # Supprimer TOUT entre <body> et le premier <div class="w-embed w-script"> ou <section> ou <main>
    # Pattern greedy pour capturer TOUT le header Webflow
    content = re.sub(
        r'<body>.*?(?=<div class="w-embed w-script">|<section|<main)',
        f'<body>\n  <!-- Custom Cursor -->\n  <div class="custom-cursor" id="cursor"></div>\n  \n  <!-- Grid Background -->\n  <div class="bg-grid-fixed"></div>\n  \n{header}\n  \n  ',
        content,
        flags=re.DOTALL
    )
    
    # Supprimer TOUT entre <footer et </footer> inclus, puis réinjecter le nouveau footer
    content = re.sub(
        r'<footer.*?</footer>',
        footer,
        content,
        flags=re.DOTALL
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {filepath.name}")

# Pages principales
pages = [
    "mentions-legales.html",
    "migrations.html",
    "la-vision-tomorrow.html",
    "process-24h.html",
    "realisations.html",
    "notre-histoire.html",
    "comparatif-solutions-web.html"
]

# Sous-pages migrations
migrations = [
    "migrations/wordpress.html",
    "migrations/shopify.html",
    "migrations/wix.html",
    "migrations/squarespace.html",
    "migrations/joomla.html"
]

print("🔥 Remplacement header/footer de la HOME...")
print()

base = Path("/Users/secondmac/Downloads/TOMORROW ONLINE/tomorrow-site")

for page in pages:
    filepath = base / page
    if filepath.exists():
        replace_header_footer(filepath, is_migration=False)

for mig in migrations:
    filepath = base / mig
    if filepath.exists():
        replace_header_footer(filepath, is_migration=True)

print()
print("✨ TERMINÉ - Tous les headers/footers remplacés par ceux de index.html")
