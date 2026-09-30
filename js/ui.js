/* ============================================
   UI — звёзды, сердечки, лепестки, навигация
   ============================================ */

(function() {
  'use strict';

  // ЗВЁЗДЫ
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

  function createShootingStar() {
    if (!document.body.classList.contains('dark')) return;
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = (Math.random() * 80 + 20) + '%';
    star.style.top = (Math.random() * 40) + '%';
    star.style.animationDuration = (1.5 + Math.random() * 1) + 's';
    starfield.appendChild(star);
    setTimeout(() => star.remove(), 3000);
  }
  setInterval(createShootingStar, 4000);

  // ПЛАВАЮЩИЕ СЕРДЕЧКИ
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

  // ГЕРОЙ
  const heroTitleEl = document.getElementById('heroTitle');
  const heroText = siteData.heroTitle;
  let heroIndex = 0;

  window.typeHero = function() {
    if (heroIndex < heroText.length) {
      heroTitleEl.textContent += heroText.charAt(heroIndex);
      heroIndex++;
      setTimeout(window.typeHero, 65);
    } else {
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      heroTitleEl.appendChild(cursor);
    }
  };

  const heroDateEl = document.getElementById('heroDate');
  const diffDays = Math.floor((new Date() - siteData.startDate) / (1000 * 60 * 60 * 24));
  heroDateEl.textContent = `с 04 февраля 2026 — ${diffDays} дней вместе`;

  // СЧЁТЧИК
  window.updateCounter = function() {
    const now = new Date();
    let diff = now - siteData.startDate;
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
  };
  window.updateCounter();
  setInterval(window.updateCounter, 1000);

  // НАВИГАЦИЯ
  const backToTop = document.getElementById('backToTop');
  const navBar = document.getElementById('navBar');
  const readingProgress = document.getElementById('readingProgress');
  const navLinks = document.querySelectorAll('.nav-bar a');
  const sections = document.querySelectorAll('section, header.hero');
  const audioPlayer = document.getElementById('audioPlayer');

  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    readingProgress.style.width = progress + '%';
    backToTop.classList.toggle('visible', scrollY > 400);
    if (scrollY > 100) audioPlayer.classList.add('visible');
    navBar.classList.toggle('visible', scrollY > 200);

    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (scrollY >= top) currentSection = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // REVEAL
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'letterSection' && !window._letterStarted) {
          window._letterStarted = true;
          if (typeof window.typeLetter === 'function') setTimeout(window.typeLetter, 400);
        }
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));

  // ЛЕПЕСТКИ
  const petalChars = ['🌸', '🌷', '🌺', '🌼', '💮', '🏵️'];
  let petalTimer = null;

  function spawnPetal() {
    if (document.body.classList.contains('dark')) return;
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = petalChars[Math.floor(Math.random() * petalChars.length)];
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    petal.style.animationDuration = (8 + Math.random() * 10) + 's';
    petal.style.animationDelay = (Math.random() * 2) + 's';
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 20000);
  }

  function startPetals() {
    if (petalTimer) return;
    petalTimer = setInterval(spawnPetal, 1500);
    for (let i = 0; i < 5; i++) setTimeout(spawnPetal, i * 400);
  }

  function stopPetals() {
    if (petalTimer) {
      clearInterval(petalTimer);
      petalTimer = null;
    }
    document.querySelectorAll('.petal').forEach(p => p.remove());
  }

  if (!document.body.classList.contains('dark')) startPetals();
  const themeObserver = new MutationObserver(() => {
    if (document.body.classList.contains('dark')) stopPetals();
    else startPetals();
  });
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  window.UIModule = { typeHero: window.typeHero };
})();