// Lightbox para imágenes de proyectos
(function(){
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  var overlay, fig, imgEl, captionEl, btnPrev, btnNext, btnClose;
  var currentGroup = [], currentIndex = 0;
  var groups = new Map();

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');

    fig = document.createElement('figure');
    fig.className = 'lightbox__figure';
    imgEl = document.createElement('img');
    imgEl.className = 'lightbox__img';
    captionEl = document.createElement('figcaption');
    captionEl.className = 'lightbox__caption';
    fig.appendChild(imgEl);
    fig.appendChild(captionEl);

    btnPrev = document.createElement('button');
    btnPrev.className = 'lightbox__nav lightbox__prev';
    btnPrev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

    btnNext = document.createElement('button');
    btnNext.className = 'lightbox__nav lightbox__next';
    btnNext.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

    btnClose = document.createElement('button');
    btnClose.className = 'lightbox__close';
    btnClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    overlay.appendChild(fig);
    overlay.appendChild(btnPrev);
    overlay.appendChild(btnNext);
    overlay.appendChild(btnClose);

    document.body.appendChild(overlay);

    // Interacciones
    overlay.addEventListener('click', function(e){ if (e.target === overlay) close(); });
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', prev);
    btnNext.addEventListener('click', next);
    document.addEventListener('keydown', function(e){
      if (!overlay || !overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }

  function show() {
    var item = currentGroup[currentIndex];
    if (!item) return;
    imgEl.src = item.src;
    imgEl.alt = item.alt || '';
    captionEl.textContent = item.alt || '';
  }

  function open(group, index) {
    if (!overlay) createOverlay();
    currentGroup = group; currentIndex = index || 0;
    show();
    overlay.classList.add('is-open');
    document.body.classList.add('lb-open');
  }

  function close(){
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('lb-open');
  }
  function next(){ currentIndex = (currentIndex + 1) % currentGroup.length; show(); }
  function prev(){ currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length; show(); }

  document.addEventListener('DOMContentLoaded', function(){
    var projects = document.querySelectorAll('.proyecto');
    if (!projects.length) return;
    projects.forEach(function(article, aIdx){
      var groupId = article.id || ('proyecto-' + aIdx);
      var imgs = article.querySelectorAll('.proyecto-media img, .proyecto-galeria img');
      var arr = Array.prototype.map.call(imgs, function(img){
        return { src: img.currentSrc || img.src, alt: img.alt || '' };
      });
      groups.set(groupId, arr);
      imgs.forEach(function(img, i){
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(){ open(arr, i); });
      });
    });
  });
})();

