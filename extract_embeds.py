#!/usr/bin/env python3
import re

with open('HOME_PAR_EMBED.md', 'r') as f:
    content = f.read()

# Extraire EMBED 4
embed4_start = content.find('========== EMBED 4')
embed4_end = content.find('========== EMBED 5')
embed4_section = content[embed4_start:embed4_end]
embed4_match = re.search(r'```html\n(.*?)\n```', embed4_section, re.DOTALL)
if embed4_match:
    with open('EMBED_4_RAW.html', 'w') as f:
        f.write(embed4_match.group(1))
    print("✅ EMBED 4 extrait")

# Extraire EMBED 5
embed5_start = content.find('========== EMBED 5')
embed5_end = content.find('========== EMBED 6', embed5_start)
if embed5_end == -1:
    embed5_end = len(content)
embed5_section = content[embed5_start:embed5_end]
embed5_match = re.search(r'```html\n(.*?)\n```', embed5_section, re.DOTALL)
if embed5_match:
    with open('EMBED_5_RAW.html', 'w') as f:
        f.write(embed5_match.group(1))
    print("✅ EMBED 5 extrait")

# Extraire EMBED 6
embed6_start = content.find('========== EMBED 6')
embed6_end = content.find('========== EMBED 7', embed6_start)
if embed6_end == -1:
    embed6_end = content.find('===', embed6_start + 50)
embed6_section = content[embed6_start:embed6_end]
embed6_match = re.search(r'```html\n(.*?)\n```', embed6_section, re.DOTALL)
if embed6_match:
    with open('EMBED_6_RAW.html', 'w') as f:
        f.write(embed6_match.group(1))
    print("✅ EMBED 6 extrait")

# Extraire EMBED 7
embed7_start = content.find('========== EMBED 7')
if embed7_start > 0:
    embed7_section = content[embed7_start:]
    embed7_match = re.search(r'```html\n(.*?)\n```', embed7_section, re.DOTALL)
    if embed7_match:
        with open('EMBED_7_RAW.html', 'w') as f:
            f.write(embed7_match.group(1))
        print("✅ EMBED 7 extrait")
