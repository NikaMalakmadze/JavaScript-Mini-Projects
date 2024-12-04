
//find and get elements from page
const year = document.querySelector('#year');
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const timer = document.querySelector('#timer')
const preLoader = document.querySelector('#preloader')


const currentYear = new Date().getFullYear();                               //get current year
const nextYear = new Date(`January 01 ${currentYear + 1} 00:00:00`);                //get next year

function UpdateCounter() {

    const currentTime = new Date();                                         //get current time
    const difference = nextYear - currentTime;                              //time between current time and next year(in miliseconds)

    // convert miliseconds to days and round it down
    const daysLeft = Math.floor(difference / 1000 / 60 / 60 / 24); 

    //convert miliseconds to hours, round it down and get reminder by dividing on 24
    const hoursLeft = Math.floor(difference / 1000 / 60 / 60) % 24;   
    
    //convert miliseconds to minutes, round it down and get reminder by dividing on 60
    const minutesLeft = Math.floor(difference / 1000 / 60) % 60;    

    //convert miliseconds to seconds, round it down and get reminder by dividing on 60
    const secondsLeft = Math.floor(difference / 1000) % 60;

    //pasting data on html page

    year.innerText = currentYear + 1                //pasting next year

    //pasting days/hours/minutes/seconds
    //add additional '0' before num if it's less then 10
    days.innerText = daysLeft < 10 ? '0' + daysLeft : daysLeft;
    hours.innerText = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft;
    minutes.innerText = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;
    seconds.innerText = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;

}

// run UpdateCounter function every 1 second
setInterval(UpdateCounter, 1000);

// when loading page remove preloader from page and show timer
// do this only once when loading page 
setTimeout(function(){
    preLoader.remove();
    timer.style.display = 'flex';
}, 1000)