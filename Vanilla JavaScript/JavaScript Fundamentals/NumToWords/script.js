
// get number from user 

const num = parseInt(prompt('Enter a number from 1 to 99: '));      // parse to int

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighteen', 'Nineteen'];

const numberToWords = (num) => {
    // check if it's in a range 
    if (num => 1 && num <= 99) {
        let word = '';

        if (num < 10) {
            // just get number from ones
            word = ones[num];
        } else if (num < 20) {
            // just get number from tens, but -10 to number
            word = teens[num - 10];
        } else {
            // if number is 20 or greater then 20 
            //      then get tens part from number and add unit to it if needed
            word = tens[Math.floor(num / 10)] + (num % 10 === 0 ? '' : " " + ones[num % 10])
        } 
        console.log(word);
    } else if (num >= 100) {
        console.log('Invalid Input!');
    }
}

// call function
numberToWords(num);
