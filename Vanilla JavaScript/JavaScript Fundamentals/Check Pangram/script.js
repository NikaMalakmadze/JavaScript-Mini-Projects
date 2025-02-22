
// get text from user
const text = prompt('Please enter text to check if anagram: ');

// arrow function that checks if user's text is Pangram(str that contains all alpahebet chars)
//  it needs string as argument
const checkPangram = (_str) => {
    // variable with all alphabet chars
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    // check if every alphabet character is in user's text
    //  using spread operator(extend iterable into individual elements)
    //   using every method to add 'test' on every element of array( true if they all passed test, false if at least one failed)
    return [...alphabet].every(char => _str.toLowerCase().includes(char))
}

// 'prepear' answer
const answer = checkPangram(text) ? 'is' : 'is not';

// log answer on console
console.log(`Your text ${answer} Pangram!`);