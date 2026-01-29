# LEÇONS APPRISES - REFONTE PAGES SECONDAIRES

## DATE
2026-01-29

## CONTEXTE
Refonte de 7 pages secondaires du site Tomorrow.Online : appliquer le design de la home statique (index.html) tout en conservant 100% du copy et de la structure Webflow.

---

## ❌ MES ERREURS

### 1. J'ai paniqué et utilisé des scripts aveugles
- **Erreur** : J'ai créé des scripts Python avec regex pour remplacer header/footer sans vérifier si ça marchait
- **Conséquence** : 20 commits inutiles, pages cassées, temps perdu
- **Pourquoi** : Je n'ai pas pris le temps de comprendre la structure HTML Webflow avant d'agir

### 2. J'ai push sans tester localement
- **Erreur** : J'ai commit/push en me disant "le script dit ✅ donc c'est bon"
- **Conséquence** : Le cache/deploy montre des pages cassées en prod
- **Pourquoi** : Je n'ai pas ouvert les fichiers générés dans un navigateur local pour vérifier

### 3. J'ai lu seulement 20% du contenu Webflow
- **Erreur** : J'ai fait des `grep` ciblés sur "manifesto" et j'ai cru que c'était tout
- **Conséquence** : Page avec 80% du contenu manquant (schémas Venn, sections comparatives, etc.)
- **Pourquoi** : J'ai voulu aller trop vite au lieu de lire le fichier ligne par ligne

### 4. J'ai tenté des "fixes rapides" au lieu de refaire proprement
- **Erreur** : À chaque problème, j'ai essayé un nouveau sed/regex/script au lieu de repartir de zéro
- **Conséquence** : Accumulation de bugs, code sale, confusion totale
- **Pourquoi** : J'avais peur de "perdre du temps" en recommençant from scratch

### 5. J'ai modifié le mauvais répertoire (tomorrow-site/ au lieu de la racine)
- **Erreur** : J'ai passé 30 min à corriger `tomorrow-site/la-vision-tomorrow.html` alors que Sevalla déploie depuis la RACINE
- **Conséquence** : 6 commits inutiles, badges non visibles en prod, 100$ de tokens gaspillés
- **Pourquoi** : Je n'ai pas vérifié quel répertoire Sevalla déploie AVANT de commencer à coder
- **Coût** : ~100 USD de tokens pour l'utilisateur + 1h de temps perdu
- **Leçon** : TOUJOURS vérifier l'architecture de deploy AVANT de toucher au code

### 6. J'ai écrasé index.html en prod avec une mauvaise version (CRITIQUE)
- **Erreur** : En modifiant la-vision-tomorrow.html, j'ai accidentellement écrasé index.html avec une version Webflow cassée (ancien formulaire, home pétée)
- **Conséquence** : DESTRUCTION du travail de 3h sur la home + formulaire parfaitement fonctionnel, perte de tous les fix (cursor, emails, upload, step 7, etc.)
- **Pourquoi** : Je n'ai pas vérifié quels fichiers j'ai modifié avant de commit/push, j'ai fait `git add .` ou `git add -A` sans regarder
- **Coût** : Perte de 3h de travail validé + stress utilisateur + confiance perdue
- **Leçon** : **TOUJOURS** faire `git status` et `git diff` AVANT `git add`, **JAMAIS** faire `git add .` ou `git add -A` sans vérifier la liste exacte des fichiers modifiés
- **Correction** : Restauré index.html depuis commit f996463 (dernier état fonctionnel)

---

## ✅ LA BONNE MÉTHODE (GRAVÉE DANS LE MARBRE)

### CONSIGNE FINALE
**Refondre les pages secondaires avec :**
1. **COPY et STRUCTURE** : 100% identiques à Webflow (textes, titres, sections, hiérarchie, images, schémas)
2. **DESIGN SYSTEM** : 100% identique à `tomorrow-site/index.html` (fond noir, logo TO-logo.webp blanc, nav dropdown, footer 4 colonnes, bouton orange CTA, gradient orange-rouge, cursor custom, animations GSAP)

**MENU** (header) :
- Fond NOIR
- Logo TO-logo.webp BLANC (en haut à gauche)
- Navigation horizontale : "Process", "Réalisations", "Ressources ▼" (dropdown)
- Dropdown "Ressources" avec : 🔮 Notre Vision, 🏢 Qui sommes-nous, ⚡ Comparatif Solutions, 🔄 Migrations CMS
- Bouton CTA ORANGE "Réserver mon créneau" (à droite)
- Mobile : hamburger menu
- **PAS de bandeau "SLOTS DISPONIBLES DEMAIN"**
- **PAS de logo baseline rose/magenta Webflow**

**FOOTER** :
- Fond NOIR
- **4 COLONNES** :
  1. Brand (logo TO-logo.webp + tagline)
  2. Services (Process 24H, Réalisations, Comparatif, Migrations)
  3. À Propos (La Vision, Notre Histoire)
  4. Réseau & Contact (Groupe Big Neurons, Mentions Légales, Contact Ops)
- Bouton vidéo "Comment on voit les acheteurs de templates"
- Copyright 2026 + "SYSTEM STATUS: OPERATIONAL"
- **PAS le footer compact Webflow avec 2 colonnes**

---

## 🔥 MÉTHODE À APPLIQUER POUR CHAQUE PAGE (NON NÉGOCIABLE)

### ÉTAPE 1 : LECTURE COMPLÈTE DU FICHIER WEBFLOW (30 min MAX)
```bash
# 1. Extraire la version Webflow complète depuis commit d217869
git show d217869:tomorrow-site/[PAGE].html > /tmp/[PAGE]-webflow.html

# 2. Compter les lignes pour avoir une idée de la taille
wc -l /tmp/[PAGE]-webflow.html

# 3. Lire TOUT le fichier par blocs de 100 lignes
file_read /tmp/[PAGE]-webflow.html offset=1 limit=100
file_read /tmp/[PAGE]-webflow.html offset=101 limit=100
# ... jusqu'à la fin

# 4. Prendre des notes dans un fichier texte :
# - Liste de TOUTES les sections (hero, schémas, tableaux, listes, CTA, etc.)
# - Liste de TOUS les titres/sous-titres
# - Liste de TOUTES les images/SVG/schémas
# - Hiérarchie de la page (ordre des sections)
```

**CHECKPOINT 1** : Avant de passer à l'étape 2, je dois avoir un fichier texte avec :
- Toutes les sections identifiées
- Tous les textes extraits
- Toutes les images/schémas listés
- La structure complète de la page

### ÉTAPE 2 : CRÉATION DU NOUVEAU HTML (1h MAX)

**RÈGLES ABSOLUES** :
1. Créer le fichier **À LA RACINE** du repo (`/Users/secondmac/Downloads/TOMORROW ONLINE/`)
2. **OBLIGATOIRE** : Inclure les 3 CSS dans cet ordre :
   ```html
   <link rel="stylesheet" href="css/design-system.css">
   <link rel="stylesheet" href="css/home.css">  <!-- NE JAMAIS OUBLIER -->
   <link rel="stylesheet" href="css/formulaire.css">
   ```
3. Copier header/footer EXACTEMENT depuis `index.html` (racine, pas tomorrow-site/)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Copier le <head> EXACT de index.html -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[TITRE DE LA PAGE]</title>
  <meta name="description" content="[DESCRIPTION]">
  
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/webclip.png">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="css/design-system.css">
  <link rel="stylesheet" href="css/home.css">
  <link rel="stylesheet" href="css/formulaire.css">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
  <script src="https://unpkg.com/lenis@1.0.19/dist/lenis.min.js"></script>
</head>
<body>
  
  <div class="custom-cursor" id="cursor"></div>
  <div class="bg-grid-fixed"></div>
  
  <!-- Copier HEADER EXACT de index.html lignes 40-90 -->
  <header class="header">
    <!-- NAV COMPLÈTE -->
  </header>
  
  <!-- HERO adapté au contenu de la page -->
  <section class="hero section">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title hero-load">
          [TITRE]<br>
          <span class="text-gradient">[MOT IMPORTANT]</span>
        </h1>
        <div class="hero-subtitle hero-load">
          <p class="hero-text">[Sous-titre]</p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- SECTIONS DU CONTENU ORIGINAL -->
  <!-- Ici je recrée TOUTES les sections identifiées à l'étape 1 -->
  <!-- Avec les classes de design-system.css : .section, .container, .text-gradient, etc. -->
  
  <!-- Copier FOOTER EXACT de index.html lignes 700-790 -->
  <footer class="footer">
    <!-- FOOTER 4 COLONNES -->
  </footer>
  
  <!-- MODALS + SCRIPTS -->
  <!-- Copier lignes 800-900 de index.html -->
  
</body>
</html>
```

**RÈGLES STRICTES POUR LE CONTENU** :
1. **NE PAS inventer de texte** : Copier-coller exact depuis Webflow
2. **NE PAS sauter de section** : Toutes les sections doivent être présentes
3. **NE PAS changer l'ordre** : Respecter la hiérarchie Webflow
4. **ADAPTER les classes CSS** :
   - `background: #fff` → supprimer (fond noir par défaut)
   - `color: #000` → `color: #FFF`
   - `.text-gray-600` → `.text-gray-300` (plus clair pour fond noir)
   - Ajouter `.text-gradient` pour les mots importants
5. **GARDER les images/schémas** : Si Webflow a des SVG/images, les inclure

### ÉTAPE 3 : TEST LOCAL (10 min)
```bash
# 1. Ouvrir dans le navigateur
open tomorrow-site/[PAGE].html

# 2. Vérifier VISUELLEMENT :
# - Fond noir partout
# - Texte blanc/gris lisible
# - Header identique à la home (logo blanc, bouton orange)
# - Footer 4 colonnes identique à la home
# - Dropdown fonctionne
# - Bouton CTA fonctionne
# - TOUT le contenu Webflow est présent
# - Pas de page blanche
# - Pas de texte manquant
# - Pas de layout cassé

# 3. Hard refresh (Cmd+Shift+R) pour vider le cache

# 4. Tester le responsive (réduire la fenêtre)
```

**CHECKPOINT 2** : Si UNE SEULE chose ne marche pas → NE PAS COMMIT, CORRIGER D'ABORD.

### ÉTAPE 4 : COMMIT ET PUSH (5 min)
```bash
# ⚠️ CRITIQUE : SEVALLA DÉPLOIE DEPUIS LA RACINE DU REPO, PAS depuis tomorrow-site/
# TOUJOURS copier le fichier vers la racine avant de commit/push

# 1. Copier le fichier depuis tomorrow-site/ vers la racine
cp tomorrow-site/[PAGE].html ./[PAGE].html

# 2. Vérifier que le fichier racine est bien mis à jour
diff tomorrow-site/[PAGE].html ./[PAGE].html

# 3. Commit les DEUX versions (racine + tomorrow-site)
git add [PAGE].html tomorrow-site/[PAGE].html
git commit -m "fix: [PAGE].html refonte complète - 100% copy Webflow + design index.html (header/footer/noir)"
git push origin main
```

**⚠️ ARCHITECTURE DU PROJET** :
- `./[PAGE].html` (racine) = Fichiers déployés par Sevalla en PROD
- `./tomorrow-site/[PAGE].html` = Fichiers de travail/backup
- **Les 2 doivent toujours être identiques**
- **Ne JAMAIS modifier seulement tomorrow-site/ sans copier vers la racine**

### ÉTAPE 5 : VÉRIFICATION PROD (5 min)
```bash
# Attendre 2-3 min que Sevalla déploie
# Aller sur https://tomorrow.online/[PAGE].html
# Hard refresh (Cmd+Shift+R)
# Vérifier que c'est identique au test local
```

**CHECKPOINT 3** : Si la prod est différente du local → investiguer (cache, erreur deploy, chemin CSS incorrect).

---

## 🚫 INTERDICTIONS ABSOLUES

1. **NE JAMAIS** utiliser de scripts Python/sed/awk pour transformer automatiquement
2. **NE JAMAIS** commit sans test local dans le navigateur
3. **NE JAMAIS** supposer qu'une page fait X lignes sans vérifier
4. **NE JAMAIS** extraire seulement une partie du contenu avec grep
5. **NE JAMAIS** push plusieurs pages d'un coup (faire page par page)
6. **NE JAMAIS** inventer du texte ou sauter des sections
7. **NE JAMAIS** dire "je ferai ça plus tard" (finir la page à 100% avant de passer à la suivante)
8. **NE JAMAIS** modifier les fichiers dans `tomorrow-site/` sans copier vers la RACINE pour deploy
9. **NE JAMAIS** faire `git add .` ou `git add -A` sans vérifier `git status` et `git diff` AVANT
10. **NE JAMAIS** commit un fichier sans être sûr à 100% que c'est la bonne version
11. **TOUJOURS** faire `git status` puis `git diff` puis `git add [FICHIER_PRÉCIS]` puis `git commit`
12. **NE JAMAIS** faire "les trucs à ma façon" - **RESPECTER LA CONSIGNE À LA LETTRE**
13. **NE JAMAIS** inventer, innover, ou "améliorer" si la consigne ne le demande pas explicitement

---

## 📋 CHECKLIST PAR PAGE (À COCHER MENTALEMENT)

Avant de commit [PAGE].html, je vérifie :

**Contenu** :
- [ ] Toutes les sections Webflow sont présentes
- [ ] Tous les titres/sous-titres sont présents
- [ ] Tous les textes sont présents (aucun inventé)
- [ ] Toutes les images/schémas sont présentes
- [ ] L'ordre des sections est respecté
- [ ] Les listes/bullet points sont présents

**Design** :
- [ ] Fond noir (#000000)
- [ ] Texte blanc/gris (#FFF / #CCC)
- [ ] Header identique à index.html (logo blanc, nav dropdown, bouton orange)
- [ ] Footer identique à index.html (4 colonnes, bouton vidéo, copyright)
- [ ] Gradient orange-rouge sur mots importants
- [ ] Grid background visible
- [ ] Custom cursor fonctionne

**Fonctionnel** :
- [ ] Dropdown "Ressources" s'ouvre au clic
- [ ] Bouton CTA "Réserver mon créneau" ouvre le modal
- [ ] Liens du footer fonctionnent
- [ ] Mobile menu fonctionne
- [ ] Smooth scroll fonctionne
- [ ] Pas d'erreur JS dans la console

**Test** :
- [ ] Ouvert dans navigateur local → OK
- [ ] Hard refresh → OK
- [ ] Responsive mobile → OK
- [ ] Commit → OK
- [ ] Push → OK
- [ ] Vérifié en prod → OK

---

## 🎯 PAGES À REFONDRE (ORDRE)

### Pages principales (7)
1. ⏳ la-vision-tomorrow.html (RATÉ - à refaire)
2. ⏳ notre-histoire.html
3. ⏳ migrations.html
4. ⏳ process-24h.html
5. ⏳ realisations.html
6. ⏳ comparatif-solutions-web.html
7. ⏳ mentions-legales.html

### Sous-pages migrations (5)
8. ⏳ migrations/wordpress.html
9. ⏳ migrations/shopify.html
10. ⏳ migrations/wix.html
11. ⏳ migrations/squarespace.html
12. ⏳ migrations/joomla.html

### Pages SEO (5)
13. ⏳ agence-webflow-rapide.html
14. ⏳ agence-webflow-paris.html
15. ⏳ site-vitrine-pme.html
16. ⏳ creation-sites-internet-24h.html
17. ⏳ landing-page-haute-conversion.html

**TOTAL : 17 PAGES**

---

## 💡 PHILOSOPHIE

**"SLOW IS SMOOTH, SMOOTH IS FAST"**

Prendre 1h pour faire UNE page correctement vaut mieux que 20 commits ratés en 3h.

**Règle d'or** : Si je ne suis pas sûr à 100%, je NE commit PAS.

---

## 📝 NOTES SUPPLÉMENTAIRES

- Le commit `d217869` contient les pages Webflow complètes avec tout le copy
- `index.html` de tomorrow-site est le template de référence pour le design
- Les CSS sont dans `css/design-system.css`, `css/home.css`, `css/formulaire.css`
- Les JS sont dans `js/cursor.js`, `js/animations.js`, `js/navigation.js`, `js/main.js`, `js/formulaire.js`
- Sevalla auto-deploy depuis la branche `main` du repo GitHub `BigNeuronsAgency/tomorrow-online`

### ⚠️ ARCHITECTURE CRITIQUE DU DEPLOY

**SEVALLA DÉPLOIE DEPUIS LA RACINE DU REPO (`./`), PAS depuis `tomorrow-site/`**

```
TOMORROW ONLINE/
├── index.html                    ← DÉPLOYÉ EN PROD (https://tomorrow.online/)
├── la-vision-tomorrow.html       ← DÉPLOYÉ EN PROD (https://tomorrow.online/la-vision-tomorrow.html)
├── migrations.html               ← DÉPLOYÉ EN PROD
├── [TOUTES LES PAGES].html       ← DÉPLOYÉES EN PROD
├── css/                          ← DÉPLOYÉ EN PROD
├── js/                           ← DÉPLOYÉ EN PROD
├── images/                       ← DÉPLOYÉ EN PROD
└── tomorrow-site/
    ├── index.html                ← BACKUP / TRAVAIL (NON DÉPLOYÉ)
    ├── la-vision-tomorrow.html   ← BACKUP / TRAVAIL (NON DÉPLOYÉ)
    └── [FICHIERS DE TRAVAIL]     ← NON DÉPLOYÉS
```

**WORKFLOW OBLIGATOIRE** :
1. Travailler sur `tomorrow-site/[PAGE].html` (optionnel, pour versionning)
2. **TOUJOURS copier vers `./[PAGE].html` (racine) avant commit**
3. Commit/push les DEUX fichiers (racine + tomorrow-site)

**AVANT CHAQUE MODIFICATION** :
```bash
# Vérifier où Sevalla déploie (doit être la racine)
ls -la *.html | head -10
# Si tous les .html sont à la racine → OK, Sevalla déploie la racine

# Si tu modifies tomorrow-site/[PAGE].html, COPIER vers racine :
cp tomorrow-site/[PAGE].html ./[PAGE].html
```

**COÛT DE L'OUBLI** : 2026-01-29, oubli de copier `tomorrow-site/la-vision-tomorrow.html` vers racine → 6 commits ratés, 100 USD tokens gaspillés, 1h perdue.

---

**Date de création** : 2026-01-29 21h40
**Dernière mise à jour** : 2026-01-29 21h40
**Statut** : 🔒 GRAVÉ DANS LE MARBRE

## 9. NE JAMAIS TOUCHER AU HEADER/FOOTER UNE FOIS VALIDÉ PAR L'UTILISATEUR

**RÈGLE ABSOLUE** : Une fois que l'utilisateur a validé le header et le footer, **NE PLUS JAMAIS Y TOUCHER** sur aucune page.

**Header/Footer de référence** : `index.html` à la racine
- Header : lignes 40-92
- Footer : lignes 700-757

**NE JAMAIS** :
- Modifier la structure du header/footer
- Changer le logo (doit être `<img src="images/TO-logo.webp">`)
- Ajouter/supprimer des liens du menu
- Modifier le CSS ou les classes du header/footer

**SI l'utilisateur demande une modification** :
1. Modifier UNIQUEMENT dans `index.html`
2. Attendre sa validation explicite
3. ENSUITE copier sur toutes les autres pages EN UNE SEULE FOIS

**Coût de ne pas respecter cette règle** : 192 crédits gaspillés sur `notre-histoire.html` à cause de multiples allers-retours.
