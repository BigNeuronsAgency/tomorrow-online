// Override submitForm to use Express backend
window.submitForm = async function() {
  if (!checkValidation()) return;
  
  var btn = document.getElementById('submitBtn');
  if (btn) btn.innerHTML = "TRANSMISSION...";
  typeConsole('SENDING DATA...');
  
  var totals = calculateTotals();
  
  // Préparer les données
  const dataToSend = {
    brandName: formData.brandName || '',
    email: formData.email || '',
    phone: formData.phone || '',
    pitch: formData.pitch || '',
    competitors: formData.competitors || '',
    target: formData.target || '',
    problem: formData.problem || '',
    solution: formData.solution || '',
    whyUs: formData.whyUs || '',
    archetype: formData.archetype || '',
    vibeSeriousness: formatVibeData(formData.vibeSeriousness, 'seriousness') || '',
    vibeStyle: formatVibeData(formData.vibeStyle, 'style') || '',
    copywriting: formData.copywriting || '',
    selectedPack: formData.selectedPack || '',
    price: totals.price,
    delay: totals.delay,
    hasDomain: formData.hasDomain ? 'Oui' : 'Non',
    domainName: formData.domainName || '',
    care: formData.care ? 'Oui' : 'Non'
  };
  
  // Upsells
  if (formData.upsells && Object.keys(formData.upsells).length > 0) {
    dataToSend.upsells = Object.keys(formData.upsells)
      .filter(k => formData.upsells[k])
      .join(', ');
  }
  
  // Pages supp
  if (formData.pagesSupNames && formData.pagesSupNames.length > 0) {
    dataToSend.pagesSupNames = formData.pagesSupNames.join(', ');
  }
  
  // Langues
  if (formData.multiLangues && formData.multiLangues.length > 0) {
    dataToSend.multiLangues = formData.multiLangues.join(', ');
  }
  
  // Convert files to base64
  const filePromises = fileStore.map(file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          content: reader.result,
          size: (file.size / 1024).toFixed(1) + 'KB'
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  });
  
  try {
    const files = await Promise.all(filePromises);
    dataToSend.files = files;
    console.log('📧 Sending to Express backend with', files.length, 'files');
    
    const response = await fetch('/api/submit-brief', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });
    
    console.log('📧 Response status:', response.status);
    const result = await response.json();
    console.log('✅ Result:', result);
    
    if (result.success) {
      showSuccessScreen();
    } else {
      throw new Error(result.error || 'Erreur inconnue');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    alert("Erreur d'envoi du brief : " + error.message);
    if (btn) btn.innerHTML = "Bloquer mon slot 🔒";
  }
};
