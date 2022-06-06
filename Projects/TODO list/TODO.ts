const myNodeList = document.getElementsByTagName("li");
let listHtml: any = document.getElementById("myUL");

// Loading exists tasks
window.addEventListener('DOMContentLoaded', loadList);
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
  for (let i: number = 0; i < myNodeList.length; i++) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.appendChild(txt);
    span.className = "close";
    myNodeList[i].appendChild(span);
  }
  let close: any = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = () => {
        let div = close[i].parentElement;
        let taskId = div.id;
        localStorage.removeItem(`task${taskId}`);
        div.remove();
        countTasks();
    };
  }
}

// Editing exists task
function editButton() {
  for (let i: number = 0; i < myNodeList.length; i++) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u270E");
    span.appendChild(txt);
    span.className = "edit";
    myNodeList[i].appendChild(span);
    let edit: any = document.getElementsByClassName("edit");
    for (let i = 0; i < edit.length; i++) {
      edit[i].onlick = () => {
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
  let inputValue = (<HTMLInputElement>document.getElementById("myInput")).value;
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
  let li: any = document.createElement("li");
  (<HTMLBodyElement>document.getElementById("myUL")).appendChild(li);
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  li.id = noteCount;
  removeButton();
  editButton();
  (<HTMLInputElement>document.getElementById("myInput")).value = "";
  if (inputValue.trim() !== "") {
    localStorage.setItem("task" + noteCount, inputValue);
  }
  noteCount++;
  countTasks();
}


// Add a "checked" symbol when clicking on a list item
const list: any = document.querySelector("ul");
list.addEventListener(
  "click",
  (ev: any) => {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function removeAll() {
  (<HTMLBodyElement>document.getElementById("myUL")).innerHTML = "";
  localStorage.clear();
  countTasks();
}

function countTasks() {
  let taskNumber: any = document.getElementById("taskNumber");
  taskNumber.innerText =  (<HTMLBodyElement>document.getElementById("myUL")).getElementsByTagName("li").length;
}
