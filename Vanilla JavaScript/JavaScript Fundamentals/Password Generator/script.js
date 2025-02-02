
// get lengh of password from user
const UserInput = parseInt(prompt("Enter the password length:"));

const generatePassword = (length) => {
    // variable that contains all chars, digits and symbols
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    // create password using for loop and random indexes
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }

    return password
}

// log generated password
console.log(generatePassword(UserInput));