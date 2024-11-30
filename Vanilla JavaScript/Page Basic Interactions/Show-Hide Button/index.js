
const button = document.querySelector("button");
const box = document.querySelector(".box")

button.addEventListener("click", function() {
    if (box.classList.toggle("hidden")){
        button.textContent = "Show"
    }
    else{
        button.textContent = "Hide"
    }
})