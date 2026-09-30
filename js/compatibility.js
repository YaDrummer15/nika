/* ============================================
   COMPATIBILITY — генератор совместимости
   ============================================ */

(function() {
  'use strict';

  const generator = document.getElementById('compatGenerator');
  if (!generator) return;

  const idleEl = document.getElementById('compatIdle');
  const loadingEl = document.getElementById('compatLoading');
  const resultEl = document.getElementById('compatResult');
  const startBtn = document.getElementById('compatStartBtn');
  const restartBtn = document.getElementById('compatRestartBtn');
  const percentEl = document.getElementById('compatPercent');
  const circleEl = document.getElementById('compatCircle');
  const verdictEl = document.getElementById('compatVerdict');
  const categoriesEl = document.getElementById('compatCategories');

  const RADIUS = 85;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  circleEl.style.strokeDasharray = CIRCUMFERENCE;
  circleEl.style.strokeDashoffset = CIRCUMFERENCE;

  let currentTotal = 99.9;

  function getVerdict(total) {
    const sorted = [...siteData.compatVerdicts].sort((a, b) => b.min - a.min);
    for (const v of sorted) {
      if (total >= v.min) return v.text;
    }
    return sorted[sorted.length - 1].text;
  }

  function randomInRange(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }

  function generateResult() {
    // Всегда показываем 99.9%, но категории рандомные
    currentTotal = 99.9;

    // Категории
    const categories = siteData.compatibilityCategories.map(cat => ({
      ...cat,
      value: randomInRange(cat.min, cat.max)
    }));

    return categories;
  }

  function showLoading() {
    idleEl.style.display = 'none';
    resultEl.classList.remove('active');
    loadingEl.classList.add('active');

    setTimeout(() => {
      loadingEl.classList.remove('active');
      showResult();
    }, 1800 + Math.random() * 1000);
  }

  function showResult() {
    const categories = generateResult();

    resultEl.classList.add('active');

    // Рендер вердикта
    verdictEl.textContent = getVerdict(currentTotal);

    // Рендер категорий
    categoriesEl.innerHTML = '';
    categories.forEach((c, i) => {
      const div = document.createElement('div');
      div.className = 'compat-category';
      div.style.transitionDelay = (i * 0.1) + 's';
      div.innerHTML = `
        <div class="compat-cat-header">
          <span class="compat-cat-icon">${c.icon}</span>
          <span class="compat-cat-name">${c.name}</span>
          <span class="compat-cat-value">${c.value}%</span>
        </div>
        <div class="compat-bar">
          <div class="compat-bar-fill" data-value="${c.value}"></div>
        </div>
        <p class="compat-cat-note">${c.note}</p>
      `;
      categoriesEl.appendChild(div);
    });

    // Анимация круга
    circleEl.style.strokeDashoffset = CIRCUMFERENCE;
    percentEl.textContent = '0%';

    requestAnimationFrame(() => {
      animateCircle(currentTotal);
    });

    // Появление категорий
    setTimeout(() => {
      document.querySelectorAll('.compat-category').forEach((cat, i) => {
        setTimeout(() => {
          cat.classList.add('visible');
        }, i * 120);
      });

      setTimeout(() => {
        document.querySelectorAll('.compat-bar-fill').forEach((bar, i) => {
          const val = parseInt(bar.getAttribute('data-value'), 10);
          setTimeout(() => {
            bar.style.width = val + '%';
          }, i * 100);
        });
      }, 300);
    }, 400);
  }

  function animateCircle(target) {
    const duration = 2200;
    const start = performance.now();

    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      percentEl.textContent = current.toFixed(1) + '%';
      circleEl.style.strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * current / 100);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  startBtn.addEventListener('click', showLoading);
  restartBtn.addEventListener('click', () => {
    resultEl.classList.remove('active');
    idleEl.style.display = 'block';
    circleEl.style.strokeDashoffset = CIRCUMFERENCE;
    percentEl.textContent = '0%';
  });
})();