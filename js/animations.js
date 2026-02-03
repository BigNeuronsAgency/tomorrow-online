// ========================================
// ANIMATIONS (GSAP + Scroll Effects)
// ========================================

function initAnimations() {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded');
    return;
  }
  
  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  
  // Hero load animation
  gsap.fromTo('.hero-load', 
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.3
    }
  );
  
  // ULTRA FAST SCROLL EASTER EGG - Effet hallucinant uniquement sur scroll hyper rapide
  // Appliqué sur #main-content pour ne pas affecter les modales (position: fixed)
  const mainContent = document.getElementById('main-content');
  if (!mainContent) {
    console.warn('main-content not found');
    return;
  }
  
  let skewSetter = gsap.quickSetter(mainContent, 'skewY', 'deg');
  let clamp = gsap.utils.clamp(-8, 8); // Effet MASSIF
  const VELOCITY_THRESHOLD = 5000; // Seuil ENCORE PLUS élevé (5000 au lieu de 3000)
  
  ScrollTrigger.create({
    onUpdate: (self) => {
      let velocity = self.getVelocity();
      
      // Easter egg : déclenche uniquement si scroll ULTRA rapide (3000+ velocity)
      if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
        let skew = clamp(velocity / -300); // Division faible = effet massif
        skewSetter(skew);
        
        // Shake violent + glow flash - sur mainContent seulement, pas body
        mainContent.style.filter = 'brightness(1.2) saturate(1.5)';
        
        // Return to normal rapidement avec bounce
        gsap.to(mainContent, {
          skewY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          overwrite: true,
          onComplete: () => {
            // Force reset complet pour éviter tout résidu
            mainContent.style.transform = '';
          }
        });
        
        // Reset filter
        gsap.to(mainContent, {
          filter: 'brightness(1) saturate(1)',
          duration: 0.4
        });
      }
    }
  });
  
  // Manifesto text animation
  ScrollTrigger.create({
    trigger: '.manifesto-text',
    start: 'top 80%',
    onEnter: () => {
      document.querySelector('.manifesto-text').classList.add('animate');
    }
  });
  
  // Section fade-in animations
  const sections = document.querySelectorAll('section:not(.hero)');
  
  sections.forEach(section => {
    gsap.fromTo(section,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1
        }
      }
    );
  });
  
  // Parallax effect on hero stats
  gsap.to('.hero-stats', {
    y: 100,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  // JEAN-CHARLES GLITCH EFFECT (PUNITION)
  ScrollTrigger.create({
    trigger: '.jean-charles',
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => {
      document.querySelector('.jean-charles').classList.add('glitch-active');
    },
    onLeave: () => {
      document.querySelector('.jean-charles').classList.remove('glitch-active');
    },
    onEnterBack: () => {
      document.querySelector('.jean-charles').classList.add('glitch-active');
    },
    onLeaveBack: () => {
      document.querySelector('.jean-charles').classList.remove('glitch-active');
    }
  });
}

function initSmoothScroll() {
  // Lenis désactivé temporairement - cause des bugs sur les modales
  // TODO: Réactiver avec une configuration qui ne casse pas position:fixed
  console.log('Smooth scroll: native mode');
  return;
  
  // Check if Lenis is loaded
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded');
    return;
  }
  
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false
  });
  
  // Sync with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  gsap.ticker.lagSmoothing(0);
  
  // Store globally for smooth scroll links
  window.lenis = lenis;
}

// Smooth scroll to section
function smoothScroll(target) {
  if (window.lenis) {
    window.lenis.scrollTo(target, {
      offset: -100,
      duration: 1.5
    });
  } else {
    document.querySelector(target).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Scroll to top
function scrollToTop() {
  if (window.lenis) {
    window.lenis.scrollTo(0, { duration: 1.5 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Export functions
window.initAnimations = initAnimations;
window.initSmoothScroll = initSmoothScroll;
window.smoothScroll = smoothScroll;
window.scrollToTop = scrollToTop;
