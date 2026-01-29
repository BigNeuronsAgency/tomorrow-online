# Embeds Tomorrow.Online

## Workflow pour mettre à jour un embed

**Tu ne touches pas aux scripts.** On te donne l’embed prêt à coller.

1. Ouvre **`embed-1-final.html`** (ou le fichier d’embed fourni).
2. **Sélectionne tout** (Cmd+A ou Ctrl+A), **copie**.
3. Dans Webflow : éditeur → ton **EMBED 1** → supprime l’ancien code → **colle** le nouveau.
4. Enregistre. Vérifie que l’embed fait **&lt; 50 000 caractères** (celui-ci ~49 700).

## Fichiers

- **`embed-1-final.html`** : **EMBED 1 prêt à coller** dans Webflow (**~49 750** caractères, &lt; 50k). Logo en CDN ; photos équipe en `images/`. Si ton projet utilise le CDN Webflow pour les assets, remplace `images/PPTIMTOMORROW.jpeg` etc. par tes URLs après collage.
- `embed-1-from-index.html` : Extraction brute depuis `index.html` (pour référence).
- `apply_embed1_ux.py` : Script des patches UX (utilisé en interne pour générer l’embed).

**EMBED 2** : Si tu veux la même chose pour l’embed 2, dis-le et on te préparera un `embed-2-final.html` à coller.

## Map des embeds

Voir **`EMBEDS_MAP.md`** à la racine du projet.
