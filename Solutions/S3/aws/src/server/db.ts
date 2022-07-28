import { Client } from 'pg';

//const DATABASE_URL = 'Put your SQL connect url here';
const DATABASE_URL = process.env.DATABASE_URL;

export const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const initDb = async () => {
  await client.connect();
  await client.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL)');
  await client.query('CREATE TABLE IF NOT EXISTS files(filename TEXT NOT NULL, id TEXT NOT NULL, username TEXT NOT NULL)');
}
initDb();

export async function uploadToDB(filename, id, username) {
  await client.query('INSERT INTO files(filename, id, username) VALUES($1, $2, $3)', [
    filename,
    id,
    username,
  ]);
  return true;
}

export async function loginDB(username) {
  const result = await client.query('SELECT password from users WHERE username = $1', [username]);
  return result;
}

export async function signUpDB(username, password) {
  await client.query('INSERT INTO users(username, password) VALUES($1, $2)', [
    username,
    password,
  ]);
  return true;
}

export async function deleteAllFromDB(username, ids: string[]) {// (1,2,3,4,'5')
  const result = await client.query(`DELETE from files WHERE username = $1 AND id in (${ids.map(x => `'${x}'`).join(', ')})`, [username]);
  return result;
}

export async function deleteOneFromDB(username, id) {
  const result = await client.query('DELETE from files WHERE username = $1 AND id = $2', [username, id]);
  return result;
}


export async function getImagesFromDB(username) {
  const result = await client.query('SELECT id from files WHERE username = $1', [username]);
  return result;
}

export async function getImgFromDB(id) {
  const result = await client.query('SELECT id from files WHERE id = $1', [id]);
  return result;
}

export async function getImgByUserFromDB(username, id) {
  const result = await client.query('SELECT id from files WHERE username = $1 AND id = $2', [username, id]);
  return result;
}


