
//just a string
const Str = 'Hello!'

//arrow function that fill return reversed string
//  it needs String to reverse as an argument
//
//  1.using split method to make an array with each char of string as an elements
//  2.using reverse method to reverse array
//  3.using join method to make string from array 
const ReverseStr = StrToReverse => StrToReverse.split('').reverse().join('');

//log reversed string on console
console.log(ReverseStr(Str))