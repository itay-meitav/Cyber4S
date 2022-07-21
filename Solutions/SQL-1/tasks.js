const { OPEN_READWRITE } = require("sqlite3");
const sqlite3 = require("sqlite3").verbose();

// Connect to DB
const db = new sqlite3.Database("./tasks.db", sqlite3.OPEN_READWRITE, (err) => {
  //const db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log("Could not connect to database", err.message);
  } else {
    console.log("Connected to database");
  }
});

db.serialize(async () => {
  // Create table
  //   let sql = `CREATE TABLE Albums (id INTEGER PRIMARY KEY, name, artist_id, foreign key('artist_id') references artists ('id'))`;
  //   let sql2 = `CREATE TABLE Artists (id INTEGER PRIMARY KEY, name)`;
  //   let sql3 = `CREATE TABLE Songs (id INTEGER PRIMARY KEY, track, title, album_id,  foreign key('album_id') references albums ('id'))`;
  //   db.run(sql);
  //   db.run(sql2);
  //   db.run(sql3);
  //   db.close();
  //   console.log("Connection to database is closed");
  //   // Insert to table
  //   sql = `INSERT INTO weather (city, area, high, low, prediction_date) VALUES (?,?,?,?,?)`;
  //   let statements = [
  //     ["Jerusalem", "Center", 30, 19, "2022-07-18"],
  //     ["Tel Aviv", "Center", 30, 25, "2022-07-18"],
  //     ["Haifa", "North", 28, 22, "2022-07-18"],
  //     ["Beer Sheva", "South", 33, 22, "2022-07-18"],
  //     ["Eilat", "South", 38, 24, "2022-07-18"],
  //     ["Rehovot", "North", 31, 24, "2022-07-18"],
  //   ];
  //   const stmt = db.prepare(sql);
  //   for (let i = 0; i < statements.length; i++) {
  //     stmt.run(statements[i], (err) => {
  //       if (err) return console.log(err.message);
  //     });
  //   }
  //   stmt.finalize();
  // task2
  //   sql = `SELECT * from songs where album_id = 252`;
  //   db.all(sql, [], (err, data) => {
  //     if (err) return console.log(err.message);
  //     console.log(data);
  //   });
  //   // Drop table
  //   sql = `DROP TABLE weather`;
  //   db.run(sql);
  // task3
  // sql = `SELECT songs.*, albums.name as album_name from songs
  // inner join albums
  // on albums.id = songs.album_id
  // where albums.name LIKE 'forbidden'
  // `;
  // db.all(sql, [], (err, data) => {
  //   if (err) return console.log(err.message);
  //   console.log(data);
  // });
  // task4
  // sql = `SELECT track, albums.name from songs
  //  inner join albums
  //  on albums.id = songs.album_id
  //  where albums.name LIKE 'forbidden'
  //  ORDER BY track
  //  `;
  // db.all(sql, [], (err, data) => {
  //   if (err) return console.log(err.message);
  //   console.log(data);
  // });
  // task5
  // sql = `SELECT songs.*, artists.name as artist_name from songs
  // left join albums on albums.id = album_id
  // left join artists on artists.id = artist_id
  // where artists.name = 'Deep Purple'`;
  // db.all(sql, [], (err, data) => {
  //   if (err) return console.log(err.message);
  //   console.log(data);
  // });
  // task6
  // sql = `update artists set name = 'Mehitabel_MODIFIED' where name = 'Mehitabel';`;
  // db.all(sql, [], (err, data) => {
  //   if (err) return console.log(err.message);
  //   console.log(data);
  // });
  // task7
  // sql = `select * from artists where name like '%Mehitabel%'`;
  // db.all(sql, [], (err, data) => {
  //   if (err) return console.log(err.message);
  //   console.log(data);
  // });
  // task8
  // sql = `select title from songs
  //   inner join albums on albums.id = songs.album_id
  //   inner join artists on artists.id = albums.artist_id
  //   where artists.name = 'Aerosmith'
  //   ORDER BY songs.title ASC`;
  // db.all(sql, [], (err, data) => {
  //   if (err) return console.log(err.message);
  //   console.log(data);
  // });
  // task9
  // sql = `select count(*) as song_count from songs
  //  inner join albums on albums.id = songs.album_id
  //  inner join artists on artists.id = albums.artist_id
  //  where artists.name = 'Aerosmith'`;
  // db.all(sql, [], (err, data) => {
  //   if (err) return console.log(err.message);
  //   console.log(data);
  // });
  // task10
  // sql = `SELECT distinct title from songs
  //   inner join albums on albums.id = songs.album_id
  //   inner join artists on artists.id = albums.artist_id
  //   where artists.name = 'Aerosmith'
  //   order by title`;
  // db.all(sql, [], (err, data) => {
  //   if (err) return console.log(err.message);
  //   console.log(data);
  // });
  // task11
  // sql = `select count(distinct title) as song_count from songs
  //   inner join albums on albums.id = songs.album_id
  //   inner join artists on artists.id = albums.artist_id
  //   where artists.name = 'Aerosmith'
  //   order by title`;
  // db.all(sql, [], (err, data) => {
  //   if (err) return console.log(err.message);
  //   console.log(data);
  // });
  // task12
  // sql = `select count(distinct albums.name) as albums_count from albums
  //   inner join artists on artists.id = albums.artist_id
  //   where artists.name = 'Aerosmith'
  //   order by albums.name`;
  // db.all(sql, [], (err, data) => {
  //   if (err) return console.log(err.message);
  //   console.log(data);
  // });
});
