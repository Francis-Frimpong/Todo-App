const textInput = document.querySelector(".todo-input");
const listContainer = document.querySelector(".list-container");
const activeBtn = document.querySelector(".active");
const completedListBtn = document.querySelector(".completed");
const activeTabs = document.querySelector(".active-tab");
const parentTabsContainer = document.querySelector(".tabs");
const clearCompleted = parentTabsContainer.querySelector(".clear");
const itemLeft = document.querySelector(".item-left");
const deleteList = document.querySelector(".delete");

// track todo length
let countTodos = 0;
itemLeft.textContent = `${countTodos} items left`;

// Darg and drop functionality
function dragAndDrop(list) {
  // DRAG START
  list.addEventListener("dragstart", (e) => {
    draggedItem = list;
  });

  // DRAG OVER
  list.addEventListener("dragover", (e) => {
    e.preventDefault(); // must prevent default to allow drop
  });

  // DROP
  list.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== list) {
      // Swap the items
      // Array.from()turns the children of the list container into an array
      const allItems = Array.from(listContainer.children);
      const draggedIndex = allItems.indexOf(draggedItem);
      const targetIndex = allItems.indexOf(list);

      if (draggedIndex < targetIndex) {
        listContainer.insertBefore(draggedItem, list.nextSibling);
      } else {
        listContainer.insertBefore(draggedItem, list);
      }
    }
  });
}
// update counter for unchecked boxes
function updateCounter() {
  const allCheckboxes = document.querySelectorAll("input[type=checkbox]");
  let uncheckedCount = 0;

  allCheckboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      uncheckedCount++;
    }
  });

  countTodos = uncheckedCount; // Always accurate
  itemLeft.textContent = `${countTodos} items left`;
}

// Checkbox functionality
function checkBoxFunc(checkboxs) {
  checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const parent = checkbox.closest(".list-checkbox");
      const textElement = parent.querySelector(".text");
      if (checkbox.checked) {
        textElement.style.textDecoration = "line-through";
        textElement.style.color = "hsl(233, 14%, 35%)";
      } else {
        textElement.style.textDecoration = "none";
        textElement.style.color = "hsl(0, 0%, 98%)";
      }

      updateCounter();
    });
  });
}

// Delete list item
function deleteListItem(list) {
  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      list.remove();
      updateCounter();

      if (listContainer.children.length === 0) {
        document.querySelector(".todo-list").classList.add("displayList"); // Hide
        document.querySelector(".dd-banner").classList.add("displayList"); // Hide
      } else {
        document.querySelector(".todo-list").classList.remove("displayList"); // Show
        document.querySelector(".dd-banner").classList.remove("displayList"); // Show
      }
    }
  });
}

// create list item
function createListItem() {
  // Creating the list elements
  const list = document.createElement("div");
  list.setAttribute("draggable", "true");
  list.classList.add("list");

  const listCheckBox = document.createElement("div");
  listCheckBox.classList.add("list-checkbox");

  const customCheckBox = document.createElement("label");
  customCheckBox.classList.add("custom-checkbox");

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("name", "checkbox");
  const checkMark = document.createElement("span");
  checkMark.classList.add("checkmark");

  const text = document.createElement("h2");
  text.classList.add("text");
  text.textContent = `${textInput.value}`;

  const crossIcon = document.createElement("img");
  crossIcon.src = "images/icon-cross.svg";
  crossIcon.classList.add("delete");

  const line = document.createElement("div");
  line.classList.add("line");

  // Appending element into it apropriate divs
  customCheckBox.appendChild(checkBox);
  customCheckBox.appendChild(checkMark);
  listCheckBox.appendChild(customCheckBox);
  listCheckBox.appendChild(text);
  listCheckBox.appendChild(crossIcon);
  list.appendChild(listCheckBox);
  list.appendChild(line);

  // drag and drop
  dragAndDrop(list);

  // adding the list element to it container when keydown event fires
  listContainer.appendChild(list);
  let getLength = [...listContainer.children];

  if (getLength.length > 0) {
    countTodos++;
    itemLeft.textContent = `${countTodos} items left`;
  } else {
    countTodos--;
    itemLeft.textContent = `${countTodos} items left`;
  }

  //clear the input field when event fires
  textInput.value = "";

  const checkboxs = document.querySelectorAll("input[type = checkbox]");

  // checkbox function call
  checkBoxFunc(checkboxs);
  // delete item function call
  deleteListItem(list);
}

// function to handle keydown event which creates the element
function handleKeyDownEvent(event) {
  if (event.key === "Enter") {
    createListItem();
    if (listContainer.children.length === 0) {
      document.querySelector(".todo-list").classList.add("displayList"); // Hide
      document.querySelector(".dd-banner").classList.add("displayList"); // Hide
    } else {
      document.querySelector(".todo-list").classList.remove("displayList"); // Show
      document.querySelector(".dd-banner").classList.remove("displayList"); // Show
    }
  }
}

// Active tabs functionality
const tabSwitch = document.querySelectorAll(".tabSwitch");

tabSwitch.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove 'active' class from all tabs
    tabSwitch.forEach((t) => t.classList.remove("active-button"));

    // Add 'active' class to the clicked tab
    tab.classList.add("active-button");
  });
});

// Tab function
function switchTab(e) {
  let convertToArray = [...listContainer.children];
  convertToArray.forEach((item) => {
    item.style.display = "block";
  });

  if (e.target.classList.contains("active")) {
    convertToArray.forEach((listItem) => {
      let activeItem = listItem.querySelector("input[type = checkbox]");
      if (activeItem.checked) {
        listItem.style.display = "none";
      }
    });
  } else if (e.target.classList.contains("completed")) {
    convertToArray.forEach((listItem) => {
      let checkedItem = listItem.querySelector("input[type = checkbox]");
      if (!checkedItem.checked) {
        listItem.style.display = "none";
      }
    });
  } else if (e.target.classList.contains("all")) {
    convertToArray.forEach((listItem) => {
      listItem.style.display = "block";
    });
  }
}

// Clear completed or checked items
function clearCompletedItem() {
  let convertToArray = [...listContainer.children];
  convertToArray.forEach((listItem) => {
    let checkedItem = listItem.querySelector("input[type = checkbox]");
    if (checkedItem.checked) {
      listItem.remove();
      countTodos--;
      itemLeft.textContent = `${countTodos} items left`;
    }
  });
  updateCounter();
  if (listContainer.children.length === 0) {
    document.querySelector(".todo-list").classList.add("displayList"); // Hide
    document.querySelector(".dd-banner").classList.add("displayList"); // Hide
  } else {
    document.querySelector(".todo-list").classList.remove("displayList"); // Show
    document.querySelector(".dd-banner").classList.remove("displayList"); // Show
  }
}

// Start of Theme switch function
const toggleButton = document.querySelector(".sun-icon");

// Check Local Storage on page load
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  toggleButton.src = "images/icon-moon.svg";
} else {
  document.body.classList.remove("light");
  toggleButton.src = "images/icon-sun.svg";
}

// Toggle on click and save to Local Storage
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    toggleButton.src = "images/icon-moon.svg"; // Light mode => moon icon
    localStorage.setItem("theme", "light");
  } else {
    toggleButton.src = "images/icon-sun.svg"; // Dark mode => sun icon
    localStorage.setItem("theme", "dark");
  }
});
// End of Theme switch function

activeTabs.addEventListener("click", switchTab);
textInput.addEventListener("keydown", handleKeyDownEvent);
clearCompleted.addEventListener("click", clearCompletedItem);
