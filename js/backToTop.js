// Botón global "volver arriba" con JS mínimo
(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Crear botón lazily y añadir al DOM
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', 'Volver arriba');
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(btn);

    // Mostrar/ocultar con umbral pequeño
    var toggle = function () {
      if (window.scrollY > 200) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    };
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });

    // Scroll suave al tope (usa CSS scroll-behavior si está disponible)
    btn.addEventListener('click', function () {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    });
  });
})();

