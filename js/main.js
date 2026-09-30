/* ============================================
   MAIN — инициализация контента
   ============================================ */

(function() {
  'use strict';

  // ТАЙМЛАЙН
  const timelineContainer = document.getElementById('timelineContainer');
  siteData.timeline.forEach(item => {
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

  // ЗА ЧТО ЛЮБЛЮ
  const reasonsGrid = document.getElementById('reasonsGrid');
  siteData.reasons.forEach((r, i) => {
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
  siteData.tenMoments.forEach((m, i) => {
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
  siteData.poemLines.forEach((line) => {
    const p = document.createElement('p');
    p.className = 'poem-line';
    p.textContent = line || '\u00A0';
    poemLinesContainer.appendChild(p);
  });

  // КОМПЛИМЕНТЫ
  const complimentText = document.getElementById('complimentText');
  const complimentBtn = document.getElementById('complimentBtn');
  const complimentCounter = document.getElementById('complimentCounter');
  let complimentCount = 0;
  let lastComplimentIndex = -1;

  complimentBtn.addEventListener('click', () => {
    let idx;
    do {
      idx = Math.floor(Math.random() * siteData.compliments.length);
    } while (idx === lastComplimentIndex && siteData.compliments.length > 1);
    lastComplimentIndex = idx;

    complimentText.classList.add('swap-out');

    setTimeout(() => {
      complimentText.textContent = siteData.compliments[idx];
      complimentText.classList.remove('swap-out');
      complimentCount++;
      complimentCounter.textContent = `Сказано комплиментов: ${complimentCount}`;
    }, 400);
  });

  // СЮРПРИЗ
  const surpriseBtn = document.getElementById('surpriseBtn');
  const surpriseModal = document.getElementById('surpriseModal');
  const surpriseText = document.getElementById('surpriseText');
  const surpriseEmoji = document.getElementById('surpriseEmoji');
  const surpriseClose = document.getElementById('surpriseClose');

  surpriseBtn.addEventListener('click', () => {
    const msg = siteData.surpriseMessages[Math.floor(Math.random() * siteData.surpriseMessages.length)];
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

  // АУДИО
  const audio = document.getElementById('bgAudio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const muteBtn = document.getElementById('muteBtn');
  const loopBtn = document.getElementById('loopBtn');

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

  // АНИМАЦИИ
  const poemLineElements = document.querySelectorAll('.poem-line');
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

  const reasonCards = document.querySelectorAll('.reason-card');
  const momentItems = document.querySelectorAll('.moment-item');
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

  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    timelineObserver.observe(item);
  });

  document.getElementById('footerYear').textContent = new Date().getFullYear();

  window.addEventListener('load', () => {
    if (document.body.classList.contains('unlocked') && typeof window.typeHero === 'function') {
      setTimeout(window.typeHero, 300);
    }
  });
})();