
// get password from user and remove spaces
const password = prompt('Please enter Your Password').trim();

function checkPasswordStrength(password) {    
    let strength = 0;
    
    // Check length
    if (password.length >= 8) strength++;
    
    // Check for numbers, '\d' means digits
    if (/\d/.test(password)) strength++;
    
    // Check for uppercase letters, '[A-Z]' means all chars from uppercase A to uppercase Z
    if (/[A-Z]/.test(password)) strength++;
    
    // Check for special characters, just list down characters that will be checked
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    // output strength of password
    if (strength === 0) {
        console.log('Very Weak')
    } else if (strength === 1) {
        console.log('Weak')
    } else if (strength === 2) {
        console.log('Medium')
    } else if (strength === 3) {
        console.log('Strong')
    } else {
        console.log('Very Strong')
    }
}

// call function
checkPasswordStrength(password);