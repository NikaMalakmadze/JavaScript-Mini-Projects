
//finding elements by dataset
const allModals = document.querySelectorAll('[data-modal]');                //find all modal windows
const modalButtons = document.querySelectorAll('[data-modal-button]');          //find all buttons that open modal windows
const modalCloseButtons = document.querySelectorAll('[data-modal-close]');          //find all buttons that close modal windows

//add functionality to the open buttons
modalButtons.forEach(function(item){                                //add function on each open button
    item.addEventListener('click', function(){                                          //if clicked:
        
        //dataset VALUE of button and modal window div ID are paired with each other(they are same)
        const modalContent = document.querySelector("#" + this.dataset.modalButton);       //find modal window that button opens

        modalContent.classList.remove('hidden');                    //show(open) modal window

        //stop click spreading from children elements of card-block
        //this is needed to dont close modal window when you click on its content
        //       (mission is to close it using button or clicking on fade)
        modalContent.querySelector('.card-block').addEventListener('click', function(cardBlock){
            cardBlock.stopPropagation();
        })
    })
})

//add functionality to the close buttons
modalCloseButtons.forEach(function(item){                     //add function on each close buttons
    item.addEventListener('click', function(){                    //if clicked:
        const modalCard = this.closest('[data-modal]');                //find modal window of close button by its closest parent
        modalCard.classList.add('hidden');                                      //hide modal window
    })
})

//add functionality to the half-transparent modal window fade
//      (technically it's adding functionality to the whole modal window div)
//              again
//      (mission is to close modal window using button or clicking on fade)
allModals.forEach(function(item){                                                   //add function on each modal window
    item.addEventListener('click', function(){                                          //if clicked:
        this.classList.add('hidden');                                                       //hide modal window
    })
})