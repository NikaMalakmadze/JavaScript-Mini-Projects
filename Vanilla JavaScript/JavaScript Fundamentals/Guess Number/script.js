
// generate random number from 1 to 10
const randomNumber = Math.floor(Math.random() * 10) + 1;

const userGuess = prompt('Guess a number between 1 and 10:');

if (userGuess >= 1 && userGuess <= 10){
    if (parseInt(userGuess) === randomNumber) {
        alert('Correct!');
    }
    else {
        alert(`Wrong! The number was ${randomNumber}`);
    }
}
else {
    alert('You are out of range! OR Invalid Input')
}
