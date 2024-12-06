
//find and get elements from page 
const slider = document.querySelector('#slider');
const sliderImages = Array.from(slider.getElementsByTagName('img'));
const buttonNext = document.querySelector('#btnNext'); 
const buttonPrev = document.querySelector('#btnPrev');
const number = document.querySelector('#num');

sliderImages.forEach(function(image , index){

    //hide all images except first image(image with index 0)
    if (index !== 0){
        image.classList.add('hidden');
    }

    image.dataset.index = index;                    //assign its index to each img tag as dataset(data-index)

    //add 'active' data attribute to the first image / active image

    sliderImages[0].setAttribute('data-active', '');

    image.addEventListener('click', function(){             // when clicked on image:
        // hide current(clicked) image
        image.classList.add('hidden');
        image.classList.remove('data-active');

        // get index of next image
        // if image is last, start from first image
        let nextImageIndex = index + 1 === sliderImages.length ? 0 : index + 1;

        // find and get next image on page
        const nextImage = document.querySelector(`[data-index='${nextImageIndex}']`);
        
        // show next slide and make it active
        nextImage.classList.remove('hidden');
        //assigning nomer of image as data-active attribute value
        nextImage.setAttribute('data-active', `${nextImageIndex + 1}`);
        //assign number of next image to the 'nomer label' using data-active attribute value
        number.innerHTML = nextImage.dataset.active;
    })
})

function showNextSlide(direction) {

     //find and get active image and its index on page
     const currentSlide = slider.querySelector('[data-active]');
     const currentSlideIndex = +currentSlide.dataset.index;              //convert it to integer using "+"
 
     // hide current image and remove 'active' data attribute
     currentSlide.classList.add('hidden');
     currentSlide.removeAttribute('data-active');

     let nextSlideIndex
     if (direction === 'next') {
        //get index of next image
        // if image is last, start from first image
        nextSlideIndex = currentSlideIndex + 1 === sliderImages.length ? 0 : currentSlideIndex + 1;
     }
     else if (direction === 'prev') {
        //get index of previous image
        // if image is first, strat from last image
        nextSlideIndex = currentSlideIndex === 0 ? sliderImages.length - 1 : currentSlideIndex - 1;
     }

     const nextSlide = document.querySelector(`[data-index='${nextSlideIndex}']`);            //find next image on page

     // show next slide and make it active
     nextSlide.classList.remove('hidden');
     //assigning nomer of image as data-active attribute value
     nextSlide.setAttribute('data-active', `${nextSlideIndex + 1}`);
     //assign number of next image to the 'nomer label' using data-active attribute value
     number.innerHTML = nextSlide.dataset.active;
}

//add function when clicked on next button
buttonNext.onclick = function() {
    showNextSlide('next');
}

//add function when clicked on previous button
buttonPrev.onclick = function() {
    showNextSlide('prev');
}