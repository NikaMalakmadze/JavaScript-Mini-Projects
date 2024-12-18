
//find and get elements from page

const buttons = document.querySelectorAll('.btn');
const buttonGroup = document.querySelector('.non-individual');

// chars of hex code
const HEX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

//function to get random index from HEX variable
function generateIndex(){
    return Math.floor(Math.random() * HEX.length)
}

//function to loop throught HEX variable and get random char using random index function
function getRandomHex(){
    let Hex = '#'
    for(let i = 0; i < 6; i++){
        Hex += HEX[generateIndex()]
    }

    return Hex
}

// add function for each button on page
buttons.forEach(function(button){
    //HoverState is needed to dont change/generate color when user is moving cursor inside of button
    
    let HoverState = false;                                     //there is no hover on button at the start

    button.addEventListener('mouseenter', function(event){              //add function if mouse cursor is hovering button
        const x = event.pageX - button.offsetLeft;                              //get x coordinate relative to button
        const y = event.pageY - button.offsetTop;                               //get y coordinate relative to button

        if (!HoverState){                                                       //if not hovering
            HoverState = true;                                                      //set hover state to true

            //set starting x and y coordinates of 'circle' according to cursor
            button.style.setProperty('--XPosition', x + 'px');
            button.style.setProperty('--YPosition', y + 'px');

            //set background color of 'circle' as a two color gradient
            button.style.setProperty('--BgColor1', getRandomHex());
            button.style.setProperty('--BgColor2', getRandomHex());
        }  
    })

    button.addEventListener('mouseout', function(){             //when cursor left button:
        HoverState = false;                                         //set hover state to false
    })
})
