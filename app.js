const textInput = document.querySelector(".todo-input");
const listContainer = document.querySelector(".list-container");

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
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

    customCheckBox.appendChild(checkBox);
    customCheckBox.appendChild(checkMark);
    listCheckBox.appendChild(customCheckBox);
    listCheckBox.append(text);
    list.appendChild(listCheckBox);
    list.appendChild(line);

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

    // adding the list element to it container when keydown event fires
    listContainer.appendChild(list);

    //clear the input field when event fires
    textInput.value = "";
  }
});

listContainer.addEventListener("click", (e) => {
  const listItem = e.target.closest(".list");
  if (listItem) {
    listItem.addEventListener("dragstart", (e) => {
      console.log(e);
    });

    listItem.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    listItem.addEventListener("drop", (e) => {
      e.preventDefault();
    });
  }
});
