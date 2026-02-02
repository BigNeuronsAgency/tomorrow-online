#!/usr/bin/env python3
import sys

def convert_colors(text):
    """Change UNIQUEMENT les couleurs magenta/rose → cyan"""
    replacements = {
        'linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)': '#00F0FF',
        'rgba(180,7,254,1)': '#00F0FF',
        'rgba(255,10,55,1)': '#00F0FF',
        'rgba(180,7,254,.7)': 'rgba(0,240,255,0.7)',
        'rgba(180,7,254,.4)': 'rgba(0,240,255,0.4)',
        'rgba(180,7,254,.2)': 'rgba(0,240,255,0.2)',
        'rgba(180,7,254,0)': 'rgba(0,240,255,0)',
        'rgba(255,10,55,.3)': 'rgba(0,240,255,0.3)',
        'rgba(255,10,55,0)': 'rgba(0,240,255,0)',
        '#FF3333': '#00F0FF',
        'rgba(255,51,51,.2)': 'rgba(0,240,255,0.2)',
    }
    
    result = text
    for old, new in replacements.items():
        result = result.replace(old, new)
    return result

# Lire index.html
with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Embeds selon les vraies lignes de HOME_PAR_EMBED.md
embeds_def = [
    (1, 1, 1117, "Head + Hero → Work"),
    (2, 1118, 1156, "Pricing sections"),  # À vérifier
    (3, 1157, 1244, "FAQ"),               # À vérifier  
    (4, 1118, 1156, "Modales"),
    (5, 1157, 1336, "Config formulaire"),
    (6, 1337, 1665, "Formulaire complet"),
    (7, 1666, len(lines), "Footer + scripts"),
]

# En fait, utilisons les VRAIS numéros depuis l'analyse précédente
embeds_correct = [
    (1, 1, 1117, "Head → Work"),
    (2, 1118, 1156, "Section pricing complète"),  
    (3, 1157, 1244, "FAQ + toggle"),
    (4, 1118, 1156, "Modales"),
    (5, 1158, 1336, "Config (styles + variables)"),
    (6, 1337, 1665, "Formulaire 7 étapes"),
    (7, 1666, len(lines), "Footer"),
]

# NON, je prends les sections RÉELLES qu'on a identifiées
real_embeds = [
    (1, 1, 1117),      # Tout jusqu'aux modales
    (2, 1118, 1156),   # Juste après work jusqu'aux modales (FAUX)
    (3, 1157, 1244),   
    (4, 1118, 1156),   # Modales
    (5, 1158, 1336),   # Config
    (6, 1337, 1665),   # Form
    (7, 1666, len(lines)),
]

# Bon, je vais juste utiliser index.html comme base et extraire ce qui correspond aux embeds existants

# Lire les embeds sources pour voir leur structure
import os
if os.path.exists('embeds/embed-1-A-COLLER.html'):
    with open('embeds/embed-1-A-COLLER.html', 'r') as f:
        embed1_content = f.read()
        
    # Trouver où ça commence et finit dans index.html
    idx_start = ''.join(lines).find(embed1_content[:500])
    print(f"Embed 1 source starts around line: {idx_start}")

print("Utilisons les lignes fixes identifiées précédemment:")
print("EMBED 1: 1-1117")
print("EMBED 2: Section pricing - à identifier")
print("etc...")
