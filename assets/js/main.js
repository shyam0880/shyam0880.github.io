/**
* Template Name: iPortfolio
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }



  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

//  for dark and light mode
  const switchMood = (e) => {
    if(e.target.checked) {
      document.querySelector('body').setAttribute('data-theme', 'light')
    }
    else{
      document.querySelector('body').setAttribute('data-theme', 'dark')
    }
  }
  document.getElementById('themeToggle').addEventListener('change', switchMood);

  document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarIcon = document.querySelector('.sidebar i');
    const header = document.querySelector('#header');
  
    // Toggle header visibility on sidebar click
    sidebar.addEventListener('click', () => {
      header.classList.toggle('active'); // Add or remove the "active" class

      const isOpen = header.classList.contains('active');
      sidebarIcon.className = isOpen ? 'bi bi-x' : 'bx bx-menu-alt-left'; // Change sidebar icon
    });
  
    // Reset header visibility on screen resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1199) {
        // Show header for large screens
        header.classList.remove('active');
        header.style.display = 'block';
        const isOpen = header.classList.contains('active');
        sidebarIcon.className = isOpen ? 'bi bi-x' : 'bx bx-menu-alt-left';
      } else {
        // Hide header for small screens
        header.style.display = 'none';
      }
    });
  });
 
})()

function filterSkills(category) {
  const allIcons = document.querySelectorAll('.skill-icon');
  allIcons.forEach(icon => {
    if (category === 'all') {
      icon.style.display = 'inline-block';
    } else {
      icon.style.display = icon.classList.contains(category) ? 'inline-block' : 'none';
    }
  });
}

// Show all by default
document.addEventListener('DOMContentLoaded', () => filterSkills('all'));

function changeForm(view) {
  const listIcon = document.querySelector('.bx-list-ul');
  const gridIcon = document.querySelector('.bxs-grid');
  const listContent = document.querySelector('.skills-content.list');
  const gridContent = document.querySelector('.skills-content.grid');

  // Toggle icon active state
  listIcon.classList.toggle('active', view === 'list');
  gridIcon.classList.toggle('active', view === 'grid');

  // Toggle content visibility
  listContent.classList.toggle('active', view === 'list');
  gridContent.classList.toggle('active', view === 'grid');
}

// Set default to list on page load
window.addEventListener('DOMContentLoaded', () => {
  changeForm('list');
})

function changeView(type) {
  const container = document.querySelector('.list-type-content-2');
  const listIcon = container.querySelector('.bx-list-ul');
  const gridIcon = container.querySelector('.bx-dots-vertical');
  const eduBox = document.querySelector('.edu-box');
  const eduBox2 = document.querySelector('.edu-box-2');


  // Toggle icon active state
  listIcon.classList.toggle('active', type === 'list');
  gridIcon.classList.toggle('active', type === 'grid');

  // Toggle content visibility
  eduBox.classList.toggle('active', type === 'list');
  eduBox2.classList.toggle('active', type === 'grid');

}
window.addEventListener('DOMContentLoaded', () => {
  changeView('grid');
})
