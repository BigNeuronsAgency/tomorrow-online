#!/usr/bin/env python3
import re

# Lire le footer de index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
    
# Extraire tout le footer (de <footer jusqu'à </footer>)
footer_match = re.search(r'(<footer.*?</footer>)', content, re.DOTALL)
if not footer_match:
    print("Footer non trouvé dans index.html")
    exit(1)
    
footer_html = footer_match.group(1)
print(f"Footer extrait ({len(footer_html)} caractères)")

# Liste des pages secondaires
pages = [
    'comparatif-solutions-web.html',
    'creation-sites-internet-24h.html',
    'la-vision-tomorrow.html',
    'landing-page-haute-conversion.html',
    'mentions-legales.html',
    'migrations.html',
    'notre-histoire.html',
    'process-24h.html',
    'realisations.html',
    'site-vitrine-pme.html'
]

# Remplacer le footer dans chaque page
for page in pages:
    try:
        with open(page, 'r', encoding='utf-8') as f:
            page_content = f.read()
        
        # Remplacer le footer
        new_content = re.sub(r'<footer.*?</footer>', footer_html, page_content, flags=re.DOTALL)
        
        with open(page, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ {page} mis à jour")
    except Exception as e:
        print(f"✗ Erreur sur {page}: {e}")

print("\nFooter synchronisé sur toutes les pages!")
