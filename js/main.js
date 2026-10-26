// Menú mobile
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Lite embeds: no cargan ningún iframe/JS externo hasta que el usuario hace click
function wireFacade(selector, { allow, allowFullscreen }) {
  document.querySelectorAll(selector).forEach((facade) => {
    const load = () => {
      const src = facade.dataset.embedSrc;
      if (!src || facade.querySelector('iframe')) return;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = facade.getAttribute('aria-label') || 'Contenido embebido';
      iframe.loading = 'lazy';
      if (allow) iframe.allow = allow;
      if (allowFullscreen) iframe.allowFullscreen = true;
      facade.appendChild(iframe);
    };
    facade.addEventListener('click', load);
    facade.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); }
    });
  });
}

wireFacade('.video-facade', {
  allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  allowFullscreen: true,
});

wireFacade('.audio-facade', {
  allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
});

// Puntos de navegación del carrusel de avisos
const track = document.querySelector('#carousel-avisos .carousel__track');
const dotsWrap = document.querySelector('#carousel-avisos .carousel__dots');
if (track && dotsWrap) {
  const slides = Array.from(track.children);
  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ir al aviso ${i + 1}`);
    dot.addEventListener('click', () => slide.scrollIntoView({ behavior: 'smooth', inline: 'start' }));
    dotsWrap.appendChild(dot);
  });
}
