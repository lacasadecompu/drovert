$(function () {
  const $links = $('.nav-link');
  const $header = $('.site-header');
  const $menuToggle = $('.menu-toggle');
  const $slides = $('.hero-slide');
  let slideIndex = 0;

  if ($slides.length > 1) {
    setInterval(function () {
      $slides.eq(slideIndex).removeClass('active');
      slideIndex = (slideIndex + 1) % $slides.length;
      $slides.eq(slideIndex).addClass('active');
    }, 4500);
  }

  $menuToggle.on('click', function () {
    const isOpen = $header.toggleClass('menu-open').hasClass('menu-open');
    $(this).attr('aria-expanded', isOpen ? 'true' : 'false');
  });

  $links.on('click', function (e) {
    const href = $(this).attr('href');
    if (!href || !href.startsWith('#')) return;

    const $target = $(href);
    if (!$target.length) return;

    e.preventDefault();
    const targetTop = Math.max($target.offset().top - 86, 0);
    $('html, body').animate({ scrollTop: targetTop }, 500);

    if ($(window).width() < 720) {
      $header.removeClass('menu-open');
      $menuToggle.attr('aria-expanded', 'false');
    }
  });

  const sections = ['#inicio', '#servicios', '#proyectos', '#contacto'];

  $(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop() + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const id = sections[i];
      const $section = $(id);
      if (!$section.length) continue;

      if (scrollPos >= $section.offset().top) {
        $links.removeClass('active');
        $links.filter(`[href="${id}"]`).addClass('active');
        break;
      }
    }
  });

  $('.contact-form').on('submit', function (e) {
    e.preventDefault();
    alert('Gracias por tu mensaje. Te responderemos pronto.');
    this.reset();
  });

  $(window).on('resize', function () {
    if ($(window).width() >= 720) {
      $header.removeClass('menu-open');
      $menuToggle.attr('aria-expanded', 'false');
    }
  });
});
