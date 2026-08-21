const pool = require("./pool");

async function getChamps() {

  const { rows } = await pool.query("SELECT * FROM champions");

  return rows;

};

async function getOrgs() {

  const { rows } = await pool.query("SELECT * FROM organizations");

  return rows;

};

async function getClasses() {

  const { rows } = await pool.query("SELECT * FROM weightclasses");

  return rows;

};

module.exports = { getChamps, getOrgs, getClasses };