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
  
  // Scroll skew effect on body - ONLY on fast scroll
  let skewSetter = gsap.quickSetter('body', 'skewY', 'deg');
  let clamp = gsap.utils.clamp(-3, 3);
  const VELOCITY_THRESHOLD = 200; // Only trigger if scroll velocity > 200
  
  ScrollTrigger.create({
    onUpdate: (self) => {
      let velocity = self.getVelocity();
      
      // Only apply skew if scrolling fast enough
      if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
        let skew = clamp(velocity / -300);
        skewSetter(skew);
        
        // Return to normal slowly
        gsap.to('body', {
          skewY: 0,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: true
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
}

function initSmoothScroll() {
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
