
// get word from user
const word = prompt('Type 1 word to check if it is Palindrome').trim()

//function that gets word as an argument and checks if it is palindrome
const IsPalindrome = function(word){
    return word === word.split('').reverse().join('')
}

// if word is palindrome log that, if not log else
if (IsPalindrome(word)){
    console.log(`Your Word is Palindrome`);
} else {
    console.log(`Your word is not Palindrome`);
}
