#!/usr/bin/env python3
"""Apply UX patches to EMBED 1 content. Reads from stdin, writes to stdout."""
import sys
import re

def main():
    data = sys.stdin.read()

    # 1. .detail-link + variant
    data = re.sub(
        r"\.detail-link\{font-family:'Spacegrotesk',sans-serif;font-size:10px;color:#999;text-transform:uppercase;cursor:pointer\}\s*\.detail-link:hover\{[^}]+\}",
        """.detail-link{font-family:'Spacegrotesk',sans-serif;font-size:12px;color:#525252;text-transform:uppercase;cursor:pointer;min-height:44px;min-width:44px;display:inline-flex;align-items:center;justify-content:center;padding:.5rem .75rem;transition:color .2s,background .2s}
.detail-link:hover{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-decoration:underline}
@media (max-width:767px){.detail-link{font-size:14px;padding:.75rem 1rem;min-height:48px;min-width:48px}}
.detail-link-on-dark{color:rgba(255,255,255,.9)}
.detail-link-on-dark:hover{color:#fff;background:none!important;-webkit-background-clip:unset;background-clip:unset;-webkit-text-fill-color:inherit;text-decoration:underline}""",
        data,
        count=1,
    )

    # 2. .price-badge
    data = data.replace(
        "font-size:9px;padding:2px 6px",
        "font-size:12px;padding:3px 8px",
    )

    # 3. .feature-card items-center -> align-items
    data = data.replace(
        "justify-content:space-between;items-center;background:white",
        "justify-content:space-between;align-items:center;background:white",
    )

    # 4. .dropdown-content a 13px -> 14px
    data = data.replace(
        "padding:12px 20px;font-size:13px;border-bottom",
        "padding:12px 20px;font-size:14px;border-bottom",
    )

    # 5. .dropdown-arrow 10px -> 12px
    data = data.replace(
        "margin-left:4px;transition:transform 0.2s;font-size:10px",
        "margin-left:4px;transition:transform 0.2s;font-size:12px",
    )

    # 6. .mobile-menu .dropdown-content a 13px -> 14px
    data = data.replace(
        "padding-left:2rem;font-size:13px",
        "padding-left:2rem;font-size:14px",
    )

    # 7. Top bar text-[10px] -> text-xs
    data = data.replace(
        'class="grid grid-cols-2 w-full font-mono text-[10px] uppercase',
        'class="grid grid-cols-2 w-full font-mono text-xs uppercase',
    )

    # 8. Nav CTA (specific: nav has cursor-pointer + px-6 md:px-12)
    data = data.replace(
        'cursor-pointer">> Briefez-nous</div>',
        'cursor-pointer">Réserver mon créneau</div>',
    )

    # 9. Hero CTA + micro-copy
    old_hero = """<div class="flex flex-col md:flex-row gap-4">
<div onclick="window.openModal()" class="btn-primary px-8 py-4 font-heading font-bold uppercase tracking-wide text-center">> Briefez-nous</div>
</div>"""
    new_hero = """<div class="flex flex-col md:flex-row gap-4 items-start">
<div>
<div onclick="window.openModal()" class="btn-primary px-8 py-4 font-heading font-bold uppercase tracking-wide text-center">Démarrer mon projet en 24H</div>
<p class="mt-2 font-mono text-xs text-gray-600 uppercase">Formulaire rapide en 2 min</p>
</div>
</div>"""
    data = data.replace(old_hero, new_hero)

    # 10. 01/02/03 gray-400 -> gray-600
    data = data.replace(
        'text-gray-400 group-hover:text-[#FF3333]">01 / SQUAD</span>',
        'text-gray-600 group-hover:text-[#FF3333]">01 / SQUAD</span>',
    )
    data = data.replace(
        'text-gray-400 group-hover:text-[#FF3333]">02 / STACK</span>',
        'text-gray-600 group-hover:text-[#FF3333]">02 / STACK</span>',
    )
    data = data.replace(
        'text-gray-400 group-hover:text-[#FF3333]">03 / PROMISE</span>',
        'text-gray-600 group-hover:text-[#FF3333]">03 / PROMISE</span>',
    )

    # 11. Manifesto italic
    data = re.sub(
        r'<p class="text-gray-400 italic border-l-2 border-gray-200 pl-4">Mais les avancées tech\' et les exigences',
        '<p class="text-gray-600 italic border-l-2 border-gray-200 pl-4">Mais les avancées tech\' et les exigences',
        data,
    )

    # 12. "2 créneaux"
    data = data.replace(
        'text-gray-500 mb-16 uppercase">2 créneaux',
        'text-gray-600 mb-16 uppercase">2 créneaux',
    )

    # 13. Détails [ + ] MAQUETTE
    data = re.sub(
        r'<div onclick="window\.openDetails\(\'MAQUETTE\'\)" class="absolute top-4 right-4 text-\[10px\] font-mono uppercase text-gray-400 hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-all">Détails \[ \+ \]</div>',
        '<div onclick="window.openDetails(\'MAQUETTE\')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>',
        data,
    )

    # 14. Détails [ + ] STARTER
    data = re.sub(
        r'<div onclick="window\.openDetails\(\'STARTER\'\)" class="absolute top-6 right-28 text-\[10px\] font-mono uppercase text-white/80 hover:text-white cursor-pointer border-b border-transparent hover:border-white transition-all">Détails \[ \+ \]</div>',
        '<div onclick="window.openDetails(\'STARTER\')" class="detail-link detail-link-on-dark absolute top-2 right-2 md:top-6 md:right-28 font-mono border-b border-transparent hover:border-white transition-all">Détails [ + ]</div>',
        data,
    )

    # 15. Détails [ + ] BUSINESS
    data = re.sub(
        r'<div onclick="window\.openDetails\(\'BUSINESS\'\)" class="absolute top-4 right-4 text-\[10px\] font-mono uppercase text-gray-400 hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-all">Détails \[ \+ \]</div>',
        '<div onclick="window.openDetails(\'BUSINESS\')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>',
        data,
    )

    # 16. Badges Maquette/Business
    data = data.replace(
        'class="font-mono text-[10px] border border-gray-300 text-gray-500 w-fit px-3 py-1 mb-8 rounded-full uppercase">Maquette</div>',
        'class="font-mono text-xs border border-gray-300 text-gray-600 w-fit px-3 py-1 mb-8 rounded-full uppercase">Maquette</div>',
    )
    data = data.replace(
        'class="font-mono text-[10px] border border-gray-300 text-gray-500 w-fit px-3 py-1 mb-8 rounded-full uppercase">Business</div>',
        'class="font-mono text-xs border border-gray-300 text-gray-600 w-fit px-3 py-1 mb-8 rounded-full uppercase">Business</div>',
    )
    data = data.replace(
        'class="font-mono text-[10px] bg-white text-[#FF3333] w-fit px-3 py-1 mb-8 rounded-full uppercase">Starter</div>',
        'class="font-mono text-xs bg-white text-[#FF3333] w-fit px-3 py-1 mb-8 rounded-full uppercase">Starter</div>',
    )

    # 17. HT
    data = data.replace(
        '900€ <span class="text-sm text-gray-400 font-normal">HT</span>',
        '900€ <span class="text-sm text-gray-600 font-normal">HT</span>',
    )
    data = data.replace(
        '2200€ <span class="text-sm text-gray-400 font-normal">HT</span>',
        '2200€ <span class="text-sm text-gray-600 font-normal">HT</span>',
    )
    data = data.replace(
        '<span class="text-sm text-white/60 font-normal">HT</span>',
        '<span class="text-sm text-white/80 font-normal">HT</span>',
    )

    # 18. Populaire
    data = data.replace(
        'class="absolute top-6 right-6 bg-white text-[#FF3333] text-[10px] font-bold px-2 py-1 uppercase">Populaire</div>',
        'class="absolute top-6 right-6 bg-white text-[#FF3333] text-xs font-bold px-2 py-1 uppercase">Populaire</div>',
    )

    # 19. Projet complexe
    data = data.replace(
        'class="text-xs text-gray-500 group-hover:text-gray-400">Scale, SaaS, E-commerce</p>',
        'class="text-xs text-gray-600 group-hover:text-gray-500">Scale, SaaS, E-commerce</p>',
    )

    # 20. Process Détails desktop + mobile
    data = data.replace(
        'class="hidden md:block text-[10px] font-mono uppercase text-gray-400 hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>',
        'class="detail-link hidden md:inline-flex font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>',
    )
    data = data.replace(
        'class="md:hidden mt-6 text-[10px] font-mono uppercase text-gray-400 hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-all inline-block">Détails [ + ]</div>',
        'class="detail-link md:hidden mt-6 font-mono border-b border-transparent hover:border-black transition-all inline-flex">Détails [ + ]</div>',
    )

    # 21. Étape 1–4
    for i in range(1, 5):
        data = data.replace(
            f'class="font-mono text-xs font-bold text-gray-400 mb-2 uppercase">Étape {i}</div>',
            f'class="font-mono text-xs font-bold text-gray-600 mb-2 uppercase">Étape {i}</div>',
        )

    # 22. 24H chrono
    data = data.replace(
        'class="mt-6 font-mono text-xs text-gray-400 uppercase">24H chrono • Qualité garantie</p>',
        'class="mt-6 font-mono text-xs text-gray-600 uppercase">24H chrono • Qualité garantie</p>',
    )

    # 23. Squad STRATÉGIE etc.
    for label in ["STRATÉGIE", "COPYWRITING", "UX DESIGN", "ART & ASSETS", "PILOTAGE", "STACK IA"]:
        data = data.replace(
            f'class="font-mono text-xs text-gray-400 mb-6">{label}</div>',
            f'class="font-mono text-xs text-gray-600 mb-6">{label}</div>',
        )

    # 24. Work stats
    data = data.replace(
        'class="font-mono text-xs uppercase text-gray-500">Sites livrés</div>',
        'class="font-mono text-xs uppercase text-gray-600">Sites livrés</div>',
    )
    data = data.replace(
        'class="font-mono text-xs uppercase text-gray-500">Délai moyen</div>',
        'class="font-mono text-xs uppercase text-gray-600">Délai moyen</div>',
    )
    data = data.replace(
        'class="font-mono text-xs uppercase text-gray-500">Satisfaction</div>',
        'class="font-mono text-xs uppercase text-gray-600">Satisfaction</div>',
    )

    # 25. Work cards
    data = data.replace(
        'class="font-mono text-xs text-gray-400 uppercase">Leader amélioration énergétique</p>',
        'class="font-mono text-xs text-gray-600 uppercase">Leader amélioration énergétique</p>',
    )
    data = data.replace(
        'class="font-mono text-[10px] text-gray-400 uppercase">Académie football</p>',
        'class="font-mono text-xs text-gray-600 uppercase">Académie football</p>',
    )
    data = data.replace(
        'class="font-mono text-[10px] text-gray-400 uppercase">Retail B2C</p>',
        'class="font-mono text-xs text-gray-600 uppercase">Retail B2C</p>',
    )
    data = data.replace(
        'class="font-mono text-xs text-gray-400 uppercase">Restaurant gastronomique</p>',
        'class="font-mono text-xs text-gray-600 uppercase">Restaurant gastronomique</p>',
    )
    data = data.replace(
        'class="bg-black text-white px-3 py-1 font-mono text-[10px] font-bold uppercase whitespace-nowrap">43H 12MIN</div>',
        'class="bg-black text-white px-3 py-1 font-mono text-xs font-bold uppercase whitespace-nowrap">43H 12MIN</div>',
    )
    data = data.replace(
        'class="bg-black text-white px-2 py-1 font-mono text-[9px] font-bold uppercase">23H 30M</div>',
        'class="bg-black text-white px-2 py-1 font-mono text-xs font-bold uppercase">23H 30M</div>',
    )
    data = data.replace(
        'class="bg-black text-white px-2 py-1 font-mono text-[9px] font-bold uppercase">22H 00M</div>',
        'class="bg-black text-white px-2 py-1 font-mono text-xs font-bold uppercase">22H 00M</div>',
    )
    data = data.replace(
        'class="bg-black text-white px-3 py-1 font-mono text-[10px] font-bold uppercase">35H 48MIN</div>',
        'class="bg-black text-white px-3 py-1 font-mono text-xs font-bold uppercase">35H 48MIN</div>',
    )
    data = data.replace(
        'class="text-xs text-gray-500">CMO, PPF</div>',
        'class="text-xs text-gray-600">CMO, PPF</div>',
    )
    data = data.replace(
        'class="text-xs text-gray-500">Chef & Propriétaire</div>',
        'class="text-xs text-gray-600">Chef & Propriétaire</div>',
    )
    data = data.replace(
        'class="font-mono text-xs text-gray-400 uppercase mb-4">Ils nous font confiance</div>',
        'class="font-mono text-xs text-gray-600 uppercase mb-4">Ils nous font confiance</div>',
    )
    data = data.replace(
        'class="mt-6 font-mono text-xs text-gray-500 uppercase">3 slots disponibles par jour • Paiement après validation du brief</p>',
        'class="mt-6 font-mono text-xs text-gray-600 uppercase">3 slots disponibles par jour • Paiement après validation du brief</p>',
    )
    data = data.replace(
        'class="px-2 py-1 bg-gray-100 text-[10px] font-mono uppercase">Sport</span>',
        'class="px-2 py-1 bg-gray-100 text-xs font-mono uppercase">Sport</span>',
    )
    data = data.replace(
        'class="px-2 py-1 bg-gray-100 text-[10px] font-mono uppercase">B2C</span>',
        'class="px-2 py-1 bg-gray-100 text-xs font-mono uppercase">B2C</span>',
    )
    data = data.replace(
        'class="px-2 py-1 bg-gray-100 text-[10px] font-mono uppercase">SaaS</span>',
        'class="px-2 py-1 bg-gray-100 text-xs font-mono uppercase">SaaS</span>',
    )
    data = data.replace(
        'class="px-2 py-1 bg-gray-100 text-[10px] font-mono uppercase">Startup</span>',
        'class="px-2 py-1 bg-gray-100 text-xs font-mono uppercase">Startup</span>',
    )

    # 26. Process modal 14:00
    data = data.replace(
        'class="font-bold text-gray-400">14:00</span>',
        'class="font-bold text-gray-500">14:00</span>',
    )

    sys.stdout.write(data)

if __name__ == "__main__":
    main()
