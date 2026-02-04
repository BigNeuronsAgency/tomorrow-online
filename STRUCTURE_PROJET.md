# Structure du projet Tomorrow.Online

Ce fichier décrit la différence entre les **anciens fichiers (Webflow)** et les **nouveaux fichiers (Sevalla, GitHub, site statique)**. Ne pas modifier les fichiers du site actuel sans demande explicite.

---

## Nouveau site (Sevalla + GitHub — actif)

**C’est le site en ligne.** Fichiers à utiliser pour le contenu et le déploiement.

| Élément | Rôle |
|--------|------|
| **Pages HTML à la racine** | Pages du site : `index.html`, `notre-histoire.html`, `process-24h.html`, `realisations.html`, `la-vision-tomorrow.html`, `migrations.html`, `comparatif-solutions-web.html`, `mentions-legales.html`, `success.html`, `404.html`, `site-vitrine-pme.html`, `landing-page-haute-conversion.html`, `creation-sites-internet-24h.html`, etc. |
| **`css/`** | Feuilles de style du site statique |
| **`js/`** | Scripts du site statique |
| **`images/`** | Images et assets |
| **`migrations/`** | Sous-pages migrations (wordpress, wix, shopify, etc.) |
| **`netlify/`** | Config / scripts de déploiement Netlify |
| **`stripe-worker/`** | Worker Stripe (Cloudflare) |
| **`robots.txt`** | Règles pour les robots |
| **`sitemap.xml`** | Plan du site |
| **`AGENTS.md`** | Règles pour l’IA / le projet |
| **`DIFFERENCES_AVANT_APRES.md`**, **`LECONS_APPRISES_VERDENT.md`** | Docs de migration |

---

## Ancien site (Webflow — archive / référence)

**Ne pas utiliser pour le site en production.** Conservé pour historique et référence.

| Élément | Rôle |
|--------|------|
| **`_archive-webflow/`** | Ancien site, backups, anciens embeds, `HOME_PAR_EMBED.md`, etc. |
| **`embeds/`** | Workflow Webflow par embeds : `embed-1-A-COLLER.html`, `embed-*-current.html`, scripts `apply_embed*.py`, etc. |
| **Fichiers `EMBED_*`** | Ex. `EMBED_1_DARK_FINAL.html`, `EMBED_6_RAW.html`, etc. |
| **Dossiers `EMBEDS_*`** | Ex. `EMBEDS_FINAL/`, `EMBEDS_DARK_CYAN_FINAL/` |
| **`EMBEDS_MAP.md`** | Carte des embeds Webflow |
| **`HEAD_CODE_FUSIONNE.html`** | Ancien head Webflow |
| **Fichiers `*-webflow-backup*.html`** | Backups de pages Webflow |
| **Scripts** | `harmonize_and_split.py`, `rebuild-pages.py`, `convert_to_dark.py` (workflow Webflow / conversion) |

---

## Règle

- **Modifier / déployer** : uniquement les fichiers listés dans « Nouveau site (Sevalla + GitHub) ».
- **Ne pas toucher** au contenu du site actuel sans demande explicite.
- **Consulter** `_archive-webflow/` et `embeds/` seulement pour référence ou restauration d’ancien contenu.
