
//find and get elements from page

const buttonS = document.querySelector('#success');
const buttonE = document.querySelector('#error');
const buttonI = document.querySelector('#invalid');

const toastBox = document.getElementById('toastBox');

//create messages with icons for all types of buttons
const SuccessMessage = '<i class="fa-solid fa-circle-check"></i> Successfully submitted!'
const ErrorMessage = '<i class="fa-solid fa-circle-xmark"></i> Please Fix Error!'
const InvalidMessage = '<i class="fa-solid fa-circle-exclamation"></i> Invalid input, Try again!'

//create function that will add toast on page
//it needs message output as an argument
function showToast(message){
    let toast = document.createElement('div');              //create div element
    toast.classList.add('toast');                              //add css properties to it using class
    toast.innerHTML = message;                                      //output message on that div

    //add created div on page
    toastBox.appendChild(toast);

    //check message type and add different style to icon
    if (message.includes('Successfully')){
        toast.classList.add('success');
    }

    if (message.includes('Error')){
        toast.classList.add('error');
    }

    if (message.includes('Invalid')){
        toast.classList.add('invalid');
    }

    //set timeout and remove toast after 3sec
    setTimeout(function(){
        toast.remove();
    }, 3000)
}


//add this function to every button when clicked
buttonS.addEventListener('click', function(){
    showToast(SuccessMessage)
})

buttonE.addEventListener('click', function(){
    showToast(ErrorMessage)
})

buttonI.addEventListener('click', function(){
    showToast(InvalidMessage)
})