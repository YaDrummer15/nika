(function() {
  'use strict';

  // ============================================================
  // ЗВЁЗДНОЕ НЕБО
  // ============================================================
  const starfield = document.getElementById('starfield');
  const STAR_COUNT = 120;

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
  // ПЛАВАЮЩИЕ СЕРДЕЧКИ
  // ============================================================
  const heartsContainer = document.getElementById('floatingHearts');
  const heartChars = ['♥', '❤', '💜', '💖', '💗'];
  const heartCount = window.innerWidth < 600 ? 8 : 16;

  for (let i = 0; i < heartCount; i++) {
    const span = document.createElement('span');
    span.className = 'heart-float';
    span.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    span.style.left = Math.random() * 100 + '%';
    span.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    span.style.animationDuration = (12 + Math.random() * 18) + 's';
    span.style.animationDelay = (Math.random() * 15) + 's';
    span.style.color = ['#AB47BC', '#CE93D8', '#8E24AA', '#FFB74D'][Math.floor(Math.random() * 4)];
    heartsContainer.appendChild(span);
  }

  // ============================================================
  // ЭКРАН БЛОКИРОВКИ
  // ============================================================
  const CORRECT_PASSWORD = 'Бублик';
  const STORAGE_UNLOCKED = 'nicole-unlocked';
  const STORAGE_THEME = 'nicole-theme';

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

  function welcomeConfetti() {
    const chars = ['💜', '💖', '💗', '♥', '✨', '🌸', '💛', '🎉', '⭐', '🌟'];
    for (let i = 0; i < 80; i++) {
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

    setTimeout(() => {
      lockScreen.style.display = 'none';
    }, 1000);

    setTimeout(() => {
      showLoveIntro();
    }, 1200);
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
      lockError.textContent = 'Неверный пароль. Попробуй ещё раз 😊';
      lockError.classList.add('visible');
      setTimeout(() => { lockInput.value = ''; lockInput.focus(); }, 500);
      setTimeout(() => lockInput.classList.remove('error'), 1500);
    }
  });

  setTimeout(() => lockInput.focus(), 600);

  // ============================================================
  // АНИМАЦИЯ "I LOVE YOU"
  // ============================================================
  const loveIntro = document.getElementById('loveIntro');
  const loveHeartsContainer = document.getElementById('loveHeartsContainer');
  const loveSkipBtn = document.getElementById('loveSkipBtn');

  const letterI = [
    [1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],
    [0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]
  ];
  const letterL = [
    [1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],
    [1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]
  ];
  const letterO = [
    [0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],
    [1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]
  ];
  const letterV = [
    [1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],
    [0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]
  ];
  const letterE = [
    [1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],
    [1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]
  ];
  const letterY = [
    [1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],
    [0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]
  ];
  const letterU = [
    [1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],
    [1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]
  ];

  function combineLetters(...letters) {
    const result = [];
    letters.forEach((letter, li) => {
      for (let col = 0; col < 5; col++) {
        const c = [];
        for (let row = 0; row < 7; row++) c.push(letter[row][col]);
        result.push(c);
      }
      if (li < letters.length - 1) {
        result.push([0,0,0,0,0,0,0]);
      }
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
    loveHeartsContainer.innerHTML = '';
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const maxWidth = Math.min(containerWidth * 0.9, 900);
    const maxHeight = Math.min(containerHeight * 0.5, 400);
    const pixelW = maxWidth / totalWidth;
    const pixelH = maxHeight / totalHeight;
    const pixel = Math.min(pixelW, pixelH);
    const offsetX = containerWidth / 2 - (totalWidth * pixel) / 2;
    const offsetY = containerHeight / 2 - (totalHeight * pixel) / 2;
    const heartSize = Math.max(0.6, pixel / 14);
    const fontSize = heartSize + 'rem';

    let heartCount = 0;
    for (let col = 0; col < totalWidth; col++) {
      for (let row = 0; row < totalHeight; row++) {
        if (finalMap[col] && finalMap[col][row] === 1) {
          const heart = document.createElement('span');
          heart.className = 'love-heart';
          heart.textContent = '♥';
          heart.style.left = (offsetX + col * pixel + pixel / 2) + 'px';
          heart.style.top = (offsetY + row * pixel + pixel / 2) + 'px';
          heart.style.fontSize = fontSize;
          heart.style.animationDelay = (heartCount * 0.02) + 's, ' + (2 + heartCount * 0.02) + 's';
          loveHeartsContainer.appendChild(heart);
          heartCount++;
        }
      }
    }

    let loveText = loveIntro.querySelector('.love-text');
    if (loveText) loveText.remove();
    loveText = document.createElement('div');
    loveText.className = 'love-text';
    loveText.textContent = 'I love you, Николь';
    loveIntro.appendChild(loveText);
  }

  function buildBackgroundHearts() {
    loveIntro.querySelectorAll('.love-bg-heart').forEach(h => h.remove());
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('span');
      heart.className = 'love-bg-heart';
      heart.textContent = ['♥', '❤', '💜', '💖'][Math.floor(Math.random() * 4)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
      heart.style.animationDuration = (6 + Math.random() * 8) + 's';
      heart.style.animationDelay = (Math.random() * 5) + 's';
      loveIntro.appendChild(heart);
    }
  }

  function showLoveIntro() {
    loveIntro.classList.remove('hidden');
    buildLoveHearts();
    buildBackgroundHearts();
    setTimeout(hideLoveIntro, 6000);
  }

  function hideLoveIntro() {
    loveIntro.classList.add('hidden');
    setTimeout(() => {
      if (heroTitleEl && heroTitleEl.textContent === '') {
        typeHero();
      }
    }, 600);
  }

  loveSkipBtn.addEventListener('click', hideLoveIntro);

  let loveResizeTimer;
  window.addEventListener('resize', () => {
    if (loveIntro.classList.contains('hidden')) return;
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
    { date: '04 февраля 2026', title: 'Первое сообщение', desc: 'Тот самый момент, когда всё началось. Одно короткое "привет", которое изменило всё.' },
    { date: '07 февраля 2026', title: 'Первая совместная фотография', desc: 'Мы впервые оказались в одном кадре. И этот кадр — теперь моя самая тёплая память.' },
    { date: '22 февраля 2026', title: 'Наше любимое место', desc: 'Мы нашли "Мир Булок" — место, где время замирает, а разговоры становятся бесконечными.' },
    { date: '23 февраля 2026', title: 'Просто вместе', desc: 'День, когда мы поняли, что нам не нужны особые поводы. Достаточно просто быть рядом.' },
    { date: '04 марта 2026', title: 'Твой день рождения', desc: 'Я хотел подарить тебе весь мир, но ты сказала, что тебе достаточно меня.' },
    { date: '08 марта 2026', title: 'Первое наше 8 марта', desc: 'Первый праздник, который я встречал с тобой. И я уже знал — так будет всегда.' }
  ];

  const reasonsData = [
    { icon: '😊', title: 'Твоя улыбка', text: 'Она освещает даже самый хмурый день и заставляет моё сердце биться чаще.' },
    { icon: '🎵', title: 'Твой голос', text: 'Музыка, которая лечит любые раны и успокаивает любые тревоги.' },
    { icon: '💜', title: 'Твоя доброта', text: 'Ты заботишься обо всех вокруг, даже когда устала. Это бесценно.' },
    { icon: '✨', title: 'Твои глаза', text: 'В них я вижу будущее, в котором мы счастливы. Каждый день.' },
    { icon: '🌸', title: 'Твоя нежность', text: 'Каждое твоё прикосновение — как весенний ветерок. Тепло и легко.' },
    { icon: '🌟', title: 'Твоя сила', text: 'Ты справляешься со всем, и я восхищаюсь тобой каждый день.' }
  ];

  const tenMomentsData = [
    { title: 'Тот самый "привет"', text: 'Когда ты ответила впервые, я перечитывал сообщение раз десять. С этого момента всё изменилось.' },
    { title: 'Первая совместная фотография', text: 'Мы стояли рядом, и я боялся, что ты услышишь, как громко бьётся моё сердце. Оно билось только для тебя.' },
    { title: 'Наш "Мир Булок"', text: 'Помнишь этот момент, когда мы сидели вдвоём, и весь мир исчез? Остались только ты, я и наши разговоры.' },
    { title: 'Первая прогулка после поездки в Новый Херсонес', text: 'Как мы шли вместе, даже не представляя, что будет ждать нас в будущем.' },
    { title: 'Твой смех', text: 'Однажды ты рассмеялась так искренне, что я понял — я готов слушать этот звук всю жизнь.' },
    { title: 'Твоя забота', text: 'Когда ты спросила, поел ли я, будто это самое важное в мире. Мелочь, но она решила всё.' },
    { title: 'Твой день рождения', text: 'Когда я впервые вручил тебе подарок, и ты так обрадовалась. Я хотел остановить этот момент навсегда.' },
    { title: 'Наши встречи', text: 'Каждая встреча — как маленький праздник. И каждый раз я не хотел, чтобы она заканчивалась.' },
    { title: 'Твоё "доброе утро"', text: 'Когда ты писала мне это утром, весь день становился светлее. Даже если на улице шёл дождь.' },
    { title: 'Просто быть рядом', text: 'И самый главный момент — когда я понял, что мне не нужно ничего особенного. Просто быть с тобой.' }
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

Знаешь, любимая, иногда я задумываюсь, как объяснить тебе всю силу моей любви, но понимаю  ни одно слово в мире не сможет описать то, что я чувствую к тебе. Это не просто симпатия, не просто привычка, это что-то большее, что-то, что стало частью меня самого.

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

  const startDate = new Date(2026, 1, 4, 0, 0, 0);

  const heroTitleEl = document.getElementById('heroTitle');
  const heroText = 'История моих чувств к Николь';
  let heroIndex = 0;
  let heroTyped = false;

  function typeHero() {
    if (heroTyped) return;
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

  const heroDateEl = document.getElementById('heroDate');
  const diffDays = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
  heroDateEl.textContent = `с 04 февраля 2026 — ${diffDays} дней вместе`;

  function updateCounter() {
    const now = new Date();
    let diff = now - startDate;
    if (diff < 0) diff = 0;
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    document.getElementById('cDays').textContent = days.toLocaleString('ru-RU');
    document.getElementById('cHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cSeconds').textContent = String(seconds).padStart(2, '0');
  }
  updateCounter();
  setInterval(updateCounter, 1000);

  // ГАЛЕРЕЯ
  const galleryGrid = document.getElementById('galleryGrid');
  galleryData.forEach((item, i) => {
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

  // ТАЙМЛАЙН
  const timelineContainer = document.getElementById('timelineContainer');
  timelineData.forEach(item => {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-date">${item.date}</div>
      <div class="timeline-title">${item.title}</div>
      <div class="timeline-desc">${item.desc}</div>
    `;
    timelineContainer.appendChild(div);
  });

  // ЗА ЧТО Я ЛЮБЛЮ
  const reasonsGrid = document.getElementById('reasonsGrid');
  reasonsData.forEach((r, i) => {
    const div = document.createElement('div');
    div.className = 'reason-card';
    div.style.transitionDelay = (i * 0.08) + 's';
    div.innerHTML = `
      <span class="reason-icon">${r.icon}</span>
      <div class="reason-title">${r.title}</div>
      <div class="reason-text">${r.text}</div>
    `;
    reasonsGrid.appendChild(div);
  });

  // 10 МОМЕНТОВ
  const tenMomentsList = document.getElementById('tenMomentsList');
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
    tenMomentsList.appendChild(div);
  });

  // СТИХОТВОРЕНИЕ
  const poemLinesContainer = document.getElementById('poemLines');
  poemLinesData.forEach((line) => {
    const p = document.createElement('p');
    p.className = 'poem-line';
    p.textContent = line || '\u00A0';
    poemLinesContainer.appendChild(p);
  });

  // КОМПЛИМЕНТ
  const complimentText = document.getElementById('complimentText');
  const complimentBtn = document.getElementById('complimentBtn');
  const complimentCounter = document.getElementById('complimentCounter');
  let complimentCount = 0;
  let lastComplimentIndex = -1;

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
      complimentCounter.textContent = `Сказано комплиментов: ${complimentCount}`;
    }, 400);
  });

  // ИГРА "ПОЙМАЙ СЕРДЕЧКО"
  const gameArea = document.getElementById('gameArea');
  const gameScoreEl = document.getElementById('gameScore');
  const gameTimeEl = document.getElementById('gameTime');
  const gameBestEl = document.getElementById('gameBest');
  const gameStartBtn = document.getElementById('gameStartBtn');
  const gameResult = document.getElementById('gameResult');

  const heartEmojis = ['💜', '💖', '💗', '♥', '💛', '🌸'];
  let gameScore = 0;
  let gameTimeLeft = 30;
  let gameActive = false;
  let gameTimer = null;
  let gameSpawnTimer = null;
  let gameBest = parseInt(localStorage.getItem('nicole-game-best') || '0', 10);
  gameBestEl.textContent = gameBest;

  function spawnHeart() {
    if (!gameActive) return;
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
      gameScoreEl.textContent = gameScore;
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
    });

    gameArea.appendChild(heart);
    setTimeout(() => { if (heart.parentNode) heart.remove(); }, duration * 1000);
  }

  function startGame() {
    if (gameActive) return;
    gameActive = true;
    gameScore = 0;
    gameTimeLeft = 30;
    gameScoreEl.textContent = '0';
    gameTimeEl.textContent = '30';
    gameResult.classList.remove('visible');
    gameResult.textContent = '';
    gameStartBtn.textContent = '⏸ Идёт...';
    gameStartBtn.disabled = true;
    gameArea.classList.add('playing');
    gameArea.innerHTML = '';

    gameTimer = setInterval(() => {
      gameTimeLeft--;
      gameTimeEl.textContent = gameTimeLeft;
      if (gameTimeLeft <= 0) endGame();
    }, 1000);

    function spawnLoop() {
      if (!gameActive) return;
      spawnHeart();
      const delay = Math.max(400, 800 - gameScore * 10);
      gameSpawnTimer = setTimeout(spawnLoop, delay);
    }
    spawnLoop();
  }

  function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    clearTimeout(gameSpawnTimer);
    gameArea.classList.remove('playing');
    gameStartBtn.textContent = '▶ Играть снова';
    gameStartBtn.disabled = false;
    gameArea.querySelectorAll('.catchable-heart').forEach(h => h.remove());

    if (gameScore > gameBest) {
      gameBest = gameScore;
      gameBestEl.textContent = gameBest;
      localStorage.setItem('nicole-game-best', String(gameBest));
      gameResult.textContent = `🎉 Новый рекорд: ${gameScore}! Ты поймала моё сердце ♥`;
    } else {
      gameResult.textContent = `Ты поймала ${gameScore} сердечек! Ты поймала моё сердце ♥`;
    }
    gameResult.classList.add('visible');
  }

  gameStartBtn.addEventListener('click', startGame);

  // LIGHTBOX
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryData[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryData.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryData.length;
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

  // СЮРПРИЗ
  const surpriseBtn = document.getElementById('surpriseBtn');
  const surpriseModal = document.getElementById('surpriseModal');
  const surpriseText = document.getElementById('surpriseText');
  const surpriseEmoji = document.getElementById('surpriseEmoji');
  const surpriseClose = document.getElementById('surpriseClose');

  surpriseBtn.addEventListener('click', () => {
    const msg = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
    surpriseEmoji.textContent = msg.emoji;
    surpriseText.textContent = msg.text;
    surpriseModal.classList.add('active');
  });

  surpriseClose.addEventListener('click', () => surpriseModal.classList.remove('active'));
  surpriseModal.addEventListener('click', (e) => {
    if (e.target === surpriseModal) surpriseModal.classList.remove('active');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') surpriseModal.classList.remove('active');
  });

  // АУДИОПЛЕЕР
  const audio = document.getElementById('bgAudio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const muteBtn = document.getElementById('muteBtn');
  const loopBtn = document.getElementById('loopBtn');
  const audioPlayer = document.getElementById('audioPlayer');

  let isPlaying = false;
  let isMuted = false;
  let isLooping = true;

  audio.loop = true;
  volumeSlider.value = 0.7;
  audio.volume = 0.7;

  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      playPauseBtn.textContent = '▶';
      isPlaying = false;
    } else {
      audio.play().then(() => {
        playPauseBtn.textContent = '⏸';
        isPlaying = true;
      }).catch(() => {
        playPauseBtn.textContent = '▶';
        isPlaying = false;
      });
    }
  });

  volumeSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    audio.volume = val;
    if (val > 0 && isMuted) {
      audio.muted = false;
      isMuted = false;
      muteBtn.textContent = '🔊';
    }
    muteBtn.textContent = val === 0 ? '🔇' : '🔊';
    isMuted = val === 0;
  });

  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
  });

  loopBtn.addEventListener('click', () => {
    isLooping = !isLooping;
    audio.loop = isLooping;
    loopBtn.style.opacity = isLooping ? '1' : '0.4';
  });

  // НАВИГАЦИЯ + ПРОГРЕСС
  const backToTop = document.getElementById('backToTop');
  const navBar = document.getElementById('navBar');
  const readingProgress = document.getElementById('readingProgress');

  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    readingProgress.style.width = progress + '%';
    backToTop.classList.toggle('visible', scrollY > 400);
    if (scrollY > 100) audioPlayer.classList.add('visible');
    navBar.classList.toggle('visible', scrollY > 200);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

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

  // INTERSECTION OBSERVER
  const revealElements = document.querySelectorAll('.reveal');
  const poemLineElements = document.querySelectorAll('.poem-line');
  const reasonCards = document.querySelectorAll('.reason-card');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const momentItems = document.querySelectorAll('.moment-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'letterSection' && !letterStarted) {
          letterStarted = true;
          setTimeout(typeLetter, 400);
        }
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));

  const poemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const visibleLines = document.querySelectorAll('.poem-line.visible').length;
        setTimeout(() => entry.target.classList.add('visible'), visibleLines * 130);
      }
    });
  }, { threshold: 0.3 });
  poemLineElements.forEach(el => poemObserver.observe(el));

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
      }
    });
  }, { threshold: 0.15 });

  [reasonCards, momentItems].forEach(group => {
    group.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.7s ease, transform 0.7s ease, box-shadow 0.4s ease';
      cardObserver.observe(card);
    });
  });

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, i * 120);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    timelineObserver.observe(item);
  });

  // ПИСЬМО + ЧЕРНИЛА
  const letterTextEl = document.getElementById('letterText');
  const letterPaper = document.getElementById('letterPaper');
  let letterIndex = 0;
  let letterStarted = false;
  let inkBlotCounter = 0;

  function createInkBlot() {
    const blot = document.createElement('div');
    blot.className = 'ink-blot';
    const size = 30 + Math.random() * 50;
    blot.style.width = size + 'px';
    blot.style.height = size + 'px';
    blot.style.left = (10 + Math.random() * 70) + '%';
    blot.style.top = (10 + Math.random() * 80) + '%';
    blot.style.animationDelay = (Math.random() * 0.3) + 's';
    letterPaper.appendChild(blot);
    setTimeout(() => blot.remove(), 1500);
  }

  function typeLetter() {
    if (letterIndex < letterFullText.length) {
      letterTextEl.textContent = letterFullText.slice(0, letterIndex + 1);
      letterIndex++;
      inkBlotCounter++;
      if (inkBlotCounter % 8 === 0 && letterFullText[letterIndex - 1] !== ' ' && letterFullText[letterIndex - 1] !== '\n') {
        createInkBlot();
      }
      setTimeout(typeLetter, 35);
    } else {
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      letterTextEl.appendChild(cursor);
    }
  }

  // СЕКРЕТНАЯ ВКЛАДКА
  const secretTrigger = document.getElementById('secretTrigger');
  const secretContent = document.getElementById('secretContent');
  const secretTextEl = document.getElementById('secretText');
  let secretOpened = false;
  let secretTyped = false;

  function typeSecret() {
    if (secretTyped) return;
    secretTyped = true;
    let i = 0;
    function step() {
      if (i < secretMessage.length) {
        secretTextEl.textContent = secretMessage.slice(0, i + 1);
        i++;
        setTimeout(step, 25);
      } else {
        const cursor = document.createElement('span');
        cursor.className = 'cursor-blink';
        secretTextEl.appendChild(cursor);
      }
    }
    step();
  }

  secretTrigger.addEventListener('click', () => {
    if (secretOpened) {
      secretContent.classList.toggle('active');
      return;
    }
    secretOpened = true;
    secretContent.classList.add('active');
    setTimeout(typeSecret, 400);
  });

  // ПИСЬМО В БУДУЩЕЕ
  const FUTURE_OPEN_DATE = new Date(2027, 1, 4, 0, 0, 0);
  const SECRET_CODE = 'МирБулок';

  const futureLetterText = `Николь, привет.

Сегодня ровно год, как мы вместе. Целый год моментов, воспоминаний, улыбок  и разговоров. 

За это время многое было - радость, поддежка, иногда трудности, но самое главное, что всё время мы были радом друг с другом.

Этот год показ мне насколько важна для меня ты.

Спасибо тебе за твою заботу, за твое тепло, за то, что умеешь поддерживать в трудные моменты и разделить со мной счастливые.

С тобой я научился чувствовать себя спокойно и по-настоящему счастливым.

С любовь Бублик)`;

  const futureLetterBox = document.getElementById('futureLetterBox');
  const futureLock = document.getElementById('futureLock');
  const futureTitle = document.getElementById('futureTitle');
  const futureSubtitle = document.getElementById('futureSubtitle');
  const futureOpenBtn = document.getElementById('futureOpenBtn');
  const futureHint = document.getElementById('futureHint');
  const futureLetterTextEl = document.getElementById('futureLetterText');
  const fcDays = document.getElementById('fcDays');
  const fcHours = document.getElementById('fcHours');
  const fcMinutes = document.getElementById('fcMinutes');
  const fcSeconds = document.getElementById('fcSeconds');

  const futureSecretForm = document.getElementById('futureSecretForm');
  const futureSecretInput = document.getElementById('futureSecretInput');
  const futureSecretHint = document.getElementById('futureSecretHint');

  let futureOpened = false;
  let futureLetterTyped = false;

  function plural(n, one, few, many) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
  }

  function updateFutureCountdown() {
    if (futureOpened) return;
    const now = new Date();
    const diff = FUTURE_OPEN_DATE - now;
    if (diff <= 0) { openFutureLetter(); return; }
    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    fcDays.textContent = days.toLocaleString('ru-RU');
    fcHours.textContent = String(hours).padStart(2, '0');
    fcMinutes.textContent = String(minutes).padStart(2, '0');
    fcSeconds.textContent = String(seconds).padStart(2, '0');
  }

  function typeFutureLetter() {
    if (futureLetterTyped) return;
    futureLetterTyped = true;
    let i = 0;
    function step() {
      if (i < futureLetterText.length) {
        futureLetterTextEl.textContent = futureLetterText.slice(0, i + 1);
        i++;
        setTimeout(step, 30);
      } else {
        const cursor = document.createElement('span');
        cursor.className = 'cursor-blink';
        futureLetterTextEl.appendChild(cursor);
      }
    }
    step();
  }

  function futureConfetti() {
    const chars = ['💜', '💖', '💗', '♥', '✨', '🌸', '💛'];
    for (let i = 0; i < 40; i++) {
      const span = document.createElement('span');
      span.className = 'confetti-heart';
      span.textContent = chars[Math.floor(Math.random() * chars.length)];
      span.style.left = Math.random() * 100 + 'vw';
      span.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
      span.style.animationDuration = (3 + Math.random() * 3) + 's';
      span.style.animationDelay = (Math.random() * 1.5) + 's';
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 8000);
    }
  }

  function openFutureLetter() {
    if (futureOpened) return;
    futureOpened = true;
    futureLock.textContent = '🔓';
    futureLetterBox.classList.add('opened');
    setTimeout(() => {
      futureTitle.textContent = 'Письмо открыто';
      futureSubtitle.textContent = 'Спасибо, что дождалась. Это письмо — для тебя.';
      typeFutureLetter();
      futureConfetti();
    }, 400);
  }

  futureOpenBtn.addEventListener('click', () => {
    const now = new Date();
    if (now >= FUTURE_OPEN_DATE) { openFutureLetter(); return; }
    futureLetterBox.classList.add('denied');
    setTimeout(() => futureLetterBox.classList.remove('denied'), 500);

    const diff = FUTURE_OPEN_DATE - now;
    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);

    let hint = '';
    if (days > 0) {
      hint = `Рано 😊 Осталось ещё ${days} ${plural(days, 'день', 'дня', 'дней')}`;
      if (hours > 0) hint += ` и ${hours} ${plural(hours, 'час', 'часа', 'часов')}`;
    } else if (hours > 0) {
      hint = `Рано 😊 Осталось ${hours} ${plural(hours, 'час', 'часа', 'часов')} и ${minutes} ${plural(minutes, 'минута', 'минуты', 'минут')}`;
    } else {
      hint = `Совсем чуть-чуть! Осталось ${minutes} ${plural(minutes, 'минута', 'минуты', 'минут')}`;
    }

    futureHint.textContent = hint;
    futureHint.classList.add('visible');
    setTimeout(() => futureHint.classList.remove('visible'), 4000);
  });

  futureSecretForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (futureOpened) return;
    const value = futureSecretInput.value.trim();

    if (value.toLowerCase() === SECRET_CODE.toLowerCase()) {
      futureSecretHint.classList.remove('visible');
      futureSecretInput.classList.remove('error');
      futureSecretInput.value = '';
      openFutureLetter();
    } else {
      futureSecretInput.classList.add('error');
      futureSecretHint.textContent = 'Не тот код 🤫 Попробуй ещё раз';
      futureSecretHint.classList.add('visible');
      setTimeout(() => { futureSecretInput.value = ''; futureSecretInput.focus(); }, 500);
      setTimeout(() => futureSecretInput.classList.remove('error'), 1500);
      setTimeout(() => futureSecretHint.classList.remove('visible'), 3500);
    }
  });

  updateFutureCountdown();
  setInterval(updateFutureCountdown, 1000);

  document.getElementById('footerYear').textContent = new Date().getFullYear();

  window.addEventListener('load', () => {
    if (document.body.classList.contains('unlocked')) {
      setTimeout(typeHero, 300);
    }
  });

})();