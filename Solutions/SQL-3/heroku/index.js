const express = require("express");
const { getCities, getAgentsByCity, updateAgent } = require("./DB");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/cities", async (req, res) => {
  try {
    let cities = await getCities();
    res.json({ success: true, results: cities });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "an error occurred while fetching the data, try again later",
    });
  }
});

app.get("/agents", async (req, res) => {
  try {
    let city = req.query.city || "";
    let agents = await getAgentsByCity(city);
    res.json({ success: true, results: agents });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "an error occurred while fetching the data, try again later",
    });
  }
});

app.put("/agent/:id", async (req, res) => {
  try {
    let agent = {};
    let body = req.body;
    body.licenseNumber ? (agent.licenseNumber = body.licenseNumber) : null;
    body.date ? (agent.date = body.date) : null;
    body.firstName ? (agent.firstName = body.firstName) : null;
    body.lastName ? (agent.lastName = body.lastName) : null;
    body.city ? (agent.city = body.city) : null;
    body.status ? (agent.status = body.status) : null;

    let response = await updateAgent(req.params.id, agent);
    res.json(response);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "an error occurred while updating, try again later",
    });
  }
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
