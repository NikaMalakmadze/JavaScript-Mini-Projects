
// get lenght of fibonacci sequence
const Userlenght = parseInt(prompt('Please enter lenght of Fibonacci Sequence:'));

const fibonacci = (n) => {
    
    if (n === 1) return [0]

    if (n === 0) return []

    // create array with first two elements of fibonacci sequence
    let fib = [0, 1];

    // loop throught numbers from 2 to user inputed lenght of sequence
    for (let i = 2; i < n; i++) {

        // fibonacci third element is a sum of first and second element
        // fibonacci fourth element is a sum of third and second element and so on
        //  so get this numbers(using indexes) and add their sum in the array
        fib.push(fib[i-1] + fib[i-2]);
    }
    // return array
    return fib
}

// log info on console
fibonacci(Userlenght).forEach((number) => { console.log(number) })