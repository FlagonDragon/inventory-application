const pool = require("./pool");
const myFuncs = require("./functions");

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

async function createChamp(name) {

  await pool.query(`INSERT INTO champions (name)
VALUES 
  ('${name}');
;`);
  
};

async function addToOrg(name, org) {

  const champion_id = await pool.query(`SELECT * FROM champions WHERE name = '${name}'`);

  const organization_id = await pool.query(`SELECT * FROM organizations WHERE acronym = '${org}'`);

console.log(name, org);
console.log(champion_id.rows[0].id);
console.log(organization_id.rows[0].id);

  await pool.query(`INSERT INTO champions_organizations (champion_id, organization_id) 
VALUES
  (${champion_id.rows[0].id}, ${organization_id.rows[0].id});`);
  
};

async function addToOrgs(name, orgsArray) {

  const champion_id = await pool.query(`SELECT * FROM champions WHERE name = '${name}'`);

  // const organization_id = await pool.query(`SELECT * FROM organizations WHERE acronym = '${org}'`);

  // console.log(name, org);
  // console.log(champion_id.rows[0].id);
  // console.log(organization_id.rows[0].id);

  for (let orgId of orgsArray) {

    await pool.query(`INSERT INTO champions_organizations (champion_id, organization_id) 
VALUES
(${champion_id.rows[0].id}, ${orgId});`);

  }
  
};

async function addToWeight(name, weight) {

  const champion_id = await pool.query(`SELECT * FROM champions WHERE name = '${name}'`);

  const weightclass_id = await pool.query(`SELECT * FROM weightclasses WHERE class = '${weight}'`);

console.log(name, weight);
console.log(champion_id.rows[0].id);
console.log(weightclass_id.rows[0].id);

  await pool.query(`INSERT INTO champions_weightclasses (champion_id, weightclass_id) 

VALUES
  (${champion_id.rows[0].id}, ${weightclass_id.rows[0].id});`);
  
};

async function addCategory(type, name) {

  if (type == 'organization') {

    await pool.query(`INSERT INTO organizations (fullName, acronym) 
VALUES
  ('${name}', '${myFuncs.makeAcro(name)}')`);
    
  }

  if (type == 'weightclass') {

    await pool.query(`INSERT INTO weightclasses (class) 
VALUES
  ('${name}')`);
  
  }

  console.log(name);
  
};

async function editCategory(type, id, name, weight, orgsArray) {

  if (type == 'champion') {

    console.log('we are inside champion query now');
    console.log('type: '+type);
    console.log('id: '+id);
    console.log('name: '+name);
    console.log('weight: '+weight);
    console.log('org: '+orgsArray);

    // Update Name

    await pool.query(`UPDATE champions
SET name = '${name}'
WHERE id = ${id};`);

    // Update Weight Class

    const weightclass_id = await pool.query(`SELECT * FROM weightclasses WHERE class = '${weight}'`);

    await pool.query(`UPDATE champions_weightclasses
SET weightclass_id = '${weightclass_id.rows[0].id}'
WHERE champion_id = ${id};`);

    // Update Organizations using array of ids

      await pool.query(`DELETE FROM champions_organizations WHERE champion_id = ${id};`);

    for (let orgId of orgsArray) {

      await pool.query(`INSERT INTO champions_organizations (champion_id, organization_id) 
VALUES
  (${id}, ${orgId});`);

    }
    
  }

  if (type == 'organization') {

    console.log('we are inside query now');
    console.log('type: '+type);
    console.log('id: '+id);
    console.log('name: '+name);
    console.log('acronym: '+myFuncs.makeAcro(name));

    await pool.query(`UPDATE organizations
SET fullname = '${name}', acronym = '${myFuncs.makeAcro(name)}'
WHERE id = ${id};`);
    
  }

  if (type == 'weightclass') {

    console.log('we are inside query now');
    console.log('type: '+type);
    console.log('id: '+id);
    console.log('name: '+name);

    await pool.query(`UPDATE weightclasses
SET class = '${name}'
WHERE id = ${id};`)
  
  }
  
};


module.exports = { 
  getChamps, 
  getOrgs, 
  getClasses,
  getChampsByOrg,
  getChampsByClass,
  getChampById,
  createChamp, 
  addToOrg,
  addToOrgs,
  addToWeight,
  addCategory,
  editCategory
};