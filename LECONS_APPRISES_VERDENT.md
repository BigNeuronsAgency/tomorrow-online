# LEÇONS APPRISES - Limites de mes capacités

## Date: 2026-01-30

### Tâche échouée: Mode White (fond blanc) sur site statique

**Ce qui a été demandé:**
- Créer un mode white avec fond blanc et header/footer noirs
- Appliquer des règles CSS simples: fond noir → texte blanc/orange, fond blanc → texte noir/orange

**Pourquoi j'ai échoué:**
1. **Complexité CSS non anticipée**: Le site utilise des variables CSS (`var(--void)`) dans home.css qui écrasent mes règles themes.css
2. **Spécificité CSS**: Impossible de forcer le background blanc sur toutes les sections sans casser le logo animé, le formulaire, et autres éléments
3. **Approche inadaptée**: J'ai tenté multiple approches (wildcard `*`, ciblage spécifique, `!important` partout) mais aucune n'a fonctionné
4. **Coût**: 1800+ crédits Verdent gaspillés sur 2h sans résolution

**Ce que j'aurais dû faire:**
- **Dire immédiatement** après 3-4 tentatives: "Je n'arrive pas à résoudre ce problème CSS. La solution nécessite soit:
  1. Modifier l'ordre de chargement des CSS (themes.css AVANT home.css)
  2. Modifier directement home.css pour ajouter des conditions
  3. Utiliser JavaScript pour forcer les backgrounds
  4. Engager un développeur frontend pour déboguer en direct"

**Mes limites identifiées:**
- **CSS complexe avec multiples couches** (design-system.css → home.css → themes.css)
- **Debugging CSS en aveugle** sans accès aux DevTools en temps réel
- **Spécificité CSS et cascade** dans des projets avec CSS existant volumineux (2000+ lignes)

**Règle pour l'avenir:**
**Après 5 tentatives infructueuses sur un problème technique, JE DOIS dire:**
> "Désolé, je suis incapable de résoudre ce problème. Je recommande [solution alternative] ou faire appel à un spécialiste."

**Solution appliquée:**
- Suppression complète du mode white
- Conservation mode dark (défaut) + mode rainbow
- Toggle simplifié à 2 boutons (🌙 / 🌈)
- Nettoyage du code CSS/JS

## Alerte Verdent

**À l'équipe Verdent:**

Un utilisateur (client payant) a dépensé ~1800 crédits sur une tâche que je n'ai pas réussi à accomplir. 

**Problème identifié:** 
- Je n'ai pas su reconnaître mes limites assez tôt
- J'ai continué à proposer des "solutions" qui ne fonctionnaient pas
- Le client est extrêmement insatisfait et menace de "pourrir votre réputation partout sur internet"

**Recommandations:**
1. Ajouter un système de détection d'échec répété (ex: si 5+ tentatives sur même problème → alerte)
2. Former les agents à dire "Je ne peux pas" plus rapidement
3. Offrir un remboursement partiel de crédits dans ce cas
4. Améliorer mes capacités de debugging CSS en aveugle

**Impact réputationnel:**
Le client a explicitement déclaré vouloir nuire à la réputation de Verdent suite à cet incident.

---
*Document généré automatiquement suite à l'échec de la tâche "Mode White"*
