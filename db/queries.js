const pool = require("./pool");

async function getChamps() {

  const { rows } = await pool.query("SELECT * FROM champions");

  return rows;

};

module.exports = { getChamps };