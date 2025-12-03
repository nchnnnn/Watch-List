
import { getAll, createCard, deleteCard, ifChecked } from "/script.js";

document.addEventListener("DOMContentLoaded", () => {
  const filterIcon = $("#filter-icon");
  const filterContainer = $("#filters-container");
  const itemsContainer = $(".items-container");
  const searchInput = $("[data-search]");

  let users = [];

  filterIcon.addEventListener("click", () => {
    if (filterIcon.classList.contains("fa-regular")) {
      filterIcon.classList.replace("fa-regular", "fa-solid");
      filterContainer.style.paddingTop = "2.3rem";
    } else {
      filterIcon.classList.replace("fa-solid", "fa-regular");
      filterContainer.style.paddingTop = "0";
    }
  });

  searchInput.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase();
    users.forEach((user) => {
      const isVisible = user.titles.toLowerCase().includes(value);
      user.card.classList.toggle("hidden", !isVisible);
    });
  });


  itemsContainer.addEventListener("click", (event) => {
    const target = event.target;
    const item = target.closest(".item");
    if (!item) return;
   
    
    if (target.classList.contains("fa-trash")) {
      item.classList.add("fade-out"); 

      
      item.addEventListener(
        "animationend",
        () => {
          item.remove();
          const id = item.getAttribute("data-id");
   
          deleteCard(id); 
        },
        { once: true } 
      );
    }

    if (target.classList.contains("fa-pencil")) {
      const textInput = item.querySelector("input[type='text']");
      if (!textInput) return;

      textInput.readOnly = false; 
      textInput.focus();

      setTimeout(() => {
        textInput.setSelectionRange(
          textInput.value.length,
          textInput.value.length
        );
      }, 0);
    }
  });


  itemsContainer.addEventListener("change", (event) => {
    const target = event.target;
    const item = target.closest(".item");
    const id = item.getAttribute("data-id");
    
    if(target.checked){
      ifChecked(id, 1)
    }else{
      ifChecked(id, 0);

    }

    if (event.target.classList.contains("checkbox")) {
      const itemInfo = event.target
        .closest(".item")
        .querySelector("input[type='text']");
      itemInfo.style.textDecoration = event.target.checked ? "line-through" : "none" ;
      itemInfo.style.color = event.target.checked ? "#5c5c5c" : "black";
      itemInfo.style.textDecoration = event.target.checked ? "line-through" : "none";
    }
  });

  $(".fa-plus").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "flex";
  });

  $(".add").addEventListener("click", () => {
    const titleInput = document.getElementById("add-title").value;
    const episodesInput = document.getElementById("add-episodes").value;

    
    if(!titleInput || !episodesInput) {
      alert("Please fill in all fields.");
      deleteInput();
    }else{
      handleCase(titleInput, episodesInput);
      
    }

  });

  getAll();

  async function handleCase(titleInput, episodesInput) {
    await createCard(titleInput, episodesInput);
    getAll();
    deleteInput();
  }

  function deleteInput(){
    $("#add-title").value = "";
    $("#add-episodes").value = ""; 
  }


  

  function $(selector) {
    return document.querySelector(selector);
  }
});





