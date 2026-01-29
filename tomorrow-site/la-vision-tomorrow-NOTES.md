# LA-VISION-TOMORROW.HTML - NOTES COMPLÈTES

## STRUCTURE GLOBALE (758 lignes)

### HEAD (lignes 1-100)
- Title: "La vision de Tomorrow - Tomorrow.Online"
- Description SEO
- Fonts: Space Grotesk, Syne, JetBrains Mono
- CSS Webflow + custom inline
- Weglot script (traduction)

### BODY CONTENT

#### 1. SPLIT-SCREEN SECTION (lignes 100-500)
**Layout** : 2 colonnes côte à côte (gauche/droite)

**COLONNE GAUCHE** (bg-gray-50):
- Label: "Fig 1. Le marché actuel"
- **SCHÉMA VENN** : 3 cercles qui se chevauchent
  - Cercle 1 (haut): "IA" + badge "vide d'âme"
  - Cercle 2 (gauche): "AGENCE" + badge "trop cher"
  - Cercle 3 (droite): "TEMPLATE" + badge "générique"
  - Centre intersection: "💀" (emoji tête de mort)
- **Titre**: "Le Triangle de l'Enfer."
- **Sous-titre**: "CHOISISSEZ VOTRE POISON"
- **Texte**: "Aujourd'hui, vous devez sacrifier quelque chose. Soit votre budget, soit votre singularité, soit votre qualité. **C'était vrai jusqu'à hier.**"

**COLONNE DROITE** (bg-white):
- Label: "Fig 2. Tomorrow.online" (texte animé avec gradient)
- **SCHÉMA VENN** : 3 cercles qui se chevauchent
  - Cercle 1 (haut): "VITESSE DE L'IA" (bg-tech)
  - Cercle 2 (gauche): "QUALITÉ D'UNE AGENCE" (bg-agency)
  - Cercle 3 (droite): "FIABILITÉ D'UN TEMPLATE" (bg-template)
  - Centre intersection: "TOMORROW"
- **Titre**: "Le Meilleur des 3 Mondes."
- **Sous-titre**: "Il y'a un remède"
- **MANIFESTO (3 points)** :
  - **01** : "Nous avons pris la vitesse de l'IA..." → "Structure codée par IA, finalisée par des experts Webflow. 24-48h chrono."
  - **02** : "L'âme d'une Agence Parisienne..." → "Direction Artistique senior et copywriting inclus. Pas de devis à rallonge."
  - **03** : "La fiabilité d'un Template..." → "Zéro bug technique, mais un design qui ne ressemble à aucun autre."
- **CTA** : Bouton "Rejoindre la nouvelle norme" (classe `.btn-gradient`)

#### 2. ANIMATIONS GSAP (lignes 500-600)
- Animation Venn wrapper : scale 0.8 → 1, opacity 0 → 1
- Animation manifesto items : stagger 0.2s, x: 20 → 0
- Animation center-spot : scale 0, rotation 180, back.out ease

#### 3. FOOTER (lignes 600-758)
**Layout** : 3 colonnes (grid-template-columns: 5fr 3fr 4fr)

**Colonne 1 (Gauche)** :
- Logo TO-logo_1.svg
- Texte: "L'agence web commando du réseau **Big Neurons**. Nous concevons et développons des sites haut de gamme en 24-48H."
- Badge: "⚡ Qualité premium • Vitesse brutale"
- Stack technique: "WEBFLOW • FIGMA • RELUME • GEMINI 3 PRO • CLAUDE SONNET 4.5 • VERDENT"
- Lien vidéo: "💀 Les acheteurs de templates VS Tomorrow.online ->" (ouvre modal vidéo)

**Colonne 2 (Centre - Navigation)** :
- Titre: "Navigation"
- Liens:
  - Accueil
  - Process 24H
  - Réalisations
  - Notre Histoire

**Colonne 3 (Droite - Ressources)** :
- Titre: "Ressources"
- Liens:
  - La Vision Tomorrow
  - Comparatif Solutions
  - Migrations CMS
  - Big Neurons ↗

**Bottom Bar** :
- Copyright: "© 2025 Tomorrow.Online • Tous droits réservés • Mentions Légales"
- Email: "hello@tomorrow.online"
- Localisation: "Paris, France 🇫🇷"

#### 4. MODAL VIDÉO (lignes 700-758)
- ID: `videoEggModal`
- iframe Vimeo: `https://player.vimeo.com/video/1141806002`
- Badge: "> SYSTEM: TEMPLATE_KILLER.EXE RUNNING..."
- Bouton fermer: "FERMER [ESC]"
- Event listener: ESC pour fermer

---

## CLASSES CSS IMPORTANTES

### Venn Diagram
- `.venn-wrapper` : container des cercles
- `.circle` : cercle individuel
- `.style-bad` : cercles gauche (gris, opacité faible)
- `.style-good` : cercles droite (couleurs vives)
- `.bg-tech`, `.bg-agency`, `.bg-template` : couleurs différenciées
- `.pos-top`, `.pos-left`, `.pos-right` : positionnement
- `.center-spot` : zone centrale d'intersection
- `.left-side` : emoji 💀
- `.right-side` : texte "TOMORROW"

### Manifesto
- `.manifesto-item` : container d'un point
- `.manifesto-number` : numéro (01, 02, 03)
- `h3` : titre du point
- `p` : description du point

### Boutons
- `.btn-gradient` : bouton avec gradient orange-rouge

### Footer
- `.footer-grid` : grid 3 colonnes
- `.footer-col-left`, `.footer-col-nav`, `.footer-col-resources` : colonnes

---

## IMAGES / SVG

1. **Logo header** : `images/TO-logo_1.svg` (footer, blanc)
2. **Pas d'autres images** : les cercles Venn sont en CSS pur

---

## SCRIPTS EXTERNES

1. jQuery 3.5.1
2. webflow.js
3. Weglot (traduction)
4. GSAP (animations)

---

## FONCTIONNALITÉS INTERACTIVES

1. **openModal()** : redirige vers index.html avec sessionStorage
2. **openTemplateVideo()** : ouvre modal vidéo Vimeo
3. **closeTemplateVideo()** : ferme modal vidéo
4. **ESC key listener** : ferme modal vidéo

---

## CHECKPOINT 1 : ✅ LECTURE COMPLÈTE TERMINÉE

**Nombre de sections** : 2 (split-screen + footer)
**Nombre de textes** : 14 (titres, sous-titres, paragraphes, liens)
**Nombre d'images** : 1 (logo footer)
**Nombre de schémas** : 2 (Venn gauche + Venn droite)
**Hiérarchie** : Split-screen (gauche/droite) → Footer 3 colonnes → Modal vidéo

---

**Prêt pour ÉTAPE 2 : CRÉATION DU NOUVEAU HTML**
