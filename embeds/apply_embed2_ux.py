#!/usr/bin/env python3
"""Apply UX patches to EMBED 2 content. Reads from stdin, writes to stdout."""
import sys
import re

def main():
    data = sys.stdin.read()

    # .detail-link + variant (if not already patched)
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

    # .price-badge
    data = data.replace(
        "font-size:9px;padding:2px 6px",
        "font-size:12px;padding:3px 8px",
    )

    # .feature-card
    data = data.replace(
        "justify-content:space-between;items-center;background:white",
        "justify-content:space-between;align-items:center;background:white",
    )

    # "2 créneaux"
    data = data.replace(
        'text-gray-500 mb-16 uppercase">2 créneaux',
        'text-gray-600 mb-16 uppercase">2 créneaux',
    )

    # Détails [ + ] (#pricing + #pricing-bottom)
    data = re.sub(
        r'<div onclick="window\.openDetails\(\'MAQUETTE\'\)" class="absolute top-4 right-4 text-\[10px\] font-mono uppercase text-gray-400 hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-all">Détails \[ \+ \]</div>',
        '<div onclick="window.openDetails(\'MAQUETTE\')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>',
        data,
    )
    data = re.sub(
        r'<div onclick="window\.openDetails\(\'STARTER\'\)" class="absolute top-6 right-28 text-\[10px\] font-mono uppercase text-white/80 hover:text-white cursor-pointer border-b border-transparent hover:border-white transition-all">Détails \[ \+ \]</div>',
        '<div onclick="window.openDetails(\'STARTER\')" class="detail-link detail-link-on-dark absolute top-2 right-2 md:top-6 md:right-28 font-mono border-b border-transparent hover:border-white transition-all">Détails [ + ]</div>',
        data,
    )
    data = re.sub(
        r'<div onclick="window\.openDetails\(\'BUSINESS\'\)" class="absolute top-4 right-4 text-\[10px\] font-mono uppercase text-gray-400 hover:text-black cursor-pointer border-b border-transparent hover:border-black transition-all">Détails \[ \+ \]</div>',
        '<div onclick="window.openDetails(\'BUSINESS\')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>',
        data,
    )

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
    data = data.replace(
        'class="absolute top-6 right-6 bg-white text-[#FF3333] text-[10px] font-bold px-2 py-1 uppercase">Populaire</div>',
        'class="absolute top-6 right-6 bg-white text-[#FF3333] text-xs font-bold px-2 py-1 uppercase">Populaire</div>',
    )
    data = data.replace(
        'class="text-xs text-gray-500 group-hover:text-gray-400">Scale, SaaS, E-commerce</p>',
        'class="text-xs text-gray-600 group-hover:text-gray-500">Scale, SaaS, E-commerce</p>',
    )

    # Jean-Charles "Slots disponibles demain"
    data = data.replace(
        'class="mt-6 font-mono text-xs text-gray-500 uppercase">Slots disponibles demain</p>',
        'class="mt-6 font-mono text-xs text-gray-600 uppercase">Slots disponibles demain</p>',
    )

    # 3 Mondes "La vision"
    data = data.replace(
        'class="text-sm font-mono text-gray-400 uppercase">La vision tomorrow.online</p>',
        'class="text-sm font-mono text-gray-600 uppercase">La vision tomorrow.online</p>',
    )

    sys.stdout.write(data)

if __name__ == "__main__":
    main()
