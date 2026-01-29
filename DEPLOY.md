# 🚀 DÉPLOIEMENT SEVALLA - TOMORROW.ONLINE

## 📋 ÉTAPES DE DÉPLOIEMENT

### 1. **Créer le repo GitHub**

```bash
# Le repo local est déjà initialisé et commité
# Maintenant créez un repo sur GitHub.com :
# - Allez sur https://github.com/new
# - Nom du repo : tomorrow-online
# - Description : Site Tomorrow.Online - 24H pour créer votre site
# - Public ou Private : Public
# - NE PAS initialiser avec README (on a déjà un commit local)
# - Cliquez "Create repository"
```

### 2. **Pusher le code vers GitHub**

```bash
cd "/Users/secondmac/Downloads/TOMORROW ONLINE/tomorrow-site"

# Ajoutez le remote (remplacez USERNAME par votre username GitHub)
git remote add origin https://github.com/USERNAME/tomorrow-online.git

# Vérifiez la branche
git branch -M main

# Push le code
git push -u origin main
```

### 3. **Connecter à Sevalla**

1. **Allez sur Sevalla.com**
   - Connectez-vous à votre compte Sevalla
   - Ou créez un compte si vous n'en avez pas encore

2. **Créer une nouvelle application**
   - Cliquez sur "New Application" ou "Add Site"
   - Choisissez "Static Site" ou "HTML Site"

3. **Connecter le repo GitHub**
   - Autorisez Sevalla à accéder à votre GitHub
   - Sélectionnez le repo `tomorrow-online`
   - Branche : `main`
   - Root directory : `/` (racine du repo)
   - Build command : (laisser vide, c'est du HTML statique)
   - Publish directory : `/` (racine du repo)

4. **Configurez les paramètres**
   - Auto-deploy : **ON** (pour que chaque push déclenche un redéploiement)
   - Branch deploys : `main` uniquement

5. **Déployer**
   - Cliquez sur "Deploy" ou "Create Application"
   - Attendez 1-2 minutes que le site soit déployé

### 4. **Configurer le domaine (optionnel)**

Si vous avez déjà un domaine :
- Allez dans "Domains" dans Sevalla
- Ajoutez votre domaine custom
- Suivez les instructions DNS (A records & CNAME)

Le site sera accessible via :
- URL Sevalla : `https://tomorrow-online.sevalla.app` (ou similaire)
- Votre domaine custom si configuré

---

## 📁 STRUCTURE DU PROJET

```
tomorrow-site/
├── index.html              # HOME page (837 lignes)
├── css/
│   ├── design-system.css   # Design system (421 lignes)
│   ├── home.css            # Styles HOME (1683 lignes)
│   └── formulaire.css      # Styles formulaire (1435 lignes)
├── js/
│   ├── cursor.js           # Custom cursor (53 lignes)
│   ├── animations.js       # GSAP + Lenis (152 lignes)
│   ├── navigation.js       # Menu mobile (38 lignes)
│   ├── main.js             # WhatsApp + Modal (59 lignes)
│   └── formulaire.js       # Formulaire 7 étapes (1102 lignes)
├── images/                 # Toutes les images
├── README.md               # Documentation projet
└── .gitignore              # Git ignore rules
```

---

## 🎨 FONCTIONNALITÉS DÉPLOYÉES

✅ **HOME Page Complète** :
- Header avec navigation desktop/mobile
- Hero avec titre géant + 3 stats
- Marquee "SOYEZ IMPATIENTS"
- Manifesto "BE IMPATIENT"
- Pricing (3 offres)
- Squad avec effet X-RAY
- Process (4 étapes)
- Jean-Charles BSOD avec timeline
- Work (réalisations avec stats)
- 3 Mondes (Venn animé)
- FAQ (8 questions)
- Footer complet

✅ **Formulaire 7 Étapes** :
- Business (marque, pitch, concurrents)
- Cible (problème, solution, avantage)
- Archétype (12 choix)
- Tonalité & Style (sliders, copywriting, upload)
- Offre (3 packs + upsells)
- Validation (domaine, email, téléphone)
- Boost lancement (upsells success + countdown)

✅ **Animations** :
- Scroll skew effect (GSAP)
- Custom cursor (mix-blend-mode)
- Smooth scroll (Lenis)
- Effet X-RAY sur Squad
- Parallax, fade-in, etc.

✅ **Technologies** :
- HTML5 sémantique
- CSS3 custom (3539 lignes)
- JavaScript vanilla (1404 lignes)
- GSAP 3.12.2
- Lenis 1.0.19
- FormSubmit.co

---

## 🧪 TESTER LE SITE

Une fois déployé sur Sevalla :

1. **Ouvrez l'URL Sevalla** dans votre navigateur
2. **Testez toutes les animations** :
   - Scroll rapide pour voir le skew effect
   - Survolez les cartes Squad pour l'effet X-RAY
   - Testez le smooth scroll
3. **Testez le formulaire** :
   - Cliquez sur n'importe quel bouton "Bloquer mon slot"
   - Remplissez les 7 étapes
   - Testez la validation email/téléphone
   - Testez l'envoi du formulaire
4. **Testez le responsive** :
   - Mobile (< 768px)
   - Tablet (768px - 1024px)
   - Desktop (> 1024px)

---

## 🔄 WORKFLOW DE DÉVELOPPEMENT

### Faire des modifications :

```bash
cd "/Users/secondmac/Downloads/TOMORROW ONLINE/tomorrow-site"

# Après avoir modifié des fichiers
git add .
git commit -m "feat: ajout de nouvelle section X"
git push

# Sevalla va automatiquement redéployer le site (1-2 min)
```

### Créer une nouvelle branche pour tester :

```bash
# Créer une branche de développement
git checkout -b dev

# Faire vos modifications...
git add .
git commit -m "test: nouvelle feature"
git push -u origin dev

# Dans Sevalla, vous pouvez déployer cette branche séparément
# pour tester avant de merger dans main
```

---

## 📞 SUPPORT

Si vous avez des problèmes :
- GitHub : https://docs.github.com
- Sevalla : https://sevalla.com/docs
- GSAP : https://greensock.com/docs/
- Lenis : https://github.com/studio-freight/lenis

---

## 🎯 PROCHAINES ÉTAPES

Après le déploiement :
1. ✅ Tester le formulaire en ligne
2. ⏳ Convertir les 9 pages secondaires
3. ⏳ Ajouter les animations manquantes
4. ⏳ Optimiser les images
5. ⏳ Configurer le domaine custom
6. ⏳ Activer Weglot pour FR/EN

---

**Site créé avec 💜 par Tomorrow.Online**
