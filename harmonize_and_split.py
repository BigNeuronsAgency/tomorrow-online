#!/usr/bin/env python3
"""
- Applique UX/contraste/accessibilité sur toute la home.
- Harmonise : styles partagés dans HEAD, retire doublons des embeds (sans toucher aux URLs ni au contenu).
- Produit HOME_PAR_EMBED.md : index découpé par embed, prêt à copier-coller.
"""
import re

EMBED2_VENN_ONLY = """<style>
.venn-wrapper{position:relative;width:300px;height:300px;margin:0 auto;margin-bottom:3rem}
@media (min-width:768px){.venn-wrapper{width:420px;height:420px}}
.circle{position:absolute;border-radius:50%;width:65%;height:65%;display:flex;flex-direction:column;transition:transform .3s ease;padding:0}
.circle:hover{transform:scale(1.05);z-index:20!important}
.pos-top:hover{transform:translateX(-50%) scale(1.05);z-index:20!important}
.pos-top{top:0;left:50%;transform:translateX(-50%)}
.pos-left{bottom:5%;left:0}
.pos-right{bottom:5%;right:0}
.circle-content{width:100%;height:100%;display:flex;flex-direction:column;text-align:center;padding:20%}
.pos-top .circle-content{justify-content:flex-start;align-items:center;padding-top:25%}
.pos-left .circle-content{justify-content:flex-end;align-items:flex-start;padding-bottom:25%;padding-left:25%;padding-right:0;text-align:left}
.pos-right .circle-content{justify-content:flex-end;align-items:flex-end;padding-bottom:25%;padding-right:25%;padding-left:0;text-align:right}
.main-label{font-family:'Space Grotesk',sans-serif;font-weight:900;text-transform:uppercase;font-size:13px;line-height:1.1}
.style-good{mix-blend-mode:multiply;color:white;opacity:.9;border:none;z-index:5}
.bg-tech{background-color:#000}
.bg-agency{background-color:#000}
.bg-template{background-color:#000}
.center-spot{position:absolute;top:55%;left:50%;transform:translate(-50%,-50%);z-index:50;width:80px;height:80px;display:flex;align-items:center;justify-content:center;font-size:2rem;border-radius:50%}
.center-spot.right-side{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%);box-shadow:0 0 30px rgba(180,7,254,.4);animation:pulse-gradient 2s infinite;font-size:11px;font-weight:900;color:#FFF;line-height:1;letter-spacing:-.5px}
@keyframes pulse-gradient{0%{box-shadow:0 0 0 0 rgba(180,7,254,.7)}70%{box-shadow:0 0 0 15px rgba(180,7,254,0)}100%{box-shadow:0 0 0 0 rgba(180,7,254,0)}}
.manifesto-item{border-left:2px solid #E5E5E5;padding-left:1.5rem;margin-bottom:2rem;position:relative}
.manifesto-item:hover{border-left-color:rgba(180,7,254,1)}
.manifesto-item h3{font-size:1.25rem;font-weight:900;text-transform:uppercase;margin-bottom:.5rem}
.manifesto-item p{font-size:.9rem;color:#666;line-height:1.5;font-family:'Space Grotesk',sans-serif}
.manifesto-number{position:absolute;left:-2.6rem;top:0;font-family:'Space Grotesk',sans-serif;font-weight:bold;color:#E5E5E5}
</style>
"""

def main():
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    # --- 1. UX global : contrastes / accessibilité ---
    html = re.sub(
        r'<p class="font-mono text-xs text-gray-500 uppercase">Pas de zone d\'ombre\.',
        '<p class="font-mono text-xs text-gray-600 uppercase">Pas de zone d\'ombre.',
        html, count=1
    )
    # UX: detail-link, price-badge, dropdown, CTAs, contrastes
    html = html.replace(".detail-link { font-family: 'Space Grotesk', sans-serif; font-size: 10px; color: #999; text-transform: uppercase; cursor: pointer; }", ".detail-link { font-family: 'Space Grotesk', sans-serif; font-size: 12px; color: #525252; text-transform: uppercase; cursor: pointer; min-height: 44px; min-width: 44px; display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 0.75rem; transition: color 0.2s, background 0.2s; }")
    html = html.replace("font-size: 9px; padding: 2px 6px", "font-size: 12px; padding: 3px 8px")
    html = html.replace("justify-content: space-between; items-center; background: white", "justify-content: space-between; align-items: center; background: white")
    html = html.replace("padding: 12px 20px; font-size: 13px; border-bottom", "padding: 12px 20px; font-size: 14px; border-bottom")
    html = html.replace("margin-left: 4px; transition: transform 0.2s; font-size: 10px", "margin-left: 4px; transition: transform 0.2s; font-size: 12px")
    html = html.replace("padding-left: 2rem; font-size: 13px", "padding-left: 2rem; font-size: 14px")
    html = re.sub(r'class="grid grid-cols-2 w-full font-mono text-\[10px\] uppercase', 'class="grid grid-cols-2 w-full font-mono text-xs uppercase', html)
    html = html.replace('cursor-pointer">> Briefez-nous</div>', 'cursor-pointer">Réserver mon créneau</div>')
    html = re.sub(
        r'<div class="flex flex-col md:flex-row gap-4">\s*<div onclick="window\.openModal\(\)" class="btn-primary[^"]*">> Briefez-nous</div>\s*<a onclick="window\.smoothScroll\(\'#work\'\)"[^>]*>\+ de preuves</a>\s*</div>',
        '<div class="flex flex-col md:flex-row gap-4 items-start"><div><div onclick="window.openModal()" class="btn-primary px-8 py-4 font-heading font-bold uppercase tracking-wide text-center">Démarrer mon projet en 24H</div><p class="mt-2 font-mono text-xs text-gray-600 uppercase">Formulaire rapide en 2 min</p></div><a onclick="window.smoothScroll(\'#work\')" class="btn-outline px-8 py-4 font-heading font-bold uppercase tracking-wide text-center">+ de preuves</a></div>',
        html, count=1, flags=re.DOTALL
    )
    for a, b in [('text-gray-400 group-hover:text-[#FF3333]">01 / SQUAD</span>', 'text-gray-600 group-hover:text-[#FF3333]">01 / SQUAD</span>'), ('text-gray-400 group-hover:text-[#FF3333]">02 / STACK</span>', 'text-gray-600 group-hover:text-[#FF3333]">02 / STACK</span>'), ('text-gray-400 group-hover:text-[#FF3333]">03 / PROMISE</span>', 'text-gray-600 group-hover:text-[#FF3333]">03 / PROMISE</span>'), ('text-gray-500 mb-16 uppercase">2 créneaux', 'text-gray-600 mb-16 uppercase">2 créneaux'), ('text-gray-500 group-hover:text-gray-400">Scale, SaaS', 'text-gray-600 group-hover:text-gray-500">Scale, SaaS'), ('font-mono text-xs font-bold text-gray-400 mb-2 uppercase">Étape', 'font-mono text-xs font-bold text-gray-600 mb-2 uppercase">Étape'), ('font-mono text-xs text-gray-400 uppercase">24H chrono', 'font-mono text-xs text-gray-600 uppercase">24H chrono'), ('font-mono text-xs uppercase text-gray-500">Sites livrés', 'font-mono text-xs uppercase text-gray-600">Sites livrés'), ('font-mono text-xs uppercase text-gray-500">Délai moyen', 'font-mono text-xs uppercase text-gray-600">Délai moyen'), ('font-mono text-xs uppercase text-gray-500">Satisfaction', 'font-mono text-xs uppercase text-gray-600">Satisfaction'), ('font-mono text-xs text-gray-500 uppercase">3 slots disponibles', 'font-mono text-xs text-gray-600 uppercase">3 slots disponibles'), ('text-gray-400 italic border-l-2', 'text-gray-600 italic border-l-2')]:
        html = html.replace(a, b)
    html = html.replace('onclick="window.openDetails(\'MAQUETTE\')" class="absolute top-4 right-4 text-[10px] font-mono uppercase text-gray-400 hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>', 'onclick="window.openDetails(\'MAQUETTE\')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>')
    html = html.replace('onclick="window.openDetails(\'STARTER\')" class="absolute top-6 right-28 text-[10px] font-mono uppercase text-white/80 hover:text-white cursor-pointer border-b border-transparent hover:border-white transition-all">Détails [ + ]</div>', 'onclick="window.openDetails(\'STARTER\')" class="detail-link detail-link-on-dark absolute top-2 right-2 md:top-6 md:right-28 font-mono border-b border-transparent hover:border-white transition-all">Détails [ + ]</div>')
    html = html.replace('onclick="window.openDetails(\'BUSINESS\')" class="absolute top-4 right-4 text-[10px] font-mono uppercase text-gray-400 hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>', 'onclick="window.openDetails(\'BUSINESS\')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>')
    html = html.replace('onclick="window.openProcessDetails()" class="hidden md:block text-[10px] font-mono uppercase text-gray-400 hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>', 'onclick="window.openProcessDetails()" class="detail-link hidden md:inline-flex font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>')
    html = html.replace('onclick="window.openProcessDetails()" class="md:hidden mt-6 text-[10px] font-mono uppercase text-gray-400 hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-all inline-block">Détails [ + ]</div>', 'onclick="window.openProcessDetails()" class="detail-link md:hidden mt-6 font-mono border-b border-transparent hover:border-black transition-all inline-flex">Détails [ + ]</div>')
    html = html.replace('border border-gray-300 text-gray-500 w-fit px-3 py-1 mb-8 rounded-full uppercase">Maquette', 'border border-gray-300 text-gray-600 w-fit px-3 py-1 mb-8 rounded-full uppercase">Maquette')
    html = html.replace('border border-gray-300 text-gray-500 w-fit px-3 py-1 mb-8 rounded-full uppercase">Business', 'border border-gray-300 text-gray-600 w-fit px-3 py-1 mb-8 rounded-full uppercase">Business')


    # --- 2. EMBED 1 : retirer le <style>…</style> (doublon HEAD). Cibler uniquement le 1er w-embed (body). ---
    body_start = html.find("<body>")
    if body_start == -1:
        body_start = html.find("<body ")
    search_from = max(0, body_start)
    embed1_start = html.find('<div class="w-embed w-script">', search_from)
    if embed1_start != -1:
        frag = html[embed1_start:]
        p1 = r'(ScrollToPlugin\.min\.js"></script>\s*)(<style>.*?</style>)(\s*<script type="text/javascript" src="https://cdn\.weglot\.com)'
        m1 = re.search(p1, frag, re.DOTALL)
        if m1:
            rep = frag[:m1.start()] + m1.group(1) + m1.group(3) + frag[m1.end():]
            html = html[:embed1_start] + rep

    # --- 3. EMBED 2 : retirer link+script Tailwind, remplacer le gros <style> par venn+manifesto uniquement ---
    # Trouver le 2e w-embed (après processDetailsModal)
    embed2_start = html.find('<div class="w-embed w-script">', html.find('</div>\n  </div>\n</div>\n  <div class="w-embed w-script">'))
    if embed2_start == -1:
        embed2_start = html.find('<div class="w-embed w-script">', html.find('processDetailsModal'))
    # On cherche le bloc qui contient "venn-wrapper" et "#pricing"
    idx = html.find('venn-wrapper')
    if idx != -1:
        start = html.rfind('<div class="w-embed w-script">', 0, idx)
        end_style = html.find('</style>', idx)
        if end_style != -1:
            end_style += len('</style>')
        # Début du 2e embed : link + script + style
        chunk = html[start:end_style]
        # Supprimer link preconnect + script Tailwind
        chunk = re.sub(r'<link rel="preconnect"[^>]*>\s*', '', chunk)
        chunk = re.sub(r'<link rel="preconnect"[^>]*crossorigin[^>]*>\s*', '', chunk)
        chunk = re.sub(r'<link href="https://fonts[^>]*>\s*', '', chunk)
        chunk = re.sub(r'<script src="https://cdn\.tailwindcss\.com"></script>\s*', '', chunk)
        # Remplacer tout le <style>...</style> par venn+manifesto seulement
        style_match = re.search(r'<style>.*?</style>', chunk, re.DOTALL)
        if style_match:
            chunk = chunk[:style_match.start()] + EMBED2_VENN_ONLY.strip() + "\n    " + chunk[style_match.end():]
        html = html[:start] + chunk + html[end_style:]

    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)

    # --- 4. Découper par embed et écrire HOME_PAR_EMBED.md ---
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    sections = []
    pos = 0

    # HEAD : <head>…</head>
    head_m = re.search(r'<head[^>]*>(.*?)</head>', html, re.DOTALL)
    if head_m:
        sections.append(("HEAD (Custom Code Head de la page / site)", head_m.group(0)))

    # Embeds : contenu *intérieur* de chaque <div class="w-embed
    embed_div = re.compile(r'<div class="w-embed w-(?:script|iframe)">(.*?)</div>\s*(?=<div class="w-embed|\s*</body>|$)', re.DOTALL)
    for i, m in enumerate(embed_div.finditer(html)):
        inner = m.group(1).strip()
        names = ["EMBED 1", "EMBED 2", "EMBED 3 (FAQ + Footer + WhatsApp)", "EMBED 4 (Modales)", "EMBED 5 (Form config)", "EMBED 6 (Form UI)"]
        name = names[i] if i < len(names) else f"EMBED {i+1}"
        sections.append((name, inner))

    out = ["# Home Tomorrow.Online — Découpée par embed\n", "Colle chaque bloc ci‑dessous dans l’embed Webflow correspondant. Aucune troncature, URLs inchangées.\n"]
    for name, code in sections:
        out.append(f"\n\n========== {name} ==========\n\n")
        out.append("```html\n")
        out.append(code)
        out.append("\n```\n")

    with open("HOME_PAR_EMBED.md", "w", encoding="utf-8") as f:
        f.write("".join(out))

    print("OK: index.html harmonisé, HOME_PAR_EMBED.md créé.")
    for name, code in sections:
        print(f"  - {name}: {len(code)} car.")

if __name__ == "__main__":
    main()
