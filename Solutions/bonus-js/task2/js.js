let list = document.getElementById("products");
let parent = document.querySelector(".parent");
list.addEventListener("click", (e) => {
  e.stopPropagation();
  e.target.classList.toggle("clicked");
});
parent.addEventListener("click", (e) => {
  let random = (Math.random() * 1).toString();
  e.currentTarget.style.opacity = random;
});
