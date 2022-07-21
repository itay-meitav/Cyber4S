const getCities = document.getElementById("get-cities");
const searchByCity = document.getElementById("search-by-city");
const cityInput = document.getElementById("city-input");
const output = document.getElementById("output");
const updateBtn = document.getElementById("updateBtn");
let firstNameForm = document.getElementById("first-name");
let lastNameForm = document.getElementById("last-name");
let dateForm = document.getElementById("date");
let licenseNumberForm = document.getElementById("license-number");
let cityForm = document.getElementById("city");
let statusForm = document.getElementById("status");
let idForm = document.getElementById("agent-id");

getCities.addEventListener("click", async (e) => {
  let response = await fetch("/cities");
  let data = await response.json();
  let results = data.results.filter((x) => x != "undefined" && x);
  let row1 = results.slice(0, Math.ceil(results.length / 2));
  let row2 = results.slice(Math.ceil(results.length / 2));
  let max = results.reduce(
    (pre, curr) => (curr.length > pre ? curr.length : pre),
    0
  );
  results = row1.map((x, i) => join(x, row2[i], max + 4));
  output.value = results.join("\n").replaceAll("~", '"');
});

function join(str1, str2 = "", charsPerRow) {
  str1 += " ".repeat(charsPerRow - str1.length);
  return str1 + str2;
}

searchByCity.addEventListener("click", async (e) => {
  let city = cityInput.value;
  let res = await fetch(`/agents?city=${encodeURIComponent(city)}`);
  let data = await res.json();
  // output.value = JSON.stringify(data.results, undefined, 3);

  let agents = document.getElementById("agents");
  agents.innerHTML = "";
  data.results.forEach((x) => {
    agents.appendChild(createAgent(x));
  });
});

function createAgent(agent) {
  let agentEl = document.createElement("div");
  agentEl.classList.add("agent");

  let firstName = document.createElement("div");
  firstName.classList.add("first-name");
  firstName.innerHTML = `
  <span>first name:  </span>
  <span class="value">${agent.firstName}</span>
  `;

  let lastName = document.createElement("div");
  lastName.classList.add("last-name");
  lastName.innerHTML = `
<span>last name:  </span>
<span class="value">${agent.lastName}</span>
`;

  let date = document.createElement("div");
  date.classList.add("date");
  date.innerHTML = `
<span>date:  </span>
<span class="value">${agent.dateReceived.split("T")[0]}</span>
`;

  let licenseNumber = document.createElement("div");
  licenseNumber.classList.add("license-number");
  licenseNumber.innerHTML = `
  <span>license number:  </span>
  <span class="value">${agent.licenseNumber}</span>
  `;

  let city = document.createElement("div");
  city.classList.add("city");
  city.innerHTML = `
  <span>city:  </span>
  <span class="value">${agent.city}</span>
  `;

  let status = document.createElement("div");
  status.classList.add("status");
  status.innerHTML = `
  <span>status:  </span>
  <span class="value">${agent.status}</span>
  `;

  let edit = document.createElement("button");
  edit.addEventListener("click", () => {
    firstNameForm.value = agent.firstName;
    lastNameForm.value = agent.lastName;
    dateForm.value = agent.dateReceived.split("T")[0];
    licenseNumberForm.value = agent.licenseNumber;
    cityForm.value = agent.city;
    statusForm.value = agent.status;
    idForm.value = agent._id;
    firstNameForm.focus();
  });
  edit.innerText = "edit";
  edit.classList.add("edit");

  agentEl.appendChild(firstName);
  agentEl.appendChild(lastName);
  agentEl.appendChild(date);
  agentEl.appendChild(licenseNumber);
  agentEl.appendChild(city);
  agentEl.appendChild(status);
  agentEl.appendChild(edit);

  return agentEl;
}

updateBtn.addEventListener("click", async () => {
  let body = {
    firstName: firstNameForm.value,
    lastName: lastNameForm.value,
    dateReceived: dateForm.value,
    licenseNumber: licenseNumberForm.value,
    city: cityForm.value,
    status: statusForm.value,
  };

  let res = await fetch(`/agent/${idForm.value}`, {
    method: "put",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await res.json();

  output.value = JSON.stringify(data, null, 3);
});
