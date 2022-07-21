# SQL with JavaScript

Follow these instructions:
1) Create a Javascript file `app.js`, and add the following code to connect to the DB:
   ```js
   const { OPEN_READWRITE } = require('sqlite3');

   const sqlite3 = require('sqlite3').verbose();

   // Connect to DB
   const db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
     if (err) {
       console.log('Could not connect to database', err.message);
     } else {
       console.log('Connected to database');
     }
   });
   ```

2) Add data to DB:
   ```js
   db.serialize(async () => {
     // Create table
     let sql = `CREATE TABLE weather (id INTEGER PRIMARY KEY, city, area, high, low, prediction_date)`;
     db.run(sql);
     // Insert to table
     sql = `INSERT INTO weather (city, area, high, low, prediction_date) VALUES (?,?,?,?,?)`;
     db.run(
       sql,
       ['Jerusalem', 'Center', 30, 19, '2022-07-18'],
       (err) => {
         if (err) return console.log(err.message);
       });
     // Query table
     sql = `SELECT * from weather`;
     db.all(sql, [], (err, rows) => {
       if (err) return console.log(err.message);
       rows.forEach(row => {
         console.log(row);
       })
     });
     // Drop table
     sql = `DROP TABLE weather`;
     db.run(sql);
   });
   db.close();
   ```
   
-----------------------------------------------
That's it!
