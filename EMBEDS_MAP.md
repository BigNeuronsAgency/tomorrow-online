# Carte des embeds — Tomorrow.Online

**Règle :** max **50 000 caractères** par embed. Si on s’approche de la limite, envisager de découper (nouveaux embeds).

---

## Vue d’ensemble

| Embed | Contenu principal | ~Caractères | Page(s) |
|-------|-------------------|-------------|---------|
| **EMBED 1** | Head (Tailwind, GSAP) + styles globaux + top bar, nav, hero, marquee, manifesto, pricing-top, process, squad, work, modal process | **~49,7k** | Home |
| **EMBED 2** | Styles (venn, manifesto-item…) + `#pricing`, Jean-Charles, 3 Mondes, `#pricing-bottom` | ~35–40k | Home |
| **EMBED 3** | FAQ + script toggle + CTA WhatsApp | ~8k | Home |
| **EMBED 4** | Lightbox, modal Détails, modal Booking | ~3k | Home |
| **EMBED 5** | Styles formulaire + script (PACKS, UPSELLS, openDetails, draw…) | ~15–20k | Home |
| **EMBED 6** | Styles responsive form + `getStepContent`, `draw`, `openModal`, `closeModal`, submit… | ~25–30k | Home |
| **EMBED 7** | SEO hidden content + Schema JSON-LD | ~8k | Home |
| **HEAD (inside)** | Variables, base, buttons, overrides #FF3333 | ~4k | Global |
| **HEAD CODE** | Critical CSS, loader, preload, GTM, Schema | ~5k | Global |
| **FOOTER CODE** | Loader script, correctif dégradé, footer HTML | ~4k | Global |

---

## Détail par embed

### EMBED 1
- **Rôle :** Bloc principal de la home (above the fold → work + process modal).
- **Contient :**
  - `<link>` Tailwind, GSAP (ScrollTrigger, ScrollToPlugin).
  - `<style>` : `:root`, layout, `.btn-primary`, `.detail-link`, `.price-badge`, dropdown, mobile-menu, feature-card, overrides #FF3333, etc.
  - HTML : tech-grid, top bar (« Slots disponibles »), nav, mobile menu, header (titre, garantie, CTA), 3 colonnes (01/02/03), marquee, `#manifesto`, `#pricing-top` (3 offres + Projet complexe), `#process` (4 étapes + CTA), `#squad` (slider équipe), `#work` (stats, cartes, CTA), `#processDetailsModal`.
- **UX modifs (27/01) :**
  - `.detail-link` : 12px, #525252, zone tactile 44×44px (48px mobile), `.detail-link-on-dark` pour carte Starter.
  - `.price-badge` : 12px, padding 3px 8px.
  - `.feature-card` : `align-items: center` (remplace `items-center`).
  - Dropdown : liens 14px, flèche 12px.
  - Top bar : `text-xs`.
  - Nav CTA : « > Briefez-nous » → « Réserver mon créneau ».
  - Hero : « > Briefez-nous » → « Démarrer mon projet en 24H » + micro-copie « Formulaire rapide en 2 min ».
  - Labels 01/02/03, manifesto italic, « 2 créneaux », badges offres, HT, « Projet complexe », étapes process, « 24H chrono », stats work, « Détails [ + ] », etc. : contraste gris (gray-600, etc.) et tailles min 12px.
- **Réduction 50k (27/01) :** Styles `.lang-switch-container` / `.lang-link` / `.lang-sep` retirés de l’embed (déjà dans HEAD). Indentation supprimée. **~49 700 caractères.**

### EMBED 2
- **Rôle :** Sections du milieu de home + styles Venn / manifesto.
- **Contient :**
  - `<style>` : doublons partiels + `.venn-wrapper`, `.circle`, `.manifesto-item`, etc.
  - `#pricing` (3 offres + Projet complexe), `#jean-charles`, `#trois-mondes`, `#pricing-bottom`.
- **UX modifs :** Aligné avec EMBED 1 sur blocs pricing (Détails [ + ], badges, HT, Projet complexe, etc.).

### EMBED 3
- **Rôle :** FAQ (accordéons) + CTA WhatsApp fixe.
- **Contient :** `#faq`, script `toggleFaq`, lien WhatsApp.
- **Modifs :** Aucune UX spécifique pour l’instant.

### EMBED 4
- **Rôle :** Modales (lightbox, détails pack, booking).
- **Contient :** `#lightboxModal`, `#detailsModal`, `#bookingModal` (+ `#modalContent`).
- **Modifs :** Aucune UX spécifique pour l’instant.

### EMBED 5
- **Rôle :** Config et logique du formulaire de brief.
- **Contient :** Styles `#modalContent`, tooltip, upsell, etc. + `PACKS`, `UPSELLS`, `DETAILS_DATA`, `openDetails`, `closeDetails`, `openProcessDetails`, `calculateTotals`, `renderHeader`, etc.
- **Modifs :** Aucune pour l’instant (hors si on touche au form plus tard).

### EMBED 6
- **Rôle :** Rendu des étapes du formulaire + navigation.
- **Contient :** Styles responsive form, `getStepContent`, `renderUpsellCard`, `draw`, `openModal`, `closeModal`, `submitForm`, etc.
- **Modifs :** Aucune pour l’instant.

### EMBED 7 (SEO)
- **Rôle :** Contenu caché pour SEO + Schema JSON-LD.
- **Contient :** `<div>` caché (titres, listes, keywords) + `FAQPage`, `Organization`, etc.
- **Modifs :** Aucune.

### HEAD (inside `<head>`)
- **Rôle :** Styles de base (variables, body, buttons, overrides).
- **Modifs :** Si on centralise `.detail-link` / `.price-badge` ici, les garder alignés avec EMBED 1.

### HEAD CODE (général)
- **Rôle :** Critical CSS, loader, preload, GTM, Schema.
- **Modifs :** Aucune.

### FOOTER CODE
- **Rôle :** Script loader, correctif dégradé, footer (liens, copyright).
- **Modifs :** Aucune.

---

## Historique des mises à jour

| Date | Embed(s) | Modifs |
|------|----------|--------|
| 2025-01-27 | 1, 2 | Retours UX : tailles min 12/14px, contraste gris, Détails [ + ] tactiles, CTA « Démarrer mon projet en 24H » + micro-copie, dropdown 14px. Map créée. |
| 2025-01-27 | 1 | Embed 1 prêt à coller : extrait de `index.html`, patches UX, suppression lang-switch (doublon HEAD), &lt; 50k. Fichier : `embeds/embed-1-final.html`. |
| 2025-01-27 | * | **Refonte workflow** : UX sur toute la home, harmonisation (styles dans HEAD, doublons retirés des embeds). `harmonize_and_split.py` → `HOME_PAR_EMBED.md` (index découpé par embed). Tu copies-colles chaque bloc, pas de scripts à lancer. EMBED 1 ~41k. |

---

## Découpage si > 50k

Si **EMBED 1** dépasse 50k après ajouts :
- **Option A :** Extraire `#squad` + `#work` dans un **EMBED 1b**.
- **Option B :** Extraire le `<style>` dans un embed dédié (ou HEAD) et ne garder que le HTML dans EMBED 1.

---

## Workflow actuel : `harmonize_and_split.py` + `HOME_PAR_EMBED.md`

1. **`harmonize_and_split.py`** : Applique UX/contraste/accessibilité sur toute la home, harmonise les styles (HEAD = source unique, doublons retirés des embeds), régénère `index.html` et **`HOME_PAR_EMBED.md`**.
2. **`HOME_PAR_EMBED.md`** : Contient l’index **découpé par embed** (HEAD, EMBED 1…5). Tu copies chaque bloc et tu le colles dans l’embed Webflow correspondant. **Aucune troncature, URLs inchangées.**
3. Commande : `python3 harmonize_and_split.py` (à la racine du projet).
