import { MongoClient } from "mongodb";
const local = "mongodb://localhost:27017/?authMechanism=DEFAULT";
const client = new MongoClient(local);

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("mongo_practice");
  const collection = db.collection("users");
  await collection.insertMany([
    { username: "GoodGuyGreg", first_name: "Good Guy", last_name: "Greg" },
    { username: "ScumbagSteve", first_name: "Scumbag", last_name: "Steve" },
  ]);
  const collection2 = db.collection("posts");
  const output = await collection2.insertMany([
    {
      username: "GoodGuyGreg",
      title: "Passes out at party",
      body: "Wakes up early and cleans house",
    },
    {
      username: "GoodGuyGreg",
      title: "Steals your identity",
      body: "Raises your credit score",
    },
    {
      username: "GoodGuyGreg",
      title: "Reports a bug in your code",
      body: "Sends you a Pull Request",
    },
    { username: "ScumbagSteve", title: "Borrows something", body: "Sells it" },
    { username: "ScumbagSteve", title: "Borrows everything", body: "The end" },
    {
      username: "ScumbagSteve",
      title: "Forks your repo on github",
      body: "Sets to private",
    },
  ]);

  const postsIDs = output.insertedIds;

  const collection3 = db.collection("comments");
  await collection3.insertMany([
    {
      username: "GoodGuyGreg",
      comment: "Hope you got a good deal!",
      post: postsIDs[3],
    },
    {
      username: "GoodGuyGreg",
      comment: "What's mine is yours!",
      post: postsIDs[4],
    },
    {
      username: "GoodGuyGreg",
      comment: "Don't violate the licensing agreement!",
      post: postsIDs[5],
    },
    {
      username: "ScumbagSteve",
      comment: "It still isn't clean",
      post: postsIDs[0],
    },
    {
      username: "ScumbagSteve",
      comment: "Denied your PR cause I found a hack",
      post: postsIDs[2],
    },
  ]);
}

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

async function findRelationshipsUsers() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("mongo_practice");
    const collection = db.collection("users");
    let findAllUsers = await collection.find({}).toArray();
  } finally {
    await client.close();
  }
}
// findRelationshipsUsers().catch(console.dir);

async function findRelationshipsPosts() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("mongo_practice");
    const collection = db.collection("posts");
    let findAllPosts = await collection.findOne({}).toArray();
    let findPostsGoodGuyGreg = await collection
      .find({ username: "GoodGuyGreg" })
      .toArray();
    let findPostsScumbagSteve = await collection
      .find({ username: "ScumbagSteve" })
      .toArray();
    console.log(findPostsGoodGuyGreg);
  } finally {
    await client.close();
  }
}
// findRelationshipsPosts().catch(console.dir);

async function findRelationshipsComments() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("mongo_practice");
    const collection = db.collection("comments");

    let findAllComments = await collection.find({}).toArray();
    let findCommentsGoodGuyGreg = await collection
      .find({ username: "GoodGuyGreg" })
      .toArray();
    let findCommentsScumbagSteve = await collection
      .find({ username: "ScumbagSteve" })
      .toArray();
    let findCommentsPostReports = await collection
      .aggregate([
        {
          $lookup: {
            from: "posts",
            localField: "post",
            foreignField: "_id",
            as: "posts",
          },
        },
        { $unwind: "$posts" },
        {
          $match: {
            "posts.title": "Reports a bug in your code",
          },
        },
        {
          $project: {
            username: 1,
            comment: 1,
            post: 1,
            joined: "$posts",
          },
        },
      ])
      .toArray();
    console.log(findCommentsPostReports);
  } finally {
    await client.close();
  }
}
findRelationshipsComments().catch(console.dir);
