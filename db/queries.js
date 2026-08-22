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

async function getChampsByOrg(orgId) {

  const { rows } = await pool.query(`SELECT champions.id, champions.name, organizations.fullName
FROM champions
INNER JOIN champions_organizations
ON champions.id = champions_organizations.champion_id
INNER JOIN organizations
ON champions_organizations.organization_id = organizations.id
WHERE organizations.id = '${orgId}';`);

  return rows;

};

async function getChampsByClass(classId) {

  const { rows } = await pool.query(`SELECT champions.id, champions.name, weightclasses.class
FROM champions
INNER JOIN champions_weightclasses
ON champions.id = champions_weightclasses.champion_id
INNER JOIN weightclasses
ON champions_weightclasses.weightclass_id = weightclasses.id
WHERE weightclasses.id = '${classId}';`);

  return rows;

};

async function getChampById(champId) {

  const { rows } = await pool.query(`SELECT champions.name, organizations.acronym, weightclasses.class
FROM champions
INNER JOIN champions_weightclasses
ON champions.id = champions_weightclasses.champion_id
INNER JOIN weightclasses
ON champions_weightclasses.weightclass_id = weightclasses.id
INNER JOIN champions_organizations
ON champions.id = champions_organizations.champion_id
INNER JOIN organizations
ON champions_organizations.organization_id = organizations.id
WHERE champions.id = '${champId}';`);

  return rows;

};



module.exports = { 
  getChamps, 
  getOrgs, 
  getClasses,
  getChampsByOrg,
  getChampsByClass,
  getChampById
};