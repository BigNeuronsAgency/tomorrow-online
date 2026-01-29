// Submit form via Web3Forms + Cloudinary upload
window.submitForm = async function() {
  if (!checkValidation()) return;
  
  var btn = document.getElementById('submitBtn');
  if (btn) btn.innerHTML = "TRANSMISSION...";
  typeConsole('SENDING DATA...');
  
  var totals = calculateTotals();
  
  // Upload files to Cloudinary FIRST
  let fileLinks = [];
  if (fileStore.length > 0) {
    console.log('📤 Uploading', fileStore.length, 'files to Cloudinary...');
    btn.innerHTML = "UPLOAD FICHIERS...";
    
    for (const file of fileStore) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'tomorrow-briefs');
        formData.append('folder', 'tomorrow-briefs');
        
        const response = await fetch('https://api.cloudinary.com/v1_1/dzafqfsbo/auto/upload', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.secure_url) {
          fileLinks.push({
            name: file.name,
            url: result.secure_url,
            size: (file.size / 1024).toFixed(1) + 'KB'
          });
          console.log('✅ Uploaded:', file.name);
        } else {
          fileLinks.push({
            name: file.name,
            url: 'FAILED',
            size: (file.size / 1024).toFixed(1) + 'KB'
          });
          console.error('❌ Upload failed for:', file.name);
        }
      } catch (error) {
        console.error('❌ Upload error for', file.name, error);
        fileLinks.push({
          name: file.name,
          url: 'ERROR',
          size: (file.size / 1024).toFixed(1) + 'KB'
        });
      }
    }
  }
  
  btn.innerHTML = "ENVOI EMAIL...";
  
  // Préparer FormData pour Web3Forms
  const formData = new FormData();
  formData.append('access_key', '2aeb47c5-ac88-4de0-9d2e-4025e72d2c9e');
  formData.append('subject', '🚀 NOUVEAU LEAD - ' + (window.formData.brandName || 'Projet'));
  formData.append('from_name', window.formData.brandName || 'Client');
  formData.append('redirect', 'false');
  
  // Données du brief
  formData.append('Marque', window.formData.brandName || '');
  formData.append('Email', window.formData.email || '');
  formData.append('Téléphone', window.formData.phone || '');
  formData.append('Pitch', window.formData.pitch || '');
  formData.append('Concurrents', window.formData.competitors || '');
  formData.append('Cible', window.formData.target || '');
  formData.append('Problème', window.formData.problem || '');
  formData.append('Solution', window.formData.solution || '');
  formData.append('Pourquoi_vous', window.formData.whyUs || '');
  formData.append('Archétype', window.formData.archetype || '');
  formData.append('Vibe_Sérieux', formatVibeData(window.formData.vibeSeriousness, 'seriousness') || '');
  formData.append('Style_visuel', formatVibeData(window.formData.vibeStyle, 'style') || '');
  formData.append('Copywriting', window.formData.copywriting || '');
  formData.append('Pack_sélectionné', window.formData.selectedPack || '');
  formData.append('Prix', totals.price + '€');
  formData.append('Délai', totals.delay + 'j');
  formData.append('Domaine', window.formData.hasDomain ? 'Oui' : 'Non');
  if (window.formData.domainName) formData.append('Nom_domaine', window.formData.domainName);
  formData.append('Care', window.formData.care ? 'Oui' : 'Non');
  
  // Upsells
  if (window.formData.upsells && Object.keys(window.formData.upsells).length > 0) {
    const upsellsText = Object.keys(window.formData.upsells)
      .filter(k => window.formData.upsells[k])
      .join(', ');
    formData.append('Options', upsellsText);
  }
  
  // Pages supp
  if (window.formData.pagesSupNames && window.formData.pagesSupNames.length > 0) {
    formData.append('Pages_supplémentaires', window.formData.pagesSupNames.join(', '));
  }
  
  // Langues
  if (window.formData.multiLangues && window.formData.multiLangues.length > 0) {
    formData.append('Langues', window.formData.multiLangues.join(', '));
  }
  
  // Fichiers avec liens Cloudinary
  if (fileLinks.length > 0) {
    formData.append('Fichiers_count', fileLinks.length);
    const filesText = fileLinks.map(f => `${f.name} (${f.size}) : ${f.url}`).join('\n\n');
    formData.append('Fichiers_liens', filesText);
  }
  
  try {
    console.log('📧 Sending via Web3Forms...');
    
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    
    console.log('📧 Response status:', response.status);
    const result = await response.json();
    console.log('✅ Result:', result);
    
    if (result.success) {
      console.log('✅ Email sent successfully');
      showSuccessScreen();
    } else {
      throw new Error(result.message || 'Erreur inconnue');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    alert("Erreur d'envoi du brief : " + error.message);
    if (btn) btn.innerHTML = "Bloquer mon slot 🔒";
  }
};
