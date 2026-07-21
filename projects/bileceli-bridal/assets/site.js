/* ═══ BİLECELİ BRIDAL — ortak alt-sayfa scripti ═══ */
(function () {
  'use strict';

  /* GERÇEK NUMARA İLE DEĞİŞTİRİN — ülke kodu dahil, boşluksuz (ör. 905321234567) */
  var WHATSAPP_NUMBER = '905000000000';
  var DEFAULT_WA_TEXT = 'Merhaba, Bileceli Bridal prova randevusu hakkında bilgi almak istiyorum.';

  function waLink(text) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text || DEFAULT_WA_TEXT);
  }

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }

  document.addEventListener('DOMContentLoaded', function () {

    /* WhatsApp linkleri */
    qsa('[data-whatsapp]').forEach(function (a) {
      a.href = waLink();
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });

    /* Telif yılı */
    qsa('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    /* Navbar gölgesi */
    function onScroll() {
      document.body.classList.toggle('scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Aktif nav vurgusu */
    var page = (location.pathname.split('/').pop() || 'index.html').split('#')[0];
    qsa('.nav-item, .sheet-links a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0];
      if (href && href === page) a.classList.add('active');
    });

    /* Mobil menü */
    var overlay = qs('#menu-overlay');
    var sheet = qs('#menu-sheet');
    function openMenu() {
      if (!overlay || !sheet) return;
      overlay.classList.add('open');
      sheet.classList.add('open');
      document.body.classList.add('no-scroll');
    }
    function closeMenu() {
      if (!overlay || !sheet) return;
      overlay.classList.remove('open');
      sheet.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
    var openBtn = qs('#menu-open');
    var closeBtn = qs('#menu-close');
    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    if (sheet) sheet.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    /* Reveal animasyonları */
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      qsa('.reveal').forEach(function (el) { obs.observe(el); });
    } else {
      qsa('.reveal').forEach(function (el) { el.classList.add('visible'); });
    }

    /* SSS — tek akordeon açık kalsın */
    var faqs = qsa('details[name="faq"]');
    faqs.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });

    /* Randevu formu → WhatsApp */
    var form = qs('#appointment-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var v = function (id) { var el = qs(id); return el && el.value ? el.value.trim() : ''; };
        var text =
          'Merhaba, prova randevusu oluşturmak istiyorum.\n' +
          'Ad Soyad: ' + (v('#f-name') || '-') + '\n' +
          'Telefon: ' + (v('#f-phone') || '-') + '\n' +
          'E-posta: ' + (v('#f-email') || '-') + '\n' +
          'Düğün Tarihi: ' + (v('#f-date') || '-') + '\n' +
          'Konu: ' + (v('#f-topic') || '-') + '\n' +
          'Mesaj: ' + (v('#f-msg') || '-');
        window.open(waLink(text), '_blank', 'noopener,noreferrer');
      });
    }

    /* Galeri lightbox */
    var lightbox = qs('#lightbox');
    if (lightbox) {
      var lbImg = lightbox.querySelector('img');
      qsa('.masonry figure').forEach(function (fig) {
        fig.addEventListener('click', function () {
          var img = fig.querySelector('img');
          if (!img) return;
          lbImg.src = img.src;
          lbImg.alt = img.alt || '';
          lightbox.classList.add('open');
          document.body.classList.add('no-scroll');
        });
      });
      function closeLb() {
        lightbox.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
      lightbox.addEventListener('click', function (e) {
        if (e.target !== lbImg) closeLb();
      });
      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLb();
      });
    }
  });
})();
