
//Tip Calculator V2

//create Bills array that will store input data(bill)
//arrays have indexes, index is starting from 0
//                       0    1    2
const Bills = new Array(125, 555, 44)

//calculate tip depended on bill:
//  tip = 15% of bill if bill is betweeen 50 and 300
//  tip = 20% of bill for any different value of bill

//using ternary operator to do tip calculation logic
//
//                              statement           if true      if false
const CalcTip = bill => bill > 50 && bill < 300 ? bill * 0.15 : bill * 0.2

//calculate tip and store it in Tips array
//  you can call function inside of arrays and then it will return value as an element of array
const Tips = [CalcTip(Bills[0]), CalcTip(Bills[1]), CalcTip(Bills[2])]

//calculate total amount of money to pay
//  you can type expressions inside of arrays, they will return value as an element of array
const Totals = [Bills[0] + Tips[0], Bills[1] + Tips[1], Bills[2] + Tips[2]]

//log calculated data on console
console.log(Tips)
console.log(Totals)