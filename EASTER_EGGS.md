# 🎮 EASTER EGGS - TOMORROW.ONLINE

Liste complète des easter eggs cachés sur le site Tomorrow.Online.

---

## 🎯 EASTER EGGS ACTIFS

### 1. 👨‍💻 **Message Console (pour les devs)**
**Trigger** : Ouvrir la console développeur (F12)  
**Effet** : Message stylisé de bienvenue + message de recrutement  
**Message** : "Tu cherches quoi ? Un code propre ? T'es au bon endroit. On recrute parfois des mercenaires."

---

### 2. ⏳ **Titre Onglet Dynamique**
**Trigger** : Quitter l'onglet du site (changer d'onglet)  
**Effet** : Le titre de la page change  
- **Normal** : "Tomorrow.Online - ..."
- **Quitté** : "⏳ Le chrono tourne..."  
**Retour** : Le titre redevient normal dès qu'on revient sur l'onglet

---

### 3. ⏱️ **Curseur Chrono sur "24H"**
**Trigger** : Survoler le mot "24H" n'importe où sur le site  
**Effet** : Le curseur se transforme en emoji chrono ⏱️  
**Zones** : Titres, descriptions, contenus textuels

---

### 4. ⚔️ **Curseur Casque sur "mercenaires"**
**Trigger** : Survoler le mot "mercenaires" n'importe où sur le site  
**Effet** : Le curseur se transforme en emoji casque/épée ⚔️  
**Zones** : Équipe, descriptions, contenus textuels

---

### 5. 🟢 **Konami Code → Mode Terminal Matrix**
**Trigger** : Taper sur le clavier : ↑ ↑ ↓ ↓ ← → ← →  
**Effet** : 
- Le site bascule en mode "Terminal Matrix"
- Fond noir, texte vert phosphorescent
- Police monospace partout
- Toast notification : "Access granted to the Matrix."  
**Toggle** : Retaper le Konami Code pour revenir au mode normal

---

### 6. 😡 **Rage Click sur l'Enfant Impatient**
**Trigger** : Cliquer 5 fois en moins de 2 secondes sur l'image `beimpatient.png` (hero section)  
**Effet** :
- L'enfant change d'expression → `tomorrowcolere.png`
- Bulle de dialogue : "C'est bon, on a compris, t'es pressé !"  
**Durée** : 3 secondes OU jusqu'au scroll  
**Retour** : L'image redevient normale automatiquement

---

### 7. ⌛ **Malédiction Jean-Charles (Curseur Laggy)**
**Trigger** : Survoler la section "Jean-Charles" (BSOD rouge/bleu)  
**Effet** :
- Le curseur devient un sablier Windows 95 ⌛
- Lag artificiel de 0.5s : le curseur suit la souris avec retard  
**Durée** : Tant qu'on reste dans la section JC  
**Retour** : Le curseur redevient normal en sortant de la section

---

### 8. ❌ **Exorcisme Wix/Wordpress**
**Trigger** : Taper les mots "wix", "wordpress" ou "squarespace" au clavier n'importe où sur le site  
**Effet** :
- L'écran tremble violemment (shake effect)
- Toast notification : "❌ Ici, on ne prononce pas ces mots."  
**Durée** : 0.5 seconde de tremblement

---

### 9. ⏰ **Copyright Futuriste**
**Trigger** : Regarder le footer  
**Effet** : L'année du copyright défile comme un chronomètre  
- Démarre à © 2026
- Incrémente infiniment : 2027... 2042... 2100...  
**Message** : Tomorrow n'est pas juste un nom. Nous sommes déjà dans le futur.

---

### 10. 🔥 **Vision Predator (Mode Thermique)**
**Trigger** : Cliquer sur le badge "SYSTEM: ONLINE" (point vert dans header ou footer)  
**Effet** :
- Le site bascule en Vision Thermique (filtre CSS heatmap)
- Inversion des couleurs + hue-rotate + contrast élevé
- Bleu froid pour le fond, rouge/orange/blanc pour les textes
- Toast : "🔥 Vision Thermique activée"  
**Toggle** : Recliquer pour revenir au mode normal

---

### 11. 🍾 **Sabrage Sonore**
**Trigger** : Cliquer sur le bouton "Sabrer le champagne" (section Process ou Footer)  
**Effet** :
- Son de bouchon de champagne qui saute (Pop!)
- Animation de confettis-code : `<div>`, `{}`, `</>`, `()`, `;`
- Toast : "🍾 POP ! Champagne sabrééé !"  
**Durée** : Animation de 2 secondes

---

### 12. 💸 **Idle "Time is Money"**
**Trigger** : Rester inactif (pas de mouvement souris/scroll/clic) pendant exactement 24 secondes  
**Effet** :
- L'écran s'assombrit progressivement
- Compteur géant au centre qui décompte les centimes perdus
- Message : "Chaque seconde sans site vous coûte de l'argent. Agissez maintenant."
- Le compteur augmente de 0.01€ toutes les 10ms  
**Retour** : Cliquer n'importe où pour fermer l'overlay

---

## 🎨 ZONES D'EXCLUSION

Certaines zones sont **exclues** des easter eggs pour éviter les bugs :

- **Formulaire modal** : Pas de curseurs emoji ni d'effets
- **Bandeau défilant (marquee)** : Pas d'animations de vibration
- **Section Jean-Charles** : Curseur laggy uniquement (pas de curseurs emoji)

---

## 🛠️ DÉTAILS TECHNIQUES

### Curseurs Emoji
- Format : SVG data-URL encodé
- Taille : 32x32px
- Fallback : curseur système si le SVG ne charge pas

### Animations
- **Shake** : 0.3-0.5s avec transform translate + rotate
- **Fade** : 1s ease-out
- **Confetti** : 2s ease-out avec rotate 360° et opacity

### Sons
- Format : Base64 WAV embarqué dans le JS
- Fallback silencieux si l'audio ne peut pas être joué (politique du navigateur)

### Performance
- Tous les event listeners sont optimisés (passive, once, debounce)
- Les animations utilisent `transform` et `opacity` (GPU-accelerated)
- Pas de modification du DOM sauf si nécessaire

---

## 🎯 STATISTIQUES

- **Nombre total d'easter eggs** : 12
- **Triggers clavier** : 3 (Konami, Exorcisme, Idle reset)
- **Triggers souris** : 6 (Curseurs, Rage Click, JC, Thermal, Sabrage)
- **Triggers automatiques** : 3 (Console, Titre onglet, Copyright)

---

## 🚀 PHILOSOPHIE

Ces easter eggs renforcent l'identité de Tomorrow.Online :

1. **Vitesse** : 24H, chrono, temps qui file
2. **Mercenaires** : Équipe d'élite, expertise technique
3. **Code** : Confettis-code, console, Matrix mode
4. **Urgence** : Idle timer, copyright futuriste
5. **Fun** : Rage click, sabrage, exorcisme

---

**Dernière mise à jour** : 31 janvier 2026  
**Maintenu par** : Big Neurons Agency / Tomorrow.Online
