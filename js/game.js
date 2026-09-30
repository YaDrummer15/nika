/* ============================================
   GAME — мини-игра "Поймай сердечко"
   ============================================ */

(function() {
  'use strict';

  const gameArea = document.getElementById('gameArea');
  const gameScoreEl = document.getElementById('gameScore');
  const gameTimeEl = document.getElementById('gameTime');
  const gameBestEl = document.getElementById('gameBest');
  const gameStartBtn = document.getElementById('gameStartBtn');
  const gameResult = document.getElementById('gameResult');

  const heartEmojis = siteData.gameHearts;
  let gameScore = 0;
  let gameTimeLeft = 30;
  let gameActive = false;
  let gameTimer = null;
  let gameSpawnTimer = null;
  let gameBest = parseInt(localStorage.getItem(siteData.storage.gameBest) || '0', 10);
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

    setTimeout(() => {
      if (heart.parentNode) heart.remove();
    }, duration * 1000);
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
      localStorage.setItem(siteData.storage.gameBest, String(gameBest));
      gameResult.textContent = `🎉 Новый рекорд: ${gameScore}! Ты поймала моё сердце ♥`;
    } else {
      gameResult.textContent = `Ты поймала ${gameScore} сердечек! Ты поймала моё сердце ♥`;
    }
    gameResult.classList.add('visible');
  }

  gameStartBtn.addEventListener('click', startGame);
})();