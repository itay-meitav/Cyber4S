const { OPEN_READWRITE, OPEN_CREATE } = require("sqlite3");

const sqlite3 = require("sqlite3").verbose();

// Connect to DB
const db = new sqlite3.Database(
  "./tasks.db",
  sqlite3.OPEN_READWRITE | OPEN_CREATE,
  (err) => {
    //const db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log("Could not connect to database", err.message);
    } else {
      console.log("Connected to database");
    }
  }
);

module.exports.getCities = async function () {
  return new Promise((res, rej) => {
    db.serialize(async () => {
      sql = `SELECT DISTINCT city FROM agents`;
      db.all(sql, [], (err, data) => {
        if (err) return rej(err.message);
        let goodResults = data.map((x) => x.city);
        res(goodResults);
      });
    });
  });
};

module.exports.getAgentsByCity = async function (city) {
  return new Promise((res, rej) => {
    db.serialize(async () => {
      sql = `SELECT * FROM agents WHERE city = ? `;
      db.all(sql, [city], (err, data) => {
        if (err) return rej(err.message);
        res(data);
      });
    });
  });
};

module.exports.updateAgent = async function (id, agent) {
  return new Promise((res, rej) => {
    db.serialize(async () => {
      sql = `UPDATE agents SET ${Object.keys(agent).join(
        "= ?,"
      )} = ? WHERE id = ?`;
      db.all(sql, [...Object.values(agent), id], (err, data) => {
        if (err) return rej(err.message);
        return res(data);
      });
    });
  });
};

if (false)
  db.close((err) => {
    if (err) console.log("error while closing db", err);
    console.log("Connected to database is closed");
  });

// db.serialize(async () => {
//   // Query table
//   sql = `SELECT * from weather`;
//   db.all(sql, [], (err, rows) => {
//     if (err) return console.log(err.message);
//     rows.forEach((row) => {
//       console.log(row);
//     });
//   });
