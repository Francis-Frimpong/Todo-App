const textInput = document.querySelector(".todo-input");
const listContainer = document.querySelector(".list-container");

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    //   display.textContent = input.value;
    let createList = `
        <div class="list">
          <div class="list-checkbox">
            <label class="custom-checkbox">
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <h2 class="text">${textInput.value}</h2>
          </div>
          <div class="line"></div>
        </div>
      `;
    listContainer.innerHTML += createList;
    textInput.value = "";
    // console.log(textInput.value);
  }
});
