import { getDate, getTime } from "./importTime.js";

const useCardContainer = $("[data-use-card-container]");
const useCardTemplate = $("[data-use-card-template]");



let users = [];

const getCard = async (id) => {
  try {
    const response = await fetch(`/get/${id}`);
    const data = await response.json();

    displayCard([data]);
  } catch (error) {
    console.error("Error fetching card:", error);
  }
};

const getAll = async () => {
  try {
    const response = await fetch("/all");
    const data = await response.json();
    displayCard(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const renameCard = async (id, newTitle) => {
  try {
    const response = await fetch(`/rename/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "nWEWEW", id: id }), 
    });
    const updatedNote = await response.json(); 
    
    if (!response.ok) {
      throw new Error("Failed to rename card");
    }
  } catch (error) {
    console.error("Error renaming card:", error);
  }
};



const createCard = async (titleInput, episodesInput ) => {
  
  const viewingStatusInput = document.getElementById("viewing-status").value;
  const releaseStatusInput = document.getElementById("release-status").value;
  try {

    const response = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleInput,
        episodes: episodesInput,
        viewing_status: viewingStatusInput,
        release_status: releaseStatusInput,
        isCheck: 0,
        date_created: getDate(),
        time_created: getTime(),
      }),
    });
  } catch (error) {
    console.error("Error creating card:", error);
  }
};

const deleteCard = async (id) => {
  try {
    const response = await fetch(`/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete card");
    }
  } catch (error) {
    
    console.error("Error deleting card:", error);
  }
}

const ifChecked = async (id, isCheck) => {
  try{
    
    const response = await fetch(`/checked/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id , isCheck: isCheck }), 
    });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error("Failed to rename card");
      }
  }catch(error){
    console.error("Error checking card:", error);
  }

}


function displayCard(data) {
  useCardContainer.innerHTML = "";

  users = data.map((element) => {

    const card = useCardTemplate.content.cloneNode(true).children[0];
    const title = card.querySelector("[data-title]");
    const input = card.children[1].children[0];
    
    card.dataset.id = element.UID;

    title.dataset.title = element.title;
    title.value = element.title;
    input.setAttribute("readonly", true);

    const checkbox = card.querySelector("[data-checkbox]");


    if (checkbox) {
      checkbox.checked = element.isCheck === 1;
      if (checkbox.checked) {
        title.style.textDecoration = "line-through";
        title.style.color = "#5c5c5c";
      } else {
        title.style.textDecoration = "none";
        title.style.color = "black";
      }
    }
    useCardContainer.appendChild(card);
  });
}

function $(selector) {
  return document.querySelector(selector);
}
export { getAll, getCard, createCard, renameCard, deleteCard, ifChecked };
