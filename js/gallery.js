/* ============================================
   GALLERY — галерея + lightbox
   ============================================ */

(function() {
  'use strict';

  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let currentIndex = 0;

  siteData.gallery.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-index', i);
    div.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <div class="caption">${item.caption}</div>
      <div class="date">${item.date}</div>
    `;
    galleryGrid.appendChild(div);
  });

  function openLightbox(index) {
    currentIndex = index;
    const item = siteData.gallery[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = `${currentIndex + 1} / ${siteData.gallery.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + siteData.gallery.length) % siteData.gallery.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % siteData.gallery.length;
    openLightbox(currentIndex);
  }

  galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    openLightbox(parseInt(item.getAttribute('data-index'), 10));
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx > 0 ? showPrev() : showNext();
    }
  }, { passive: true });
})();