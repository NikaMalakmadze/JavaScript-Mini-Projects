
const titles = document.querySelectorAll("[data-name='block-title']");

titles.forEach(function (item){
    item.addEventListener('click', ShowContent);
})

function ShowContent() {
    this.nextElementSibling.classList.toggle("hidden");
}