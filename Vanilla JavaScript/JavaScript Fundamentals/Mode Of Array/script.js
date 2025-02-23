
// get array with numbers from user
const userInput = prompt('Please enter numbers seperated by "," commas: ');
// split input by commas and convert each number char to number type
const numbers = userInput.split(',').map(Number);

// arrow function that can find mode of number array
//  it needs array as an argument
const findMode = (arr) => {
    let countOfNums = {};           // object that will help to count how many times each number appear in array
    let maxNumFrequency = 0;                // variable that stores highest frequency
    let mode;                                       // undefined variable that will store mode number

    // loop through each number in array
    arr.forEach(number => {
        // store/update each number's count in array 
        countOfNums[number] = ( countOfNums[number] || 0 ) + 1;
        if (countOfNums[number] > maxNumFrequency) {                // if number's count in array is more than highest frequency
            maxNumFrequency = countOfNums[number];                          // then this number is mode for now
            mode = number                                                           // store mode in variable
        }
    });

    // get counts of all numbers
    const countsSet = Object.values(countOfNums);

    // if every number's count in array is 1 then array has no mode
    if (countsSet.every(count => count === 1)) return 'No Mode!';

    // or just "if (maxNumFrequency === 1) return 'No Mode!';"

    // return mode
    return mode;
}

// log output on console
console.log(`Mode in your array is: ${findMode(numbers)}`);