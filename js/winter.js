(function() {
  'use strict';

  // ============================================================
  // ПАРОЛЬ
  // ============================================================
  const CORRECT_PASSWORD = 'Снежинка';
  const STORAGE_UNLOCKED = 'winter-unlocked';
  const STORAGE_THEME = 'winter-theme';

  const lockScreen = document.getElementById('lockScreen');
  const lockForm = document.getElementById('lockForm');
  const lockInput = document.getElementById('lockInput');
  const lockError = document.getElementById('lockError');
  const lockIcon = document.getElementById('lockIcon');
  const themeToggle = document.getElementById('themeToggle');
  const lockThemeToggle = document.getElementById('lockThemeToggle');

  // ============================================================
  // ТЕМА
  // ============================================================
  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    if (lockThemeToggle) lockThemeToggle.textContent = isDark ? '☀️' : '🌙';
  }

  const savedTheme = localStorage.getItem(STORAGE_THEME);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_THEME, newTheme);
  });

  lockThemeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_THEME, newTheme);
  });

  // ============================================================
  // ЗВЁЗДЫ
  // ============================================================
  const starfield = document.getElementById('starfield');
  const STAR_COUNT = 100;

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDuration = (2 + Math.random() * 4) + 's';
    star.style.animationDelay = (Math.random() * 5) + 's';
    star.style.opacity = 0.3 + Math.random() * 0.7;
    starfield.appendChild(star);
  }

  // ============================================================
  // СНЕГОПАД
  // ============================================================
  const snowfall = document.getElementById('snowfall');
  const snowChars = ['❄️', '❅', '❆', '✦', '✧', '❄'];
  const SNOW_COUNT = window.innerWidth < 600 ? 30 : 60;

  function createSnowflakes() {
    snowfall.innerHTML = '';
    for (let i = 0; i < SNOW_COUNT; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = snowChars[Math.floor(Math.random() * snowChars.length)];
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.fontSize = (0.6 + Math.random() * 1.2) + 'rem';
      snowflake.style.animationDuration = (6 + Math.random() * 8) + 's';
      snowflake.style.animationDelay = (Math.random() * 8) + 's';
      snowflake.style.opacity = 0.4 + Math.random() * 0.6;
      snowfall.appendChild(snowflake);
    }
  }

  createSnowflakes();

  // ============================================================
  // КОНФЕТТИ
  // ============================================================
  function winterConfetti() {
    const chars = ['❄️', '❅', '❆', '✨', '⭐', '💜', '💙', '🎄', '🎁'];
    for (let i = 0; i < 60; i++) {
      const span = document.createElement('span');
      span.className = 'confetti-snow';
      span.textContent = chars[Math.floor(Math.random() * chars.length)];
      span.style.left = Math.random() * 100 + 'vw';
      span.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
      span.style.animationDuration = (3 + Math.random() * 3) + 's';
      span.style.animationDelay = (Math.random() * 1.2) + 's';
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 8000);
    }
  }

  // ============================================================
  // РАЗБЛОКИРОВКА
  // ============================================================
  function unlockSite() {
    lockIcon.textContent = '🔓';
    lockScreen.classList.add('unlocked');
    document.body.classList.remove('locked');
    document.body.classList.add('unlocked');

    setTimeout(winterConfetti, 300);

    setTimeout(() => {
      lockScreen.style.display = 'none';
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible');
        }
      });
    }, 1000);
  }

  if (sessionStorage.getItem(STORAGE_UNLOCKED) === 'true') {
    lockScreen.style.display = 'none';
    document.body.classList.remove('locked');
    document.body.classList.add('unlocked');
  }

  lockForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = lockInput.value.trim();

    if (value.toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
      sessionStorage.setItem(STORAGE_UNLOCKED, 'true');
      lockError.classList.remove('visible');
      lockInput.classList.remove('error');
      unlockSite();
    } else {
      lockInput.classList.add('error');
      lockError.textContent = 'Неверный пароль. Попробуй ещё раз ❄️';
      lockError.classList.add('visible');
      setTimeout(() => { lockInput.value = ''; lockInput.focus(); }, 500);
      setTimeout(() => lockInput.classList.remove('error'), 1500);
    }
  });

  setTimeout(() => lockInput.focus(), 600);

  // ============================================================
  // ПРОГРЕСС ЧТЕНИЯ
  // ============================================================
  const readingProgress = document.getElementById('readingProgress');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    readingProgress.style.width = progress + '%';
  }, { passive: true });

  // ============================================================
  // НАВИГАЦИЯ
  // ============================================================
  const navBar = document.getElementById('navBar');

  function onScroll() {
    navBar.classList.toggle('visible', window.scrollY > 200);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  const navButtons = document.querySelectorAll('.nav-bar button[data-goto]');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-goto');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================================
  // ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));

  // ============================================================
  // ИГРА "СОБЕРИ СНЕГОВИКА"
  // ============================================================
  const snowmanArea = document.getElementById('snowmanArea');
  const snowmanTarget = document.getElementById('snowmanTarget');
  const snowmanHint = document.getElementById('snowmanHint');

  let flakesCaught = 0;
  const TOTAL_FLAKES = 3;

  function createFlake() {
    const flake = document.createElement('div');
    flake.className = 'snowman-flake';
    flake.textContent = '❄️';

    const areaWidth = snowmanArea.offsetWidth;
    const areaHeight = snowmanArea.offsetHeight;
    const centerX = areaWidth / 2;
    const centerY = areaHeight / 2;

    let x, y;
    let attempts = 0;
    do {
      x = Math.random() * (areaWidth - 60) + 30;
      y = Math.random() * (areaHeight - 60) + 30;
      attempts++;
    } while (Math.hypot(x - centerX, y - centerY) < 150 && attempts < 20);

    flake.style.left = x + 'px';
    flake.style.top = y + 'px';
    flake.style.animationDelay = (Math.random() * 2) + 's';

    flake.addEventListener('click', () => {
      if (flake.classList.contains('caught')) return;
      flake.classList.add('caught');
      flakesCaught++;
      updateSnowman();
    });

    snowmanArea.appendChild(flake);
  }

  function updateSnowman() {
    if (flakesCaught >= 1) {
      document.querySelector('.part-bottom').classList.add('active');
    }
    if (flakesCaught >= 2) {
      document.querySelector('.part-middle').classList.add('active');
    }
    if (flakesCaught >= 3) {
      document.querySelector('.part-head').classList.add('active');
      snowmanTarget.classList.add('complete');
      snowmanHint.textContent = '🎉 Снеговик ожил! С Новым годом, Николь! ⛄';
      snowmanHint.classList.add('success');

      winterConfetti();

      setTimeout(() => {
        document.querySelectorAll('.snowman-flake:not(.caught)').forEach(f => {
          f.classList.add('caught');
          setTimeout(() => f.remove(), 300);
        });
      }, 500);
    } else {
      snowmanHint.textContent = `Поймано снежинок: ${flakesCaught} из ${TOTAL_FLAKES}. Продолжай!`;
    }
  }

  function initSnowmanGame() {
    snowmanArea.querySelectorAll('.snowman-flake').forEach(f => f.remove());
    flakesCaught = 0;
    snowmanTarget.classList.remove('complete');
    snowmanHint.classList.remove('success');
    snowmanHint.textContent = `Найди и нажми на ${TOTAL_FLAKES} снежинки, чтобы оживить снеговика!`;

    document.querySelectorAll('.snowman-part').forEach(p => p.classList.remove('active'));

    for (let i = 0; i < TOTAL_FLAKES; i++) {
      createFlake();
    }
  }

  if (document.readyState === 'complete') {
    initSnowmanGame();
  } else {
    window.addEventListener('load', initSnowmanGame);
  }

  let snowmanResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(snowmanResizeTimer);
    snowmanResizeTimer = setTimeout(initSnowmanGame, 500);
  });

  // ============================================================
  // ФУТЕР
  // ============================================================
  document.getElementById('footerYear').textContent = new Date().getFullYear();

})();