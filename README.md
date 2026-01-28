# 🚀 Tomorrow.Online - Nouveau Site Dark

Site web avec animations de niveau Awwwards : scroll skew, cursor custom, effet X-RAY, smooth scroll.

## 📁 Structure

```
tomorrow-site/
├── index.html              # Page d'accueil avec animations
├── css/
│   ├── design-system.css   # Variables, composants, utilities
│   └── home.css            # Styles spécifiques HOME
├── js/
│   ├── cursor.js           # Custom cursor avec mix-blend-mode
│   ├── animations.js       # GSAP + Lenis + scroll effects
│   ├── navigation.js       # Menu mobile + dropdowns
│   └── main.js             # Modal, WhatsApp, lang switcher
└── images/                 # Toutes les images du site
```

## 🎨 Design System

### Couleurs
- **Fond** : `#000000` (noir intense)
- **Textes** : `#FFFFFF` (blanc)
- **Accent** : Gradient rose→violet  
  `linear-gradient(90deg, rgba(180, 7, 254, 1) 0%, rgba(255, 10, 55, 1) 100%)`

### Fonts
- **Space Grotesk** : Corps de texte et headings
- **Syne** : Titres alternatifs
- **JetBrains Mono** : Code et console

### Animations
1. **Scroll Skew** : Le site se penche lors du scroll rapide
2. **Custom Cursor** : Curseur custom avec mix-blend-mode: difference
3. **Smooth Scroll** : Lenis pour un scroll fluide
4. **GSAP ScrollTrigger** : Animations au scroll
5. **Hero Load** : Animation d'entrée du hero

## 🔧 Technologies

- **HTML5** sémantique
- **CSS3** custom (variables CSS, Grid, Flexbox)
- **JavaScript vanilla**
- **GSAP 3.12.2** (animations)
- **Lenis 1.0.19** (smooth scroll)
- **Weglot** (traduction FR/EN)

## 📦 Déploiement

### Sur Sevalla (recommandé)

1. Créer un repo GitHub
2. Push le code
3. Connecter le repo à Sevalla
4. Auto-deploy activé

### Localement (dev)

1. Ouvrir `index.html` dans un navigateur
2. Ou utiliser un serveur local :
   ```bash
   python3 -m http.server 8000
   ```
3. Accéder à http://localhost:8000

## ✅ Statut

- [x] Structure du projet
- [x] Design system CSS
- [x] Header + Navigation
- [x] Hero section
- [x] Marquee
- [x] Manifesto
- [x] Custom cursor
- [x] Smooth scroll (Lenis)
- [x] Scroll skew effect
- [x] Animations GSAP
- [x] WhatsApp button
- [x] Language switcher
- [ ] Section Squad (avec effet X-RAY)
- [ ] Section Jean-Charles (BSOD)
- [ ] Section Pricing
- [ ] Section Process
- [ ] Section Work
- [ ] Section 3 Mondes (Venn)
- [ ] Section FAQ
- [ ] Formulaire 7 étapes complet
- [ ] Footer
- [ ] 9 pages secondaires

## 🎯 Prochaines étapes

1. Compléter la HOME avec toutes les sections
2. Intégrer le formulaire 7 étapes
3. Convertir les 9 pages secondaires
4. Tests responsive
5. Optimisation performance
6. Déploiement sur Sevalla

## 📞 Contact

- **WhatsApp** : +33 7 67 43 42 73
- **Email** : mf.phan@bigneurons.com
