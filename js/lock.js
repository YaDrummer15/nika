/* ============================================
   LOCK — экран блокировки + тема
   ============================================ */

(function() {
  'use strict';

  const lockScreen = document.getElementById('lockScreen');
  const lockForm = document.getElementById('lockForm');
  const lockInput = document.getElementById('lockInput');
  const lockError = document.getElementById('lockError');
  const lockIcon = document.getElementById('lockIcon');
  const themeToggle = document.getElementById('themeToggle');
  const lockThemeToggle = document.getElementById('lockThemeToggle');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    if (lockThemeToggle) lockThemeToggle.textContent = isDark ? '☀️' : '🌙';
  }

  const savedTheme = localStorage.getItem(siteData.storage.theme);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  function toggleTheme() {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(siteData.storage.theme, newTheme);
  }

  themeToggle.addEventListener('click', toggleTheme);
  lockThemeToggle.addEventListener('click', toggleTheme);

  function welcomeConfetti() {
    const chars = ['💜', '💖', '💗', '♥', '✨', '🌸', '💛', '🎉', '⭐', '🌟'];
    const count = 80;
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.className = 'welcome-confetti';
      span.textContent = chars[Math.floor(Math.random() * chars.length)];
      span.style.left = Math.random() * 100 + 'vw';
      span.style.fontSize = (1.2 + Math.random() * 1.8) + 'rem';
      span.style.animationDuration = (3 + Math.random() * 3) + 's';
      span.style.animationDelay = (Math.random() * 1.2) + 's';
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 7000);
    }
  }

  function unlockSite() {
    lockIcon.textContent = '🔓';
    lockScreen.classList.add('unlocked');
    document.body.classList.remove('locked');
    document.body.classList.add('unlocked');

    setTimeout(welcomeConfetti, 300);

    setTimeout(() => {
      const heroTitleEl = document.getElementById('heroTitle');
      if (heroTitleEl && heroTitleEl.textContent === '' && typeof window.typeHero === 'function') {
        window.typeHero();
      }
    }, 900);

    if (typeof window.updateCounter === 'function') window.updateCounter();

    setTimeout(() => {
      lockScreen.style.display = 'none';
    }, 1000);
  }

  if (sessionStorage.getItem(siteData.storage.unlocked) === 'true') {
    lockScreen.style.display = 'none';
    document.body.classList.remove('locked');
    document.body.classList.add('unlocked');
  }

  lockForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = lockInput.value.trim();

    if (value.toLowerCase() === 'бублик' && value.toLowerCase() !== siteData.correctPassword.toLowerCase()) {
      if (typeof window.showEasterEgg === 'function') {
        window.showEasterEgg();
        lockInput.value = '';
      }
      return;
    }

    if (value.toLowerCase() === siteData.correctPassword.toLowerCase()) {
      sessionStorage.setItem(siteData.storage.unlocked, 'true');
      lockError.classList.remove('visible');
      lockInput.classList.remove('error');
      unlockSite();
    } else {
      lockInput.classList.add('error');
      lockError.textContent = 'Неверный пароль. Попробуй ещё раз 😊';
      lockError.classList.add('visible');
      setTimeout(() => { lockInput.value = ''; lockInput.focus(); }, 500);
      setTimeout(() => lockInput.classList.remove('error'), 1500);
    }
  });

  setTimeout(() => lockInput.focus(), 600);

  window.LockModule = { unlockSite };
})();