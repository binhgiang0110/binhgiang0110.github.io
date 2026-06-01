'use strict';

(function () {
  function updateHeaderHeight() {
    var headerEl = document.querySelector('.cv-header');
    if (!headerEl) return;
    document.body.style.setProperty('--cv-header-height', headerEl.offsetHeight + 'px');
  }

  window.addEventListener('load', updateHeaderHeight);
  window.addEventListener('resize', updateHeaderHeight);
  updateHeaderHeight();

  var header = document.querySelector('.cv-header');
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.cv-header .nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('is-open');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var headerHeight = parseInt(getComputedStyle(document.body).getPropertyValue('--cv-header-height'), 10) || 88;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
      if (navMenu) {
        navMenu.classList.remove('is-open');
      }
    });
  });

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.cv-header .nav-menu a[href^="#"]');

  function setActiveNav() {
    var scrollY = window.pageYOffset;
    sections.forEach(function (section) {
      var id = section.getAttribute('id');
      var top = section.offsetTop - 120;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! Your message has been noted. Please email binhgiang0110@gmail.com for a direct reply.');
      form.reset();
    });
  }
})();
