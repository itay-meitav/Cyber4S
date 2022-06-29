import fetch from "node-fetch";

const response = await fetch("https://reqres.in/api/users/2");
const data = await response.json();

// console.log(data);

let body = {
  name: "morpheus",
  job: "leader",
  id: "731",
  createdAt: "2022-06-29T11:00:35.258Z",
};

const res = await fetch("https://reqres.in/api/users?page=2", {
  method: "post",
  body: JSON.stringify(body),
  headers: { "Content-Type": "application/json" },
});
const data2 = await res.json();

console.log(data2);
