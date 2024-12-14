
//find and get items from page

const button = document.querySelector('#btn');
const BgcolorHex = document.querySelector('.hex');

// chars of hex code
const HEX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

button.addEventListener('click', function (){                                   //when clicked on button
    let HexColor = getHex()                                                         //generate and save random color
    document.body.style.backgroundColor = HexColor;                                     //change background color of page
    BgcolorHex.textContent = HexColor;                                                      //print hex code of current color on page
    BgcolorHex.style.color = HexColor;                                                          //change color of font
})

//function to get random index from HEX variable
function getRandomIndex() {
    return Math.floor(Math.random() * HEX.length)
}

//function to loop throught HEX variable and get random char using random index function
function getHex(){
    let Hex = '#'
    for (let i = 0; i < 6; i++){                                                //looping 6 times because hex code has only 6 char
        Hex += HEX[getRandomIndex()]                                                //get random char and add it to Hex variable
    }

    return Hex                                                                  //return hex code
}
