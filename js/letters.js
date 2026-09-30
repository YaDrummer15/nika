/* ============================================
   LETTERS — письмо, секрет, письмо в будущее
   ============================================ */

(function() {
  'use strict';

  // ПИСЬМО
  const letterTextEl = document.getElementById('letterText');
  const letterPaper = document.getElementById('letterPaper');
  const letterFullText = siteData.letter;
  let letterIndex = 0;
  let inkBlotCounter = 0;
  window._letterStarted = false;

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

  window.typeLetter = function() {
    if (letterIndex < letterFullText.length) {
      letterTextEl.textContent = letterFullText.slice(0, letterIndex + 1);
      letterIndex++;
      inkBlotCounter++;
      if (inkBlotCounter % 8 === 0 && letterFullText[letterIndex - 1] !== ' ' && letterFullText[letterIndex - 1] !== '\n') {
        createInkBlot();
      }
      setTimeout(window.typeLetter, 35);
    } else {
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      letterTextEl.appendChild(cursor);
    }
  };

  // СЕКРЕТ
  const secretTrigger = document.getElementById('secretTrigger');
  const secretContent = document.getElementById('secretContent');
  const secretTextEl = document.getElementById('secretText');
  const secretMessage = siteData.secret;
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

  const FUTURE_OPEN_DATE = siteData.futureOpenDate;
  const SECRET_CODE = siteData.secretCode;
  const futureLetterText = siteData.futureLetter;

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
})();