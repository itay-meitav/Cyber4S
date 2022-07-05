const form = document.getElementsByTagName("form")[0];
const username = document.getElementById("username");
const password = document.getElementById("password");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const register = document.getElementById("register");
let message = document.getElementById("message");

async function submit(action) {
  const respone = await fetch("http://localhost:3000/", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      action: action,
    }),
  })
    .then((res) => {
      if (res.redirected) {
        window.location.href = res.url;
      }
      return res;
    })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.message);
      message.innerText = data.message;
    })
    .catch(function (res) {
      console.log(res);
    });
}

register.addEventListener("click", () => {
  submit("register");
});

login.addEventListener("click", () => {
  submit("login");
});

logout.addEventListener("click", () => {
  submit("logout");
});
