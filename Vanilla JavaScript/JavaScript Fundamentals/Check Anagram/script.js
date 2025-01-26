
// get both the words, remove spaces and lowerCase Them
const word1 = prompt('Please enter First word: ').trim().toLowerCase();
const word2 = prompt('Please enter Second word: ').trim().toLowerCase();

//  function that checks if both words are anagrams
//      it needs two words as an arguments
function checkAnagram(w1, w2) {
    if (w1.length !== w2.length) {                      //if lenghs are not same, they are not anagrams
        console.log('Not a anagram(diff len)!');
        return;
    }

    // sort both words alphabeticaly
    const sortedWord1 = word1.split('').sort().join('');
    const sortedWord2 = word2.split('').sort().join('');

    // check if sorted version of words are same
    if (sortedWord1.toLowerCase() === sortedWord2.toLowerCase()) {              //if they are same its anagram
        console.log('Yes it is Anagram!');
    } else {                                                                    //if not its not anagram
        console.log('No it is not Anagram!');
    }
}

// call function
checkAnagram(word1, word2);