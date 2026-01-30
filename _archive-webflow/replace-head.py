#!/usr/bin/env python3
"""
Script pour remplacer le <head> de toutes les pages par celui de index.html
"""

import re
from pathlib import Path

# Head de index.html
NEW_HEAD = '''<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="{path}images/favicon.png">
  <link rel="apple-touch-icon" href="{path}images/webclip.png">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  
  <!-- CSS -->
  <link rel="stylesheet" href="{path}css/design-system.css">
  <link rel="stylesheet" href="{path}css/home.css">
  <link rel="stylesheet" href="{path}css/formulaire.css">
  
  <!-- GSAP -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
  
  <!-- Lenis Smooth Scroll -->
  <script src="https://unpkg.com/lenis@1.0.19/dist/lenis.min.js"></script>
</head>'''

TITLES = {
    "mentions-legales.html": ("Mentions Légales - Tomorrow.Online", "Mentions légales et conditions générales de vente de Tomorrow.Online"),
    "migrations.html": ("Migrations CMS - Tomorrow.Online", "Migrez depuis WordPress, Wix, Shopify vers Webflow en 24H"),
    "la-vision-tomorrow.html": ("La Vision Tomorrow - Tomorrow.Online", "Notre vision de l'agence web moderne"),
    "process-24h.html": ("Process 24H - Tomorrow.Online", "Comment on livre un site en 24H"),
    "realisations.html": ("Réalisations - Tomorrow.Online", "Portfolio de sites livrés en 24H"),
    "notre-histoire.html": ("Notre Histoire - Tomorrow.Online", "L'histoire de Tomorrow.Online"),
    "comparatif-solutions-web.html": ("Comparatif Solutions Web - Tomorrow.Online", "Comparatif des solutions web modernes"),
}

MIGRATIONS_TITLES = {
    "wordpress.html": ("Migration WordPress vers Webflow - Tomorrow.Online", "Migrez de WordPress vers Webflow en 24H"),
    "shopify.html": ("Migration Shopify vers Webflow - Tomorrow.Online", "Migrez de Shopify vers Webflow en 24H"),
    "wix.html": ("Migration Wix vers Webflow - Tomorrow.Online", "Migrez de Wix vers Webflow en 24H"),
    "squarespace.html": ("Migration Squarespace vers Webflow - Tomorrow.Online", "Migrez de Squarespace vers Webflow en 24H"),
    "joomla.html": ("Migration Joomla vers Webflow - Tomorrow.Online", "Migrez de Joomla vers Webflow en 24H"),
}

def replace_head(filepath, title, description, is_migration=False):
    """Remplace le <head> d'un fichier HTML."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Chemin relatif pour migrations
    path = "../" if is_migration else ""
    
    # Générer le nouveau head
    new_head = NEW_HEAD.format(title=title, description=description, path=path)
    
    # Remplacer tout entre <head> et </head>
    content = re.sub(
        r'<head>.*?</head>',
        new_head,
        content,
        flags=re.DOTALL
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {filepath.name}")

print("🔥 Remplacement du <head> par celui de index.html...")
print()

base = Path("/Users/secondmac/Downloads/TOMORROW ONLINE/tomorrow-site")

# Pages principales
for page, (title, desc) in TITLES.items():
    filepath = base / page
    if filepath.exists():
        replace_head(filepath, title, desc, is_migration=False)

# Sous-pages migrations
for page, (title, desc) in MIGRATIONS_TITLES.items():
    filepath = base / "migrations" / page
    if filepath.exists():
        replace_head(filepath, title, desc, is_migration=True)

print()
print("✨ TERMINÉ - Tous les <head> remplacés")
