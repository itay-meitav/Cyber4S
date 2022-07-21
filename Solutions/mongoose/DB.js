const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/agency?authMechanism=DEFAULT");
const AgentSchema = new mongoose.Schema({
  licenseNumber: Number,
  dateReceived: { type: Date, default: Date.now },
  firstName: String,
  lastName: String,
  city: String,
  status: String,
});
const AgentModel = mongoose.model("agents", AgentSchema);

// const csvFilePath = "./agents.csv";
// const csv = require("csvtojson");
// let c = 0;
// csv()
//   .fromFile(csvFilePath)
//   .then(async (jsonObj) => {
//     let agents = jsonObj.map((x) => {
//       delete x.field7;
//       if (x.dateReceived) {
//         let date = x.dateReceived.split("/");
//         let newDate = new Date(`${date[2]}/${date[1]}/${date[0]}`);
//         x.dateReceived = newDate;
//         // console.log("new", newDate);
//         // console.log("old:", date.join("/"));
//       } else {
//         c++;
//         x.dateReceived = new Date();
//       }
//       return x;
//     });
//     await AgentModel.insertMany(agents);
//     mongoose.connection.close();
//     console.log("count: ", c);
//   });

module.exports.getCities = async function () {
  let cities = await AgentModel.find({}).distinct("city");
  return cities;
};

module.exports.getAgentsByCity = async function (city) {
  let agents = await AgentModel.find({ city });
  return agents;
};

module.exports.updateAgent = async function (id, agent) {
  let response = await AgentModel.findByIdAndUpdate(id, {
    $set: {
      ...agent,
    },
  });
  return response;
};
