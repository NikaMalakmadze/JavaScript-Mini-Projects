
const burgerBtn = document.querySelector('.burger');
const body = document.querySelector('body');

const burgerMenu = () => {
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        body.classList.toggle('no-scroll');
    })
    console.log('feae')
};

export default burgerMenu