import { MongoClient, Db, Collection/*, WithId*/ } from 'mongodb';
import { Item } from './item';

export function create() {
  const uri =
  "mongodb+srv://itay234:abc12345@cluster0.one6i.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  return client;
}


export async function connect(client: MongoClient) {
  await client.connect();
  const db: Db = create().db('bootcamp');
  const collection: Collection<Item> = db.collection('shop');
  return collection;
}

// @ts-ignore
export async function addItem(name: string, collection: Collection<Item>) {
  try {
    let res = await collection.updateOne({label: name}, {$inc: {amount: 1}})
    if (!res.modifiedCount)
    await collection.insertOne({label: name, amount: 1});
  } catch(e) {
    console.log(e);
  }
}


// @ts-ignore
export async function getItems(collection: Collection<Item>) {
  try {
    const items = await collection.find({}).toArray();
    return items;
  } catch(e) {
    console.log(e);
  }
}

// @ts-ignore
export async function clearItems(collection: Collection<Item>) {
  try {
    const items = await collection.drop();
    return items;
  } catch(e) {
    console.log(e);
  }
}
