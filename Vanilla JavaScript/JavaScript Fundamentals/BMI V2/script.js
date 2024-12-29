
//BMI Calculator V2!

//BMI = mass / height ** 2 OR mass / (height * height)

//data
let MarkWeight = 76;
let MarkHeight = 1.69;

let JohnWeight = 92;
let JohnHeight = 1.95;

//function that calculates BMI
// it needs mass(weight) and height as an argumnets
// it will return rounded BMI
function BmiCalc(mass, height){
    return Math.round(mass / height**2);
}

//calculate both mark's and john's BMI
const MarkBMI = BmiCalc(MarkWeight, MarkHeight);
const JohnBMI = BmiCalc(JohnWeight, JohnHeight);

//check if mark's BMI is Greater then john's
if (MarkBMI > JohnBMI){
    console.log(`Mark's BMI(${MarkBMI}) is higher than John's(${JohnBMI})!`);       //if true print this
}
else {
    console.log(`John's BMI(${JohnBMI}) is higher than Mark's(${MarkBMI})!`);       //else(if not) print this
}