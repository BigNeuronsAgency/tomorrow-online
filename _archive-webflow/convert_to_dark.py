#!/usr/bin/env python3
"""
Convertit les 7 embeds de HOME_PAR_EMBED.md en versions dark cyan.
Thème: #030303 (fond), #00F0FF (accent cyan), #EAEAEA (texte).
"""

import re

# Palette dark cyan
THEME = {
    # Backgrounds
    'bg-white': 'bg-[#030303]',
    'bg-gray-50': 'bg-[#0A0A0A]',
    'bg-gray-100': 'bg-[#121212]',
    'bg-black': 'bg-[#000000]',
    
    # Colors
    '#FF3333': '#00F0FF',
    'text-[#FF3333]': 'text-[#00F0FF]',
    'border-[#FF3333]': 'border-[#00F0FF]',
    'hover:text-[#FF3333]': 'hover:text-[#00F0FF]',
    'group-hover:text-[#FF3333]': 'group-hover:text-[#00F0FF]',
    
    # Borders
    'border-gray-200': 'border-[rgba(0,240,255,0.2)]',
    'border-gray-300': 'border-[rgba(0,240,255,0.3)]',
    'border-gray-800': 'border-[rgba(0,240,255,0.1)]',
    'border-black': 'border-[rgba(0,240,255,0.3)]',
    
    # Text colors
    'text-gray-600': 'text-[#EAEAEA]/60',
    'text-gray-500': 'text-[#EAEAEA]/50',
    'text-gray-400': 'text-[#EAEAEA]/40',
    'text-gray-300': 'text-[#EAEAEA]/30',
    'text-black': 'text-[#EAEAEA]',
    'text-white': 'text-[#EAEAEA]',
    
    # Hover states
    'hover:bg-gray-50': 'hover:bg-[#0A0A0A]',
    'hover:bg-black': 'hover:bg-[#00F0FF]',
    'hover:text-white': 'hover:text-[#000000]',
    'hover:text-black': 'hover:text-[#00F0FF]',
    'hover:border-black': 'hover:border-[#00F0FF]',
    'hover:border-white': 'hover:border-[#00F0FF]',
    
    # CSS variables
    '--bg: #FFFFFF': '--bg: #030303',
    '--fg: #000000': '--fg: #EAEAEA',
    '--accent: #FF3333': '--accent: #00F0FF',
    '--grid: #E5E5E5': '--grid: rgba(0,240,255,0.1)',
    
    # Specific cards
    'bg-[#FF3333]': 'bg-[#00F0FF]',
}

def convert_to_dark(content):
    """Convertit le contenu au thème dark cyan."""
    result = content
    
    # Remplacements directs
    for old, new in THEME.items():
        result = result.replace(old, new)
    
    # Glow cyan pour les accents
    result = result.replace('text-shadow: 0 0', 'text-shadow: 0 0 20px rgba(0,240,255,0.6)')
    
    # Box shadow cyan
    result = result.replace('box-shadow: 0 0 20px rgba(255, 51, 51', 'box-shadow: 0 0 20px rgba(0, 240, 255')
    
    return result

def extract_embed(content, embed_num):
    """Extrait un embed spécifique du fichier HOME_PAR_EMBED.md."""
    pattern = f"========== EMBED {embed_num}.*?=========="
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        embed_content = match.group(0)
        # Extraire seulement le contenu entre les balises
        code_match = re.search(r'```html\n(.*?)\n```', embed_content, re.DOTALL)
        if code_match:
            return code_match.group(1)
    
    return None

def main():
    # Lire HOME_PAR_EMBED.md
    with open('HOME_PAR_EMBED.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraire et convertir chaque embed
    for i in range(1, 8):
        print(f"🔧 Traitement EMBED {i}...")
        
        embed_content = extract_embed(content, i)
        if embed_content:
            dark_content = convert_to_dark(embed_content)
            
            # Sauvegarder
            filename = f'EMBED_{i}_DARK_FINAL.html'
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(dark_content)
            
            # Afficher taille
            size = len(dark_content)
            status = "✅" if size < 50000 else "⚠️"
            print(f"   {status} {filename}: {size:,} caractères")
        else:
            print(f"   ❌ EMBED {i} non trouvé")
    
    print("\n✅ Conversion terminée!")

if __name__ == '__main__':
    main()
