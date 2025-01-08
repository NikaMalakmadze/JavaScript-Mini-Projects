
// Simple Word Counter

const text = prompt('Please Enter Sentence Here!');         //get text from user

const words = text.trimStart().trimEnd().split(" ");        //remove spaces at start and end of text, then split it by spaces

console.log(`Words in your sentence is ${words.length}`);           //pring length of words on console
