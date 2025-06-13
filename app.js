const textInput = document.querySelector(".todo-input");
const listContainer = document.querySelector(".list-container");

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
      console.log(allItems);
      const draggedIndex = allItems.indexOf(draggedItem);
      console.log(draggedIndex);
      const targetIndex = allItems.indexOf(list);
      console.log(targetIndex);

      if (draggedIndex < targetIndex) {
        listContainer.insertBefore(draggedItem, list.nextSibling);
      } else {
        listContainer.insertBefore(draggedItem, list);
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
  const checkMark = document.createElement("span");
  checkMark.classList.add("checkmark");

  const text = document.createElement("h2");
  text.classList.add("text");
  text.textContent = `${textInput.value}`;

  const line = document.createElement("div");
  line.classList.add("line");

  // Appending element into it apropriate divs
  customCheckBox.appendChild(checkBox);
  customCheckBox.appendChild(checkMark);
  listCheckBox.appendChild(customCheckBox);
  listCheckBox.append(text);
  list.appendChild(listCheckBox);
  list.appendChild(line);

  // drag and drop
  dragAndDrop(list);

  // adding the list element to it container when keydown event fires
  listContainer.appendChild(list);

  //clear the input field when event fires
  textInput.value = "";
}

// function to handle keydown event
function handleKeyDownEvent(event) {
  if (event.key === "Enter") {
    createListItem();
  }
}

textInput.addEventListener("keydown", handleKeyDownEvent);
