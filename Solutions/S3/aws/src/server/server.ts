if (process.env.MODE_ENV != 'production') {
  require('dotenv').config()
}

import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import { json, raw } from 'body-parser';
import { randstr64 } from 'rndmjs';
import {
  uploadToDB,
  loginDB,
  signUpDB,
  deleteAllFromDB,
  deleteOneFromDB,
  getImagesFromDB,
  getImgFromDB,
  getImgByUserFromDB
} from './db';
import {
  uploadToS3,
  deleteAllFromS3,
  deleteOneFromS3,
  getImgFromS3,
  getSizeFromS3,
} from './storage';


const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), 'dist');
app.use(raw({ type: 'image/jpeg', limit: '5mb' }));
app.use(raw({ type: 'image/png', limit: '5mb' }));
app.use(raw({ type: 'image/gif', limit: '5mb' }));
app.use(raw({ type: 'image/x-icon', limit: '5mb' }));
app.use(raw({ type: 'image/webp', limit: '5mb' }));

app.use(express.static(root));

// Upload a file
app.post('/upload', async (req, res) => {
  const id: string = 'itay-meitav-' + randstr64(20);
  await uploadToDB(req.query.filename, id, req.query.username);
  await uploadToS3(req.body, id, req.headers['content-type']);
  res.send({ success: true });
});

// Log-in
app.post('/login', async (req, res) => {
  const username: string = req.body.username;
  const result = await loginDB(username);
  if (result.rowCount > 0) {
    const password = result.rows[0].password;
    if (req.body.password !== password) {
      // Password is incorrect
      res.send({ error: 'password' });
    } else {
      res.send({ success: true });
    }
  } else {
    // User not found
    res.send({ error: 'username' });
  }
});

// Create account
app.post('/signup', async (req, res) => {
  await signUpDB(req.body.username, req.body.password)
  res.send({ success: true });
});

// Delete all images
app.post('/delete', async (req, res) => {
  const username: string = req.body.username;
  const result = await getImagesFromDB(username);
  try {
    let keys = await deleteAllFromS3(result);
    await deleteAllFromDB(username, keys)
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.send({ success: true });
  }
});

// Delete one image
app.post('/delete/:id', async (req, res) => {
  const username: string = req.body.username;
  const fileId: string = req.params.id;
  const result = await getImgByUserFromDB(username, fileId);
  try {
    await deleteOneFromS3(result);
    await deleteOneFromDB(username, fileId);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.send({ success: true });
  }
});

// Get image list
app.get('/images', async (req, res) => {
  const username: string = req.query.username as string;
  const result = await getImagesFromDB(username);
  if (result.rowCount > 0) {
    const ids: string[] = result.rows.map(row => row.id);
    res.send({ images: ids });
  } else {
    res.send({ images: [] });
  }
});

// Get an image binary by url
app.get('/image/:id', async (req, res) => {
  // if (req.url.length > 7) {
  const id: string = req.params.id;
  const result = await getImgFromDB(id);
  try {
    const data = await getImgFromS3(result, id)
    res.contentType(data.ContentType);
    res.end(data.Body, 'binary');
  } catch (err) {
    // Image not found
    console.error(err);
    const imagePath: string = path.join(process.cwd(), 'dist', 'wakka.png');
    res.sendFile(imagePath);
  }
});

app.get('/image/detailes/:id', async (req, res) => {
  const id: string = req.params.id;
  const result = await getImgFromDB(id);
  try {
    const data = await getSizeFromS3(result, id);
    res.json({ name: result.rows[0].filename, length: data.ContentLength });
  } catch (err) {
    // Image not found
    console.error(err);
    res.json({ name: "Name Not Found!", length: 0 });
  }
});

// Routing
app.get('/upload', (_req, res) => {
  res.sendFile(path.join(root, 'upload.html'));
});
app.get('/login', (_req, res) => {
  res.sendFile(path.join(root, 'login.html'));
});
app.get('/signup', (_req, res) => {
  res.sendFile(path.join(root, 'signup.html'));
});
app.get('*', (_req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
