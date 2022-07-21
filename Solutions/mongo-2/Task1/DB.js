import { MongoClient } from "mongodb";
const local = "mongodb://localhost:27017/?authMechanism=DEFAULT";
const client = new MongoClient(local);

// async function main() {
//   await client.connect();
//   console.log("Connected successfully to server");
//   const db = client.db("mongo_practice");
//   const collection = db.collection("students");
//   await collection.insertMany([
//     {
//       name: "Ido",
//       surName: "Arbel",
//       birth: new Date("26 / 01 / 1998"),
//       phone: "0526305421",
//       gender: "Male",
//       courses: ["Java", "Math"],
//     },
//     {
//       name: "Chen",
//       surName: "Halevi",
//       birth: new Date("11 / 03 / 1997"),
//       phone: "0526323421",
//       gender: "Male",
//       courses: ["Math", "Law"],
//     },

//     {
//       name: "Koren",
//       surName: "Gan-or",
//       birth: new Date("19 / 01 / 1997"),
//       phone: "0526305321",
//       gender: "Male",
//       courses: ["JavaScript", "Finance", "Law"],
//     },

//     {
//       name: "Oryan",
//       surName: "Levy",
//       birth: new Date("02 / 04 / 1998"),
//       phone: "0542305321",
//       gender: "Male",
//       courses: ["JavaScript", "Law"],
//     },
//     {
//       name: "Yahalom",
//       surName: "Cohen",
//       birth: new Date("03 / 11 / 1993"),
//       phone: "0542305392",
//       gender: "Female",
//       courses: ["Java", "Law"],
//     },
//   ]);
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

async function find() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("mongo_practice");
    const collection = db.collection("students");
    let findAll = await collection.find({}).toArray();
    let findIdo = await collection.findOne({ name: "Ido" });
    let findLaw = await collection.find({ courses: "Law " }).toArray();
    let findJaveFemale = await collection
      .find({ courses: "Java", gender: "Female" })
      .toArray();
    let birthDate = await collection
      .find({ birth: { $gt: new Date("05/05/1998") } })
      .toArray();
    let phone = await collection.find({ phone: /^054/ }).toArray();
    console.log(birthDate);
  } finally {
    await client.close();
  }
}
// find()
//   .catch(console.dir)

async function update() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("mongo_practice");
    const collection = db.collection("students");
    let updateYahalom = await collection.updateOne(
      { name: "Yahalom" },
      { $push: { courses: ["JavaScript"] } }
    );
    let updateKoren = await collection.updateOne(
      { name: "Koren" },
      { $set: { birth: new Date("02/12/1998") } }
    );
    console.log("Updated documents =>", collection);
  } finally {
    await client.close();
  }
}
// update()
//   .catch(console.dir)

async function textSearch() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("mongo_practice");
    const collection = db.collection("students");
    let searchName = await collection.find({ name: /.*o.*/i }).toArray();
    let searchSurName = await students.find({ surName: /.*(h|y).*/ }).toArray();
    console.log(collection);
  } finally {
    await client.close();
  }
}
// textSearch().catch(console.dir);

async function remove() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("mongo_practice");
    const collection = db.collection("students");
    let deleteIdo = await collection.deleteMany({ name: "ido" });
    let deleteDate = await collection.deleteMany({
      birth: new Date("02/04/1998"),
    });
    console.log("Deleted documents =>", collection);
  } finally {
    await client.close();
  }
}
// remove()
//   .catch(console.dir)

//////////////////////////////Relationships/////////////////////////
