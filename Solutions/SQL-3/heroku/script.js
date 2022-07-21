const { Client, Pool } = require("pg");

// const client = new Client({
// 	connectionString: "",
// 	ssl: {
// 		rejectUnauthorized: false,
// 	},
// });

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://ixndselnctrctg:3c42e1e090622d47c33400b4a6376fddc99fd2305b5a20c960aa0a15b981024c@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/d9270ebqg09qck",
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect();

// client.connect();

async function query(queryString = "", queryParams = []) {
  return pool.query(queryString, queryParams);
}

module.exports.getCities = getCities;
async function getCities() {
  let res = await query(`SELECT ARRAY_AGG(DISTINCT city) cities FROM agents`);
  return res.rows[0].cities;
}

module.exports.getAgentsByCity = getAgentsByCity;
async function getAgentsByCity(city) {
  return query("SELECT * FROM agents WHERE city = $1", [city]).then((res) => {
    console.log(res.rows[0]);
    return res.rows;
  });
}

module.exports.updateAgent = updateAgent;
async function updateAgent(id, agent) {
  let index = 1;
  return query(
    `UPDATE agents
		SET ${Object.keys(agent)
      .map((k) => `"${k}" = $${index++}`)
      .join(", ")}  WHERE id = $${index++}
			RETURNING *`,
    [...Object.values(agent), id]
  ).then((res) => {
    console.log(res.rows[0]);
    return { updateCount: res.rowCount, data: res.rows };
  });
}

async function initDB() {
  await query("DROP TABLE IF EXISTS agents");
  await query(`
		CREATE TABLE agents (
			id SERIAL PRIMARY KEY,
			"licenseNumber" VARCHAR(25) DEFAULT NULL,
			"date" DATE DEFAULT CURRENT_TIMESTAMP,
			"firstName" VARCHAR(25) DEFAULT NULL,
			"lastName" VARCHAR(25) DEFAULT NULL,
			city VARCHAR(25) DEFAULT NULL,
			status VARCHAR(225) DEFAULT NULL
		)
	`);
  const csvjson = require("csvtojson");
  let data = await csvjson().fromFile("./agents.csv");
  data.splice(8000, 9999999);
  data.map(
    (agent) =>
      (agent.date = new Date(
        agent.date.split("/").reverse().join("/") || new Date().toISOString()
      ))
  );
  while (data.length) {
    let curr = data.splice(0, 200);
    console.log("left:", data.length);
    await insertIntoAgents(
      Object.keys(curr[0]).slice(0, 6),
      curr.map((x) => Object.values(x).slice(0, 6))
    ).then((res) => console.log("inserted: ", res.rowCount));
  }
  pool.end();
}

async function insertIntoAgents(fields = [], params = [[]]) {
  let queryStr = `INSERT INTO agents
	(${fields.map((f) => `"${f}"`).join(",")}) 
		VALUES
		`;
  let index = 1;
  let values =
    "(" +
    params.map((x) => x.map((_, i) => "$" + index++).join(",")).join("),(") +
    ")";
  queryStr += values;
  return query(queryStr, params.flat());
}

// initDB();
