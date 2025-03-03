'use strict';
// Select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//
let scores, currentScore, activePlayer, playing;
// Game initialization
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  //
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //
  diceEl.classList.add('hidden'); // Hide dice image
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//
const switchPlayer = function () {
  // Reset current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0; // checks if active player is player 1 or player 2
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random number
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    if (diceRoll !== 1) {
      currentScore += diceRoll; // Add rolled value to current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});
// Hold the dice function
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // switch to next player
    // score >= 100 -- finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
// Reset the game
btnNew.addEventListener('click', init);
