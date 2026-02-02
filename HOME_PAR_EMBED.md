# Home Tomorrow.Online — Découpée par embed
Colle chaque bloc ci‑dessous dans l’embed Webflow correspondant. Aucune troncature, URLs inchangées.


========== HEAD (Custom Code Head de la page / site) ==========

```html
<head>
  <meta charset="utf-8">
  <title>tomorrow.online</title>
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <link href="css/normalize.css" rel="stylesheet" type="text/css">
  <link href="css/webflow.css" rel="stylesheet" type="text/css">
  <link href="css/tomorrow-online-test.webflow.css" rel="stylesheet" type="text/css">
  <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>
  <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon">
  <link href="images/webclip.png" rel="apple-touch-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
  <style>
    :root { --bg: #FFFFFF; --fg: #000000; --accent: #FF3333; --grid: #E5E5E5; }
    /* FIX MOBILE GLOBAL */
    html, body { 
        overflow-x: hidden; 
        max-width: 100vw; 
        width: 100%;
        margin: 0; padding: 0;
    }
    body { background-color: var(--bg); color: var(--fg); font-family: 'Space Grotesk', sans-serif; }
    .font-heading { font-family: 'Space Grotesk', sans-serif; }
    .font-mono { font-family: 'Space Grotesk', sans-serif; }
    /* FIX SIZING MOBILE */
    .title-giant { font-size: clamp(2.5rem, 11vw, 10rem); line-height: 0.85; letter-spacing: -0.03em; font-weight: 900; text-transform: uppercase; word-wrap: break-word; }
    .tech-grid {
        background-size: 60px 60px;
        background-image: linear-gradient(to right, var(--grid) 1px, transparent 1px), linear-gradient(to bottom, var(--grid) 1px, transparent 1px);
        mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    }
    .b-r { border-right: 1px solid var(--grid); } .b-b { border-bottom: 1px solid var(--grid); } .b-t { border-top: 1px solid var(--grid); } .b-l { border-left: 1px solid var(--grid); }
    .btn-primary { 
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        padding: 1rem 2rem;
        background: linear-gradient(90deg, rgba(180, 7, 254, 1) 0%, rgba(255, 10, 55, 1) 100%);
        color: #FFFFFF;
        cursor: pointer;
        border-radius: 0;
        border-top: 1px solid rgba(180, 7, 254, 1);
        border-left: 1px solid rgba(180, 7, 254, 1);
        border-bottom: 1px solid rgba(255, 10, 55, 1);
        border-right: 1px solid rgba(255, 10, 55, 1);
        transition: all 0.3s ease;
    }
    .btn-primary:hover { 
        border-top: 2px solid rgba(180, 7, 254, 1);
        border-left: 2px solid rgba(180, 7, 254, 1);
        border-bottom: 2px solid rgba(255, 10, 55, 1);
        border-right: 2px solid rgba(255, 10, 55, 1);
        box-shadow: rgba(180, 7, 254, 0.4) 5px 5px, rgba(255, 10, 55, 0.3) 10px 10px, rgba(180, 7, 254, 0.2) 15px 15px;
        transform: translateY(-2px);
    }
    .btn-outline { border: 1px solid black; transition: all 0.2s ease; cursor: pointer; }
    .btn-outline:hover { background-color: black; color: white; }
    .marquee-container { overflow: hidden; white-space: nowrap; }
    .marquee-content { display: inline-block; }
    .modal-overlay { backdrop-filter: blur(10px); }
    .hide-scroll::-webkit-scrollbar { height: 4px; }
    .hide-scroll::-webkit-scrollbar-track { background: #f1f1f1; }
    .hide-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg, rgba(180, 7, 254, 1) 0%, rgba(255, 10, 55, 1) 100%); }
    .hide-scroll { cursor: grab; }
    .hide-scroll:active { cursor: grabbing; }
    .step-content { display: none; animation: fadeIn 0.4s ease-out; }
    .step-content.active { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .detail-link { font-family: 'Space Grotesk', sans-serif; font-size: 12px; color: #525252; text-transform: uppercase; cursor: pointer; min-height: 44px; min-width: 44px; display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 0.75rem; transition: color 0.2s, background 0.2s; }
    .detail-link:hover { background: linear-gradient(90deg, rgba(180, 7, 254, 1) 0%, rgba(255, 10, 55, 1) 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; text-decoration: underline; }
    /* CLASSES SPECIFIQUES */
    .hero-load { opacity: 0; transform: translateY(20px); }
    .logo-white { filter: invert(1) brightness(100); }
    .care-option { border: 1px solid #E5E5E5; padding: 1rem; cursor: pointer; transition: all 0.2s; }
    .care-option:hover { border-color: #000; }
    .care-option.selected { border-color: rgba(180, 7, 254, 1); background-color: #FFF5F5; }
    .success-check { width: 80px; height: 80px; border-radius: 50%; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 40px; margin: 0 auto 20px; animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
    /* PSYCHO HOVER (Desktop Only) */
    @media (min-width: 768px) {
        #pricing .grid:hover > div { opacity: 0.4; filter: grayscale(100%); transform: scale(0.98); }
        #pricing .grid:hover > div:hover { opacity: 1; filter: grayscale(0%); transform: scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.1); z-index: 10; }
        #pricing .grid > div { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    }
    /* STYLE EASTER EGG */
    .video-modal-border { box-shadow: 0 0 0 1px #333, 0 0 40px rgba(255, 51, 51, 0.2); }
    /* --- WEGLOT CUSTOM SWITCHER --- */
    .lang-switch-container {
        position: fixed;
        bottom: 1.5rem;
        left: 1.5rem;
        z-index: 9990;
        display: flex;
        border: 1px solid black;
        background: white;
        box-shadow: 4px 4px 0px 0px #000000;
        transition: transform 0.2s;
    }
    .lang-switch-container:hover {
        transform: translateY(-2px);
        box-shadow: 6px 6px 0px 0px #000000;
    }
    .lang-link {
        padding: 0.75rem 1rem;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 10px;
        font-weight: bold;
        text-transform: uppercase;
        color: #999;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.2s;
    }
    .lang-link:hover { background: #f0f0f0; color: black; }
    .lang-link.active { background: black; color: white; }
    .lang-sep { width: 1px; background: #eee; }
    /* OVERRIDES GRADIENT POUR #FF3333 */
    .text-\[\#FF3333\]{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important;-webkit-background-clip:text!important;background-clip:text!important;-webkit-text-fill-color:transparent!important}
    .hover\:text-\[\#FF3333\]:hover{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important;-webkit-background-clip:text!important;background-clip:text!important;-webkit-text-fill-color:transparent!important}
    .group:hover .group-hover\:text-\[\#FF3333\]{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important;-webkit-background-clip:text!important;background-clip:text!important;-webkit-text-fill-color:transparent!important}
    .bg-\[\#FF3333\]{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important}
    .hover\:bg-\[\#FF3333\]:hover{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important}
    .border-\[\#FF3333\]{border-color:rgba(180,7,254,1)!important}
    .border-l-4.border-\[\#FF3333\]{border-left:4px solid transparent!important;border-image:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%) 1!important}
    .hover\:border-\[\#FF3333\]:hover{border-color:rgba(180,7,254,1)!important}
    .from-\[\#FF3333\]{--tw-gradient-from:rgba(180,7,254,1) var(--tw-gradient-from-position)!important;--tw-gradient-to:rgba(255,10,55,0) var(--tw-gradient-to-position)!important;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)!important}
    /* OVERRIDES PRICE CARD GRADIENT */
    .bg-\[\#FF3333\] .bg-white{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important}
    .bg-\[\#FF3333\] .text-\[\#FF3333\]{color:white!important;background:none!important;-webkit-text-fill-color:white!important}
    .price-badge{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important}
    /* OVERRIDES FORMULAIRE STEP 3 */
    #arch-innocent.bg-black,#arch-explorer.bg-black,#arch-sage.bg-black,#arch-hero.bg-black,#arch-outlaw.bg-black,#arch-magician.bg-black,#arch-everyman.bg-black,#arch-lover.bg-black,#arch-jester.bg-black,#arch-caregiver.bg-black,#arch-creator.bg-black,#arch-ruler.bg-black{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important}
    #copy-me.bg-black,#copy-arthur.bg-black{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important}
    .shadow-\[4px_4px_0px_0px_\#FF3333\]{box-shadow:4px 4px 0px 0px rgba(180,7,254,1)!important}
    .shadow-\[8px_8px_0px_0px_\#FF3333\]{box-shadow:8px 8px 0px 0px rgba(180,7,254,1)!important}
    /* OVERRIDE GRADIENT "EST MORTE" COMPLET */
    .text-transparent.bg-clip-text.bg-gradient-to-r.from-\[\#FF3333\].to-black{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important;-webkit-background-clip:text!important;background-clip:text!important;-webkit-text-fill-color:transparent!important}
    /* OVERRIDE INPUT RANGE (BARRES DE NIVEAU VIBE) */
    .accent-\[\#FF3333\]{accent-color:rgba(180,7,254,1)!important}
    input[type="range"].accent-\[\#FF3333\]::-webkit-slider-thumb{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important}
    input[type="range"].accent-\[\#FF3333\]::-moz-range-thumb{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%)!important}
    /* OVERRIDE FOCUS BORDER FORMULAIRE */
    .focus\:border-\[\#FF3333\]:focus{border-color:rgba(180,7,254,1)!important}
</style>
  <script type="text/javascript" src="https://cdn.weglot.com/weglot.min.js"></script>
  <script>
    Weglot.initialize({
        api_key: 'wg_3b8be3f3773886e6a9139b91c364f46f1',
        hide_switcher: true
    });
</script>
</head>
```


========== EMBED 1 ==========

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
    
    <script type="text/javascript" src="https://cdn.weglot.com/weglot.min.js"></script>
    <script>Weglot.initialize({api_key:'wg_3b8be3f3773886e6a9139b91c364f46f1',hide_switcher:true});</script>
    <div class="fixed inset-0 tech-grid pointer-events-none z-0"></div>
    <div class="fixed top-0 w-full z-[60] bg-black text-white h-8 flex items-center">
      <div class="grid grid-cols-2 w-full font-mono text-xs uppercase tracking-widest px-6 md:px-10">
        <div id="live-slot" class="flex items-center">Slots disponibles par jour : <span class="ml-2">3</span></div>
        <div class="hidden md:flex items-center justify-end">Propulsé par BIG NEURONS™</div>
      </div>
    </div>
    <nav class="fixed top-8 w-full z-50 bg-white/90 backdrop-blur-md b-b flex justify-between items-stretch h-20 md:h-32">
      <div onclick="window.scrollToTop()" class="flex items-center px-6 md:px-10 b-r hover:bg-gray-50 cursor-pointer transition-colors">
        <img src="images/TO-logo-baseline.svg" alt="Tomorrow.online" class="h-12 md:h-24 w-auto">
      </div>
      <div class="hidden md:flex flex-grow items-center justify-end px-10 gap-8 font-heading font-bold text-sm uppercase tracking-wide">
        <a href="process-24h.html" class="nav-link">Process</a>
        <a href="realisations.html" class="nav-link">Réalisations</a>
        <div class="dropdown">
          <span class="nav-link">Ressources<span class="dropdown-arrow">▼</span></span>
          <div class="dropdown-content">
            <a href="la-vision-tomorrow.html">🔮 Notre Vision</a>
            <a href="notre-histoire.html">🏢 Qui sommes-nous</a>
            <a href="comparatif-solutions-web.html">⚡ Comparatif Solutions</a>
            <a href="migrations.html">🔄 Migrations CMS</a>
          </div>
        </div>
      </div>
      <div class="md:hidden flex items-center px-6">
        <button class="mobile-menu-btn text-2xl" onclick="document.getElementById('mobileMenu').classList.toggle('active')">☰</button>
      </div>
      <div class="flex items-center">
        <div onclick="window.openModal()" class="h-full flex items-center px-6 md:px-12 bg-[#FF3333] text-white font-heading font-bold text-xs md:text-sm uppercase hover:bg-black transition-colors cursor-pointer">Réserver mon créneau</div>
      </div>
    </nav>
    <div id="mobileMenu" class="mobile-menu">
      <a href="process-24h.html">Process</a>
      <a href="realisations.html">Réalisations</a>
      <div class="dropdown" onclick="this.classList.toggle('active')">
        <span>Ressources ▼</span>
        <div class="dropdown-content">
          <a href="la-vision-tomorrow.html">🔮 Notre Vision</a>
          <a href="notre-histoire.html">🏢 Qui sommes-nous</a>
          <a href="comparatif-solutions-web.html">⚡ Comparatif Solutions</a>
          <a href="migrations.html">🔄 Migrations CMS</a>
        </div>
      </div>
    </div>
    <header class="relative pt-[112px] md:pt-[160px] min-h-screen flex flex-col justify-between z-10">
      <div class="flex-grow flex flex-col justify-center px-4 md:px-10 py-12 md:py-24">
        <h1 class="title-giant text-black mb-6 reveal-text hero-load">ON CONSTRUIT<br>VOTRE SITE<br><span class="text-[#FF3333]">EN 24H<span class="text-[#FF3333] font-bold">*</span></span></h1>
        <div class="md:w-1/3 reveal-text delay-100 hero-load">
          <p class="text-xl md:text-2xl font-medium leading-tight mb-8 pl-4 border-l-4 border-[#FF3333]"><span class="text-[#FF3333] font-bold">*</span>Sinon <span class="bg-black text-white px-1">on vous rembourse.</span><br>La lenteur est un choix.</p>
          <div class="flex flex-col md:flex-row gap-4 items-start"><div><div onclick="window.openModal()" class="btn-primary px-8 py-4 font-heading font-bold uppercase tracking-wide text-center">Démarrer mon projet en 24H</div><p class="mt-2 font-mono text-xs text-gray-600 uppercase">Formulaire rapide en 2 min</p></div><a onclick="window.smoothScroll('#work')" class="btn-outline px-8 py-4 font-heading font-bold uppercase tracking-wide text-center">+ de preuves</a></div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 b-t bg-white relative z-20">
        <div class="p-8 b-r md:h-48 flex flex-col justify-between hover:bg-gray-50 transition group"><span class="font-mono text-xs text-gray-600 group-hover:text-[#FF3333]">01 / SQUAD</span><span class="font-heading font-bold text-2xl uppercase">Seniors Only.<br>Pas de Juniors.</span></div>
        <div class="p-8 b-r md:h-48 flex flex-col justify-between hover:bg-gray-50 transition group"><span class="font-mono text-xs text-gray-600 group-hover:text-[#FF3333]">02 / STACK</span><span class="font-heading font-bold text-2xl uppercase">Human Art.<br>Boost IA.</span></div>
        <div class="p-8 md:h-48 flex flex-col justify-between hover:bg-gray-50 transition group"><span class="font-mono text-xs text-gray-600 group-hover:text-[#FF3333]">03 / PROMISE</span><span class="font-heading font-bold text-2xl uppercase">Tomorrow<br>en ligne.</span></div>
      </div>
    </header>
    <div class="text-white py-6 b-t b-b z-20 relative marquee-container" style="background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%);">
      <div class="marquee-content font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter">SOYEZ IMPATIENTS : L'ATTENTE EST UN BUG. <span class="text-white mx-4">///</span> QUALITÉ CHIRURGICALE. <span class="text-white mx-4">///</span> VITESSE BRUTALE. <span class="text-white mx-4">///</span> EXPERTISE HUMAINE. <span class="text-white mx-4">///</span>LA VITESSE EST UNE FONCTIONNALITÉ. <span class="text-white mx-4">///</span></div>
    </div>
    <section id="manifesto" class="py-8 md:py-12 px-4 md:px-10 bg-white relative z-10 border-t border-gray-200">
      <div class="grid md:grid-cols-12 gap-10">
        <div class="md:col-span-8">
          <h2 class="font-heading font-black text-5xl md:text-8xl uppercase mb-10 leading-[0.9]"><span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3333] to-black">BE IMPATIENT</span></h2>
          <div class="text-xl md:text-2xl font-medium leading-relaxed space-y-8">
            <p>Hier, il était normal de patienter 5 semaines pour un site,<br>comme il était commun d’attendre 2 semaines pour développer une photo.
            </p>
            <p class="text-gray-600 italic border-l-2 border-gray-200 pl-4">Mais les avancées tech’ et les exigences du nouveau monde — toujours plus rapide — interdisent ce genre de délais.</p>
            <p>Et si certaines agences préfèrent vous facturer le temps passé à la machine à café,<strong> Tomorrow.Online </strong> ne vous vend que des résultats.
            </p>
            <p class="font-bold border-l-4 border-black pl-4">
              <br>Pas dans 1 mois. Ni dans 1 semaine.<br>Tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="pricing-top" class="py-8 md:py-12 px-4 md:px-10 bg-white relative z-10">
      <h2 class="font-heading font-black text-5xl md:text-7xl uppercase mb-4">3 Offres<span class="text-[#FF3333]">.</span></h2>
      <p class="font-mono text-sm text-gray-600 mb-16 uppercase">2 créneaux par jour. 1 site sur mesure.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 border-t border-l border-gray-200">
        <div class="border-r border-b border-gray-200 p-8 md:p-8 hover:bg-gray-50 transition group flex flex-col relative">
          <div onclick="window.openDetails('MAQUETTE')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>
          <div class="font-mono text-[10px] border border-gray-300 text-gray-600 w-fit px-3 py-1 mb-8 rounded-full uppercase">Maquette</div>
          <div class="font-heading font-black text-5xl mb-2">12H</div>
          <div class="font-heading font-bold text-2xl text-[#FF3333] mb-8">900€ <span class="text-sm text-gray-400 font-normal">HT</span></div>
          <div class="font-bold text-sm mb-4">Design Only</div>
          <ul class="space-y-4 mb-12 flex-grow text-sm">
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Maquette intégrable</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> UX/UI CRO</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Copy + visuels</li>
            <li class="flex gap-3 opacity-50"><span class="w-1.5 h-1.5 bg-gray-300"></span> Sans code</li>
          </ul>
          <div onclick="window.openModal()" class="block w-full py-4 border-2 border-black text-center font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors cursor-pointer">>Bloquer mon slot</div>
        </div>
        <div class="border-r border-b border-gray-200 p-8 md:p-8 bg-[#FF3333] text-white transition group flex flex-col relative">
          <div class="absolute top-6 right-6 bg-white text-[#FF3333] text-[10px] font-bold px-2 py-1 uppercase">Populaire</div>
          <div onclick="window.openDetails('STARTER')" class="detail-link detail-link-on-dark absolute top-2 right-2 md:top-6 md:right-28 font-mono border-b border-transparent hover:border-white transition-all">Détails [ + ]</div>
          <div class="font-mono text-[10px] bg-white text-[#FF3333] w-fit px-3 py-1 mb-8 rounded-full uppercase">Starter</div>
          <div class="font-heading font-black text-5xl mb-2">24H</div>
          <div class="font-heading font-bold text-2xl text-white mb-8"><span class="price-strike">1500€</span> 980€ <span class="text-sm text-white/60 font-normal">HT</span> <span class="price-badge">Fin d'année</span></div>
          <div class="font-bold text-sm mb-4">Conversions instantanées</div>
          <ul class="space-y-4 mb-12 flex-grow text-sm">
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> One page / Landing</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> UX/UI CRO</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> Copy + visuels</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> Dev Webflow</li>
          </ul>
          <div onclick="window.openModal()" class="block w-full py-4 bg-white text-[#FF3333] text-center font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors cursor-pointer">>Bloquer mon slot</div>
        </div>
        <div class="border-r border-b border-gray-200 p-8 md:p-8 hover:bg-gray-50 transition group flex flex-col relative">
          <div onclick="window.openDetails('BUSINESS')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>
          <div class="font-mono text-[10px] border border-gray-300 text-gray-600 w-fit px-3 py-1 mb-8 rounded-full uppercase">Business</div>
          <div class="font-heading font-black text-5xl mb-2">48H</div>
          <div class="font-heading font-bold text-2xl text-[#FF3333] mb-8">2200€ <span class="text-sm text-gray-400 font-normal">HT</span></div>
          <div class="font-bold text-sm mb-4">Réassurance +</div>
          <ul class="space-y-4 mb-12 flex-grow text-sm">
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Max 5 pages</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> UX/CRO</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Copy + visuels</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Dev Webflow</li>
          </ul>
          <div onclick="window.openModal()" class="block w-full py-4 border-2 border-black text-center font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors cursor-pointer">>Bloquer mon slot</div>
        </div>
      </div>
      <a href="https://www.bigneurons.com" target="_blank" class="block w-full border-l border-r border-b border-gray-200 p-6 md:p-8 flex items-center justify-between group hover:bg-black hover:text-white transition cursor-pointer">
        <div>
          <div class="font-bold text-lg uppercase">Projet complexe ?</div>
          <p class="text-xs text-gray-600 group-hover:text-gray-500">Scale, SaaS, E-commerce</p>
        </div>
        <div class="text-sm border-b border-black group-hover:border-white">Big Neurons ↗</div>
      </a>
    </section>
    <section id="process" class="py-8 md:py-12 px-4 md:px-10 bg-white relative z-10 border-t border-gray-200">
      <div class="max-w-7xl mx-auto mb-16">
        <div class="flex justify-between items-start mb-6">
          <h2 class="font-heading font-black text-4xl md:text-7xl uppercase leading-[0.95]">Comment on fait ?<br>On triche ?<br><span class="text-[#FF3333]">Oui.</span></h2>
          <div onclick="window.openProcessDetails()" class="detail-link hidden md:inline-flex font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>
        </div>
        <p class="text-base md:text-lg max-w-4xl text-gray-700">Pendant que certains refusent l'IA ou produisent de la soupe déshumanisée, nous avons créé un process où humain et machine ne font qu'un.</p>
        <div onclick="window.openProcessDetails()" class="detail-link md:hidden mt-6 font-mono border-b border-transparent hover:border-black transition-all inline-flex">Détails [ + ]</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-l border-gray-200 max-w-7xl mx-auto">
        <div class="border-r border-b border-gray-200 p-8 md:p-10 bg-gray-50 hover:bg-white transition group relative">
          <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-heading font-bold text-sm group-hover:bg-[#FF3333] transition-colors">1</div>
          <div class="mb-6">
            <div class="font-mono text-xs font-bold text-gray-600 mb-2 uppercase">Étape 1</div>
            <h3 class="font-heading font-bold text-3xl uppercase mb-3 group-hover:text-[#FF3333] transition-colors">Brief</h3>
          </div>
          <p class="text-sm text-gray-700">Vous remplissez notre questionnaire détaillé. On veut tout savoir sur votre site, marché, concurrents, vision.</p>
        </div>
        <div class="border-r border-b border-gray-200 p-8 md:p-10 bg-gray-50 hover:bg-white transition group relative">
          <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-heading font-bold text-sm group-hover:bg-[#FF3333] transition-colors">2</div>
          <div class="mb-6">
            <div class="font-mono text-xs font-bold text-gray-600 mb-2 uppercase">Étape 2</div>
            <h3 class="font-heading font-bold text-3xl uppercase mb-3 group-hover:text-[#FF3333] transition-colors">Call</h3>
          </div>
          <p class="text-sm text-gray-700">Notre équipe vous contacte. On confirme le brief. Le paiement se fait à ce moment, si tout est validé.</p>
        </div>
        <div class="border-r border-b border-gray-200 p-8 md:p-10 bg-gray-50 hover:bg-white transition group relative">
          <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-heading font-bold text-sm group-hover:bg-[#FF3333] transition-colors">3</div>
          <div class="mb-6">
            <div class="font-mono text-xs font-bold text-gray-600 mb-2 uppercase">Étape 3</div>
            <h3 class="font-heading font-bold text-3xl uppercase mb-3 group-hover:text-[#FF3333] transition-colors">Deepwork</h3>
          </div>
          <p class="text-sm text-gray-700">On rédige vos textes, crée vos visuels, génère wireframe et design system. Humain + IA en symbiose.</p>
        </div>
        <div class="border-r border-b border-gray-200 p-8 md:p-10 bg-gray-50 hover:bg-white transition group relative">
          <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FF3333] text-white flex items-center justify-center font-heading font-bold text-sm group-hover:scale-110 transition-transform">4</div>
          <div class="mb-6">
            <div class="font-mono text-xs font-bold text-gray-600 mb-2 uppercase">Étape 4</div>
            <h3 class="font-heading font-bold text-3xl uppercase mb-3 group-hover:text-[#FF3333] transition-colors">Champagne</h3>
          </div>
          <p class="text-sm text-gray-700">Présentation visio, SEO, mise en ligne. On ouvre le Dom Pérignon. Votre site est live.</p>
        </div>
      </div>
      <div class="max-w-7xl mx-auto mt-16 text-center border-t-2 border-black pt-12">
        <p class="font-heading font-bold text-2xl md:text-3xl uppercase mb-6">Prêt à célébrer ?</p>
        <div onclick="window.openModal()" class="inline-block px-12 py-5 bg-[#FF3333] text-white font-heading font-black text-lg uppercase hover:bg-black transition-all cursor-pointer shadow-[8px_8px_0px_0px_#000000] hover:translate-y-1 hover:shadow-none">> Sabrer le champagne Tomorrow !</div>
        <p class="mt-6 font-mono text-xs text-gray-600 uppercase">24H chrono • Qualité garantie</p>
      </div>
    </section>
    <section id="squad" class="py-8 md:py-12 bg-white relative z-10 overflow-hidden">
      <div class="px-4 md:px-10 mb-10 flex justify-between items-end">
        <h2 class="font-heading font-black text-4xl md:text-6xl uppercase leading-tight">Votre équipe<br><span class="text-[#FF3333]">(de mercenaires)</span><br>pour les prochaines 24H.</h2>
        <div class="flex items-center gap-2 font-mono text-xs text-[#FF3333] animate-pulse"><span class="hidden md:inline">DRAG TO EXPLORE</span><span class="inline md:hidden">SWIPE</span>-></div>
      </div>
      <div class="relative">
        <div class="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>
        <div class="flex overflow-x-auto hide-scroll border-t border-b border-gray-200 snap-x snap-mandatory">
          <div class="min-w-[85vw] md:min-w-[25vw] border-r border-gray-200 p-10 hover:bg-gray-50 transition group snap-center flex flex-col justify-between">
            <div>
              <div class="font-mono text-xs text-gray-400 mb-6">STRATÉGIE</div>
              <div class="h-64 bg-gray-100 mb-6 relative overflow-hidden grayscale group-hover:grayscale-0 transition duration-500"><img src="images/PPTIMTOMORROW.jpeg" class="object-cover w-full h-full" alt="Strategist"></div>
              <h3 class="font-heading font-bold text-2xl uppercase mb-2">Le Stratège</h3>
              <p class="font-mono text-xs mb-4">15 ans d'XP • Ex-Codir</p>
              <p class="text-sm opacity-80">Il analyse votre marché, trouve la faille et briefe l'IA.</p>
            </div>
          </div>
          <div class="min-w-[85vw] md:min-w-[25vw] border-r border-gray-200 p-10 hover:bg-gray-50 transition group snap-center flex flex-col justify-between">
            <div>
              <div class="font-mono text-xs text-gray-400 mb-6">COPYWRITING</div>
              <div class="h-64 bg-gray-100 mb-6 relative overflow-hidden grayscale group-hover:grayscale-0 transition duration-500"><img src="images/PPARTHURTOMORROW.jpeg" class="object-cover w-full h-full" alt="Copywriter"></div>
              <h3 class="font-heading font-bold text-2xl uppercase mb-2">Le Publicitaire</h3>
              <p class="font-mono text-xs mb-4">5 ans d'XP • Focus Vente</p>
              <p class="text-sm opacity-80">Il injecte émotion et psycho de vente.</p>
            </div>
          </div>
          <div class="min-w-[85vw] md:min-w-[25vw] border-r border-gray-200 p-10 hover:bg-gray-50 transition group snap-center flex flex-col justify-between">
            <div>
              <div class="font-mono text-xs text-gray-400 mb-6">UX DESIGN</div>
              <div class="h-64 bg-gray-100 mb-6 relative overflow-hidden grayscale group-hover:grayscale-0 transition duration-500"><img src="images/PPMARIIATOMORROW.jpeg" class="object-cover w-full h-full" alt="UX Designer"></div>
              <h3 class="font-heading font-bold text-2xl uppercase mb-2">L'Architecte</h3>
              <p class="font-mono text-xs mb-4">5 ans d'XP • Pixel Perfect</p>
              <p class="text-sm opacity-80">Elle ne laisse rien au hasard : UX, Wireframe, CRO.</p>
            </div>
          </div>
          <div class="min-w-[85vw] md:min-w-[25vw] border-r border-gray-200 p-10 hover:bg-gray-50 transition group snap-center flex flex-col justify-between">
            <div>
              <div class="font-mono text-xs text-gray-400 mb-6">ART & ASSETS</div>
              <div class="h-64 bg-gray-100 mb-6 relative overflow-hidden grayscale group-hover:grayscale-0 transition duration-500"><img src="images/PPHAMIDTOMORROW.png" class="object-cover w-full h-full" alt="Illustrator"></div>
              <h3 class="font-heading font-bold text-2xl uppercase mb-2">L'Artiste</h3>
              <p class="font-mono text-xs mb-4">15 ans d'XP • Brutal Branding</p>
              <p class="text-sm opacity-80">Il crée l'identité visuelle et les assets qui frappent.</p>
            </div>
          </div>
          <div class="min-w-[85vw] md:min-w-[25vw] border-r border-gray-200 p-10 hover:bg-gray-50 transition group snap-center flex flex-col justify-between">
            <div>
              <div class="font-mono text-xs text-gray-400 mb-6">PILOTAGE</div>
              <div class="h-64 bg-gray-100 mb-6 relative overflow-hidden grayscale group-hover:grayscale-0 transition duration-500"><img src="images/PPMARIEFRANCINETOMORROW.jpg" class="object-cover w-full h-full" alt="Project Manager"></div>
              <h3 class="font-heading font-bold text-2xl uppercase mb-2">La Caporale</h3>
              <p class="font-mono text-xs mb-4">10 ans d'XP • Ops Master</p>
              <p class="text-sm opacity-80">Elle veille au respect de la deadline et vous appelle pour sabrer le champagne.</p>
            </div>
          </div>
          <div class="min-w-[85vw] md:min-w-[25vw] border-r border-gray-200 p-10 bg-black text-white transition group snap-center flex flex-col justify-between">
            <div>
              <div class="font-mono text-xs text-gray-400 mb-6">STACK IA</div>
              <div class="h-64 mb-6 relative overflow-hidden flex items-center justify-center" style="background:linear-gradient(135deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%);">
                <div class="font-heading font-black text-9xl text-white opacity-30">AI</div>
              </div>
              <h3 class="font-heading font-bold text-2xl uppercase mb-2">La stack IA</h3>
              <p class="font-mono text-xs mb-4 text-gray-300">La secret sauce Tomorrow.Online</p>
              <p class="text-sm text-gray-200">Chaque expert a paramétré nos IA pendant des semaines pour l'assister dans ses missions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="work" class="py-12 md:py-16 px-4 md:px-10 bg-white relative z-10 border-t border-gray-200">
      <div class="max-w-7xl mx-auto">
        <div class="mb-12 md:mb-16">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
            <div>
              <div class="inline-block border border-[#FF3333] px-4 py-2 mb-4">
                <span class="font-mono text-xs font-bold text-[#FF3333] uppercase tracking-widest">/// PROOF</span>
              </div>
              <h2 class="font-heading font-black text-4xl md:text-7xl uppercase leading-[0.9] mb-4">
                Ils l'ont fait<br><span class="text-[#FF3333]">en 24-48H.</span>
              </h2>
              <p class="text-lg md:text-xl text-gray-600 max-w-2xl">Zéro bullshit. Que des résultats mesurables. Voici ce que nos clients ont accompli pendant que leurs concurrents attendaient leurs devis.</p>
            </div>
            <div class="grid grid-cols-3 gap-6 md:gap-8">
              <div class="text-center">
                <div class="font-heading font-black text-3xl md:text-5xl text-[#FF3333] mb-1">42</div>
                <div class="font-mono text-xs uppercase text-gray-600">Sites livrés</div>
              </div>
              <div class="text-center">
                <div class="font-heading font-black text-3xl md:text-5xl text-[#FF3333] mb-1">38H</div>
                <div class="font-mono text-xs uppercase text-gray-600">Délai moyen</div>
              </div>
              <div class="text-center">
                <div class="font-heading font-black text-3xl md:text-5xl text-[#FF3333] mb-1">98%</div>
                <div class="font-mono text-xs uppercase text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div class="md:col-span-7 group border-2 border-gray-200 bg-white hover:border-black transition-all duration-300 overflow-hidden">
            <div class="p-6 md:p-8">
              <div class="flex items-start justify-between mb-6">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-black flex items-center justify-center font-heading font-black text-white text-xl">PPF</div>
                  <div>
                    <h3 class="font-heading font-bold text-xl uppercase">Préservation Patrimoine Français</h3>
                    <p class="font-mono text-xs text-gray-400 uppercase">Leader amélioration énergétique</p>
                  </div>
                </div>
                <div class="bg-black text-white px-3 py-1 font-mono text-[10px] font-bold uppercase whitespace-nowrap">43H 12MIN</div>
              </div>
              <div class="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <div class="font-heading font-black text-2xl text-[#FF3333] mb-1">+247%</div>
                  <div class="text-xs text-gray-600">Leads qualifiés</div>
                </div>
                <div>
                  <div class="font-heading font-black text-2xl text-[#FF3333] mb-1">12</div>
                  <div class="text-xs text-gray-600">Pages créées</div>
                </div>
                <div>
                  <div class="font-heading font-black text-2xl text-[#FF3333] mb-1">4.2s</div>
                  <div class="text-xs text-gray-600">Load time</div>
                </div>
              </div>
              <div class="bg-gray-50 border-l-4 border-[#FF3333] p-4 mb-6">
                <p class="text-sm italic mb-3">"J'ai briefé Tomorrow.online le lundi matin. Le mercredi soir, mes 12 landing étaient prêtes. ROI immédiat : les taux de conversion ont explosés dès la première semaine."</p>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div class="font-bold text-sm">Vincent Druesne</div>
                    <div class="text-xs text-gray-500">CMO, PPF</div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-gray-100 text-xs font-mono uppercase">B2B</span>
                <span class="px-2 py-1 bg-gray-100 text-xs font-mono uppercase">Énergie</span>
                <span class="px-2 py-1 bg-gray-100 text-xs font-mono uppercase">Maquettes</span>
              </div>
            </div>
            <div class="h-48 md:h-64 bg-gray-100 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=2670&auto=format&fit=crop" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="PPF Project">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <div class="md:col-span-5 group border-2 border-gray-200 bg-white hover:border-black transition-all duration-300 overflow-hidden">
            <div class="h-48 md:h-56 bg-gray-100 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2673&auto=format&fit=crop" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Moubandje Academy">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-black flex items-center justify-center font-heading font-black text-white text-sm">MA</div>
                  <div>
                    <h3 class="font-heading font-bold text-lg uppercase leading-tight">Moubandje Academy</h3>
                    <p class="font-mono text-[10px] text-gray-400 uppercase">Académie football</p>
                  </div>
                </div>
                <div class="bg-black text-white px-2 py-1 font-mono text-[9px] font-bold uppercase">23H 30M</div>
              </div>
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div class="font-heading font-black text-xl text-[#FF3333]">+80%</div>
                  <div class="text-xs text-gray-600">Inscriptions</div>
                </div>
                <div>
                  <div class="font-heading font-black text-xl text-[#FF3333]">2</div>
                  <div class="text-xs text-gray-600">Pages</div>
                </div>
              </div>
              <div class="bg-gray-50 border-l-4 border-[#FF3333] p-3 mb-4">
                <p class="text-xs italic mb-2">"Site professionnel qui booste notre image. Parents convaincus dès la première visite."</p>
                <div class="font-bold text-xs">JF MOUBANDJE, Fondateur</div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-gray-100 text-[10px] font-mono uppercase">Sport</span>
                <span class="px-2 py-1 bg-gray-100 text-[10px] font-mono uppercase">B2C</span>
              </div>
            </div>
          </div>
          <div class="md:col-span-5 group border-2 border-gray-200 bg-white hover:border-black transition-all duration-300 overflow-hidden">
            <div class="h-48 md:h-56 bg-gray-100 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2673&auto=format&fit=crop" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Startup SaaS">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-black flex items-center justify-center font-heading font-black text-white text-sm">LX</div>
                  <div>
                    <h3 class="font-heading font-bold text-lg uppercase leading-tight">Maison du Menuisier</h3>
                    <p class="font-mono text-[10px] text-gray-400 uppercase">Retail B2C</p>
                  </div>
                </div>
                <div class="bg-black text-white px-2 py-1 font-mono text-[9px] font-bold uppercase">22H 00M</div>
              </div>
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div class="font-heading font-black text-xl text-[#FF3333]">+340%</div>
                  <div class="text-xs text-gray-600">Signups beta</div>
                </div>
                <div>
                  <div class="font-heading font-black text-xl text-[#FF3333]">92</div>
                  <div class="text-xs text-gray-600">Score Perf</div>
                </div>
              </div>
              <div class="bg-gray-50 border-l-4 border-[#FF3333] p-3 mb-4">
                <p class="text-xs italic mb-2">"Livraison en 24H chrono pour notre nouvelle campagne. Adhérents bluffés."</p>
                <div class="font-bold text-xs">Mouna.A, CMO</div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-gray-100 text-[10px] font-mono uppercase">SaaS</span>
                <span class="px-2 py-1 bg-gray-100 text-[10px] font-mono uppercase">Startup</span>
              </div>
            </div>
          </div>
          <div class="md:col-span-7 group border-2 border-gray-200 bg-white hover:border-black transition-all duration-300 overflow-hidden">
            <div class="p-6 md:p-8">
              <div class="flex items-start justify-between mb-6">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-black flex items-center justify-center font-heading font-black text-white text-lg">VR</div>
                  <div>
                    <h3 class="font-heading font-bold text-xl uppercase">Villa Rosa Paris</h3>
                    <p class="font-mono text-xs text-gray-400 uppercase">Restaurant gastronomique</p>
                  </div>
                </div>
                <div class="bg-black text-white px-3 py-1 font-mono text-[10px] font-bold uppercase">35H 48MIN</div>
              </div>
              <div class="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <div class="font-heading font-black text-2xl text-[#FF3333] mb-1">+420%</div>
                  <div class="text-xs text-gray-600">Réservations web</div>
                </div>
                <div>
                  <div class="font-heading font-black text-2xl text-[#FF3333] mb-1">8K</div>
                  <div class="text-xs text-gray-600">Visiteurs/mois</div>
                </div>
                <div>
                  <div class="font-heading font-black text-2xl text-[#FF3333] mb-1">4.9</div>
                  <div class="text-xs text-gray-600">Note Google</div>
                </div>
              </div>
              <div class="bg-gray-50 border-l-4 border-[#FF3333] p-4 mb-6">
                <p class="text-sm italic mb-3">"Notre ancien site était une catastrophe. Tomorrow.online a tout refait en moins de 2 jours. Le site reflète enfin la qualité de notre cuisine. Les réservations ont explosé."</p>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div class="font-bold text-sm">Alessandra Bianchi</div>
                    <div class="text-xs text-gray-500">Chef & Propriétaire</div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-gray-100 text-xs font-mono uppercase">Restaurant</span>
                <span class="px-2 py-1 bg-gray-100 text-xs font-mono uppercase">B2C</span>
                <span class="px-2 py-1 bg-gray-100 text-xs font-mono uppercase">Offre Starter</span>
              </div>
            </div>
            <div class="h-48 md:h-64 bg-gray-100 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Villa Rosa">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
        <div class="border-t-2 border-gray-200 pt-12">
          <div class="text-center mb-8">
            <div class="font-mono text-xs text-gray-400 uppercase mb-4">Ils nous font confiance</div>
            <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40 grayscale">
              <div class="font-heading font-black text-2xl">PPF</div>
              <div class="font-heading font-black text-2xl">ANALYSE & ACTION</div>
              <div class="font-heading font-black text-2xl">GROUPE CORSO</div>
              <div class="font-heading font-black text-2xl">WILD CODE SCHOOL</div>
              <div class="font-heading font-black text-2xl">MAISON DU MENUISIER</div>
            </div>
          </div>
          <div class="bg-black text-white p-8 md:p-12 text-center">
            <div class="max-w-3xl mx-auto">
              <div class="flex justify-center mb-4">
                <div class="flex gap-1">
                  <span class="text-[#FF3333] text-2xl">★</span>
                  <span class="text-[#FF3333] text-2xl">★</span>
                  <span class="text-[#FF3333] text-2xl">★</span>
                  <span class="text-[#FF3333] text-2xl">★</span>
                  <span class="text-[#FF3333] text-2xl">★</span>
                </div>
              </div>
              <p class="font-heading font-bold text-2xl md:text-3xl uppercase mb-6">Prochain success story :<br><span class="text-[#FF3333]">La vôtre ?</span></p>
              <div onclick="window.openModal()" class="inline-block px-12 py-5 bg-[#FF3333] text-white font-heading font-black text-lg uppercase hover:bg-white hover:text-black transition-all cursor-pointer shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:translate-y-1 hover:shadow-none">
                > Rejoindre ces winners
              </div>
              <p class="mt-6 font-mono text-xs text-gray-600 uppercase">3 slots disponibles par jour • Paiement après validation du brief</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="processDetailsModal" class="fixed inset-0 z-[160] hidden">
      <div class="absolute inset-0 bg-black/90" onclick="window.closeProcessDetails()"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[800px] max-h-[90vh] bg-black border-2 border-[#FF3333] flex flex-col overflow-hidden text-white">
        <div class="p-6 border-b border-[#FF3333] flex justify-between items-center">
          <div class="font-heading font-black text-2xl uppercase">Détails Process 24H</div>
          <button onclick="window.closeProcessDetails()" class="text-xs uppercase hover:text-[#FF3333] border border-gray-600 px-4 py-2">Fermer</button>
        </div>
        <div class="flex-grow overflow-y-auto p-6 md:p-8">
          <div class="mb-8">
            <h3 class="font-bold text-sm uppercase text-[#FF3333] mb-4">Timeline</h3>
            <div class="space-y-3 text-sm">
              <div class="flex gap-4"><span class="font-bold text-[#FF3333]">09:00</span><span>Appel de validation. Paiement. Chronomètre démarre.</span></div>
              <div class="flex gap-4"><span class="font-bold text-gray-400">14:00</span><span>Production : Copy, Design, Dev. Zéro réunion.</span></div>
              <div class="flex gap-4"><span class="font-bold text-green-500">18:00</span><span>Livraison. SEO. Mise en ligne. Champagne.</span></div>
            </div>
          </div>
          <div class="mb-8">
            <h3 class="font-bold text-sm uppercase text-[#FF3333] mb-4">Livrables</h3>
            <div class="grid md:grid-cols-3 gap-4 text-xs">
              <div class="p-4 bg-zinc-900 border border-zinc-800"><strong>MAQUETTE</strong><br>Figma source + Design System</div>
              <div class="p-4 bg-zinc-900 border-2 border-[#FF3333]"><strong>STARTER</strong><br>Site One Page Webflow + SEO</div>
              <div class="p-4 bg-zinc-900 border border-zinc-800"><strong>BUSINESS</strong><br>5 Pages + CMS + Formation</div>
            </div>
          </div>
          <div class="text-xs text-gray-400">
            <p>✓ Direction Artistique Senior • ✓ Copywriting • ✓ Images • ✓ Cession PI</p>
          </div>
        </div>
        <div class="p-6 border-t border-[#FF3333] flex justify-center">
          <button onclick="window.closeProcessDetails();window.openModal()" class="bg-[#FF3333] text-white px-8 py-4 font-heading font-bold uppercase hover:bg-white hover:text-black transition-colors">Démarrer ma mission</button>
        </div>
      </div>
    </div>
```


========== EMBED 2 ==========

```html
<style>
.venn-wrapper{position:relative;width:300px;height:300px;margin:0 auto;margin-bottom:3rem}
@media (min-width:768px){.venn-wrapper{width:420px;height:420px}}
.circle{position:absolute;border-radius:50%;width:65%;height:65%;display:flex;flex-direction:column;transition:transform .3s ease;padding:0}
.circle:hover{transform:scale(1.05);z-index:20!important}
.pos-top:hover{transform:translateX(-50%) scale(1.05);z-index:20!important}
.pos-top{top:0;left:50%;transform:translateX(-50%)}
.pos-left{bottom:5%;left:0}
.pos-right{bottom:5%;right:0}
.circle-content{width:100%;height:100%;display:flex;flex-direction:column;text-align:center;padding:20%}
.pos-top .circle-content{justify-content:flex-start;align-items:center;padding-top:25%}
.pos-left .circle-content{justify-content:flex-end;align-items:flex-start;padding-bottom:25%;padding-left:25%;padding-right:0;text-align:left}
.pos-right .circle-content{justify-content:flex-end;align-items:flex-end;padding-bottom:25%;padding-right:25%;padding-left:0;text-align:right}
.main-label{font-family:'Space Grotesk',sans-serif;font-weight:900;text-transform:uppercase;font-size:13px;line-height:1.1}
.style-good{mix-blend-mode:multiply;color:white;opacity:.9;border:none;z-index:5}
.bg-tech{background-color:#000}
.bg-agency{background-color:#000}
.bg-template{background-color:#000}
.center-spot{position:absolute;top:55%;left:50%;transform:translate(-50%,-50%);z-index:50;width:80px;height:80px;display:flex;align-items:center;justify-content:center;font-size:2rem;border-radius:50%}
.center-spot.right-side{background:linear-gradient(90deg,rgba(180,7,254,1) 0%,rgba(255,10,55,1) 100%);box-shadow:0 0 30px rgba(180,7,254,.4);animation:pulse-gradient 2s infinite;font-size:11px;font-weight:900;color:#FFF;line-height:1;letter-spacing:-.5px}
@keyframes pulse-gradient{0%{box-shadow:0 0 0 0 rgba(180,7,254,.7)}70%{box-shadow:0 0 0 15px rgba(180,7,254,0)}100%{box-shadow:0 0 0 0 rgba(180,7,254,0)}}
.manifesto-item{border-left:2px solid #E5E5E5;padding-left:1.5rem;margin-bottom:2rem;position:relative}
.manifesto-item:hover{border-left-color:rgba(180,7,254,1)}
.manifesto-item h3{font-size:1.25rem;font-weight:900;text-transform:uppercase;margin-bottom:.5rem}
.manifesto-item p{font-size:.9rem;color:#666;line-height:1.5;font-family:'Space Grotesk',sans-serif}
.manifesto-number{position:absolute;left:-2.6rem;top:0;font-family:'Space Grotesk',sans-serif;font-weight:bold;color:#E5E5E5}
</style>
    
    <section id="pricing" class="py-8 md:py-12 px-4 md:px-10 bg-white relative z-10">
      <h2 class="font-heading font-black text-5xl md:text-7xl uppercase mb-4">3 Offres<span class="text-[#FF3333]">.</span></h2>
      <p class="font-mono text-sm text-gray-600 mb-16 uppercase">2 créneaux par jour. 1 site sur mesure.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 border-t border-l border-gray-200">
        <div class="border-r border-b border-gray-200 p-8 md:p-8 hover:bg-gray-50 transition group flex flex-col relative">
          <div onclick="window.openDetails('MAQUETTE')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>
          <div class="font-mono text-[10px] border border-gray-300 text-gray-600 w-fit px-3 py-1 mb-8 rounded-full uppercase">Maquette</div>
          <div class="font-heading font-black text-5xl mb-2">12H</div>
          <div class="font-heading font-bold text-2xl text-[#FF3333] mb-8">900€ <span class="text-sm text-gray-400 font-normal">HT</span></div>
          <div class="font-bold text-sm mb-4">Design Only</div>
          <ul class="space-y-4 mb-12 flex-grow text-sm">
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Maquette intégrable</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> UX/UI CRO</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Copy + visuels</li>
            <li class="flex gap-3 opacity-50"><span class="w-1.5 h-1.5 bg-gray-300"></span> Sans code</li>
          </ul>
          <div onclick="window.openModal()" class="block w-full py-4 border-2 border-black text-center font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors cursor-pointer">>Bloquer mon slot</div>
        </div>
        <div class="border-r border-b border-gray-200 p-8 md:p-8 bg-[#FF3333] text-white transition group flex flex-col relative">
          <div class="absolute top-6 right-6 bg-white text-[#FF3333] text-[10px] font-bold px-2 py-1 uppercase">Populaire</div>
          <div onclick="window.openDetails('STARTER')" class="detail-link detail-link-on-dark absolute top-2 right-2 md:top-6 md:right-28 font-mono border-b border-transparent hover:border-white transition-all">Détails [ + ]</div>
          <div class="font-mono text-[10px] bg-white text-[#FF3333] w-fit px-3 py-1 mb-8 rounded-full uppercase">Starter</div>
          <div class="font-heading font-black text-5xl mb-2">24H</div>
          <div class="font-heading font-bold text-2xl text-white mb-8"><span class="price-strike">1500€</span> 980€ <span class="text-sm text-white/60 font-normal">HT</span> <span class="price-badge">Fin d'année</span></div>
          <div class="font-bold text-sm mb-4">Conversions instantanées</div>
          <ul class="space-y-4 mb-12 flex-grow text-sm">
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> One page / Landing</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> UX/UI CRO</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> Copy + visuels</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> Dev Webflow</li>
          </ul>
          <div onclick="window.openModal()" class="block w-full py-4 bg-white text-[#FF3333] text-center font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors cursor-pointer">>Bloquer mon slot</div>
        </div>
        <div class="border-r border-b border-gray-200 p-8 md:p-8 hover:bg-gray-50 transition group flex flex-col relative">
          <div onclick="window.openDetails('BUSINESS')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>
          <div class="font-mono text-[10px] border border-gray-300 text-gray-600 w-fit px-3 py-1 mb-8 rounded-full uppercase">Business</div>
          <div class="font-heading font-black text-5xl mb-2">48H</div>
          <div class="font-heading font-bold text-2xl text-[#FF3333] mb-8">2200€ <span class="text-sm text-gray-400 font-normal">HT</span></div>
          <div class="font-bold text-sm mb-4">Réassurance +</div>
          <ul class="space-y-4 mb-12 flex-grow text-sm">
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Max 5 pages</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> UX/CRO</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Copy + visuels</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Dev Webflow</li>
          </ul>
          <div onclick="window.openModal()" class="block w-full py-4 border-2 border-black text-center font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors cursor-pointer">>Bloquer mon slot</div>
        </div>
      </div>
      <a href="https://www.bigneurons.com" target="_blank" class="block w-full border-l border-r border-b border-gray-200 p-6 md:p-8 flex items-center justify-between group hover:bg-black hover:text-white transition cursor-pointer">
        <div>
          <div class="font-bold text-lg uppercase">Projet complexe ?</div>
          <p class="text-xs text-gray-600 group-hover:text-gray-500">Scale, SaaS, E-commerce</p>
        </div>
        <div class="text-sm border-b border-black group-hover:border-white">Big Neurons ↗</div>
      </a>
    </section>
    <section id="jean-charles" class="relative z-10 bg-black text-white py-12 md:py-16 overflow-hidden">
      <div class="absolute inset-0 opacity-5" style="background-image:repeating-linear-gradient(0deg,transparent,transparent 2px,#FF3333 2px,#FF3333 4px);"></div>
      <div class="max-w-5xl mx-auto px-4 md:px-10 relative z-10">
        <div class="text-center mb-12 md:mb-16">
          <div class="inline-block mb-4 px-4 py-2 border-2 border-red-500 bg-red-500/10">
            <span class="font-mono text-xs font-bold text-red-500 uppercase tracking-widest">⚠️ CASE STUDY : L'ANTI-PATTERN</span>
          </div>
          <h2 class="font-heading font-black text-4xl md:text-6xl uppercase leading-tight mb-4">
            <span class="text-red-500">Jean-Charles</span> a décidé<br>de TOUT faire.
          </h2>
          <p class="font-heading font-bold text-2xl md:text-3xl text-gray-400">Et maintenant… <span class="text-red-500">Jean-Charles galère.</span></p>
        </div>
        <div class="relative">
          <div class="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-orange-500 to-red-600"></div>
          <div class="space-y-8 md:space-y-12">
            <div class="relative pl-20 md:pl-24 group">
              <div class="absolute left-0 top-0 w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-3xl font-bold text-black shadow-lg group-hover:scale-110 transition-transform">😊</div>
              <div class="bg-zinc-900 p-6 md:p-8 border-2 border-zinc-800 group-hover:border-yellow-500 transition-all">
                <div class="font-mono text-xs font-bold text-yellow-500 mb-3 uppercase">Étape 1</div>
                <h3 class="font-heading font-bold text-xl md:text-2xl uppercase mb-3 text-yellow-500">Briefer l'IA</h3>
                <p class="text-base md:text-lg text-gray-300"><span class="text-white font-bold">Jean-Charles pensait tout faire avec ses IA.</span> Il a raison.</p>
                <p class="mt-4 text-sm text-gray-500 italic">Mais il ne sait pas quoi demander.</p>
              </div>
            </div>
            <div class="relative pl-20 md:pl-24 group">
              <div class="absolute left-0 top-0 w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-3xl font-bold text-black shadow-lg group-hover:scale-110 transition-transform">😕</div>
              <div class="bg-zinc-900 p-6 md:p-8 border-2 border-zinc-800 group-hover:border-orange-500 transition-all">
                <div class="font-mono text-xs font-bold text-orange-500 mb-3 uppercase">Étape 2</div>
                <h3 class="font-heading font-bold text-xl md:text-2xl uppercase mb-3 text-orange-500">Évaluer la qualité</h3>
                <p class="text-base md:text-lg text-gray-300"><span class="text-white font-bold">Jean-Charles ne sait pas évaluer la qualité.</span></p>
                <p class="mt-4 text-sm text-gray-500 italic">Il publie quand même. Ça convertit pas.</p>
              </div>
            </div>
            <div class="relative pl-20 md:pl-24 group">
              <div class="absolute left-0 top-0 w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-3xl font-bold text-black shadow-lg group-hover:scale-110 transition-transform">😰</div>
              <div class="bg-zinc-900 p-6 md:p-8 border-2 border-zinc-800 group-hover:border-red-500 transition-all">
                <div class="font-mono text-xs font-bold text-red-500 mb-3 uppercase">Étape 3</div>
                <h3 class="font-heading font-bold text-xl md:text-2xl uppercase mb-3 text-red-500">Intégrer le code</h3>
                <p class="text-base md:text-lg text-gray-300"><span class="text-white font-bold">Jean-Charles ne sait pas intégrer le code.</span></p>
                <p class="mt-4 text-sm text-gray-500 italic">Stack Overflow devient son BFF.</p>
              </div>
            </div>
            <div class="relative pl-20 md:pl-24 group">
              <div class="absolute left-0 top-0 w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-3xl font-bold shadow-lg animate-pulse">💀</div>
              <div class="bg-gradient-to-br from-red-950 to-black p-6 md:p-8 border-2 border-red-600">
                <div class="font-mono text-xs font-bold text-red-600 mb-3 uppercase animate-pulse">Game Over</div>
                <h3 class="font-heading font-bold text-xl md:text-2xl uppercase mb-3 text-red-600">Résultat final</h3>
                <p class="text-base md:text-lg text-gray-200 mb-4"><span class="text-white font-bold">Jean-Charles passe plus de temps à comprendre qu'à faire.</span></p>
                <p class="text-xl md:text-2xl font-bold text-red-500">De <span class="line-through text-gray-600">Tomorrow Online</span> à <span class="text-red-600">NEVER Online</span>.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 md:mt-16 text-center">
          <p class="font-heading font-bold text-2xl md:text-3xl uppercase mb-6 text-gray-300">Ne soyez pas comme Jean-Charles.</p>
          <div onclick="window.openModal()" class="inline-block px-10 md:px-16 py-5 md:py-6 bg-[#FF3333] text-white font-heading font-black text-base md:text-xl uppercase cursor-pointer shadow-[8px_8px_0px_0px_#000000] hover:translate-y-1 hover:shadow-none transition-all">
            > Je ne veux pas être comme JC…
          </div>
          <p class="mt-6 font-mono text-xs text-gray-500 uppercase">Slots disponibles demain</p>
        </div>
      </div>
    </section>
    <section id="trois-mondes" class="py-12 md:py-16 px-4 md:px-10 bg-white relative z-10 border-t border-gray-200">
      <div class="max-w-7xl mx-auto">
        <div class="mb-10 text-center">
          <h2 class="font-heading font-black text-4xl md:text-6xl uppercase leading-tight mb-2">Le Meilleur des<br><span class="text-[#FF3333]">3 Mondes.</span></h2>
          <p class="text-sm font-mono text-gray-400 uppercase">La vision tomorrow.online</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div class="order-1 md:order-1">
            <div class="venn-wrapper">
              <div class="circle pos-top style-good bg-tech">
                <div class="circle-content">
                  <span class="main-label">TECH<br>IA</span>
                </div>
              </div>
              <div class="circle pos-left style-good bg-agency">
                <div class="circle-content">
                  <span class="main-label">AGENCE<br>PARISIENNE</span>
                </div>
              </div>
              <div class="circle pos-right style-good bg-template">
                <div class="circle-content">
                  <span class="main-label">TEMPLATE<br>FIABLE</span>
                </div>
              </div>
              <div class="center-spot right-side">
                TOMORROW.<br>ONLINE
              </div>
            </div>
          </div>
          <div class="order-2 md:order-2">
            <div class="manifesto-item">
              <span class="manifesto-number">01</span>
              <h3>Nous avons pris la vitesse de l'IA...</h3>
              <p>Structure codée par IA, finalisée par des experts Webflow. 24-48h chrono.</p>
            </div>
            <div class="manifesto-item">
              <span class="manifesto-number">02</span>
              <h3>L'âme d'une Agence Parisienne...</h3>
              <p>Direction Artistique senior et copywriting inclus. Pas de devis à rallonge.</p>
            </div>
            <div class="manifesto-item">
              <span class="manifesto-number">03</span>
              <h3>La fiabilité d'un Template...</h3>
              <p>Zéro bug technique, mais un design qui ne ressemble à aucun autre.</p>
            </div>
            <div onclick="window.openModal()" class="inline-block px-10 md:px-12 py-5 md:py-6 bg-[#FF3333] text-white font-heading font-black text-base md:text-lg uppercase cursor-pointer shadow-[8px_8px_0px_0px_#000000] hover:translate-y-1 hover:shadow-none transition-all">
              > Rejoindre la nouvelle norme
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="pricing-bottom" class="py-8 md:py-12 px-4 md:px-10 bg-white relative z-10">
      <h2 class="font-heading font-black text-5xl md:text-7xl uppercase mb-4">Alors on commence en 2027?<br><span class="text-[#FF3333]">ou tomorrow?</span></h2>
      <p class="font-mono text-sm text-gray-600 mb-16 uppercase">2 créneaux par jour. 1 site sur mesure.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 border-t border-l border-gray-200">
        <div class="border-r border-b border-gray-200 p-8 md:p-8 hover:bg-gray-50 transition group flex flex-col relative">
          <div onclick="window.openDetails('MAQUETTE')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>
          <div class="font-mono text-[10px] border border-gray-300 text-gray-600 w-fit px-3 py-1 mb-8 rounded-full uppercase">Maquette</div>
          <div class="font-heading font-black text-5xl mb-2">12H</div>
          <div class="font-heading font-bold text-2xl text-[#FF3333] mb-8">900€ <span class="text-sm text-gray-400 font-normal">HT</span></div>
          <div class="font-bold text-sm mb-4">Design Only</div>
          <ul class="space-y-4 mb-12 flex-grow text-sm">
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Maquette intégrable</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> UX/UI CRO</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Copy + visuels</li>
            <li class="flex gap-3 opacity-50"><span class="w-1.5 h-1.5 bg-gray-300"></span> Sans code</li>
          </ul>
          <div onclick="window.openModal()" class="block w-full py-4 border-2 border-black text-center font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors cursor-pointer">>Bloquer mon slot</div>
        </div>
        <div class="border-r border-b border-gray-200 p-8 md:p-8 bg-[#FF3333] text-white transition group flex flex-col relative">
          <div class="absolute top-6 right-6 bg-white text-[#FF3333] text-[10px] font-bold px-2 py-1 uppercase">Populaire</div>
          <div onclick="window.openDetails('STARTER')" class="detail-link detail-link-on-dark absolute top-2 right-2 md:top-6 md:right-28 font-mono border-b border-transparent hover:border-white transition-all">Détails [ + ]</div>
          <div class="font-mono text-[10px] bg-white text-[#FF3333] w-fit px-3 py-1 mb-8 rounded-full uppercase">Starter</div>
          <div class="font-heading font-black text-5xl mb-2">24H</div>
          <div class="font-heading font-bold text-2xl text-white mb-8"><span class="price-strike">1500€</span> 980€ <span class="text-sm text-white/60 font-normal">HT</span> <span class="price-badge">Fin d'année</span></div>
          <div class="font-bold text-sm mb-4">Conversions instantanées</div>
          <ul class="space-y-4 mb-12 flex-grow text-sm">
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> One page / Landing</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> UX/UI CRO</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> Copy + visuels</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-white"></span> Dev Webflow</li>
          </ul>
          <div onclick="window.openModal()" class="block w-full py-4 bg-white text-[#FF3333] text-center font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors cursor-pointer">>Bloquer mon slot</div>
        </div>
        <div class="border-r border-b border-gray-200 p-8 md:p-8 hover:bg-gray-50 transition group flex flex-col relative">
          <div onclick="window.openDetails('BUSINESS')" class="detail-link absolute top-2 right-2 md:top-4 md:right-4 font-mono border-b border-transparent hover:border-black transition-all">Détails [ + ]</div>
          <div class="font-mono text-[10px] border border-gray-300 text-gray-600 w-fit px-3 py-1 mb-8 rounded-full uppercase">Business</div>
          <div class="font-heading font-black text-5xl mb-2">48H</div>
          <div class="font-heading font-bold text-2xl text-[#FF3333] mb-8">2200€ <span class="text-sm text-gray-400 font-normal">HT</span></div>
          <div class="font-bold text-sm mb-4">Réassurance +</div>
          <ul class="space-y-4 mb-12 flex-grow text-sm">
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Max 5 pages</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> UX/CRO</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Copy + visuels</li>
            <li class="flex gap-3"><span class="w-1.5 h-1.5 bg-black"></span> Dev Webflow</li>
          </ul>
          <div onclick="window.openModal()" class="block w-full py-4 border-2 border-black text-center font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors cursor-pointer">>Bloquer mon slot</div>
        </div>
      </div>
      <a href="https://www.bigneurons.com" target="_blank" class="block w-full border-l border-r border-b border-gray-200 p-6 md:p-8 flex items-center justify-between group hover:bg-black hover:text-white transition cursor-pointer">
        <div>
          <div class="font-bold text-lg uppercase">Projet complexe ?</div>
          <p class="text-xs text-gray-600 group-hover:text-gray-500">Scale, SaaS, E-commerce</p>
        </div>
        <div class="text-sm border-b border-black group-hover:border-white">Big Neurons ↗</div>
      </a>
    </section>
```


========== EMBED 3 (FAQ + Footer + WhatsApp) ==========

```html
<section id="faq" class="py-16 md:py-24 px-4 md:px-10 bg-white relative z-10 border-t border-gray-200">
      <div class="grid md:grid-cols-12 gap-10 items-start">
        <div class="md:col-span-4 md:sticky md:top-40 self-start">
          <h2 class="font-heading font-black text-5xl md:text-6xl uppercase mb-6">FAQ<span class="text-[#FF3333]">.</span></h2>
          <p class="font-mono text-xs text-gray-600 uppercase">Pas de zone d'ombre.<br>Tout est clair avant le départ.</p>
        </div>
        <div class="md:col-span-8 border-t border-gray-200">
          <div class="border-b border-gray-200 group cursor-pointer" onclick="window.toggleFaq(this)">
            <div class="py-8 flex justify-between items-center">
              <h3 class="font-heading font-bold text-xl uppercase group-hover:text-[#FF3333] transition-colors">Vraiment livré en 24h ?</h3><span class="font-mono text-xl transform transition-transform duration-300 icon-plus">+</span>
            </div>
            <div class="h-0 overflow-hidden transition-all duration-300 faq-content">
              <p class="pb-8 text-sm text-gray-600 leading-relaxed">Oui. Le chronomètre démarre à la validation du brief ("Sprint Go"). Nous mobilisons une équipe senior complète sur votre projet pendant une journée non-stop.</p>
            </div>
          </div>
          <div class="border-b border-gray-200 group cursor-pointer" onclick="window.toggleFaq(this)">
            <div class="py-8 flex justify-between items-center">
              <h3 class="font-heading font-bold text-xl uppercase group-hover:text-[#FF3333] transition-colors">Est-ce que le site m'appartient ?</h3><span class="font-mono text-xl transform transition-transform duration-300 icon-plus">+</span>
            </div>
            <div class="h-0 overflow-hidden transition-all duration-300 faq-content">
              <p class="pb-8 text-sm text-gray-600 leading-relaxed">À 100%. Contrairement à beaucoup d'agences, nous ne vous louons pas votre site. Une fois livré et payé, nous vous transférons la propriété complète du projet Webflow. Vous êtes libre.</p>
            </div>
          </div>
          <div class="border-b border-gray-200 group cursor-pointer" onclick="window.toggleFaq(this)">
            <div class="py-8 flex justify-between items-center">
              <h3 class="font-heading font-bold text-xl uppercase group-hover:text-[#FF3333] transition-colors">Je suis sur WordPress / Shopify / Autre ?</h3><span class="font-mono text-xl transform transition-transform duration-300 icon-plus">+</span>
            </div>
            <div class="h-0 overflow-hidden transition-all duration-300 faq-content">
              <p class="pb-8 text-sm text-gray-600 leading-relaxed">Aucun problème. Nous recommandons Webflow pour la performance. Si votre infra est ailleurs, <strong>nous vous livrons le code source exporté (HTML/CSS/JS)</strong> propre et documenté, prêt à être intégré par vos équipes sur n'importe quel CMS.</p>
            </div>
          </div>
          <div class="border-b border-gray-200 group cursor-pointer" onclick="window.toggleFaq(this)">
            <div class="py-8 flex justify-between items-center">
              <h3 class="font-heading font-bold text-xl uppercase group-hover:text-[#FF3333] transition-colors">C'est optimisé pour Google (SEO) ?</h3><span class="font-mono text-xl transform transition-transform duration-300 icon-plus">+</span>
            </div>
            <div class="h-0 overflow-hidden transition-all duration-300 faq-content">
              <p class="pb-8 text-sm text-gray-600 leading-relaxed">Absolument. Nous livrons une structure technique irréprochable : Balisage Hn sémantique, attributs Alt sur les images, optimisation du poids des assets, et structure responsive.</p>
            </div>
          </div>
          <div class="border-b border-gray-200 group cursor-pointer" onclick="window.toggleFaq(this)">
            <div class="py-8 flex justify-between items-center">
              <h3 class="font-heading font-bold text-xl uppercase group-hover:text-[#FF3333] transition-colors">J'ai déjà un nom de domaine (OVH...) ?</h3><span class="font-mono text-xl transform transition-transform duration-300 icon-plus">+</span>
            </div>
            <div class="h-0 overflow-hidden transition-all duration-300 faq-content">
              <p class="pb-8 text-sm text-gray-600 leading-relaxed">On ne touche pas à vos emails ni à votre hébergeur actuel. On pointe simplement les enregistrements DNS (A & CNAME) de votre domaine vers les serveurs CDN ultra-rapides. C'est une opération de 5 minutes, sans coupure de service.</p>
            </div>
          </div>
          <div class="border-b border-gray-200 group cursor-pointer" onclick="window.toggleFaq(this)">
            <div class="py-8 flex justify-between items-center">
              <h3 class="font-heading font-bold text-xl uppercase group-hover:text-[#FF3333] transition-colors">Que se passe-t-il si je n'aime pas le design ?</h3><span class="font-mono text-xl transform transition-transform duration-300 icon-plus">+</span>
            </div>
            <div class="h-0 overflow-hidden transition-all duration-300 faq-content">
              <p class="pb-8 text-sm text-gray-600 leading-relaxed">Impossible. Nous validons la direction artistique AVANT de coder une seule ligne (Phase "Maquette"). Vous validez le style, les couleurs et l'ambiance. Pas de mauvaise surprise à la livraison.</p>
            </div>
          </div>
          <div class="border-b border-gray-200 group cursor-pointer" onclick="window.toggleFaq(this)">
            <div class="py-8 flex justify-between items-center">
              <h3 class="font-heading font-bold text-xl uppercase group-hover:text-[#FF3333] transition-colors">Je n'ai pas encore mon contenu (textes/images) ?</h3><span class="font-mono text-xl transform transition-transform duration-300 icon-plus">+</span>
            </div>
            <div class="h-0 overflow-hidden transition-all duration-300 faq-content">
              <p class="pb-8 text-sm text-gray-600 leading-relaxed">Pas de problème. Nous allons rédiger vos textes et utiliser des placeholders premium pour la structure. Vous n'aurez qu'à les valider pour lancer le code final.</p>
            </div>
          </div>
          <div class="border-b border-gray-200 group cursor-pointer" onclick="window.toggleFaq(this)">
            <div class="py-8 flex justify-between items-center">
              <h3 class="font-heading font-bold text-xl uppercase group-hover:text-[#FF3333] transition-colors">Puis-je modifier les textes moi-même ?</h3><span class="font-mono text-xl transform transition-transform duration-300 icon-plus">+</span>
            </div>
            <div class="h-0 overflow-hidden transition-all duration-300 faq-content">
              <p class="pb-8 text-sm text-gray-600 leading-relaxed">Oui. Nous configurons un code simplifié pour vous. Vous pouvez changer les textes et les images très facilement, sans risque de casser le design.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="bg-black text-white pt-20 pb-10 px-4 md:px-10 border-t border-gray-800 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div class="md:col-span-5">
          <img src="images/TO-logo_1.svg" alt="Tomorrow.online Agency" class="h-12 w-auto mb-6">
          <p class="font-medium text-lg leading-relaxed text-gray-300 mb-6">
            L'agence web commando du réseau <strong>Big Neurons</strong>.
            Nous concevons et développons des sites haut de gamme en 24H.
          </p>
          <div class="inline-block border border-white/30 px-3 py-2 font-mono text-xs text-[#FF3333] uppercase mb-6">⚡ Ce site a été réalisé en 22H23 grace à la stack Big Neurons.</div>
          <div onclick="window.openTemplateVideo()" class="font-mono text-xs text-gray-600 hover:text-[#FF3333] cursor-pointer transition-colors flex items-center gap-2 w-fit mb-4">
            <span class="text-lg">💀</span> Les acheteurs de templates VS Tomorrow.online ->
          </div>
          <div class="font-mono text-xs text-gray-500 uppercase tracking-wider">STACK TECHNIQUE: WEBFLOW • FIGMA • RELUME • GEMINI-3 • BANANA • MIDJOURNEY</div>
        </div>
        <div class="md:col-span-3 md:col-start-7">
          <h4 class="font-mono text-xs text-gray-500 mb-6 uppercase tracking-widest border-b border-gray-800 pb-2 w-fit">Services</h4>
          <ul class="space-y-3 font-heading font-bold text-sm uppercase tracking-wide">
            <li>
              <a href="la-vision-tomorrow.html" class="hover:text-[#FF3333] transition-colors">La Vision Tomorrow</a>
            </li>
            <li>
              <a href="comparatif-solutions-web.html" class="hover:text-[#FF3333] transition-colors">Comparatif Solutions</a>
            </li>
            <li>
              <a href="migrations.html" class="hover:text-[#FF3333] transition-colors">Comparatif CMS</a>
            </li>
            <li>
              <a href="/#work" class="hover:text-[#FF3333] transition-colors">Projets Récents</a>
            </li>
            <li>
              <a href="/#pricing" class="hover:text-[#FF3333] transition-colors">Lancer un Sprint</a>
            </li>
          </ul>
        </div>
        <div class="md:col-span-3">
          <h4 class="font-mono text-xs text-gray-500 mb-6 uppercase tracking-widest border-b border-gray-800 pb-2 w-fit">Réseau & Contact</h4>
          <ul class="space-y-3 font-heading font-bold text-sm uppercase tracking-wide">
            <li>
              <a href="https://www.bigneurons.com" target="_blank" class="hover:text-[#FF3333] transition-colors flex items-center gap-2">Groupe Big Neurons <span class="text-[10px]">↗</span></a>
            </li>
            <li>
              <a href="mentions-legales.html" class="hover:text-[#FF3333] transition-colors">Mentions Légales</a>
            </li>
            <li>
              <a href="mailto:hello@tomorrow.online" class="hover:text-[#FF3333] transition-colors">Contact Ops</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-end">
        <div class="font-mono text-[10px] text-gray-600 uppercase max-w-2xl leading-relaxed">© 2026 TOMORROW AGENCY. UNE MARQUE DE SAS BIG NEURONS. TOMORROW.ONLINE EST LA PREMIÈRE AGENCE WEB "NO-WAIT" EN FRANCE. DESIGNED FOR SPEED. POWERED BY INTELLIGENCE.</div>
        <div class="font-mono text-[10px] text-[#FF3333] mt-6 md:mt-0 animate-pulse bg-white/5 px-2 py-1">SYSTEM STATUS: OPERATIONAL</div>
      </div>
    </footer>
    <div class="lang-switch-container">
      <a href="#" onclick="Weglot.switchTo('fr'); return false;" class="lang-link active" id="lang-fr">FR</a>
      <div class="lang-sep"></div>
      <a href="#" onclick="Weglot.switchTo('en'); return false;" class="lang-link" id="lang-en">EN</a>
    </div>
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        // WEGLOT LISTENER
        if(typeof Weglot !== 'undefined') {
            Weglot.on("languageChanged", function(newLang) {
                document.querySelectorAll('.lang-link').forEach(el => el.classList.remove('active'));
                var activeLink = document.getElementById('lang-' + newLang);
                if(activeLink) activeLink.classList.add('active');
            });
            if(Weglot.getCurrentLang() === 'en') {
                var fr = document.getElementById('lang-fr');
                var en = document.getElementById('lang-en');
                if(fr) fr.classList.remove('active');
                if(en) en.classList.add('active');
            }
        }
        // FAQ SCRIPT (Backup internal logic)
        window.toggleFaq = function(element) {
            var content = element.querySelector('.faq-content');
            var icon = element.querySelector('.icon-plus');
            document.querySelectorAll('.faq-content').forEach(el => { if(el !== content) el.style.height = '0'; });
            document.querySelectorAll('.icon-plus').forEach(el => { if(el !== icon) el.innerText = '+'; });
            if (content.style.height && content.style.height !== '0px') {
                content.style.height = '0';
                icon.innerText = '+';
            } else {
                content.style.height = content.scrollHeight + 'px';
                icon.innerText = '-';
            }
        };
    });
</script>
    <a href="https://wa.me/33767434273?text=Hello%20Tomorrow%2C%20j'ai%20une%20question%20sur%20un%20sprint." target="_blank" class="fixed bottom-6 right-6 z-[50] group">
      <div class="bg-white border border-black px-4 py-3 flex items-center gap-3 shadow-[4px_4px_0px_0px_#000000] group-hover:translate-y-1 group-hover:shadow-none transition-all duration-200">
        <div class="relative flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></div>
        <div class="font-heading font-bold text-xs uppercase tracking-wide">Contact a human</div>
        <svg class="w-4 h-4" viewbox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
        </svg>
      </div>
    </a>
```


========== EMBED 4 (Modales) ==========

```html
<div id="videoEggModal" class="fixed inset-0 z-[9999] hidden bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onclick="window.closeTemplateVideo()">
      <div class="relative w-full max-w-4xl aspect-video bg-black video-modal-border overflow-hidden shadow-2xl" onclick="event.stopPropagation()">
        <iframe src="https://player.vimeo.com/video/1141806002?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1" class="absolute inset-0 w-full h-full pointer-events-none" frameborder="0" allow="autoplay; fullscreen" allowfullscreen=""></iframe>
        <div class="absolute bottom-4 left-4 bg-black/80 text-white font-mono text-[10px] px-3 py-1 border border-white/20 uppercase z-10">> SYSTEM: TEMPLATE_KILLER.EXE RUNNING...</div>
        <div onclick="window.closeTemplateVideo()" class="absolute top-4 right-4 text-white font-mono text-xs cursor-pointer border border-white/20 px-3 py-2 hover:bg-[#FF3333] hover:border-[#FF3333] transition bg-black/50 z-20">FERMER [ESC]</div>
      </div>
    </div>
    <div id="lightboxModal" class="fixed inset-0 z-[200] hidden bg-black/95 flex items-center justify-center p-4 cursor-zoom-out" onclick="window.closeLightbox()">
      <img id="lightboxImage" src="" class="max-w-full max-h-full object-contain shadow-2xl">
      <div class="absolute top-8 right-8 text-white font-mono cursor-pointer border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition">FERMER [ESC]</div>
    </div>
    <div id="detailsModal" class="fixed inset-0 z-[150] hidden">
      <div class="absolute inset-0 bg-black/80 modal-overlay" onclick="window.closeDetails()"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[800px] bg-white p-0 md:p-0 flex flex-col shadow-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div class="font-heading font-black text-2xl uppercase" id="detailTitle">TITRE OFFRE</div>
          <button onclick="window.closeDetails()" class="font-mono text-xs uppercase hover:text-[#FF3333] border border-gray-200 px-3 py-2">Fermer [X]</button>
        </div>
        <div class="p-8 grid md:grid-cols-2 gap-8">
          <div class="bg-gray-50 p-6 border border-gray-200">
            <div class="font-mono text-xs font-bold text-green-600 uppercase mb-4">/// CE QUI EST INCLUS</div>
            <ul class="space-y-3 text-sm" id="detailIncluded"></ul>
          </div>
          <div class="bg-white p-6 border border-gray-200 opacity-80">
            <div class="font-mono text-xs font-bold text-red-500 uppercase mb-4">/// CE QUI N'EST PAS INCLUS</div>
            <ul class="space-y-3 text-sm text-gray-500" id="detailExcluded"></ul>
          </div>
        </div>
        <div class="p-8 border-t border-gray-100 bg-gray-50 text-center">
          <button onclick="window.closeDetails(); window.openModal('STARTER')" class="btn-primary px-8 py-3 font-heading font-bold uppercase text-xs">Je choisis ce pack</button>
        </div>
      </div>
    </div>
    <div id="bookingModal" class="fixed inset-0 z-[100] hidden">
      <div class="absolute inset-0 bg-black/80 modal-overlay" onclick="window.closeModal()"></div>
      <div class="absolute right-0 top-0 h-full w-full md:w-[700px] bg-white flex flex-col transform transition-transform duration-300 translate-x-full" id="modalContent">
      </div>
    </div>
```


========== EMBED 5 (Form config) ==========

```html
<style>
    #modalContent { position: fixed; top: 0; left: 0; width: 100vw !important; max-width: 100vw !important; height: 100dvh !important; background: white; z-index: 9999; transform: translateY(100%); transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1) !important; display: flex; flex-direction: column; }
    #modalContent:not(.translate-x-full) { transform: translateY(0) !important; }
    .translate-x-full { transform: translateY(100%) !important; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E5E5; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #FF3333; }
    .step-grid { display: grid; gap: 1.5rem; width: 100%; }
    @media (min-width: 768px) { .h-screen-adaptive { min-height: calc(100vh - 280px); align-content: center; } .grid-archetypes { height: auto; overflow: visible; } }
    .range-wrap { position: relative; margin-bottom: 45px; }
    .range-value { position: absolute; top: 45px; transform: translateX(-50%); font-size: 10px; font-weight: 900; color: #FF3333; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
    .range-wrap:hover .range-value, .range-wrap:active .range-value { opacity: 1; }
    .checklist-item { opacity: 0; transform: translateY(10px); transition: all 0.5s ease; }
    .checklist-item.visible { opacity: 1; transform: translateY(0); }
    @media (max-width: 640px) {
        .totals-mobile { display: flex !important; flex-direction: column; gap: 0.5rem; align-items: flex-end; }
        .totals-mobile > div { display: flex; gap: 0.5rem; align-items: center; }
    }
    .tooltip { position: relative; display: inline-block; cursor: help; }
    .tooltip .tooltiptext { visibility: hidden; width: 200px; background-color: #333; color: #fff; text-align: center; border-radius: 6px; padding: 8px; position: absolute; z-index: 1; bottom: 125%; left: 50%; margin-left: -100px; opacity: 0; transition: opacity 0.3s; font-size: 11px; line-height: 1.4; }
    .tooltip .tooltiptext::after { content: ""; position: absolute; top: 100%; left: 50%; margin-left: -5px; border-width: 5px; border-style: solid; border-color: #333 transparent transparent transparent; }
    .tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }
    .upsell-card { border: 1px solid #E5E5E5; padding: 1rem; cursor: pointer; transition: all 0.2s; display: flex; justify-content: space-between; align-items: center; background: white; position: relative; }
    .upsell-card:hover { border-color: #999; }
    .upsell-card.selected { border-color: black; background-color: #F9F9F9; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .upsell-check { width: 20px; height: 20px; border: 1px solid #ccc; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: transparent; flex-shrink: 0; }
    .upsell-card.selected .upsell-check { background: black; border-color: black; color: white; }
    .qty-input { width: 60px; padding: 4px 8px; border: 1px solid #ccc; text-align: center; font-weight: bold; }
    .lang-checkbox { margin-right: 8px; }
    .countdown { font-size: 24px; font-weight: 900; color: #FF3333; font-family: 'JetBrains Mono', monospace; }
    .upsell-success-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
</style>
    <script>
    var FORM_ACTION_URL = "https://formsubmit.co/mf.phan@bigneurons.com";
    var FORM_ACTION_URL_UPSELL = "https://formsubmit.co/mf.phan@bigneurons.com";
    var BRAND_RED = "#FF3333";
    var currentStep = 1; 
    var totalSteps = 7;
    var fileStore = [];
    var currentConsoleMessage = "WAITING FOR INPUT...";
    var countdownTimer = null;
    var countdownStarted = false;
    var PACKS = [
        { id: 'MAQUETTE', name: 'PACK MAQUETTE', price: 900, delay: 12, desc: 'Design Only // Pas de code' },
        { id: 'STARTER', name: 'PACK STARTER', price: 980, delay: 24, desc: 'Landing Page // Vitrine' },
        { id: 'BUSINESS', name: 'PACK BUSINESS', price: 2200, delay: 48, desc: 'Site Complet // Blog & SEO' }
    ];
    var UPSELLS = {
        'MAQUETTE': [
            { id: 'packGraphique', name: 'Pack Graphique', price: 160, delay: 4, tooltip: 'Un Directeur Artistique senior boosté à l\'IA, s\'occupe de votre charte graphique et nous vous fournissons votre logo, votre typo et vos couleurs', desc: 'DA senior boosté IA pour votre charte complète.' },
            { id: 'pagesSup', name: 'Pages supplémentaires', price: 100, delay: 2, hasQty: true, hasNames: true, tooltip: 'On peut tout dire en une page, mais parfois on peut avoir besoin/envie de plus d\'espace', desc: 'Plus d\'espace pour développer votre contenu.' },
            { id: 'slogan', name: 'Slogan', price: 80, delay: 1, tooltip: 'On vous trouve votre "Just Do It" : Un concepteur-rédacteur senior vous propose 3 slogans mémorables', desc: '3 slogans mémorables par un CR senior.' }
        ],
        'STARTER': [
            { id: 'packGraphique', name: 'Pack Graphique', price: 160, delay: 4, tooltip: 'Un Directeur Artistique senior boosté à l\'IA, s\'occupe de votre charte graphique et nous vous fournissons votre logo, votre typo et vos couleurs', desc: 'DA senior boosté IA pour votre charte complète.' },
            { id: 'slogan', name: 'Slogan', price: 80, delay: 1, tooltip: 'On vous trouve votre "Just Do It" : Un concepteur-rédacteur senior vous propose 3 slogans mémorables', desc: '3 slogans mémorables par un CR senior.' },
            { id: 'pagesSup', name: 'Pages supplémentaires', price: 190, delay: 3, hasQty: true, hasNames: true, tooltip: 'On peut tout dire en une page, mais parfois on peut avoir besoin/envie de plus d\'espace', desc: 'Plus d\'espace pour développer votre contenu.' },
            { id: 'formulaire', name: 'Formulaire', price: 90, delay: 1, tooltip: 'On sait que vous avez aimé le notre, on vous en fait un ?', desc: 'Un formulaire comme celui-ci pour votre site.' },
            { id: 'multilingue', name: 'Multilingue', price: 130, delay: 2, hasLangs: true, tooltip: 'Donnez une dimension internationale à votre marque', desc: 'Dimension internationale. 1ère langue offerte.' },
            { id: 'setupGoogle', name: 'Setup Google', price: 90, delay: 1, tooltip: 'On vous connecte aux outils d\'analyses et de publicité google', desc: 'Analytics + Ads configurés et prêts.' },
            { id: 'darkMode', name: 'Version Dark/White', price: 35, delay: 1, tooltip: 'Modernité ou élégance, plus besoin de choisir', desc: 'Laissez vos visiteurs choisir leur ambiance.' },
            { id: 'paiement', name: 'Module de paiement (Stripe)', price: 120, delay: 2, tooltip: 'Vous comptez encaisser comment ?', desc: 'Encaissement Stripe intégré et sécurisé.' }
        ],
        'BUSINESS': [
            { id: 'packGraphique', name: 'Pack Graphique', price: 160, delay: 4, tooltip: 'Un Directeur Artistique senior boosté à l\'IA, s\'occupe de votre charte graphique et nous vous fournissons votre logo, votre typo et vos couleurs', desc: 'DA senior boosté IA pour votre charte complète.' },
            { id: 'slogan', name: 'Slogan', price: 80, delay: 1, tooltip: 'On vous trouve votre "Just Do It" : Un concepteur-rédacteur senior vous propose 3 slogans mémorables', desc: '3 slogans mémorables par un CR senior.' },
            { id: 'pagesSup', name: 'Pages supplémentaires', price: 190, delay: 3, hasQty: true, hasNames: true, tooltip: 'On peut tout dire en une page, mais parfois on peut avoir besoin/envie de plus d\'espace', desc: 'Plus d\'espace pour développer votre contenu.' },
            { id: 'formulaire', name: 'Formulaire', price: 90, delay: 1, tooltip: 'On sait que vous avez aimé le notre, on vous en fait un ?', desc: 'Un formulaire comme celui-ci pour votre site.' },
            { id: 'multilingue', name: 'Multilingue', price: 130, delay: 2, hasLangs: true, tooltip: 'Donnez une dimension internationale à votre marque', desc: 'Dimension internationale. 1ère langue offerte.' },
            { id: 'setupGoogle', name: 'Setup Google', price: 90, delay: 1, tooltip: 'On vous connecte aux outils d\'analyses et de publicité google', desc: 'Analytics + Ads configurés et prêts.' },
            { id: 'darkMode', name: 'Version Dark/White', price: 35, delay: 1, tooltip: 'Modernité ou élégance, plus besoin de choisir', desc: 'Laissez vos visiteurs choisir leur ambiance.' },
            { id: 'paiement', name: 'Module de paiement (Stripe)', price: 120, delay: 2, tooltip: 'Vous comptez encaisser comment ?', desc: 'Encaissement Stripe intégré et sécurisé.' }
        ]
    };
    var UPSELLS_SUCCESS = [
        { id: 'socialMedia', name: 'Pack Social Media Lancement', price: 140, hasNetwork: true, tooltip: 'Maintenant que vous avez un beau site, il faut l\'annoncer, profitez de 8 publications sur Instagram ou 6 sur LinkedIn', desc: '8 posts Instagram ou 6 posts LinkedIn pour annoncer votre lancement.' },
        { id: 'pubMeta', name: 'Pack Publicités Meta', price: 160, tooltip: 'Faites vos premières ventes avec un jeu de 6 créa performantes, adaptées à l\'algorithme Meta et surtout à votre cible', desc: '6 créas Meta performantes adaptées à votre cible.' },
        { id: 'analysePersona', name: 'Analyse Cible et Persona', price: 30, tooltip: 'Apprenez à connaître votre cible par coeur, pour leur parler en toute autonomie', desc: 'Connaissez votre cible par cœur.' },
        { id: 'packPrint', name: 'Pack Graphique Print', price: 140, tooltip: 'Votre univers digital dans la vraie vie avec 3 gabarits (carte de visite, flyer recto-verso et roll up)', desc: 'Carte de visite, flyer et roll-up pour exister IRL.' },
        { id: 'tomorrowSucces', name: 'Pack Tomorrow Succès', price: 290, originalPrice: 470, isBundle: true, tooltip: 'Tous les services précédents', desc: 'Tous les services ci-dessus réunis. Économisez 180€.' }
    ];
    var DETAILS_DATA = {
        'MAQUETTE': { title: 'PACK MAQUETTE (12H)', included: ['Design Figma Complet', 'Direction Artistique Senior', 'Maquettes Desktop & Mobile', 'Fichiers Sources', 'Cession des droits'], excluded: ['Intégration Webflow', 'Animations', 'SEO Technique', 'Mise en ligne'] },
        'STARTER': { title: 'PACK STARTER (24H)', included: ['Design Premium', 'Développement Webflow', 'Responsive Perfect', 'Optimisation SEO de base', 'Copywriting (Textes)'], excluded: ['Système de Blog/CMS', 'Filtres avancés', 'E-commerce'] },
        'BUSINESS': { title: 'PACK BUSINESS (48H)', included: ['Site Multi-pages (max 5)', 'CMS (Blog/Réalisations)', 'Animations Avancées (GSAP)', 'SEO Technique Avancé', 'Formation Admin'], excluded: ['E-commerce complexe', 'Espace Membre'] }
    };
    var ARCHETYPES = [
        { id: 'innocent', icon: '☁️', name: "L'Innocent", desc: "Optimisme & Sécurité" }, 
        { id: 'explorer', icon: '🧭', name: "L'Explorateur", desc: "Liberté & Découverte" },
        { id: 'sage', icon: '🦉', name: "Le Sage", desc: "Vérité & Expertise" }, 
        { id: 'hero', icon: '🏆', name: "Le Héros", desc: "Courage & Maîtrise" },
        { id: 'outlaw', icon: '💀', name: "Le Hors-la-loi", desc: "Révolution & Disruption" }, 
        { id: 'magician', icon: '✨', name: "Le Magicien", desc: "Vision & Transformation" },
        { id: 'everyman', icon: '🤝', name: "Mr T-L-M", desc: "Réalisme & Connexion" }, 
        { id: 'lover', icon: '🌹', name: "L'Amoureux", desc: "Passion & Intimité" },
        { id: 'jester', icon: '🎭', name: "Le Bouffon", desc: "Humour & Plaisir" }, 
        { id: 'caregiver', icon: '🛡️', name: "Le Soignant", desc: "Service & Protection" },
        { id: 'creator', icon: '🎨', name: "Le Créateur", desc: "Innovation & Création" }, 
        { id: 'ruler', icon: '👑', name: "Le Dirigeant", desc: "Contrôle & Succès" }
    ];
    var formData = {
        brandName: '', pitch: '', competitors: '', target: '', problem: '', solution: '', whyUs: '', archetype: '', vibeSeriousness: 0, vibeStyle: 0, copywriting: 'me', selectedPack: '', 
        upsells: {},
        pagesSupQty: 1,
        pagesSupNames: [],
        multiLangues: [],
        socialNetwork: '',
        socialNetworkExtra: false,
        upsellsSuccess: {},
        hasDomain: null, domainName: '', care: false, email: '', phone: ''
    };
    window.openDetails = function(planKey) {
        var data = DETAILS_DATA[planKey];
        if(!data) return;
        var titleEl = document.getElementById('detailTitle');
        var incEl = document.getElementById('detailIncluded');
        var excEl = document.getElementById('detailExcluded');
        var modal = document.getElementById('detailsModal');
        if(titleEl) titleEl.innerText = data.title;
        if(incEl) incEl.innerHTML = data.included.map(i => `<li class="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-black"></span>${i}</li>`).join('');
        if(excEl) excEl.innerHTML = data.excluded.map(i => `<li class="flex items-center gap-3 opacity-50"><span class="w-1.5 h-1.5 bg-gray-300"></span>${i}</li>`).join('');
        if(modal) { modal.classList.remove('hidden'); lockScroll(); }
    };
    window.closeDetails = function() { var m = document.getElementById('detailsModal'); if(m) m.classList.add('hidden'); unlockScroll(); };
    window.openProcessDetails = function() { var m = document.getElementById('processDetailsModal'); if(m) { m.classList.remove('hidden'); lockScroll(); } };
    window.closeProcessDetails = function() { var m = document.getElementById('processDetailsModal'); if(m) m.classList.add('hidden'); unlockScroll(); };
    window.openTemplateVideo = function() { var m = document.getElementById('videoEggModal'); if(m) m.classList.remove('hidden'); };
    window.closeTemplateVideo = function() { var m = document.getElementById('videoEggModal'); if(m) { m.classList.add('hidden'); var iframe = m.querySelector('iframe'); if(iframe) { var src = iframe.src; iframe.src = src; } } };
    window.openLightbox = function(src, title) { var m = document.getElementById('lightboxModal'); var img = document.getElementById('lightboxImage'); if(m && img) { img.src = src; m.classList.remove('hidden'); } };
    window.closeLightbox = function() { var m = document.getElementById('lightboxModal'); if(m) m.classList.add('hidden'); };
    function calculateTotals() {
        var price = 0; var delay = 0;
        var pack = PACKS.find(p => p.id === formData.selectedPack);
        if (pack) { price += pack.price; delay += pack.delay; }
        var upsellList = UPSELLS[formData.selectedPack] || [];
        upsellList.forEach(u => {
            if (formData.upsells[u.id]) {
                if(u.hasQty) {
                    price += u.price * formData.pagesSupQty;
                    delay += u.delay * formData.pagesSupQty;
                } else if(u.hasLangs) {
                    var langCount = formData.multiLangues.length;
                    if(langCount > 0) {
                        price += u.price;
                        if(langCount > 1) price += (langCount - 1) * 20;
                        delay += u.delay;
                    }
                } else {
                    price += u.price;
                    delay += u.delay;
                }
            }
        });
        return { price: price, delay: delay };
    }
    function validateEmail(email) { return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); }
    function validatePhone(phone) { return String(phone).match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/); }
    function checkValidation() {
        let valid = true;
        let emailInput = document.getElementById('input-email');
        let phoneInput = document.getElementById('input-phone');
        if(emailInput) emailInput.style.borderColor = "#e2e8f0";
        if(phoneInput) phoneInput.style.borderColor = "#e2e8f0";
        if (!validateEmail(formData.email)) { typeConsole('ERROR: INVALID EMAIL'); if(emailInput) { emailInput.style.borderColor = BRAND_RED; gsap.fromTo(emailInput, {x:-5}, {x:5, duration:0.1, yoyo:true, repeat:3}); } valid = false; }
        if (!validatePhone(formData.phone)) { typeConsole('ERROR: INVALID PHONE'); if(phoneInput) { phoneInput.style.borderColor = BRAND_RED; gsap.fromTo(phoneInput, {x:-5}, {x:5, duration:0.1, yoyo:true, repeat:3}); } valid = false; }
        return valid;
    }
    function updateRangeLabel(input, labelId) {
        const val = parseInt(input.value);
        const label = document.getElementById(labelId);
        if(label) { let sign = val > 0 ? "+" : ""; if(val === 0) sign = ""; label.innerHTML = sign + val + '%'; const percent = ((val + 100) * 100) / 200; label.style.left = `calc(${percent}% + (${8 - percent * 0.15}px))`; }
    }
    function typeConsole(text) { currentConsoleMessage = text; var el = document.getElementById('consoleOutput'); if(el) { el.innerHTML = `<span class="text-[#FF3333] font-bold">> SYSTEM:</span> ${text}`; el.classList.remove('animate-pulse'); void el.offsetWidth; el.classList.add('animate-pulse'); } }
    function lockScroll() { document.body.style.overflow = 'hidden'; }
    function unlockScroll() { document.body.style.overflow = ''; }
    window.updateInput = function(key, value, consoleMsg) { formData[key] = value; if(consoleMsg) { typeConsole(consoleMsg); } if(key === 'brandName') { var el = document.getElementById('consoleBrandName'); if(el) el.innerText = value || 'N/A'; } };
    function renderHeader(progress) { return `<div class="flex-none bg-white z-50 pt-6 px-6 pb-2 w-full"><div class="max-w-7xl mx-auto w-full"><div class="flex justify-between items-end mb-2"><div class="text-[10px] font-bold text-black bg-gray-100 px-3 py-1 rounded-full">STEP ${currentStep}/7</div></div><div class="h-1 w-full bg-gray-100 relative rounded-full overflow-hidden"><div class="h-full bg-[#FF3333] transition-all duration-500 ease-out" style="width: ${progress}%"></div></div></div></div>`; }
</script>
```
