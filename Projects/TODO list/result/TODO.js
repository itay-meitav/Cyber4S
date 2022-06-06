const myNodeList = document.getElementsByTagName("li");
let listHtml = document.getElementById("myUL");

// Loading exists tasks
window.addEventListener("DOMContentLoaded", loadList());
function loadList() {
  if (localStorage.length > 1) {
  for (let i = 1; i < localStorage.length + 1; i++) {
    let item = document.createElement("li");
    item.textContent = localStorage.getItem("task" + i);
    listHtml.appendChild(item);
    removeButton();
    editButton();
    countTasks();
  }
} else {
    return null;
  }
}

// Removing exists tasks
function removeButton() {
  for (let i = 0; i < myNodeList.length; i++) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.appendChild(txt);
    span.className = "close";
    myNodeList[i].appendChild(span);
  }
  let close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].addEventListener("click", () => {
      let div = close[i].parentElement;
      let taskId = div.id;
      localStorage.removeItem(`task${taskId}`);
      div.remove();
      countTasks();
    });
  }
}

// Editing exists task
function editButton() {
  for (let i = 0; i < myNodeList.length; i++) {
    // if (myNodeList[i])
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u270E");
    span.appendChild(txt);
    span.className = "edit";
    myNodeList[i].appendChild(span);
    let edit = document.getElementsByClassName("edit");
    for (let i = 0; i < edit.length; i++) {
      edit[i].onclick = () => {
        let text = prompt("Please enter your new input");
        if (text === null || text === "") {
          return false;
        }
        for (let i = 0; i < myNodeList.length; i++) {
          if (myNodeList[i].innerText.includes(text)) {
            alert("You already added this task, try another!");
            return false;
          }
        }
        let div = edit[i].parentElement;
        let taskId = div.id;
        localStorage.removeItem(`task${taskId}`);
        div.innerText = text;
        div.innerHTML.includes(removeButton());
        div.innerHTML.includes(editButton());
        localStorage.setItem("task" + taskId, text);
      };
    }
  }
}

// Adding New task
let noteCount = 1;
function newElement() {
  let inputValue = document.getElementById("myInput").value;
  if (inputValue === "") {
    alert("You must write something!");
    return false;
  }
  for (let i = 0; i < myNodeList.length; i++) {
    if (myNodeList[i].innerText.includes(inputValue)) {
      alert("You already added this task, try another!");
      return false;
    }
  }
  let li = document.createElement("li");
  document.getElementById("myUL").appendChild(li);
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  li.id = noteCount;
  removeButton();
  editButton();
  document.getElementById("myInput").value = "";
  if (inputValue.trim() !== "") {
    localStorage.setItem("task" + noteCount, inputValue);
  }
  noteCount++;
  countTasks();
}

// Add a "checked" symbol when clicking on a list item
const list = document.querySelector("ul");
list.addEventListener(
  "click",
  (ev) => {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

// Removes all tasks
function removeAll() {
  document.getElementById("myUL").innerHTML = "";
  localStorage.clear();
  countTasks();
}

// Counts tasks
function countTasks() {
  let taskNumber = document.getElementById("taskNumber");
  taskNumber.innerText = document
    .getElementById("myUL")
    .getElementsByTagName("li").length;
}
