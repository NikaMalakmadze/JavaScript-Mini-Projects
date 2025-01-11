
// Simple Vowels Remover

const text = prompt('Please Enter Sentence Here!');         //get text from user

//remove all vowels | a, e, i, o, u | 
//  by default 'replace' will replace only first finded char, but if you write 'g' flag it will remove them all, 'i' for both cases

//check if user inputed atleast one char
if (text){
    const EditedText = text.replace(/a/gi, "")
                        .replace(/e/gi, "")
                        .replace(/i/gi, "")
                        .replace(/o/gi, "")
                        .replace(/u/gi, ""); 

    //pring edited text if something lasted after editing :)
    console.log(EditedText ? `Your Edited text(Removed Vowels): ${EditedText}` : 'Nope!');         

}else {
    console.log('No Input!');
}
  