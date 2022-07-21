import path from 'path';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { Collection } from 'mongodb';
import { create, connect, addItem, clearItems, getItems } from './mongo';
import { Item } from './item';

const app: express.Application = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), 'dist');
// @ts-ignore
let collection: Collection<Item>;
connect(create()).then(res => collection = res);

app.use(express.static(root));

// @ts-ignore
app.post('/add', async (req, res) => {
  try {
    const name = req.body.name;
    console.log("Add " + name);
    await addItem(name, collection)
    return res.status(201).json({ success: true, message: "Item added to cart successfully" });
  } catch {
    return res.status(400).json({ success: false, message: 'Error' });
  }
});


// @ts-ignore
app.get('/get', async (req, res) => {
  try {
    let item = await getItems(collection);
    console.log("Sending...");
    return res.json(item);
  } catch {
    return res.status(400).json([]);
  }
});

// @ts-ignore
app.get('/clear', async (req, res) => {
  try {
    await clearItems(collection);
    return res.status(201).json({ success: true, message: "Items removed successfully " });
  } catch {
    return res.status(400).json({ success: false, message: 'Error' });
  }
});

// @ts-ignore
app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
