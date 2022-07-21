import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
const { Client } = require('pg');

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), 'dist');

app.use(express.static(root));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});

app.get('/weather', (_request: any, response: any) => {
  client.query('SELECT * FROM weather', (err: Error, res: any) => {
    if (err) throw err;
    response.status(200).json(res.rows);
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});
