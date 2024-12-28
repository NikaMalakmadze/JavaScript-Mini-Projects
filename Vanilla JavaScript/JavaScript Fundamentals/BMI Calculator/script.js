
//BMI Calculator!

//BMI = mass / height ** 2 OR mass / (height * height)

//data
let MaxWeight = 76
let MaxHeight = 1.69

let JohnWeight = 92
let JohnHeight = 1.95

//function that calculates BMI
// it needs mass(weight) and height as an argumnets
// it will return rounded BMI
function BmiCalc(mass, height){
    return Math.round(mass / height**2)
}

const MaxBMI = BmiCalc(MaxWeight, MaxHeight)
const JohnBMI = BmiCalc(JohnWeight, JohnHeight)

//find if mark's BMI is higher then John
const markHigherBMI = MaxBMI > JohnBMI

//log Both BMI and if mark's BMI is higher then John
console.log(MaxBMI, JohnBMI, markHigherBMI)