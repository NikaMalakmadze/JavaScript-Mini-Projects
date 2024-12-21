
//find and get elements from page

const inputArea = document.querySelector('#inp');
const minusButton = document.querySelector('.minus-button');
const plusButton = document.querySelector('.plus-button');

//create counter variable
let counter = 0;

//set min and max value of counter
const minValue = 0;

const maxValue = 10;

//set start value of counter
inputArea.value = counter;

minusButton.addEventListener('click', function(){                           //when clicked on minus button

    //if decremented value of counter is less than minValue then user can't decrement more, if not just decrement
    counter = (counter - 1) < minValue ? minValue : counter - 1

    //update value on page
    inputArea.value = counter;
})

plusButton.addEventListener('click', function(){                            //when clicked on plus button

    //if incremented value of counter is less than maxValue then user can't incremented more, if not just increment
    counter = (counter + 1) > maxValue ? maxValue : counter + 1

    //update value on page
    inputArea.value = counter;
})
