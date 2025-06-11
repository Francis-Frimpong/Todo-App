const textInput = document.querySelector(".todo-input");
const listContainer = document.querySelector(".list-container");

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Creating the list elements
    const list = document.createElement("div");
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

    // adding the list element to it container when keydown event fires
    listContainer.appendChild(list);

    //clear the input field when event fires
    textInput.value = "";
  }
});
