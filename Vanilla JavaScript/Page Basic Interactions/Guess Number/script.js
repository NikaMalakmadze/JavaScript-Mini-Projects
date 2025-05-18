'use strict';

// function to check and deal with user's score
const checkScore = (score, scoreLabel, messageLabel) => {
  if (score > 1) {
    score--;
    scoreLabel.textContent = score;
  } else {
    messageLabel.textContent = 'You Loose!';
    scoreLabel.textContent = 0;
    return 0;
  }

  return score;
};

// find and get needed elements
const messageLabel = document.querySelector('.message');
const scoreLabel = document.querySelector('.score');

// declare ingame variables and generate secret number
let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// add click event listener with function on check inputed number button
document.querySelector('.check').addEventListener('click', function () {
  const inputValue = Number(document.querySelector('.guess').value); // get inputed number

  if (!inputValue | (inputValue <= 0)) {
    messageLabel.textContent = 'No Number!'; // if no number or number is less than or equal to 0
  } else if (inputValue === secretNum) {
    // redesign page if user guesses secret number
    messageLabel.textContent = 'You Win!';

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNum;

    // if current score is greater then current highscore, then set new highscore
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (inputValue !== secretNum) {
    // if incorrect guess, output message depended on if inputed number is greater or less than secret number
    messageLabel.textContent =
      inputValue > secretNum ? 'Too Hight!' : 'Too Low!';
    score = checkScore(score, scoreLabel, messageLabel); // update current score
  }
});

// click event listener with function on again button
document.querySelector('.again').addEventListener('click', function () {
  // reset score and generate new secret number
  score = 20;
  secretNum = Math.trunc(Math.random() * 20) + 1;

  // reset page design to the default
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';

  messageLabel.textContent = 'Start guessing...';
  scoreLabel.textContent = score;
});
