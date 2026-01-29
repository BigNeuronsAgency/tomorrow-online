#!/bin/bash

# Script de transformation automatique des pages en design noir

cd "/Users/secondmac/Downloads/TOMORROW ONLINE/tomorrow-site"

# Pages à transformer
PAGES=(
  "mentions-legales.html"
  "migrations.html"
  "la-vision-tomorrow.html"
  "process-24h.html"
  "realisations.html"
  "notre-histoire.html"
  "comparatif-solutions-web.html"
)

MIGRATION_PAGES=(
  "migrations/wordpress.html"
  "migrations/shopify.html"
  "migrations/wix.html"
  "migrations/squarespace.html"
  "migrations/joomla.html"
)

echo "🔥 TRANSFORMATION EN COURS - Design NOIR + ORANGE-ROUGE"

for page in "${PAGES[@]}"; do
  if [ -f "$page" ]; then
    echo "→ Transformation de $page..."
    
    # Remplacer fond blanc par noir
    sed -i '' 's/background: #FFFFFF/background: #000000/g' "$page"
    sed -i '' 's/background:#FFFFFF/background:#000000/g' "$page"
    sed -i '' 's/background-color: #FFFFFF/background-color: #000000/g' "$page"
    sed -i '' 's/background-color:#FFFFFF/background-color:#000000/g' "$page"
    sed -i '' 's/bg-white/bg-void/g' "$page"
    
    # Remplacer texte noir par blanc
    sed -i '' 's/color: #000000/color: #FFFFFF/g' "$page"
    sed -i '' 's/color:#000000/color:#FFFFFF/g' "$page"
    sed -i '' 's/text-black/text-white/g' "$page"
    
    # Remplacer gradient violet-rouge par orange-rouge
    sed -i '' 's/rgba(180,7,254,1)/#FF5500/g' "$page"
    sed -i '' 's/rgba(180, 7, 254, 1)/#FF5500/g' "$page"
    sed -i '' 's/rgba(255,10,55,1)/#FF0000/g' "$page"
    sed -i '' 's/rgba(255, 10, 55, 1)/#FF0000/g' "$page"
    
    # Remplacer les couleurs inline
    sed -i '' 's/style="color: #000"/style="color: #FFF"/g' "$page"
    sed -i '' 's/style="background: #FFF"/style="background: #000"/g' "$page"
    
    echo "✅ $page transformée"
  else
    echo "❌ $page introuvable"
  fi
done

echo ""
echo "🔥 Transformation des sous-pages migrations..."

for page in "${MIGRATION_PAGES[@]}"; do
  if [ -f "$page" ]; then
    echo "→ Transformation de $page..."
    
    # Mêmes transformations
    sed -i '' 's/background: #FFFFFF/background: #000000/g' "$page"
    sed -i '' 's/background:#FFFFFF/background:#000000/g' "$page"
    sed -i '' 's/background-color: #FFFFFF/background-color: #000000/g' "$page"
    sed -i '' 's/background-color:#FFFFFF/background-color:#000000/g' "$page"
    sed -i '' 's/color: #000000/color: #FFFFFF/g' "$page"
    sed -i '' 's/color:#000000/color:#FFFFFF/g' "$page"
    sed -i '' 's/rgba(180,7,254,1)/#FF5500/g' "$page"
    sed -i '' 's/rgba(180, 7, 254, 1)/#FF5500/g' "$page"
    sed -i '' 's/rgba(255,10,55,1)/#FF0000/g' "$page"
    sed -i '' 's/rgba(255, 10, 55, 1)/#FF0000/g' "$page"
    
    echo "✅ $page transformée"
  else
    echo "❌ $page introuvable"
  fi
done

echo ""
echo "✨ TRANSFORMATION TERMINÉE"
echo "→ Toutes les pages sont maintenant en NOIR + ORANGE-ROUGE"
