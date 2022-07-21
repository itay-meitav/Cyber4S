const { Pool } = require("pg");
const pool = new Pool(
  {
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://ixndselnctrctg:3c42e1e090622d47c33400b4a6376fddc99fd2305b5a20c960aa0a15b981024c@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/d9270ebqg09qck",
    ssl: {
      rejectUnauthorized: false,
    },
  },
  (err) => {
    if (err) {
      console.log("Could not connect to database", err.message);
    } else {
      console.log("Connected to database");
    }
  }
);

pool.connect();

function query(queryStr, queryParams = []) {
  return pool.query(queryStr, queryParams);
}

module.exports.getCities = async function () {
  return query("SELECT ARRAY_AGG(DISTINCT city) cities FROM agents").then(
    (res) => res.rows[0].cities
  );
};

module.exports.getAgentsByCity = async function (city) {
  return query(`SELECT * FROM agents WHERE city = $1`, [city]).then(
    (res) => res.rows
  );
};

module.exports.updateAgent = async function (id, agent) {
  let index = 1;
  return query(
    `UPDATE agents SET 
    ${Object.keys(agent)
      .map((k) => `"${k}" = $${index++}`)
      .join(", ")}
    WHERE id = $${index++}
    RETURNING *`,
    [...Object.values(agent), id]
  );
};

if (false)
  pool.end(() => {
    console.log("pool has ended");
  });
