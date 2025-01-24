

document.addEventListener("DOMContentLoaded", () =>{
    const filterIcon = document.getElementById("filter-icon")
    const filterContainer = document.getElementById("filters-container");
    const buttons = document.querySelectorAll('#button')
    
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


    filterIcon.addEventListener("click", () =>{

        if(filterIcon.className == "fa-regular fa-filter"){
            filterIcon.className = "fa-solid fa-filter"
            filterContainer.style.top = "5px";
        }else{
            filterIcon.className = "fa-regular fa-filter";
            filterContainer.style.top = "-2.3rem";

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