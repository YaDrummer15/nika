/* ============================================
   100 REASONS — 100 причин почему я тебя люблю
   ============================================ */

(function() {
  'use strict';

  const grid = document.getElementById('reasons100Grid');
  if (!grid) return;

  const progressFill = document.getElementById('progressFill100');
  const progressText = document.getElementById('progressText100');
  const openAllBtn = document.getElementById('reasons100OpenAll');

  const reasons = siteData.reasons100;
  const total = reasons.length;
  let openedCount = 0;

  function updateProgress() {
    const percent = (openedCount / total) * 100;
    progressFill.style.width = percent + '%';
    progressText.textContent = `Открыто: ${openedCount} / ${total}`;

    if (openedCount === total) {
      progressText.textContent = `🎉 Все ${total} причин открыты! Ты — моё всё 💜`;
      openAllBtn.textContent = '💜 Спасибо, что ты есть';
      openAllBtn.disabled = true;
      openAllBtn.style.opacity = '0.7';
      openAllBtn.style.cursor = 'default';
    }
  }

  // Рендер карточек
  reasons.forEach((text, i) => {
    const card = document.createElement('div');
    card.className = 'reason-100-card';
    card.setAttribute('data-index', i);
    card.innerHTML = `
      <div class="reason-100-inner">
        <div class="reason-100-front">
          <span class="reason-100-number">${String(i + 1).padStart(2, '0')}</span>
          <span class="reason-100-heart">💜</span>
        </div>
        <div class="reason-100-back">
          <p class="reason-100-text">${text}</p>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      if (card.classList.contains('revealed')) {
        // Свернуть обратно
        card.classList.remove('flipped', 'revealed');
        openedCount--;
      } else {
        card.classList.add('flipped', 'revealed');
        openedCount++;
        // Частица
        createParticle(card);
      }
      updateProgress();
    });

    grid.appendChild(card);
  });

  function createParticle(card) {
    const heart = document.createElement('span');
    heart.textContent = '💜';
    heart.style.position = 'absolute';
    heart.style.fontSize = '1.5rem';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '10';
    heart.style.animation = 'particleFloat 0.9s ease-out forwards';
    card.appendChild(heart);
    setTimeout(() => heart.remove(), 900);
  }

  // Открыть все
  openAllBtn.addEventListener('click', () => {
    const cards = document.querySelectorAll('.reason-100-card');
    cards.forEach((card, i) => {
      if (!card.classList.contains('revealed')) {
        setTimeout(() => {
          card.classList.add('flipped', 'revealed');
          openedCount++;
          updateProgress();
        }, i * 30);
      }
    });
  });

  updateProgress();
})();