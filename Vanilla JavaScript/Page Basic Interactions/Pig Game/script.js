'use strict';

// find and get needed elements
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const dice = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const rollBtn = document.querySelector('.btn--roll');

// game logic

// define needed variables
let scores, currentPlayer, currentScore, playing;

// function that will initialize or reset game needed variables or ingame interface
const initGame = function () {
  // keep real score of players in list
  scores = [0, 0];
  currentPlayer = 0; // first player - 0 | second player - 1
  currentScore = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;

  dice.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active'); // mark first player as an acitve player
  player1EL.classList.remove('player--active');
};

initGame();

// function to switch from one player to another
const switchPlayer = function () {
  // reset code's and ingame current score to 0
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;

  // pick next player
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  // make her/him active
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  if (playing) {
    // generate random number from 1 to 6
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    // show correct dice on page
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNum}.png`;

    // its current player's turn until dice value is not 1
    if (diceNum !== 1) {
      // update code's and ingame current score
      currentScore += diceNum;

      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    // update player's real score in code and on page depended on wich player pressed hold button
    scores[currentPlayer] += currentScore;

    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    // player wins if she/he has at least 100 points
    if (scores[currentPlayer] >= 100) {
      playing = false; // stop game

      dice.classList.add('hidden'); // hide dice
      // make current player winner
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// reset game if pressed on again button
newBtn.addEventListener('click', initGame);
