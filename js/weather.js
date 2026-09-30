/* ============================================
   WEATHER — метафорическая погода
   ============================================ */

(function() {
  'use strict';

  const display = document.getElementById('weatherDisplay');
  if (!display) return;

  const iconEl = document.getElementById('weatherIcon');
  const stateEl = document.getElementById('weatherState');
  const poeticEl = document.getElementById('weatherPoetic');
  const detailsEl = document.getElementById('weatherDetails');
  const refreshBtn = document.getElementById('weatherRefreshBtn');

  let currentIndex = -1;

  function renderMood(mood) {
    // Анимация выхода
    display.style.opacity = '0';
    display.style.transform = 'translateY(15px)';

    setTimeout(() => {
      display.setAttribute('data-mood', mood.mood);
      iconEl.textContent = mood.icon;
      stateEl.textContent = mood.state;
      poeticEl.textContent = mood.poetic;

      detailsEl.innerHTML = mood.details.map(d => `
        <div class="weather-detail">
          <span class="weather-detail-value">${d.value}</span>
          <span class="weather-detail-label">${d.label}</span>
        </div>
      `).join('');

      // Анимация входа
      display.style.opacity = '1';
      display.style.transform = 'translateY(0)';
    }, 300);
  }

  function showRandomMood() {
    let idx;
    do {
      idx = Math.floor(Math.random() * siteData.weatherMoods.length);
    } while (idx === currentIndex && siteData.weatherMoods.length > 1);
    currentIndex = idx;
    renderMood(siteData.weatherMoods[idx]);
  }

  // Первый показ
  setTimeout(showRandomMood, 500);

  // Автосмена каждые 8 секунд
  let autoTimer = setInterval(showRandomMood, 8000);

  // Кнопка сброса таймера
  refreshBtn.addEventListener('click', () => {
    clearInterval(autoTimer);
    showRandomMood();
    autoTimer = setInterval(showRandomMood, 8000);
  });
})();