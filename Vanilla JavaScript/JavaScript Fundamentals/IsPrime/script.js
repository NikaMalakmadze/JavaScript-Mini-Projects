
// get number from user, parse to int
const number = parseInt(prompt('Enter a number to check if its Prime: '));

let isPrime = true;

// loop throught numbers from 2 to number inputed by user
for (let i = 2; i < number; i++) {

    // if number is divided by i without remainder
    if (number % i === 0) {
        isPrime = false             // then its not a prime number
        break                           // break for loop
    }
}

// log info on console
console.log(`Your number: ${number} ` + (isPrime ? 'is Prime.' : 'is Not Prime.'))