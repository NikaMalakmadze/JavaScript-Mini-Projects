
const tabs = document.querySelectorAll('[data-tab]');                       // find all tab titles by dataset

const contentBoxes = document.querySelectorAll('[data-tab-content]');       // find all contentboxes by dataset

tabs.forEach(function(item){                                            // add function on each tab title

    item.addEventListener("click", function(){                          // add function if clicked on some tab title

        tabs.forEach(function(tab){                                         // unactive all tab titles
            tab.classList.remove("active")
        })

        item.classList.add("active")                            // make active tab title that was clicked

        contentBoxes.forEach(function(item){                    // hide all content boxes
            item.classList.add("hidden");
        })

        const contentbox = document.querySelector("#" + this.dataset.tab);              // find content box by its tab title dataset
        contentbox.classList.remove("hidden");                                                  // Show content box(Unhide)

    })

})
