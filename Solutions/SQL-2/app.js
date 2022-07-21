const { OPEN_READWRITE } = require('sqlite3');

const sqlite3 = require('sqlite3').verbose();

// Connect to DB
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
//const db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('Could not connect to database', err.message);
    } else {
        console.log('Connected to database');
    }
});

db.serialize(async () => {
    // Create table
    let sql = `CREATE TABLE weather (id INTEGER PRIMARY KEY, city, area, high, low, prediction_date)`;
    db.run(sql);

    // Insert to table
    sql = `INSERT INTO weather (city, area, high, low, prediction_date) VALUES (?,?,?,?,?)`;
    let statements = [
        ['Jerusalem', 'Center', 30, 19, '2022-07-18'],
        ['Tel Aviv', 'Center', 30, 25, '2022-07-18'],
        ['Haifa', 'North', 28, 22, '2022-07-18'],
        ['Beer Sheva', 'South', 33, 22, '2022-07-18'],
        ['Eilat', 'South', 38, 24, '2022-07-18'],
        ['Rehovot', 'North', 31, 24, '2022-07-18']
    ];
    const stmt = db.prepare(sql);
    for (let i = 0; i < statements.length; i++) {
        stmt.run(statements[i], (err) => {
            if (err) return console.log(err.message);
        });
    }
    stmt.finalize();

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
