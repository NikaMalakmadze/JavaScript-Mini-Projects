
//find and get elements from page

const numbers = document.querySelectorAll('.number');

//setting total duration of animation in miliseconds(5sec) | Animation will take 5sec |
const interval = 5000;                               

numbers.forEach(function(number){                                   //set function for each number
    let startValue = 0                                                  //set start value of number
    let endValue = parseInt(number.getAttribute('data-value'));             //get end value from html page using data attribute

    let duration = Math.floor(interval / endValue);                         //calculate the duration of each increment of number

    //start counter using setInterval function, it will repeat code in it every n(calculated duration variable) time
    let counter = setInterval(function(){                           
        startValue += 1;                                                    //increment startvalue by 1
        number.textContent = startValue;                                        //update it on page
        if (startValue >= endValue){                                                //if reached end value:
            clearInterval(counter);                             //stop timer using function clearInterval and passing to it counter variable
        }
    }, duration)
})
