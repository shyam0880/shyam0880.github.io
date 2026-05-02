/* ═══════════════════════════════════════════════════════════
   TYPEWRITER EFFECT
═══════════════════════════════════════════════════════════ */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Full Stack Developer',
    'Java & Spring Boot Engineer',
    'React Developer',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  const TYPING_SPEED   = 80;   // ms per character when typing
  const DELETING_SPEED = 45;   // ms per character when deleting
  const PAUSE_AFTER    = 1800; // ms to pause at full phrase
  const PAUSE_BEFORE   = 400;  // ms to pause before typing next

  function tick() {
    const current = phrases[phraseIndex];

    if (isPaused) {
      isPaused = false;
      setTimeout(tick, isDeleting ? PAUSE_BEFORE : PAUSE_AFTER);
      return;
    }

    if (!isDeleting) {
      // Typing forward
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Finished typing — pause then start deleting
        isDeleting = true;
        isPaused = true;
        setTimeout(tick, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      // Deleting
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting — move to next phrase
        isDeleting = false;
        isPaused = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    }
  }

  // Small initial delay so the page settles first
  setTimeout(tick, 600);
})();


/* ═══════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — FADE-IN
═══════════════════════════════════════════════════════════ */
(function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();


/* ═══════════════════════════════════════════════════════════
   NAVBAR — SCROLL EFFECT & ACTIVE LINK
═══════════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  function onScroll() {
    const navLinksEl = document.getElementById('nav-links');

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      if (navLinksEl) navLinksEl.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
      if (navLinksEl) navLinksEl.classList.remove('scrolled');
    }

    // Active link — use getBoundingClientRect so the last section
    // activates even when the page can't scroll far enough for offsetTop logic
    let currentId = '';
    const offset = navbar.offsetHeight + 10; // account for fixed navbar height

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // Section is considered "active" when its top is above the navbar bottom
      if (rect.top <= offset) {
        currentId = section.getAttribute('id');
      }
    });

    // Edge case: if scrolled to very bottom, force last section active
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 10) {
      currentId = sections[sections.length - 1].getAttribute('id');
    }

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ═══════════════════════════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════════════════════════ */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ═══════════════════════════════════════════════════════════
   BACK TO TOP BUTTON
═══════════════════════════════════════════════════════════ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    },
    { passive: true }
  );
})();


/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL — ALL ANCHOR LINKS
═══════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


/* ═══════════════════════════════════════════════════════════
   LIGHT / DARK THEME TOGGLE
═══════════════════════════════════════════════════════════ */
(function initTheme() {
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  if (!btn) return;

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('slk-theme', theme);
    if (icon) {
      icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
    }
  }

  // Load saved preference, default to dark
  const saved = localStorage.getItem('slk-theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
})();
