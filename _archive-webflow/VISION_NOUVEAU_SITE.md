# 🚀 VISION NOUVEAU SITE TOMORROW.ONLINE

## 📅 Date : 28 janvier 2025

---

## 🎯 OBJECTIF

Créer un site **brutal, animations de dingues** pour gagner un **Awwwards**.  
Abandonner les tentatives de conversion Webflow (trop d'échecs) et repartir sur une base propre.

---

## ✨ INSPIRATIONS

Sites de référence pour les animations :
- **funtownstudio.com** 
- **hqhr.com**
- **hape.io**
- **nvg8.io**

---

## 🎨 DESIGN & ANIMATIONS SOUHAITÉS

### Palette couleurs :
- **Fond** : Noir intense (pas gris foncé) → `#050505` ou `#000000`
- **Textes** : Blancs → `#FFFFFF`
- **Accent principal (gradient rose→violet)** :  
  `linear-gradient(90deg, rgba(180, 7, 254, 1) 0%, rgba(255, 10, 55, 1) 100%)`

### Règles d'utilisation du gradient :

**✅ Où utiliser le gradient :**
1. **Tous les CTA et boutons** (fond gradient)
2. **Hover des cards** (bordure ou glow gradient)
3. **Price card importante** (fond gradient, style "Populaire")
4. **Hover mots importants** (texte gradient au survol uniquement)
5. **Petits éléments de gamification** (badges, compteurs, progress bar)
6. **Petits textes** (labels, tags, console output)

**❌ Par défaut (sans hover) :**
- Tout est **noir et blanc**
- Gradient apparaît **UNIQUEMENT au hover** sur les mots importants

> **Important** : Le code HTML fourni utilise `--acid: #CCFF00` mais il faut **TOUT remplacer par le gradient rose→violet actuel**.

### Effets & Animations :

1. **Scroll Skew Effect**  
   - Le site se penche si on scroll rapidement
   - Effet d'inclinaison dynamique (GSAP)

2. **Curseur Custom**  
   - Curseur qui inverse les couleurs au survol
   - Effet de "trou" ou inversion

3. **Effet X-RAY sur hover** (Section Squad) ⭐ **ULTRA IMPORTANT**  
   - Images en grayscale par défaut
   - Au hover : inversion des couleurs + scanline animée (avec le gradient)
   - `filter: invert(100%) sepia(100%) saturate(400%) hue-rotate(60deg) contrast(1.5)`
   - Scanline en gradient rose→violet

4. **Smooth Scroll (Lenis)**  
   - Scroll fluide et naturel
   - Intégration avec GSAP ScrollTrigger

5. **Animations GSAP ScrollTrigger avancées**  
   - Parallax
   - Fade in/out
   - Scale & rotation sur scroll
   - Text reveal

6. **Easter Eggs**  
   - Vidéo cachée (déjà présente)
   - Console output style "hacker"
   - Interactions surprises

7. **Effets de texte**  
   - Text stroke effects
   - Gradient text animé
   - Glitch effect

8. **Section Jean-Charles style BSOD** ⭐ **PHRASE D'ACCROCHE IMPORTANTE**  
   - **Titre exacte à utiliser** :
     ```
     FATAL_ERROR_JC_DIY_ATTEMPT
     A problem has been detected and your project has been shut down to prevent damage to your business.

     THE_PROBLEM: JEAN-CHARLES IS TRYING TO CODE.
     ```
   - Blue Screen of Death animation
   - Scanline effect
   - Timeline rouge→orange→jaune (déclin)
   - Fond noir avec scanlines
   - 4 étapes : 😊 → 😕 → 😰 → 💀

---

## 📦 CONTENU À PRÉSERVER INTÉGRALEMENT

### ✅ Formulaire (PRIORITÉ ABSOLUE)
**Conserver EXACTEMENT comme il est** (juste changer les couleurs) :

- **7 étapes complètes** :
  1. LE BUSINESS
  2. LA CIBLE
  3. ARCHÉTYPE
  4. TONALITÉ & STYLE
  5. L'OFFRE
  6. VALIDATION
  7. UPSELLS SUCCESS

- **Gamification** :
  - Countdown 2 minutes
  - Progress bar
  - Console output style terminal
  - File upload
  - Calcul dynamique des prix

- **Tous les champs actuels** :
  - Variables : `PACKS`, `UPSELLS`, `UPSELLS_SUCCESS`, `DETAILS_DATA`, `ARCHETYPES`
  - Fonctions : `getStepContent()`, `draw()`, `openModal()`, `closeModal()`, `submitForm()`, `calculateTotals()`, `validateEmail()`, `validatePhone()`

### ✅ Copys (textes)
Réutiliser **tous les textes actuels** :
- Hero : "ON CONSTRUIT VOTRE SITE EN 24H*"
- Manifesto "BE IMPATIENT"
- Section Jean-Charles (anti-pattern)
- 3 Mondes (Venn)
- Process (4 étapes)
- Pricing (3 offres)
- FAQ
- Work (réalisations)

### ✅ Images actuelles
Conserver toutes les images :
- Photos équipe (Squad)
- Logo Tomorrow.Online
- Images réalisations
- Visuels PPF, VanLife, etc.

### ✅ Sections à garder (déjà géniales)
- **Section Jean-Charles** : "celle de mon code est juste geniale" + phrase d'accroche BSOD (voir ci-dessus)
- **Section Squad** : Drag to explore, équipe mercenaires + **Effet X-RAY ULTRA IMPORTANT**

---

## 🏗️ STRUCTURE HTML FOURNIE

Fichier HTML complet (~500 lignes) avec :

### Sections principales :
1. **Hero MONOLITH**  
   - Titre géant
   - Effet hover scale
   - CTA principal

2. **Marquee "SOYEZ IMPATIENTS"**  
   - Défilement infini
   - Fond gradient

3. **Section SQUAD avec effet X-RAY**  
   - Photos équipe
   - Scanline animée au hover
   - Filter inversion

4. **Section "BE IMPATIENT" (Manifesto)**  
   - Texte manifeste
   - Numérotation

5. **Section Jean-Charles style BSOD**  
   - Blue Screen of Death
   - Timeline déclin (😊 → 😕 → 😰 → 💀)
   - Fond noir avec scanlines

6. **Section "3 MONDES" avec Venn animé**  
   - 3 cercles qui se croisent
   - Spot central animé
   - Hover scale

7. **Pricing (3 offres)**  
   - Maquette / Starter / Business
   - Cards hover effect

8. **Process (4 étapes)**  
   - Brief → Call → Deepwork → Champagne

9. **Work (réalisations)**  
   - Grille projets
   - Stats

10. **FAQ (accordéons)**  
    - Questions/réponses
    - Toggle animé

### Technologies utilisées dans le code fourni :
- **GSAP 3.12.2** + ScrollTrigger + Lenis
- **CSS Custom** (pas de Tailwind si on part sur Webflow propre)
- **Fonts** : Space Grotesk, Syne, JetBrains Mono

> **Note sur Tailwind** : Si on part sur Webflow from scratch, **on n'utilise PAS Tailwind**. On utilise du CSS propre et natif pour un code plus léger et optimisé.

### Palette dans le code fourni (à adapter) :
```css
:root {
    --acid: #CCFF00;
    --void: #050505;
    --blood: #FF003C;
    --bsod: #0000AA;
}
```

> **À modifier** : Remplacer `--acid` par le gradient rose→violet actuel

---

## 🛠️ OPTIONS TECHNIQUES

### OPTION A : Next.js sur Kinsta Static (RECOMMANDÉ)

#### ✅ Avantages :
- **Performance 10x meilleure** que WordPress
- **Animations illimitées** (pas de limite 50k caractères)
- **Contrôle total** sur tous les effets (scroll skew, cursor inversion, X-RAY)
- **Déploiement automatique** via GitHub
- **Coût : 0€** (vs 35€/mois WordPress Kinsta)
- **SEO optimal** (SSG/SSR)
- **Edge functions** pour performances globales

#### Stack technique :
- **Frontend** : Next.js 15 (React 19)
- **Animations** : GSAP 3.12.2 + Framer Motion + Lenis
- **Styling** : CSS Modules ou Styled Components (pas Tailwind)
- **Hosting** : Kinsta Static Site (gratuit, CDN global)
- **Fonts** : Space Grotesk, Syne, JetBrains Mono
- **Formulaire** : FormSubmit.co (actuel) ou Formspree

#### ⚠️ Contraintes :
- ❌ **Vous ne maîtrisez pas GitHub** ni Node.js
- ❌ **Kinsta Static nécessite GitHub** pour déploiement automatique
- ⚠️ **Alternative possible** : Je peux créer le code HTML/CSS/JS complet, vous le copiez dans un fichier .html, et vous l'uploadez manuellement sur Kinsta Application Hosting (payant ~15€/mois) ou un hébergeur classique

#### 📦 Workflow (si vous voulez quand même) :
1. **Je crée le projet localement** (vous n'avez rien à faire)
2. **Je vous fournis les fichiers** (HTML/CSS/JS compilés)
3. **Vous uploadez sur un hébergeur** :
   - Option A : Kinsta Application Hosting (15€/mois, upload FTP/SFTP)
   - Option B : Netlify Drop (gratuit, drag & drop)
   - Option C : Vercel (gratuit, mais nécessite GitHub)

> **Conclusion** : Si vous ne maîtrisez pas GitHub, Next.js est **compliqué** pour vous. **Webflow est plus adapté** car interface visuelle sans code.

---

### OPTION B : Webflow from scratch

#### ✅ Avantages :
- Interface visuelle (Webflow Editor)
- Pas de code à maintenir
- Client peut modifier facilement
- Hosting inclus

#### ⚠️ Limitations :
- **Limite 50k caractères par embed** (formulaire complexe = galère)
- **Animations avancées limitées** (scroll skew, cursor inversion = difficile/impossible)
- **Performance moins bonne** que Next.js
- **Coût** : ~25€/mois minimum (plan Site)

#### 📦 Workflow :
1. Créer nouveau projet Webflow
2. Reconstruire layout from scratch
3. Copier-coller copys actuels
4. Réintégrer formulaire (découper en embeds)
5. Ajouter animations custom (limitées)

---

### OPTION C : WordPress (FORTEMENT DÉCONSEILLÉ)

#### ❌ Inconvénients :
- Performance médiocre
- Complexité technique élevée
- Plugins = failles sécurité
- Animations limitées
- Coût : 35€/mois (Kinsta WordPress)

---

## 🎬 EFFETS DÉTAILLÉS (Code HTML fourni)

### X-RAY Effect (Section Squad) ⭐ ULTRA IMPORTANT :
```css
.xray-container {
    position: relative;
    overflow: hidden;
    background: #000;
}
.xray-img {
    filter: grayscale(100%) contrast(1.2);
    transition: all 0.1s ease;
}
.xray-container:hover .xray-img {
    filter: invert(100%) sepia(100%) saturate(400%) hue-rotate(60deg) contrast(1.5);
}
.xray-scanline {
    position: absolute;
    top: -100%; left: 0; width: 100%; height: 20%;
    background: linear-gradient(to bottom, transparent, rgba(180, 7, 254, 1), rgba(255, 10, 55, 1), transparent);
    opacity: 0.5;
    z-index: 10;
    pointer-events: none;
}
.xray-container:hover .xray-scanline {
    animation: scan 1.5s linear infinite;
}
@keyframes scan {
    from { top: -100%; }
    to { top: 100%; }
}
```

### Scroll Skew Effect :
```javascript
// GSAP ScrollTrigger
gsap.to("body", {
    skewY: 2,
    scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
            const velocity = self.getVelocity();
            const skew = Math.min(Math.max(velocity * 0.0005, -5), 5);
            gsap.to("body", { skewY: skew, duration: 0.1 });
        }
    }
});
```

### Cursor Inversion :
```javascript
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
```

```css
.custom-cursor {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    mix-blend-mode: difference;
    position: fixed;
    pointer-events: none;
    z-index: 99999;
    transition: transform 0.2s;
}
```

---

## 📊 COMPARAISON RAPIDE

| Critère | Next.js | Webflow | WordPress |
|---------|---------|---------|-----------|
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Animations avancées** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ |
| **Coût** | 0€ | 25€/mois | 35€/mois |
| **Contrôle créatif** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Facilité édition client** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **SEO** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Setup initial** | Moyen | Facile | Complexe |

---

## 🎯 RECOMMANDATION FINALE

### ⚠️ IMPORTANT : Vous ne maîtrisez pas GitHub

Étant donné que **vous ne maîtrisez pas GitHub**, voici les options réalistes :

### OPTION 1 : Webflow from scratch (RECOMMANDÉ pour vous)

**Pourquoi ?**
1. ✅ Interface visuelle, zéro code
2. ✅ Vous pouvez modifier facilement
3. ✅ Hébergement inclus
4. ✅ Pas besoin de GitHub
5. ⚠️ Animations limitées (scroll skew, cursor inversion = difficile)
6. ⚠️ Limite 50k caractères par embed (formulaire = galère)

**Coût** : ~25€/mois

---

### OPTION 2 : Site HTML/CSS/JS custom + Netlify Drop (RECOMMANDÉ pour Awwwards)

**Pourquoi ?**
1. ✅ Je code tout (HTML/CSS/JS)
2. ✅ Animations de fou (scroll skew, cursor, X-RAY)
3. ✅ **Déploiement ultra simple** : Drag & Drop sur Netlify
4. ✅ Coût : **0€**
5. ✅ Performance maximale
6. ⚠️ Modifications futures = me contacter (ou apprendre le code)

**Workflow** :
1. Je crée le site en HTML/CSS/JS pur (tout dans un dossier)
2. Vous allez sur https://app.netlify.com/drop
3. Vous drag & drop le dossier
4. Site en ligne en 30 secondes
5. Netlify vous donne une URL (ex: `votresite.netlify.app`)
6. Vous pouvez connecter votre nom de domaine

**Avantage énorme** : Zéro besoin de GitHub, tout en drag & drop !

---

### OPTION 3 : Next.js (NON RECOMMANDÉ pour vous)

❌ Trop complexe sans GitHub  
❌ Nécessite compétences dev  
❌ Déploiement compliqué

---

## 🏆 MA RECOMMANDATION ULTIME

### Pour un site Awwwards SANS GitHub : **HTML/CSS/JS custom + Netlify Drop**

**C'est le meilleur des deux mondes** :
- ✅ Animations illimitées (comme Next.js)
- ✅ Déploiement ultra simple (Drag & Drop, plus simple que Webflow)
- ✅ Coût : 0€
- ✅ Performance maximale
- ✅ Pas de limite 50k caractères

**Seul inconvénient** : Modifications futures nécessitent de me contacter (mais c'est pareil avec Next.js).

---

## 📋 PROCHAINES ÉTAPES

### Si vous choisissez HTML/CSS/JS + Netlify Drop (RECOMMANDÉ) :
1. ✅ Je crée le site complet en HTML/CSS/JS
2. ✅ J'intègre tous vos copys, images, formulaire
3. ✅ J'ajoute toutes les animations (scroll skew, cursor, X-RAY, smooth scroll)
4. ✅ Je vous fournis un dossier ZIP
5. ✅ Vous allez sur https://app.netlify.com/drop
6. ✅ Vous drag & drop le dossier
7. ✅ Site en ligne en 30 secondes
8. ✅ Vous connectez votre nom de domaine

### Si vous choisissez Webflow from scratch :
1. ✅ Créer nouveau projet Webflow
2. ✅ Reconstruire layout
3. ✅ Copier copys + images
4. ✅ Réintégrer formulaire (découper en embeds < 50k)
5. ⚠️ Ajouter animations custom (limitées)
6. ✅ Publier

---

## 💾 FICHIERS DE RÉFÉRENCE

### Fichiers actuels à conserver :
- `index.html` (source de vérité, 149,015 octets)
- `index_BACKUP_ORIGINAL.html` (backup)
- Images équipe : `PPTIMTOMORROW.jpeg`, `PPARTHURTOMORROW.jpeg`, etc.
- Logo : `TO-logo-baseline.svg`

### Fichiers Webflow (obsolètes, site cassé) :
- `EMBEDS_FINAL/EMBED_{1-7}_CYAN.html` ❌ NE PAS UTILISER
- `EMBEDS_DARK_CYAN_FINAL/` ❌ NE PAS UTILISER

### Code HTML nouveau site :
- Fichier HTML fourni (~500 lignes) avec structure complète
- À adapter : remplacer `--acid: #CCFF00` par gradient rose→violet

---

## 🔥 CITATION CLÉ

> "Mets tout ça dans ta mémoire ou dans un MD car on va peut être le tenter ensemble"

**✅ FAIT !**

---

## ❓ DÉCISION FINALE

**Vous devez choisir entre :**

### 🥇 OPTION 1 : HTML/CSS/JS custom + Netlify Drop
- ✅ Animations de niveau Awwwards
- ✅ Déploiement ultra simple (Drag & Drop)
- ✅ Coût : 0€
- ✅ Performance maximale
- ⚠️ Modifications futures = me contacter

### 🥈 OPTION 2 : Webflow from scratch
- ✅ Interface visuelle
- ✅ Vous modifiez facilement
- ⚠️ Animations limitées
- ⚠️ Limite 50k/embed
- 💰 Coût : 25€/mois

---

**Ma recommandation** : **OPTION 1** (HTML/CSS/JS + Netlify Drop) pour avoir un site Awwwards sans GitHub.

---

**Date de création** : 28 janvier 2025  
**Statut** : ⏳ EN ATTENTE DE VOTRE DÉCISION
