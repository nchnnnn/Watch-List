

document.addEventListener("DOMContentLoaded", () =>{
    const filterIcon = document.getElementById("filter-icon")
    const filterContainer = document.getElementById("filters-container");
    const buttons = document.querySelectorAll('#button')
    const items_container = document.getElementById("items-container");
   
    const add = document.querySelector(".fa-plus")
    
    
    add.addEventListener("click", ()=>{
      // Step 1: Select the parent element with the class 'item-container'
let parentElement = document.querySelector('.items-container'); // Assumes 'item-container' exists

// Step 2: Create the main 'div' with class 'item'
let itemDiv = document.createElement('div');
itemDiv.className = 'item';

// Step 3: Create the 'input-container' div and add a checkbox input
let inputContainer = document.createElement('div');
inputContainer.className = 'input-container';
let checkbox = document.createElement('input');
checkbox.className = 'checkbox';
checkbox.type = 'checkbox';
inputContainer.appendChild(checkbox); // Append the checkbox to 'input-container'

// Step 4: Create the 'item-info' div and add an <h6> element
let itemInfo = document.createElement('div');
itemInfo.className = 'item-info';
let itemTitle = document.createElement('h6');
itemTitle.textContent = 'pogiiicondition ? true : false'; // Set the text inside <h6>
itemInfo.appendChild(itemTitle); // Append <h6> to 'item-info'

// Step 5: Create the 'edit-container' div and add two <i> elements
let editContainer = document.createElement('div');
editContainer.className = 'edit-container';

let pencilIcon = document.createElement('i');
pencilIcon.className = 'fa-light fa-pencil'; // Add classes for the pencil icon

let trashIcon = document.createElement('i');
trashIcon.className = 'fa-regular fa-trash'; // Add classes for the trash icon
trashIcon.id = 'button'; // Set the id for the trash icon

editContainer.appendChild(pencilIcon); // Append pencil icon
editContainer.appendChild(trashIcon); // Append trash icon

// Step 6: Append all created elements to 'itemDiv'
itemDiv.appendChild(inputContainer);
itemDiv.appendChild(itemInfo);
itemDiv.appendChild(editContainer);

// Step 7: Append 'itemDiv' to the parent element
parentElement.appendChild(itemDiv);

    })
    document.querySelectorAll(".checkbox").forEach((checkbox) => {
      const itemInfo = checkbox.closest(".item").querySelector(".item-info");
      if (checkbox.checked) {
        itemInfo.style.textDecoration = "line-through";
      } else {
        itemInfo.style.textDecoration = "none";
      }

      checkbox.addEventListener("change", () => {
        itemInfo.style.textDecoration = checkbox.checked
          ? "line-through"
          : "none";
      });
    });
    
    document.querySelectorAll("fa-pencil").forEach((rename) => {
      const itemInfo = checkbox.closest(".item").querySelector(".item-info");
      
    })

    filterIcon.addEventListener("click", () =>{


        if(filterIcon.className == "fa-regular fa-filter"){
            filterIcon.className = "fa-solid fa-filter"
            filterContainer.style.paddingTop = "2.3rem";
      
      
        }else{
            filterIcon.className = "fa-regular fa-filter";
            filterContainer.style.paddingTop = "0";

        }


    })


    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const progressContainer = e.target.closest(".item");
        if (progressContainer) {
          progressContainer.classList.add("hidden");

          // Ensure display: none; is set only after animation ends
          progressContainer.addEventListener(
            "animationend",
            () => {
              progressContainer.style.display = "none";
            },
            { once: true }
          ); // Runs once to prevent multiple bindings
        }
      });
    });

    
})