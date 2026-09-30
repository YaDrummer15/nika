/* ============================================
   EASTER EGG — пасхалки
   ============================================ */

(function() {
  'use strict';

  const modal = document.getElementById('eastereggModal');
  const titleEl = document.getElementById('eastereggTitle');
  const textEl = document.getElementById('eastereggText');
  const emojiEl = document.getElementById('eastereggEmoji');
  const closeBtn = document.getElementById('eastereggClose');

  if (!modal) return;

  let easterFound = false;

  function showEasterEgg() {
    if (easterFound) return;
    easterFound = true;

    titleEl.textContent = siteData.easterEgg.title;
    textEl.textContent = siteData.easterEgg.text;
    emojiEl.textContent = siteData.easterEgg.emoji;

    modal.classList.add('active');

    const chars = ['🥯', '💜', '✨', '🌟', '💖', '🎉', '⭐', '💫'];
    for (let i = 0; i < 60; i++) {
      const span = document.createElement('span');
      span.className = 'confetti-heart';
      span.textContent = chars[Math.floor(Math.random() * chars.length)];
      span.style.left = Math.random() * 100 + 'vw';
      span.style.fontSize = (1.2 + Math.random() * 2) + 'rem';
      span.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      span.style.animationDelay = (Math.random() * 1.2) + 's';
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 8000);
    }
  }

  window.showEasterEgg = showEasterEgg;

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });

  // KONAMI CODE
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        showEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // КЛИК ПО ФУТЕРУ 5 РАЗ
  const footer = document.querySelector('footer');
  let footerClicks = 0;
  let footerTimer = null;

  if (footer) {
    footer.addEventListener('click', () => {
      footerClicks++;
      clearTimeout(footerTimer);
      footerTimer = setTimeout(() => { footerClicks = 0; }, 2000);
      if (footerClicks >= 5) {
        showEasterEgg();
        footerClicks = 0;
      }
    });
  }

  // ВВОД "бублик"
  let typedBuffer = '';
  document.addEventListener('keypress', (e) => {
    if (e.target.matches('input, textarea')) return;
    typedBuffer += e.key.toLowerCase();
    if (typedBuffer.length > 10) typedBuffer = typedBuffer.slice(-10);
    if (typedBuffer.includes('бублик')) {
      showEasterEgg();
      typedBuffer = '';
    }
  });
})();