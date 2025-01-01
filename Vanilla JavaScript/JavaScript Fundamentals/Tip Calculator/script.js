
//Tip Calculator!

const bill =  275

//calculate tip depended on bill:
//  tip = 15% of bill if bill is betweeen 50 and 300
//  tip = 20% of bill for any different value of bill

//using ternary operator to do tip calculation logic

//                  statement           if true      if false
const tip = bill > 50 && bill < 300 ? bill * 0.15 : bill * 0.2

// log info on console
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`)