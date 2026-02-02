#!/usr/bin/env python3
"""
Convertit les embeds existants au thème dark cyan.
"""

import re
import sys

def convert_to_dark_cyan(content):
    """Convertit le HTML/CSS du thème rouge/blanc au thème dark cyan."""
    
    # Remplacements CSS inline et classes Tailwind
    replacements = {
        # Backgrounds
        'bg-white': 'bg-[#030303]',
        'bg-gray-50': 'bg-[#0A0A0A]',
        'bg-gray-100': 'bg-[#121212]',
        'bg-black': 'bg-[#000000]',
        'bg-[#FF3333]': 'bg-[#00F0FF]',
        'background-color: #FFFFFF': 'background-color: #030303',
        'background-color: #000': 'background-color: #000000',
        'background-color: black': 'background-color: #000000',
        
        # Text colors
        'text-gray-600': 'text-[#EAEAEA]/60',
        'text-gray-500': 'text-[#EAEAEA]/50',
        'text-gray-400': 'text-[#EAEAEA]/40',
        'text-gray-300': 'text-[#EAEAEA]/30',
        'text-black': 'text-[#EAEAEA]',
        'color: #000': 'color: #EAEAEA',
        'color: black': 'color: #EAEAEA',
        
        # Borders
        'border-gray-200': 'border-[rgba(0,240,255,0.2)]',
        'border-gray-300': 'border-[rgba(0,240,255,0.3)]',
        'border-gray-800': 'border-[rgba(0,240,255,0.1)]',
        'border-black': 'border-[rgba(0,240,255,0.3)]',
        'border-color: #000': 'border-color: rgba(0,240,255,0.3)',
        
        # Accent color
        '#FF3333': '#00F0FF',
        'text-[#FF3333]': 'text-[#00F0FF]',
        'border-[#FF3333]': 'border-[#00F0FF]',
        
        # Hover states
        'hover:bg-gray-50': 'hover:bg-[#0A0A0A]',
        'hover:bg-black': 'hover:bg-[#00F0FF]',
        'hover:text-white': 'hover:text-[#000000]',
        'hover:text-black': 'hover:text-[#00F0FF]',
        'hover:text-[#FF3333]': 'hover:text-[#00F0FF]',
        'hover:border-black': 'hover:border-[#00F0FF]',
        'group-hover:text-[#FF3333]': 'group-hover:text-[#00F0FF]',
        
        # CSS variables
        '--bg: #FFFFFF': '--bg: #030303',
        '--fg: #000000': '--fg: #EAEAEA',
        '--accent: #FF3333': '--accent: #00F0FF',
        '--grid: #E5E5E5': '--grid: rgba(0,240,255,0.1)',
    }
    
    result = content
    for old, new in replacements.items():
        result = result.replace(old, new)
    
    # Remplacer les URLs images relatives par CDN
    result = result.replace('src="images/', 'src="https://cdn.prod.website-files.com/69296dff64369c09698b8e09/')
    
    # Ajouter glow cyan
    result = re.sub(
        r'(text-\[#00F0FF\](?!["\'])[^<]*)',
        r'\1" style="text-shadow: 0 0 20px rgba(0,240,255,0.6);"',
        result
    )
    
    return result

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 convert_embed.py <input.html> <output.html>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    print(f"📖 Lecture de {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"🎨 Conversion au thème dark cyan...")
    dark_content = convert_to_dark_cyan(content)
    
    print(f"💾 Écriture dans {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(dark_content)
    
    size = len(dark_content)
    status = "✅" if size < 50000 else "⚠️ DÉPASSE 50k"
    print(f"{status} {output_file}: {size:,} caractères\n")

if __name__ == '__main__':
    main()
