
// just arr of colors HEX codes
const brightColors = [
    "#FF5733",
    "#FFB533",
    "#33FF57",
    "#33B5FF",
    "#FF33B5",
    "#FFD733",
    "#FF5733",
    "#FF33FF",
    "#33FFBD",
    "#FF3355" 
];

// variable that will be used to accsess colors in arr using index
let colorIndex = 0

// function that changes color of text
const changecolor = function() {
    const text = document.getElementById('animatedText')        //find and get element from website

    text.style.color = brightColors[colorIndex]                 //set its font color to the color from brighColors

    // increment colorindex and also loop it
    //  so if it reaches index of last item in arr, it will go back to 0
    colorIndex = colorIndex == brightColors.length ? 0 : colorIndex + 1    
}

// call this function every 1 second
setInterval(changecolor, 1000)