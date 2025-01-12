
// Simple Vowels Counter

const text = prompt('Please Enter Sentence Here!');         //get text from user

//function to count vowels in users text
//  it needs user inputed string as an argument
//      1. split text by chars
//      2. filter char array by our condition   | check if vowels string includes char |
//      3. return length of filtered char array
const VowelsCount = function(textToCount) {
    return textToCount.split('')
                      .filter((char => 'aeiou'.includes(char)))
                      .length;
} 

console.log(`Vowels in your sentence is ${VowelsCount(text)}`);           //pring Number of Vowels on console