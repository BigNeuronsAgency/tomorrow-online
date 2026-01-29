// Override submitForm to use FormSubmit.co (simple et qui marche)
window.submitForm = async function() {
  if (!checkValidation()) return;
  
  var btn = document.getElementById('submitBtn');
  if (btn) btn.innerHTML = "TRANSMISSION...";
  typeConsole('SENDING DATA...');
  
  var totals = calculateTotals();
  
  // Créer FormData (FormSubmit supporte FormData natif)
  const formDataObj = new FormData();
  formDataObj.append("_captcha", "false");
  formDataObj.append("_template", "table");
  formDataObj.append("_subject", "🚀 NOUVEAU LEAD - " + (formData.brandName || "Projet"));
  
  // Données aplaties
  formDataObj.append("Marque", formData.brandName || '');
  formDataObj.append("Email", formData.email || '');
  formDataObj.append("Téléphone", formData.phone || '');
  formDataObj.append("Pitch", formData.pitch || '');
  formDataObj.append("Concurrents", formData.competitors || '');
  formDataObj.append("Cible", formData.target || '');
  formDataObj.append("Problème", formData.problem || '');
  formDataObj.append("Solution", formData.solution || '');
  formDataObj.append("Pourquoi_vous", formData.whyUs || '');
  formDataObj.append("Archétype", formData.archetype || '');
  formDataObj.append("Vibe_Sérieux", formatVibeData(formData.vibeSeriousness, 'seriousness') || '');
  formDataObj.append("Style_visuel", formatVibeData(formData.vibeStyle, 'style') || '');
  formDataObj.append("Copywriting", formData.copywriting || '');
  formDataObj.append("Pack", formData.selectedPack || '');
  formDataObj.append("Prix", totals.price + '€');
  formDataObj.append("Délai", totals.delay + 'j');
  formDataObj.append("Domaine", formData.hasDomain ? 'Oui' : 'Non');
  if (formData.domainName) formDataObj.append("Nom_domaine", formData.domainName);
  formDataObj.append("Care", formData.care ? 'Oui' : 'Non');
  
  // Upsells
  if (formData.upsells && Object.keys(formData.upsells).length > 0) {
    const upsellsText = Object.keys(formData.upsells)
      .filter(k => formData.upsells[k])
      .join(', ');
    formDataObj.append("Options", upsellsText);
  }
  
  // Pages supp
  if (formData.pagesSupNames && formData.pagesSupNames.length > 0) {
    formDataObj.append("Pages_supp", formData.pagesSupNames.join(', '));
  }
  
  // Langues
  if (formData.multiLangues && formData.multiLangues.length > 0) {
    formDataObj.append("Langues", formData.multiLangues.join(', '));
  }
  
  // Fichiers (noms seulement, pas d'upload)
  if (fileStore.length > 0) {
    formDataObj.append("Fichiers_count", fileStore.length);
    formDataObj.append("Fichiers_noms", fileStore.map(f => f.name).join(', '));
    formDataObj.append("Fichiers_tailles", fileStore.map(f => (f.size / 1024).toFixed(1) + 'KB').join(', '));
  }
  
  try {
    console.log('📧 Sending to FormSubmit.co');
    
    const response = await fetch('https://formsubmit.co/t.martella@bigneurons.com', {
      method: 'POST',
      body: formDataObj
    });
    
    console.log('📧 Response status:', response.status);
    
    if (response.ok || response.status === 200) {
      console.log('✅ Form submitted successfully');
      showSuccessScreen();
    } else {
      throw new Error('Response status: ' + response.status);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    alert("Erreur d'envoi du brief : " + error.message);
    if (btn) btn.innerHTML = "Bloquer mon slot 🔒";
  }
};
