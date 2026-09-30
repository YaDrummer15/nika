(function() {
  'use strict';

  // ============================================================
  // ОПРЕДЕЛЕНИЕ МОЩНОСТИ УСТРОЙСТВА
  // ============================================================
  const isMobile = window.innerWidth < 768;
  const isLowEnd = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

  // ============================================================
  // ЗВЁЗДНОЕ НЕБО
  // ============================================================
  const starfield = document.getElementById('starfield');
  const STAR_COUNT = isLowEnd ? 40 : 90;

  if (starfield) {
    const starFragment = document.createDocumentFragment();
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
      starFragment.appendChild(star);
    }
    starfield.appendChild(starFragment);
  }

  // ============================================================
  // ЦВЕТОЧНЫЙ ФОН
  // ============================================================
  const petalsBg = document.getElementById('petalsBg');
  const petalChars = ['🌸', '🌺', '🌷', '🌹', '💐', '🌼', '💮'];
  const PETAL_COUNT = isLowEnd ? 5 : 12;

  if (petalsBg) {
    const petalFragment = document.createDocumentFragment();
    for (let i = 0; i < PETAL_COUNT; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.textContent = petalChars[Math.floor(Math.random() * petalChars.length)];
      petal.style.left = Math.random() * 100 + '%';
      petal.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
      petal.style.animationDuration = (10 + Math.random() * 12) + 's';
      petal.style.animationDelay = (Math.random() * 15) + 's';
      petalFragment.appendChild(petal);
    }
    petalsBg.appendChild(petalFragment);
  }

  // ============================================================
  // ПЛАВАЮЩИЕ СЕРДЕЧКИ
  // ============================================================
  const heartsContainer = document.getElementById('floatingHearts');
  const heartChars = ['♥', '❤', '💜', '💖', '💗'];
  const heartCount = isLowEnd ? 5 : 12;

  if (heartsContainer) {
    const heartFragment = document.createDocumentFragment();
    for (let i = 0; i < heartCount; i++) {
      const span = document.createElement('span');
      span.className = 'heart-float';
      span.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
      span.style.animationDuration = (12 + Math.random() * 18) + 's';
      span.style.animationDelay = (Math.random() * 15) + 's';
      span.style.color = ['#AB47BC', '#CE93D8', '#8E24AA', '#FFB74D'][Math.floor(Math.random() * 4)];
      heartFragment.appendChild(span);
    }
    heartsContainer.appendChild(heartFragment);
  }

  // ============================================================
  // КОНСТАНТЫ
  // ============================================================
  const CORRECT_PASSWORD = 'Бублик';
  const STORAGE_UNLOCKED = 'nicole-unlocked';
  const STORAGE_THEME = 'nicole-theme';
  const STORAGE_VISITS = 'nicole-visits';
  const STORAGE_HUNDRED = 'nicole-hundred-opened';
  const STORAGE_FUTURE_UNLOCKED = 'nicole-future-unlocked';
  const FUTURE_DATE = new Date(2027, 1, 4, 0, 0, 0);
  const FUTURE_SECRET_CODE = 'навсегда';
  const startDate = new Date(2026, 1, 4, 0, 0, 0);

  // ============================================================
  // ССЫЛКИ (кэш для скорости)
  // ============================================================
  const $ = (id) => document.getElementById(id);

  const lockScreen = $('lockScreen');
  const lockForm = $('lockForm');
  const lockInput = $('lockInput');
  const lockError = $('lockError');
  const lockIcon = $('lockIcon');
  const themeToggle = $('themeToggle');
  const lockThemeToggle = $('lockThemeToggle');
  const loveIntro = $('loveIntro');
  const loveHeartsContainer = $('loveHeartsContainer');
  const loveSkipBtn = $('loveSkipBtn');
  const heroTitleEl = $('heroTitle');
  const heroDateEl = $('heroDate');
  const visitCounterEl = $('visitCounter');
  const galleryGrid = $('galleryGrid');
  const timelineContainer = $('timelineContainer');
  const reasonsGrid = $('reasonsGrid');
  const tenMomentsList = $('tenMomentsList');
  const poemLinesContainer = $('poemLines');
  const complimentText = $('complimentText');
  const complimentBtn = $('complimentBtn');
  const complimentCounter = $('complimentCounter');
  const gameArea = $('gameArea');
  const gameScoreEl = $('gameScore');
  const gameTimeEl = $('gameTime');
  const gameBestEl = $('gameBest');
  const gameStartBtn = $('gameStartBtn');
  const gameResult = $('gameResult');
  const letterTextEl = $('letterText');
  const letterPaper = $('letterPaper');
  const secretTrigger = $('secretTrigger');
  const secretContent = $('secretContent');
  const secretTextEl = $('secretText');
  const futureLetterBox = $('futureLetterBox');
  const futureLock = $('futureLock');
  const futureTitle = $('futureTitle');
  const futureOpenBtn = $('futureOpenBtn');
  const futureHint = $('futureHint');
  const futureSecretForm = $('futureSecretForm');
  const futureSecretInput = $('futureSecretInput');
  const futureSecretHint = $('futureSecretHint');
  const futureLetterText = $('futureLetterText');
  const fcDays = $('fcDays');
  const fcHours = $('fcHours');
  const fcMinutes = $('fcMinutes');
  const fcSeconds = $('fcSeconds');
  const surpriseBtn = $('surpriseBtn');
  const surpriseModal = $('surpriseModal');
  const surpriseEmoji = $('surpriseEmoji');
  const surpriseText = $('surpriseText');
  const surpriseClose = $('surpriseClose');
  const easterModal = $('easterModal');
  const easterClose = $('easterClose');
  const lightbox = $('lightbox');
  const lightboxImg = $('lightboxImg');
  const lightboxCaption = $('lightboxCaption');
  const lightboxClose = $('lightboxClose');
  const lightboxPrev = $('lightboxPrev');
  const lightboxNext = $('lightboxNext');
  const lightboxCounter = $('lightboxCounter');
  const bgAudio = $('bgAudio');
  const playPauseBtn = $('playPauseBtn');
  const volumeSlider = $('volumeSlider');
  const muteBtn = $('muteBtn');
  const loopBtn = $('loopBtn');
  const audioPlayer = $('audioPlayer');
  const navBar = $('navBar');
  const backToTop = $('backToTop');
  const readingProgress = $('readingProgress');
  const hundredGrid = $('hundredGrid');
  const hundredProgressBar = $('hundredProgressBar');
  const hundredProgressText = $('hundredProgressText');
  const hundredProgressLevel = $('hundredProgressLevel');
  const hundredProgressRemaining = $('hundredProgressRemaining');
  const hundredRandom = $('hundredRandom');
  const hundredShowAll = $('hundredShowAll');
  const compatBtn = $('compatBtn');
  const compatResult = $('compatResult');
  const compatFill = $('compatFill');
  const compatPercent = $('compatPercent');
  const compatText = $('compatText');
  const weatherIcon = $('weatherIcon');
  const weatherTitle = $('weatherTitle');
  const weatherText = $('weatherText');
  const weatherRefresh = $('weatherRefresh');

  // Кэш для счётчика времени
  const cDays = $('cDays');
  const cHours = $('cHours');
  const cMinutes = $('cMinutes');
  const cSeconds = $('cSeconds');

  // ============================================================
  // ПОПАП ПРИЧИНЫ
  // ============================================================
  const reasonPopup = document.createElement('div');
  reasonPopup.className = 'reason-popup';
  reasonPopup.id = 'reasonPopup';
  reasonPopup.innerHTML = `
    <button class="reason-popup-close" id="reasonPopupClose" aria-label="Закрыть">&times;</button>
    <span class="secret-popup-badge" style="display:none;">⭐ Секретная причина ⭐</span>
    <div class="reason-popup-num"></div>
    <div class="reason-popup-text"></div>
    <div class="reason-popup-heart">♥</div>
  `;
  document.body.appendChild(reasonPopup);

  const reasonPopupClose = $('reasonPopupClose');
  const reasonPopupNum = reasonPopup.querySelector('.reason-popup-num');
  const reasonPopupText = reasonPopup.querySelector('.reason-popup-text');
  const reasonPopupBadge = reasonPopup.querySelector('.secret-popup-badge');

  let reasonPopupTimer = null;

  reasonPopupClose.addEventListener('click', () => {
    reasonPopup.classList.remove('visible');
  });
  reasonPopup.addEventListener('click', (e) => {
    if (e.target === reasonPopup) reasonPopup.classList.remove('visible');
  });

  function showReasonPopup(num, text, isSecret) {
    reasonPopupNum.textContent = `Причина №${num}`;
    reasonPopupText.textContent = text;
    if (isSecret) {
      reasonPopupBadge.style.display = 'inline-block';
      reasonPopup.classList.add('secret');
    } else {
      reasonPopupBadge.style.display = 'none';
      reasonPopup.classList.remove('secret');
    }
    reasonPopup.classList.add('visible');
    clearTimeout(reasonPopupTimer);
    reasonPopupTimer = setTimeout(() => {
      reasonPopup.classList.remove('visible');
    }, 5000);
  }

  // ============================================================
  // ТЕМА
  // ============================================================
  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    if (themeToggle) themeToggle.textContent = isDark ? '☀️' : '🌙';
    if (lockThemeToggle) lockThemeToggle.textContent = isDark ? '☀️' : '🌙';
  }

  const savedTheme = localStorage.getItem(STORAGE_THEME);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  const toggleTheme = () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_THEME, newTheme);
  };
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (lockThemeToggle) lockThemeToggle.addEventListener('click', toggleTheme);

  // ============================================================
  // ВИЗИТЫ
  // ============================================================
  function updateVisits() {
    let visits = parseInt(localStorage.getItem(STORAGE_VISITS) || '0', 10);
    visits++;
    localStorage.setItem(STORAGE_VISITS, String(visits));

    if (visitCounterEl) {
      if (visits === 1) {
        visitCounterEl.textContent = 'Ты открываешь эту страницу впервые ✨';
      } else {
        const plural = (n) => {
          const mod10 = n % 10;
          const mod100 = n % 100;
          if (mod10 === 1 && mod100 !== 11) return 'раз';
          if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'раза';
          return 'раз';
        };
        visitCounterEl.textContent = `Ты открываешь эту страницу уже ${visits} ${plural(visits)} 💜`;
      }
    }
  }

  // ============================================================
  // КОНФЕТТИ
  // ============================================================
  function welcomeConfetti() {
    if (isLowEnd) return;
    const chars = ['💜', '💖', '💗', '♥', '✨', '🌸', '💛', '🎉', '⭐', '🌟'];
    const fragment = document.createDocumentFragment();
    const count = 40;

    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.className = 'welcome-confetti';
      span.textContent = chars[Math.floor(Math.random() * chars.length)];
      span.style.left = Math.random() * 100 + 'vw';
      span.style.fontSize = (1.2 + Math.random() * 1.8) + 'rem';
      span.style.animationDuration = (3 + Math.random() * 3) + 's';
      span.style.animationDelay = (Math.random() * 1.2) + 's';
      fragment.appendChild(span);
    }
    document.body.appendChild(fragment);
    setTimeout(() => {
      document.querySelectorAll('.welcome-confetti').forEach(el => el.remove());
    }, 7000);
  }

  // ============================================================
  // БЛОКИРОВКА
  // ============================================================
  function unlockSite() {
    if (lockIcon) lockIcon.textContent = '🔓';
    if (lockScreen) lockScreen.classList.add('unlocked');
    document.body.classList.remove('locked');
    document.body.classList.add('unlocked');
    updateVisits();
    setTimeout(() => { if (lockScreen) lockScreen.style.display = 'none'; }, 1000);
    setTimeout(() => { showLoveIntro(); }, 1200);
  }

  if (sessionStorage.getItem(STORAGE_UNLOCKED) === 'true') {
    if (lockScreen) lockScreen.style.display = 'none';
    document.body.classList.remove('locked');
    document.body.classList.add('unlocked');
  }

  if (lockForm) {
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
        lockError.textContent = 'Неверный пароль. Попробуй ещё раз 😊';
        lockError.classList.add('visible');
        setTimeout(() => { lockInput.value = ''; lockInput.focus(); }, 500);
        setTimeout(() => lockInput.classList.remove('error'), 1500);
      }
    });
  }

  setTimeout(() => { if (lockInput) lockInput.focus(); }, 600);

  // ============================================================
  // "I LOVE YOU"
  // ============================================================
  const letterI = [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]];
  const letterL = [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]];
  const letterO = [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]];
  const letterV = [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]];
  const letterE = [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]];
  const letterY = [[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]];
  const letterU = [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]];

  function combineLetters(...letters) {
    const result = [];
    letters.forEach((letter, li) => {
      for (let col = 0; col < 5; col++) {
        const c = [];
        for (let row = 0; row < 7; row++) c.push(letter[row][col]);
        result.push(c);
      }
      if (li < letters.length - 1) result.push([0,0,0,0,0,0,0]);
    });
    return result;
  }

  const wordI = combineLetters(letterI);
  const wordLove = combineLetters(letterL, letterO, letterV, letterE);
  const wordYou = combineLetters(letterY, letterO, letterU);

  const finalMap = [];
  wordI.forEach(c => finalMap.push(c));
  finalMap.push([0,0,0,0,0,0,0]);
  wordLove.forEach(c => finalMap.push(c));
  finalMap.push([0,0,0,0,0,0,0]);
  wordYou.forEach(c => finalMap.push(c));

  const totalWidth = finalMap.length;
  const totalHeight = 7;

  function buildLoveHearts() {
    if (!loveHeartsContainer) return;
    loveHeartsContainer.innerHTML = '';

    const rect = loveHeartsContainer.getBoundingClientRect();
    const containerWidth = rect.width || window.innerWidth;
    const containerHeight = rect.height || window.innerHeight;

    const maxWidth = Math.min(containerWidth * 0.9, 900);
    const maxHeight = Math.min(containerHeight * 0.5, 400);
    const pixelW = maxWidth / totalWidth;
    const pixelH = maxHeight / totalHeight;
    const pixel = Math.min(pixelW, pixelH);
    const offsetX = containerWidth / 2 - (totalWidth * pixel) / 2;
    const offsetY = containerHeight / 2 - (totalHeight * pixel) / 2;
    const heartSize = Math.max(0.6, pixel / 14);

    const fragment = document.createDocumentFragment();
    let heartCount = 0;
    for (let col = 0; col < totalWidth; col++) {
      for (let row = 0; row < totalHeight; row++) {
        if (finalMap[col] && finalMap[col][row] === 1) {
          const heart = document.createElement('span');
          heart.className = 'love-heart';
          heart.textContent = '♥';
          heart.style.left = (offsetX + col * pixel + pixel / 2) + 'px';
          heart.style.top = (offsetY + row * pixel + pixel / 2) + 'px';
          heart.style.fontSize = heartSize + 'rem';
          heart.style.animationDelay = (heartCount * 0.02) + 's';
          fragment.appendChild(heart);
          heartCount++;
        }
      }
    }
    loveHeartsContainer.appendChild(fragment);

    // Текст "I love you, Николь"
    let loveText = loveIntro.querySelector('.love-text');
    if (loveText) loveText.remove();
    loveText = document.createElement('div');
    loveText.className = 'love-text';
    loveText.textContent = 'I love you, Николь';
    loveIntro.appendChild(loveText);
  }

  function buildBackgroundHearts() {
    if (!loveIntro) return;
    loveIntro.querySelectorAll('.love-bg-heart').forEach(h => h.remove());
    const fragment = document.createDocumentFragment();
    const count = isLowEnd ? 8 : 15;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('span');
      heart.className = 'love-bg-heart';
      heart.textContent = ['♥', '❤', '💜', '💖'][Math.floor(Math.random() * 4)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
      heart.style.animationDuration = (6 + Math.random() * 8) + 's';
      heart.style.animationDelay = (Math.random() * 5) + 's';
      fragment.appendChild(heart);
    }
    loveIntro.appendChild(fragment);
  }

  function showLoveIntro() {
    if (!loveIntro) return;
    loveIntro.classList.remove('hidden');
    buildLoveHearts();
    buildBackgroundHearts();
    setTimeout(hideLoveIntro, 6000);
  }

  function hideLoveIntro() {
    if (!loveIntro) return;
    loveIntro.classList.add('hidden');
    setTimeout(() => {
      if (heroTitleEl && heroTitleEl.textContent === '') typeHero();
    }, 600);
  }

  if (loveSkipBtn) loveSkipBtn.addEventListener('click', hideLoveIntro);

  let loveResizeTimer;
  window.addEventListener('resize', () => {
    if (!loveIntro || loveIntro.classList.contains('hidden')) return;
    clearTimeout(loveResizeTimer);
    loveResizeTimer = setTimeout(buildLoveHearts, 300);
  });

  // ============================================================
  // ДАННЫЕ
  // ============================================================
  const galleryData = [
    { src: 'https://storage.yandexcloud.net/b.fotovssylku.ru/2026/09/27/0mLn5FcO3k7uQLscmFOEBbixhFdwLeUhVwZLKbXO8q0MLNQqYUlqf-EiAM81rDb8oqxIxBkFldyrvlB5URQzTci.md.jpg', caption: 'Наша первая совместная фотография', date: '7 февраля 2026' },
    { src: 'https://storage.yandexcloud.net/b.fotovssylku.ru/2026/09/27/image0706b78bffac8cc3.md.png', caption: 'Твой день рождения', date: '4 марта 2026' },
    { src: 'https://storage.yandexcloud.net/b.fotovssylku.ru/2026/09/27/image3555b5a1d7e73a56.md.png', caption: 'Первое наше 8 марта', date: '8 марта 2026' },
    { src: 'https://storage.yandexcloud.net/b.fotovssylku.ru/2026/09/27/image13280c128a56994b.md.png', caption: 'Наше любимое место "Мир Булок"', date: '22 февраля 2026' },
    { src: 'https://storage.yandexcloud.net/b.fotovssylku.ru/2026/09/27/image248749610735ccbc.png', caption: 'Просто вместе', date: '23 февраля 2026' }
  ];

  const timelineData = [
    { date: '04 февраля 2026', title: 'Первое сообщение', desc: 'Тот самый момент, когда всё началось.' },
    { date: '07 февраля 2026', title: 'Первая совместная фотография', desc: 'Мы впервые оказались в одном кадре. И этот кадр — теперь моя самая тёплая память.' },
    { date: '22 февраля 2026', title: 'Наше любимое место', desc: 'Мы нашли "Мир Булок" — место, где время замирает.' },
    { date: '23 февраля 2026', title: 'Просто вместе', desc: 'День, когда мы поняли, что нам не нужны особые поводы.' },
    { date: '04 марта 2026', title: 'Твой день рождения', desc: 'Я хотел подарить тебе весь мир, но ты сказала, что тебе достаточно меня.' },
    { date: '08 марта 2026', title: 'Первое наше 8 марта', desc: 'Первый праздник, который я встречал с тобой.' }
  ];

  const reasonsData = [
    { icon: '😊', title: 'Твоя улыбка', text: 'Она освещает даже самый хмурый день.' },
    { icon: '🎵', title: 'Твой голос', text: 'Музыка, которая лечит любые раны.' },
    { icon: '💜', title: 'Твоя доброта', text: 'Ты заботишься обо всех вокруг, даже когда устала.' },
    { icon: '✨', title: 'Твои глаза', text: 'В них я вижу будущее, в котором мы счастливы.' },
    { icon: '🌸', title: 'Твоя нежность', text: 'Каждое твоё прикосновение — как весенний ветерок.' },
    { icon: '🌟', title: 'Твоя сила', text: 'Ты справляешься со всем, и я восхищаюсь тобой.' }
  ];

  const tenMomentsData = [
    { title: 'Тот самый "привет"', text: 'Когда ты ответила впервые, я перечитывал сообщение раз десять.' },
    { title: 'Первая совместная фотография', text: 'Мы стояли рядом, и я боялся, что ты услышишь, как громко бьётся моё сердце.' },
    { title: 'Наш "Мир Булок"', text: 'Помнишь этот момент, когда весь мир исчез? Остались только ты и я.' },
    { title: 'Первая прогулка после Нового Херсонеса', text: 'Как мы шли вместе, не зная, что будет впереди.' },
    { title: 'Твой смех', text: 'Однажды ты рассмеялась так искренне, что я понял — готов слушать это всю жизнь.' },
    { title: 'Твоя забота', text: 'Когда ты спросила, поел ли я, будто это самое важное в мире.' },
    { title: 'Твой день рождения', text: 'Когда я вручил тебе подарок, и ты так обрадовалась.' },
    { title: 'Наши встречи', text: 'Каждая встреча — как маленький праздник.' },
    { title: 'Твоё "доброе утро"', text: 'Когда ты писала это утром, весь день становился светлее.' },
    { title: 'Просто быть рядом', text: 'Главный момент — когда я понял, что мне нужно просто быть с тобой.' }
  ];

  const poemLinesData = [
    'Я не искал - но ты вошла в мой мир,',
    'Как тихий свет сквозь утренние тени.',
    'И каждый день с тобой - как первый пир,',
    'Где счастье пью без капли сожаленья.',
    '',
    'Твой голос - музыка, что лечит и хранит,',
    'Твой взгляд - рассвет, что греет даже в стужу.',
    'И сердце, что молчало, вновь стучит,',
    'Николь - ты нужна мне, ты нужна мне - душу.'
  ];

  const complimentsData = [
    'Ты — самое красивое, что случилось со мной в этой жизни.',
    'Когда ты улыбаешься, весь мир становится немного добрее.',
    'Твой голос — моя любимая мелодия. Я готов слушать его вечно.',
    'Рядом с тобой я становлюсь лучшей версией себя.',
    'Ты как рассвет — приходишь, и всё вокруг оживает.',
    'В твоих глазах я вижу своё будущее.',
    'Ты — причина, по которой я верю в чудеса.',
    'Каждое утро с мыслью о тебе — уже счастье.',
    'Ты умеешь делать обычные моменты волшебными.',
    'Твоя нежность — то, что делает меня сильнее.',
    'Ты — мой самый тёплый человек на свете.',
    'Если бы я мог выбрать одну вселенную, я выбрал бы ту, где ты рядом.',
    'Ты делаешь меня счастливым просто тем, что ты есть.',
    'Твоя улыбка — моё любимое зрелище.',
    'Николь, ты — моё вдохновение каждый день.'
  ];

  const letterFullText = `Милая Николь,

Я пишу это сообщение, чтобы выразить всю ту нежность, восхищение и любовь, которые я к тебе испытываю. С каждым днем я все больше и больше убеждаюсь, что ты самая особенная и прекрасная девушка, которую я когда-либо встречал. Своей красотой ты буквально ослепляешь меня. Твоё присутствие наполняет мою жизнь радостью и счастьем.

Каждый раз, когда мы проводим время вместе, мои душевные раны заживают, а сердце полностью наполняется любовью.

Ты не только прекрасна снаружи, но и внутри.
Я благодарен за каждую минуту, проведенную с тобой. Твоя улыбка пробуждает во мне чувства счастья и безграничного восхищения.

Я обещаю быть рядом во всех жизненных ситуациях, как в радости, так и в горе. Я буду поддерживать тебя и быть твоей опорой. Твоё счастье и улыбка моя главная цель в жизни.

Николь, ты особенная девушка, которую я хочу видеть рядом всю жизнь.

Двумя словами, я люблю тебя)`;

  const secretMessage = `Николь,

Знаешь, любимая, иногда я задумываюсь, как объяснить тебе всю силу моей любви, но понимаю — ни одно слово в мире не сможет описать то, что я чувствую к тебе. Это не просто симпатия, не просто привычка, это что-то большее, что-то, что стало частью меня самого.

Я люблю тебя так, что каждое утро просыпаюсь с мыслью о тебе. Я люблю тебя в каждой своей мечте, в каждом вдохе и ударе сердца.

Мне дорого в тебе всё: твой взгляд, в котором я нахожу покой; твоя улыбка, которая разгоняет все мои тревоги; твой голос, который звучит для меня музыкой.

Ты для меня больше, чем просто девушка. Ты моя опора, мой смысл, моё будущее. Я хочу прожить с тобой каждый день своей жизни.

Я обещаю тебе, что никогда не предам и не отпущу. Я выбрал тебя раз и навсегда, и буду любить тебя всегда — сегодня, завтра и до последнего своего дыхания.

Ты - мой мир. Ты - моё всё.

Знай, что моё "я тебя люблю" - это не просто слова. Это обещание. Обещание быть рядом, ценить, беречь и всегда выбирать тебя.`;

  const surpriseMessages = [
    { emoji: '💜', text: 'Ты — самое лучшее, что случилось со мной в этой жизни.' },
    { emoji: '🌸', text: 'Каждое утро я просыпаюсь с мыслью о тебе.' },
    { emoji: '✨', text: 'Ты моя вселенная. Всё, что я делаю — ради твоей улыбки.' },
    { emoji: '💖', text: 'Николь, ты нужна мне. Как смысл всего. Спасибо, что ты есть.' },
    { emoji: '🌟', text: 'Если бы я мог выбрать одну вещь на всю жизнь — я выбрал бы тебя.' },
    { emoji: '🎵', text: 'Твой смех — моя любимая мелодия.' }
  ];

  const weatherData = [
    { icon: '☀️', title: 'Солнечно', text: 'Наша погода сегодня — самая тёплая, потому что ты рядом.' },
    { icon: '🌤️', title: 'Ясно', text: 'Небо чистое, как твои мысли обо мне.' },
    { icon: '🌈', title: 'Радуга', text: 'После любого дождя появляется радуга. Ты — моя радуга.' },
    { icon: '🌸', title: 'Цветение', text: 'Всё цветёт, потому что ты улыбаешься.' },
    { icon: '⭐', title: 'Звёздная ночь', text: 'Каждая звезда — причина, почему я тебя люблю.' },
    { icon: '🌙', title: 'Лунная ночь', text: 'Луна красива. Но не так, как ты.' },
    { icon: '❄️', title: 'Снежно', text: 'Холодно? Просто представь мои объятия.' },
    { icon: '🌧️', title: 'Дождь', text: 'Дождь стучит по крыше, а я думаю о тебе.' },
    { icon: '💜', title: 'Любовная погода', text: 'Прогноз: 100% любви, 0% шансов разлюбить.' },
    { icon: '🍀', title: 'Удача', text: 'Сегодня твой день. Как и каждый день.' }
  ];

  // ============================================================
  // ГЕРОЙ
  // ============================================================
  const heroText = 'История моих чувств к Николь';
  let heroIndex = 0;
  let heroTyped = false;

  function typeHero() {
    if (heroTyped || !heroTitleEl) return;
    if (heroIndex < heroText.length) {
      heroTitleEl.textContent += heroText.charAt(heroIndex);
      heroIndex++;
      setTimeout(typeHero, 65);
    } else {
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      heroTitleEl.appendChild(cursor);
      heroTyped = true;
    }
  }

  if (heroDateEl) {
    const diffDays = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
    heroDateEl.textContent = `с 04 февраля 2026 — ${diffDays} дней вместе`;
  }

  function updateCounter() {
    if (document.hidden) return;
    const now = new Date();
    let diff = now - startDate;
    if (diff < 0) diff = 0;
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (cDays) cDays.textContent = days.toLocaleString('ru-RU');
    if (cHours) cHours.textContent = String(hours).padStart(2, '0');
    if (cMinutes) cMinutes.textContent = String(minutes).padStart(2, '0');
    if (cSeconds) cSeconds.textContent = String(seconds).padStart(2, '0');
  }
  updateCounter();
  setInterval(updateCounter, 1000);

  // ============================================================
  // ГАЛЕРЕЯ
  // ============================================================
  if (galleryGrid) {
    const galleryFragment = document.createDocumentFragment();
    galleryData.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.setAttribute('data-index', i);
      div.innerHTML = `
        <img src="${item.src}" alt="${item.caption}" loading="lazy" decoding="async">
        <div class="caption">${item.caption}</div>
        <div class="date">${item.date}</div>
      `;
      galleryFragment.appendChild(div);
    });
    galleryGrid.appendChild(galleryFragment);
  }

  // ============================================================
  // ТАЙМЛАЙН
  // ============================================================
  if (timelineContainer) {
    const timelineFragment = document.createDocumentFragment();
    timelineData.forEach(item => {
      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
      `;
      timelineFragment.appendChild(div);
    });
    timelineContainer.appendChild(timelineFragment);
  }

  // ============================================================
  // ЗА ЧТО ЛЮБЛЮ
  // ============================================================
  if (reasonsGrid) {
    const reasonsFragment = document.createDocumentFragment();
    reasonsData.forEach((r, i) => {
      const div = document.createElement('div');
      div.className = 'reason-card';
      div.style.transitionDelay = (i * 0.08) + 's';
      div.innerHTML = `
        <span class="reason-icon">${r.icon}</span>
        <div class="reason-title">${r.title}</div>
        <div class="reason-text">${r.text}</div>
      `;
      reasonsFragment.appendChild(div);
    });
    reasonsGrid.appendChild(reasonsFragment);
  }

  // ============================================================
  // 10 МОМЕНТОВ
  // ============================================================
  if (tenMomentsList) {
    const momentsFragment = document.createDocumentFragment();
    tenMomentsData.forEach((m, i) => {
      const div = document.createElement('div');
      div.className = 'moment-item';
      div.innerHTML = `
        <div class="moment-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="moment-content">
          <div class="moment-title">${m.title}</div>
          <div class="moment-text">${m.text}</div>
        </div>
      `;
      momentsFragment.appendChild(div);
    });
    tenMomentsList.appendChild(momentsFragment);
  }

  // ============================================================
  // СТИХОТВОРЕНИЕ
  // ============================================================
  if (poemLinesContainer) {
    const poemFragment = document.createDocumentFragment();
    poemLinesData.forEach((line) => {
      const p = document.createElement('p');
      p.className = 'poem-line';
      p.textContent = line || '\u00A0';
      poemFragment.appendChild(p);
    });
    poemLinesContainer.appendChild(poemFragment);
  }

  // ============================================================
  // КОМПЛИМЕНТ
  // ============================================================
  let complimentCount = 0;
  let lastComplimentIndex = -1;

  if (complimentBtn) {
    complimentBtn.addEventListener('click', () => {
      let idx;
      do {
        idx = Math.floor(Math.random() * complimentsData.length);
      } while (idx === lastComplimentIndex && complimentsData.length > 1);
      lastComplimentIndex = idx;

      complimentText.classList.add('swap-out');
      setTimeout(() => {
        complimentText.textContent = complimentsData[idx];
        complimentText.classList.remove('swap-out');
        complimentCount++;
        if (complimentCounter) complimentCounter.textContent = `Сказано комплиментов: ${complimentCount}`;
      }, 400);
    });
  }

  // ============================================================
  // 100 ПРИЧИН
  // ============================================================
  const hundredReasons = [
    'За то, как ты умеешь слушать — по-настоящему, всем сердцем.',
    'За твою улыбку, которая освещает мой самый хмурый день.',
    'За то, что ты всегда находишь нужные слова, когда мне плохо.',
    'За твой смех — он моя любимая мелодия.',
    'За то, как ты заботишься обо мне, даже по мелочам.',
    'За твои глаза — в них я вижу своё будущее.',
    'За то, что ты веришь в меня, когда я сам в себя не верю.',
    'За твою нежность — она делает меня мягче.',
    'За то, что ты умеешь делать обычные моменты волшебными.',
    'За твоё терпение — со мной бывает непросто.',
    'За то, как ты говоришь "доброе утро" — день сразу становится лучше.',
    'За твою силу — ты справляешься со всем, и я восхищаюсь тобой.',
    'За то, что ты не боишься быть настоящей рядом со мной.',
    'За твои объятия — в них я дома.',
    'За то, как ты злишься — даже тогда ты самая красивая.',
    'За твою доброту — ты помогаешь всем вокруг, даже когда устала.',
    'За то, что ты гордишься мной — это бесценно.',
    'За твой вкус — во всём, от музыки до мелочей.',
    'За то, как ты ешь булочки — это отдельный вид искусства.',
    'За то, что ты умеешь молчать со мной так, что не нужны слова.',
    'За твою честность — даже когда это непросто.',
    'За то, что ты всегда держишь своё слово.',
    'За твою заботу о близких — ты отдаёшь всю себя.',
    'За то, как ты радуешься мелочам — искренне и по-детски.',
    'За твою решительность — ты не боишься идти вперёд.',
    'За то, что ты принимаешь меня таким, какой я есть.',
    'За твои сообщения утром — они как глоток воздуха.',
    'За то, что ты терпишь мои странности.',
    'За твою мудрость — ты видишь то, что другие не замечают.',
    'За то, как ты меня поддерживаешь в трудные моменты.',
    'За твою улыбку, которая появляется, когда ты счастлива.',
    'За то, что ты никогда не сдаёшься.',
    'За твоё чувство юмора — с тобой никогда не скучно.',
    'За то, как ты смотришь на меня, когда думаешь, что я не вижу.',
    'За твою искренность — в ней нет фальши.',
    'За то, что ты умеешь прощать.',
    'За твои маленькие сюрпризы — они делают жизнь ярче.',
    'За то, как ты радуешься моим успехам.',
    'За твой голос, когда ты поёшь.',
    'За то, что ты помнишь все мелочи, которые я говорю.',
    'За твою заботу, когда я болею.',
    'За то, как ты выглядишь утром — растрёпанная и самая красивая.',
    'За твою страсть к жизни.',
    'За то, что ты умеешь мечтать вместе со мной.',
    'За твоё умение слушать тишину.',
    'За то, как ты держишь меня за руку.',
    'За твои глаза, когда ты смеёшься — они светятся.',
    'За то, что ты моя самая большая удача.',
    'За твою скромность.',
    'За то, как ты относишься к своим мечтам.',
    'За твою верность.',
    'За то, что ты всегда рядом, когда нужна.',
    'За твоё умение удивлять.',
    'За то, как ты говоришь моё имя.',
    'За твою заботу о моих чувствах.',
    'За то, что ты умеешь вдохновлять.',
    'За твою настойчивость.',
    'За то, как ты относишься к своей семье.',
    'За твоё умение быть благодарной.',
    'За то, что ты не требуешь многого.',
    'За твоё умение ценить моменты.',
    'За то, как ты смотришь на звёзды.',
    'За твою любовь к животным.',
    'За то, как ты готовишь — даже если это просто чай.',
    'За твоё умение создавать уют.',
    'За то, что ты умеешь слушать мои истории.',
    'За твоё чувство стиля.',
    'За то, как ты относишься к своей работе.',
    'За твою ответственность.',
    'За то, что ты умеешь признавать ошибки.',
    'За твоё умение радоваться за других.',
    'За то, как ты заботишься о своём здоровье.',
    'За твоё умение быть сильной, когда это нужно.',
    'За то, что ты умеешь быть слабой рядом со мной.',
    'За твою открытость.',
    'За то, как ты доверяешь мне.',
    'За твоё умение хранить секреты.',
    'За то, что ты умеешь быть собой.',
    'За твою индивидуальность.',
    'За то, как ты относишься к моим друзьям.',
    'За твоё умение находить общий язык с людьми.',
    'За то, что ты умеешь быть лидером.',
    'За твою скромность в успехах.',
    'За то, как ты относишься к деньгам.',
    'За твоё умение планировать.',
    'За то, что ты умеешь быть спонтанной.',
    'За твою любовь к путешествиям.',
    'За то, как ты относишься к природе.',
    'За твоё умение находить красоту в простом.',
    'За то, что ты умеешь быть благодарной за мелочи.',
    'За твою любовь к чтению.',
    'За то, как ты относишься к своему делу.',
    'За твоё умение быть настойчивой.',
    'За то, что ты умеешь быть терпеливой.',
    'За твою любовь к музыке.',
    'За то, как ты относишься к своему телу.',
    'За твоё умение любить себя.',
    'За то, что ты умеешь быть счастливой.',
    'За то, что ты — это ты. И за то, что ты рядом со мной.'
  ];

  const secretReasons = {
    13: 'За то, что ты — моё вдохновение.',
    27: 'За то, что ты — мой дом.',
    42: 'За то, что ты — моя вселенная.',
    66: 'За то, что ты — моё чудо.',
    88: 'За то, что ты — моё всё. Николь, я люблю тебя больше, чем все слова на свете могут выразить.'
  };

  let openedReasons = new Set(JSON.parse(localStorage.getItem(STORAGE_HUNDRED) || '[]'));

  function saveOpened() {
    localStorage.setItem(STORAGE_HUNDRED, JSON.stringify([...openedReasons]));
  }

  const cardEmojis = ['💜', '💖', '✨', '🌸', '💫', '🌟', '💗', '🎀', '💐', '🦋'];
  const getEmojiForIndex = (i) => cardEmojis[i % cardEmojis.length];

  const hundredSection = document.getElementById('hundredReasons');
  let secretHintEl = null;
  if (hundredSection) {
    secretHintEl = document.createElement('p');
    secretHintEl.className = 'hundred-secret-hint';
    secretHintEl.id = 'hundredSecretHint';
    hundredSection.appendChild(secretHintEl);
  }

  let finalShown = false;

  function updateHundredProgress() {
    if (!hundredProgressBar) return;
    const count = openedReasons.size;
    const percent = Math.round((count / 100) * 100);
    hundredProgressBar.style.width = percent + '%';
    if (hundredProgressText) hundredProgressText.textContent = `${count} из 100`;

    let level = 'Только начинаем ✨';
    if (count >= 100) level = 'Ты открыла все 100! Ты — моё всё 💜';
    else if (count >= 90) level = 'Ещё чуть-чуть до финала! 🌟';
    else if (count >= 70) level = 'Ты почти у цели! 💫';
    else if (count >= 50) level = 'Половина позади! 💖';
    else if (count >= 30) level = 'Ты уже далеко зашла! 🌸';
    else if (count >= 15) level = 'Отличное начало! 💜';
    else if (count >= 5) level = 'Продолжай в том же духе! ✨';
    if (hundredProgressLevel) hundredProgressLevel.textContent = level;

    const remaining = 100 - count;
    if (hundredProgressRemaining) {
      hundredProgressRemaining.textContent = remaining > 0
        ? `Осталось открыть: ${remaining}`
        : 'Ты открыла все причины! 🎉';
    }

    if (count >= 100 && !finalShown) {
      finalShown = true;
      setTimeout(() => {
        welcomeConfetti();
        setTimeout(welcomeConfetti, 800);
        setTimeout(welcomeConfetti, 1600);
      }, 400);
    }

    if (secretHintEl) {
      if (count >= 10 && count < 100) {
        secretHintEl.innerHTML = '💡 Среди этих 100 причин спрятаны <strong>5 особенных</strong>. Они выглядят иначе — найди их все!';
        secretHintEl.classList.add('visible');
      } else {
        secretHintEl.classList.remove('visible');
      }
    }
  }

  function buildHundredCards() {
    if (!hundredGrid) return;
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= 100; i++) {
      const isSecret = secretReasons[i] !== undefined;
      const isOpened = openedReasons.has(i);

      const card = document.createElement('div');
      card.className = 'hundred-card' + (isSecret ? ' secret' : '') + (isOpened ? ' opened' : '');
      card.style.animationDelay = Math.min(i * 0.008, 0.8) + 's';
      card.dataset.index = i;

      card.innerHTML = `
        <div class="hundred-card-inner">
          <div class="hundred-face hundred-front">
            <span class="hundred-front-num">${i}</span>
            <span class="hundred-front-emoji">${isSecret ? '🔒' : getEmojiForIndex(i)}</span>
            <span class="hundred-front-hint">${isSecret ? 'Секретная' : 'Открыть'}</span>
          </div>
          <div class="hundred-face hundred-back">
            <span class="hundred-back-num">№${i}</span>
            <span class="hundred-back-text">${hundredReasons[i - 1] || ''}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (card.classList.contains('opened')) return;
        if (isSecret && openedReasons.size < 50) {
          card.classList.add('denied');
          setTimeout(() => card.classList.remove('denied'), 500);
          return;
        }
        card.classList.add('opened');
        openedReasons.add(i);
        saveOpened();
        updateHundredProgress();
        if (isSecret) {
          setTimeout(() => {
            showReasonPopup(i, secretReasons[i], true);
            welcomeConfetti();
          }, 400);
        } else {
          setTimeout(() => {
            showReasonPopup(i, hundredReasons[i - 1], false);
          }, 400);
        }
      });

      fragment.appendChild(card);
    }
    hundredGrid.appendChild(fragment);
  }

  function showAllReasons() {
    const unopened = [];
    for (let i = 1; i <= 100; i++) {
      if (!openedReasons.has(i)) unopened.push(i);
    }
    if (unopened.length === 0) {
      hundredShowAll.textContent = 'Все открыты 💜';
      hundredShowAll.disabled = true;
      return;
    }
    unopened.forEach((i, idx) => {
      const card = hundredGrid.querySelector(`.hundred-card[data-index="${i}"]`);
      if (!card) return;
      setTimeout(() => {
        if (!card.classList.contains('opened')) {
          card.classList.add('opened');
          openedReasons.add(i);
          saveOpened();
          updateHundredProgress();
        }
      }, idx * 40);
    });
    setTimeout(() => {
      if (hundredShowAll) {
        hundredShowAll.textContent = 'Все открыты 💜';
        hundredShowAll.disabled = true;
      }
    }, unopened.length * 40 + 500);
  }

  if (hundredRandom) {
    hundredRandom.addEventListener('click', () => {
      const closed = [];
      for (let i = 1; i <= 100; i++) {
        if (!openedReasons.has(i)) closed.push(i);
      }
      if (closed.length === 0) {
        showReasonPopup('★', 'Ты уже открыла все 100 причин! Ты — моё всё 💜', true);
        return;
      }
      const pick = closed[Math.floor(Math.random() * closed.length)];
      const card = hundredGrid.querySelector(`.hundred-card[data-index="${pick}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => card.click(), 500);
      }
    });
  }

  if (hundredShowAll) hundredShowAll.addEventListener('click', showAllReasons);

  buildHundredCards();
  updateHundredProgress();

  // ============================================================
  // ПОГОДА
  // ============================================================
  let weatherIndex = 0;

  function setWeather(idx) {
    const w = weatherData[idx];
    if (!weatherIcon || !weatherTitle || !weatherText) return;
    weatherIcon.style.opacity = '0';
    weatherTitle.style.opacity = '0';
    weatherText.style.opacity = '0';
    setTimeout(() => {
      weatherIcon.textContent = w.icon;
      weatherTitle.textContent = w.title;
      weatherText.textContent = w.text;
      weatherIcon.style.opacity = '1';
      weatherTitle.style.opacity = '1';
      weatherText.style.opacity = '1';
    }, 300);
  }

  if (weatherRefresh) {
    weatherRefresh.addEventListener('click', () => {
      let next;
      do {
        next = Math.floor(Math.random() * weatherData.length);
      } while (next === weatherIndex && weatherData.length > 1);
      weatherIndex = next;
      setWeather(weatherIndex);
    });
  }

  setWeather(0);

  // ============================================================
  // СОВМЕСТИМОСТЬ
  // ============================================================
  const compatPhrases = [
    'Вы созданы друг для друга. Это видно с первого взгляда 💜',
    'Идеальная пара. Даже звёзды завидуют вам ✨',
    'Ваша любовь — как в сказке. И она только начинается 🌸',
    'Такие пары встречаются раз в жизни. Берегите друг друга 💖',
    '100% совместимость. Это судьба, иначе не скажешь 🌟'
  ];

  if (compatBtn) {
    compatBtn.addEventListener('click', () => {
      compatBtn.disabled = true;
      compatBtn.textContent = 'Считаем... 💫';
      let current = 0;
      const target = 100;

      const counter = setInterval(() => {
        current += 2;
        if (current >= target) {
          current = target;
          clearInterval(counter);
          if (compatText) compatText.textContent = compatPhrases[Math.floor(Math.random() * compatPhrases.length)];
          if (compatResult) compatResult.classList.add('visible');
          compatBtn.textContent = '💜 Проверено! 💜';
          welcomeConfetti();
        }
        if (compatPercent) compatPercent.textContent = current + '%';
        const offset = 327 - (327 * current / 100);
        if (compatFill) compatFill.style.strokeDashoffset = offset;
      }, 40);
    });
  }

  // ============================================================
  // ПИСЬМО
  // ============================================================
  let letterStarted = false;

  function typeLetter() {
    if (letterStarted || !letterTextEl) return;
    letterStarted = true;

    const text = letterFullText;
    let i = 0;
    const speed = 25;
    let lastBlotIndex = 0;

    function type() {
      if (i < text.length) {
        const chunk = 3;
        letterTextEl.textContent += text.substring(i, i + chunk);
        i += chunk;

        if (i - lastBlotIndex > 100) {
          lastBlotIndex = i;
          const blot = document.createElement('span');
          blot.className = 'ink-blot';
          const size = 20 + Math.random() * 40;
          blot.style.width = size + 'px';
          blot.style.height = size + 'px';
          blot.style.left = (10 + Math.random() * 70) + '%';
          blot.style.top = (10 + Math.random() * 70) + '%';
          letterPaper.appendChild(blot);
          setTimeout(() => blot.remove(), 1500);
        }

        setTimeout(type, speed);
      } else {
        const cursor = document.createElement('span');
        cursor.className = 'cursor-blink';
        letterTextEl.appendChild(cursor);
      }
    }
    type();
  }

  // ============================================================
  // СЕКРЕТНОЕ СООБЩЕНИЕ
  // ============================================================
  let secretTyped = false;

  if (secretTrigger) {
    secretTrigger.addEventListener('click', () => {
      secretContent.classList.toggle('active');
      if (secretContent.classList.contains('active') && !secretTyped) {
        secretTyped = true;
        let i = 0;
        function type() {
          if (i < secretMessage.length) {
            const chunk = 3;
            secretTextEl.textContent += secretMessage.substring(i, i + chunk);
            i += chunk;
            setTimeout(type, 18);
          }
        }
        setTimeout(type, 400);
      }
    });
  }

  // ============================================================
  // ПИСЬМО В БУДУЩЕЕ
  // ============================================================
  const futureLetterBody = `Николь, любимая моя,

Если ты читаешь это письмо — значит, прошёл целый год. И знаешь что? Я до сих пор люблю тебя так же сильно, как в тот день, когда писал эти строки. А может, даже сильнее.

Я хочу, чтобы ты знала: каждый день с тобой был подарком. Даже если мы ссорились, даже если уставали, даже если мир вокруг рушился — ты была моим островом спокойствия, моим домом.

Я обещал тебе в самом начале, что буду рядом. И я сдержал слово. Я буду сдерживать его и дальше — каждый день, каждый час, каждую минуту.

Ты — самое важное, что есть в моей жизни. И если бы мне пришлось прожить всё заново, я бы снова выбрал тебя. Тысячу раз выбрал бы тебя.

Спасибо, что ты есть. Спасибо, что выбрала меня. Спасибо за каждый день, за каждую улыбку, за каждое "доброе утро".

Я люблю тебя. Всегда любил. Всегда буду любить.

Твой бублик 🥯`;

  let futureInterval = null;

  function updateFutureCountdown() {
    if (document.hidden) return;
    const now = new Date();
    let diff = FUTURE_DATE - now;
    if (diff < 0) diff = 0;
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (fcDays) fcDays.textContent = days;
    if (fcHours) fcHours.textContent = String(hours).padStart(2, '0');
    if (fcMinutes) fcMinutes.textContent = String(minutes).padStart(2, '0');
    if (fcSeconds) fcSeconds.textContent = String(seconds).padStart(2, '0');
  }

  function openFutureLetter() {
    if (!futureLetterBox) return;
    futureLetterBox.classList.add('opened');
    if (futureLock) futureLock.textContent = '💌';
    if (futureTitle) futureTitle.textContent = 'Письмо открыто 💜';
    localStorage.setItem(STORAGE_FUTURE_UNLOCKED, 'true');

    if (futureInterval) clearInterval(futureInterval);

    let i = 0;
    function type() {
      if (i < futureLetterBody.length) {
        const chunk = 3;
        futureLetterText.textContent += futureLetterBody.substring(i, i + chunk);
        i += chunk;
        setTimeout(type, 20);
      }
    }
    setTimeout(type, 500);
    welcomeConfetti();
  }

  if (localStorage.getItem(STORAGE_FUTURE_UNLOCKED) === 'true') {
    openFutureLetter();
  } else {
    updateFutureCountdown();
    futureInterval = setInterval(updateFutureCountdown, 1000);
  }

  if (futureOpenBtn) {
    futureOpenBtn.addEventListener('click', () => {
      const now = new Date();
      if (now >= FUTURE_DATE) {
        openFutureLetter();
      } else {
        futureLetterBox.classList.add('denied');
        if (futureHint) {
          futureHint.textContent = 'Ещё рано! Письмо откроется, когда придёт время 💜';
          futureHint.classList.add('visible');
        }
        setTimeout(() => futureLetterBox.classList.remove('denied'), 600);
        setTimeout(() => { if (futureHint) futureHint.classList.remove('visible'); }, 3500);
      }
    });
  }

  if (futureSecretForm) {
    futureSecretForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = futureSecretInput.value.trim().toLowerCase();
      if (value === FUTURE_SECRET_CODE) {
        futureSecretInput.classList.remove('error');
        futureSecretHint.classList.remove('visible');
        openFutureLetter();
      } else {
        futureSecretInput.classList.add('error');
        futureSecretHint.textContent = 'Неверный код. Попробуй ещё раз 😊';
        futureSecretHint.classList.add('visible');
        setTimeout(() => futureSecretInput.classList.remove('error'), 600);
        setTimeout(() => futureSecretHint.classList.remove('visible'), 3000);
      }
    });
  }

  // ============================================================
  // СЮРПРИЗ
  // ============================================================
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      const msg = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
      surpriseEmoji.textContent = msg.emoji;
      surpriseText.textContent = msg.text;
      surpriseModal.classList.add('active');
    });
  }
  if (surpriseClose) surpriseClose.addEventListener('click', () => surpriseModal.classList.remove('active'));
  if (surpriseModal) {
    surpriseModal.addEventListener('click', (e) => {
      if (e.target === surpriseModal) surpriseModal.classList.remove('active');
    });
  }

  // ============================================================
  // LIGHTBOX
  // ============================================================
  let lightboxIndex = 0;

  function openLightbox(i) {
    lightboxIndex = i;
    updateLightbox();
    lightbox.classList.add('active');
  }

  function updateLightbox() {
    const item = galleryData[lightboxIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = `${lightboxIndex + 1} / ${galleryData.length}`;
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  if (galleryGrid) {
    galleryGrid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) openLightbox(parseInt(item.dataset.index, 10));
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxIndex = (lightboxIndex - 1 + galleryData.length) % galleryData.length;
      updateLightbox();
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxIndex = (lightboxIndex + 1) % galleryData.length;
      updateLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });

  // ============================================================
  // EASTER EGG
  // ============================================================
  const easterEggTargets = document.querySelectorAll('footer .heart-icon');
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIndex = 0;

  function showEaster() {
    easterModal.classList.add('active');
    welcomeConfetti();
  }

  easterEggTargets.forEach(el => el.addEventListener('click', showEaster));

  document.addEventListener('keydown', (e) => {
    if (e.key === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        showEaster();
      }
    } else {
      konamiIndex = 0;
    }
  });

  if (easterClose) easterClose.addEventListener('click', () => easterModal.classList.remove('active'));
  if (easterModal) {
    easterModal.addEventListener('click', (e) => {
      if (e.target === easterModal) easterModal.classList.remove('active');
    });
  }

  // ============================================================
  // ИГРА
  // ============================================================
  const heartEmojis = ['💜', '💖', '💗', '♥', '💛', '🌸'];
  let gameScore = 0;
  let gameTimeLeft = 30;
  let gameActive = false;
  let gameTimer = null;
  let gameSpawnTimer = null;
  let gameBest = parseInt(localStorage.getItem('nicole-game-best') || '0', 10);
  if (gameBestEl) gameBestEl.textContent = gameBest;

  function spawnHeart() {
    if (!gameActive || !gameArea) return;
    const heart = document.createElement('div');
    heart.className = 'catchable-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    const size = 1.5 + Math.random() * 1.2;
    heart.style.fontSize = size + 'rem';
    heart.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
    const duration = 1.8 + Math.random() * 1.2;
    heart.style.animationDuration = duration + 's';

    heart.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!gameActive) return;
      gameScore++;
      if (gameScoreEl) gameScoreEl.textContent = gameScore;
      for (let i = 0; i < 4; i++) {
        const particle = document.createElement('span');
        particle.className = 'catch-particle';
        particle.textContent = ['✨', '⭐', '💫', '🌟'][i];
        particle.style.left = heart.offsetLeft + 'px';
        particle.style.top = heart.offsetTop + 'px';
        gameArea.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
      }
      heart.remove();
    }, { once: true });

    heart.addEventListener('animationend', () => heart.remove());
    gameArea.appendChild(heart);
  }

  function startGame() {
    if (gameActive || !gameArea) return;
    gameActive = true;
    gameScore = 0;
    gameTimeLeft = 30;
    if (gameScoreEl) gameScoreEl.textContent = '0';
    if (gameTimeEl) gameTimeEl.textContent = '30';
    if (gameResult) {
      gameResult.textContent = '';
      gameResult.classList.remove('visible');
    }
    if (gameStartBtn) {
      gameStartBtn.textContent = '⏸ Игра идёт...';
      gameStartBtn.disabled = true;
    }
    gameArea.classList.add('playing');
    gameArea.innerHTML = '';

    gameTimer = setInterval(() => {
      gameTimeLeft--;
      if (gameTimeEl) gameTimeEl.textContent = gameTimeLeft;
      if (gameTimeLeft <= 0) endGame();
    }, 1000);

    gameSpawnTimer = setInterval(spawnHeart, 600);
    spawnHeart();
  }

  function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    clearInterval(gameSpawnTimer);
    if (gameArea) {
      gameArea.classList.remove('playing');
      gameArea.querySelectorAll('.catchable-heart').forEach(h => h.remove());
    }
    if (gameStartBtn) {
      gameStartBtn.textContent = '▶ Старт';
      gameStartBtn.disabled = false;
    }

    let message = '';
    if (gameScore > gameBest) {
      gameBest = gameScore;
      localStorage.setItem('nicole-game-best', String(gameBest));
      if (gameBestEl) gameBestEl.textContent = gameBest;
      message = `🎉 Новый рекорд! Ты поймала ${gameScore} сердечек!`;
      welcomeConfetti();
    } else if (gameScore >= 25) message = `💜 Вау! ${gameScore} сердечек — ты невероятна!`;
    else if (gameScore >= 15) message = `✨ Отлично! ${gameScore} сердечек поймано!`;
    else if (gameScore >= 5) message = `😊 Хорошо! ${gameScore} сердечек у тебя в руках.`;
    else message = `Поймано ${gameScore} сердечек. Попробуй ещё раз! 💜`;

    if (gameResult) {
      gameResult.textContent = message;
      gameResult.classList.add('visible');
    }
  }

  if (gameStartBtn) gameStartBtn.addEventListener('click', startGame);

  // ============================================================
  // АУДИОПЛЕЕР
  // ============================================================
  let audioStarted = false;
  let previousVolume = 0.7;
  if (bgAudio) bgAudio.volume = 0.7;

  function startAudio() {
    if (audioStarted || !bgAudio) return;
    audioStarted = true;
    bgAudio.volume = 0;
    bgAudio.play().then(() => {
      let v = 0;
      const fade = setInterval(() => {
        v += 0.05;
        if (v >= 0.7) { v = 0.7; clearInterval(fade); }
        bgAudio.volume = v;
      }, 60);
      if (playPauseBtn) playPauseBtn.textContent = '⏸';
    }).catch(() => { audioStarted = false; });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play();
        playPauseBtn.textContent = '⏸';
      } else {
        bgAudio.pause();
        playPauseBtn.textContent = '▶';
      }
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      bgAudio.volume = parseFloat(volumeSlider.value);
      previousVolume = bgAudio.volume;
      if (muteBtn) muteBtn.textContent = bgAudio.volume === 0 ? '🔇' : '🔊';
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      if (bgAudio.volume > 0) {
        previousVolume = bgAudio.volume;
        bgAudio.volume = 0;
        if (volumeSlider) volumeSlider.value = 0;
        muteBtn.textContent = '🔇';
      } else {
        bgAudio.volume = previousVolume || 0.7;
        if (volumeSlider) volumeSlider.value = bgAudio.volume;
        muteBtn.textContent = '🔊';
      }
    });
  }

  if (loopBtn) {
    loopBtn.addEventListener('click', () => {
      bgAudio.loop = !bgAudio.loop;
      loopBtn.style.opacity = bgAudio.loop ? '1' : '0.5';
    });
  }

  // Запуск аудио — только по клику на элементы, НЕ на любые клики
  const audioTriggers = [playPauseBtn, muteBtn, loopBtn, volumeSlider].filter(Boolean);
  audioTriggers.forEach(el => {
    el.addEventListener('click', startAudio, { once: true });
  });

  // ============================================================
  // НАВИГАЦИЯ
  // ============================================================
  if (navBar) {
    navBar.querySelectorAll('button[data-goto]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.goto);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ============================================================
  // REVEAL
  // ============================================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  if (letterPaper) {
    const letterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) typeLetter();
      });
    }, { threshold: 0.3 });
    letterObserver.observe(letterPaper);
  }

  // ============================================================
  // ПРОГРЕСС ЧТЕНИЯ
  // ============================================================
  let scrollTicking = false;
  let lastScrollY = 0;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const scrollTop = lastScrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (readingProgress) readingProgress.style.width = percent + '%';

        if (scrollTop > 400) {
          if (navBar) navBar.classList.add('visible');
          if (audioPlayer) audioPlayer.classList.add('visible');
          if (backToTop) backToTop.classList.add('visible');
        } else {
          if (navBar) navBar.classList.remove('visible');
          if (audioPlayer) audioPlayer.classList.remove('visible');
          if (backToTop) backToTop.classList.remove('visible');
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // ПРИОСТАНОВКА АНИМАЦИЙ ПРИ СКРЫТОЙ ВКЛАДКЕ
  // ============================================================
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.body.style.animationPlayState = 'paused';
    } else {
      document.body.style.animationPlayState = 'running';
      updateCounter();
      updateFutureCountdown();
    }
  });

  // ============================================================
  // АВТОЗАПУСК ПЕЧАТИ
  // ============================================================
  window.addEventListener('load', () => {
    if (sessionStorage.getItem(STORAGE_UNLOCKED) === 'true') {
      setTimeout(() => {
        if (heroTitleEl && heroTitleEl.textContent === '') typeHero();
      }, 500);
    }
  });

})();