document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contactForm');
  const SCROLL_GAP = 16;

  function getScrollOffset() {
    return (header?.offsetHeight ?? 0) + SCROLL_GAP;
  }

  function scrollToHashTarget(target, { updateHash = true, behavior = 'smooth' } = {}) {
    if (!target) return;

    // Si el target es el header mismo, ir directo al top
    const top = target === header
      ? 0
      : target.getBoundingClientRect().top + window.scrollY - getScrollOffset();

    window.scrollTo({
      top: Math.max(0, top),
      behavior,
    });

    if (updateHash && target.id) {
      history.pushState(null, '', `#${target.id}`);
    }
  }

  function setActiveNavLink(id) {
    navLinks.forEach(link => {
      link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${id}`);
    });
  }

  function closeMobileNav() {
    nav?.classList.remove('nav--open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      scrollToHashTarget(target);

      if (link.classList.contains('nav__link')) {
        setActiveNavLink(target.id);
      }

      closeMobileNav();
    });
  });

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const localidad = document.getElementById('localidad').value.trim();
    const consulta = document.getElementById('consulta').value.trim();
    const drovertWhatsapp = '5491169837513';

    const mensaje = encodeURIComponent(
      `Hola Drovert, quiero solicitar asesoramiento.\n\n` +
      `Nombre: ${nombre}\n` +
      `Empresa: ${empresa || 'No especificada'}\n` +
      `WhatsApp: ${whatsapp}\n` +
      `Localidad: ${localidad || 'No especificada'}\n` +
      `Consulta: ${consulta}`
    );

    window.open(`https://wa.me/${drovertWhatsapp}?text=${mensaje}`, '_blank', 'noopener');
  });

  const scrollTargets = [...navLinks]
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  let scrollObserver;

  function initScrollObserver() {
    scrollObserver?.disconnect();

    scrollObserver = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (!visible.length) return;

        setActiveNavLink(visible[0].target.id);
      },
      {
        rootMargin: `-${getScrollOffset()}px 0px -55% 0px`,
        threshold: 0,
      }
    );

    scrollTargets.forEach(target => scrollObserver.observe(target));
  }

  initScrollObserver();

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      requestAnimationFrame(() => {
        scrollToHashTarget(target, { updateHash: false, behavior: 'auto' });
        setActiveNavLink(target.id);
      });
    }
  }

  window.addEventListener('resize', initScrollObserver);

  // Inicializar Swiper en cada proyecto
  document.querySelectorAll('.project-swiper').forEach(el => {
    new Swiper(el, {
      loop: true,
      grabCursor: true,
      keyboard: { enabled: true },
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        clickable: true,
      },
      lazy: true,
    });
  });
});
