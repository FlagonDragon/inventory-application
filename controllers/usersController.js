const db = require("../db/queries");

async function usersLog(req, res) {

  const champs = await db.getChamps();

  console.log(champs);

  res.send('hullo')

};

async function loadHome(req, res) {

  const orgs = await db.getOrgs();
  const classes = await db.getClasses();
  // const champs = await db.getChamps();

  // console.log(orgs);
  // console.log(classes);
  // console.log(champs);

  res.render("viewHome", {title1: 'Organizations', categories1: orgs, title2: 'Weight Classes', categories2: classes })

};

async function loadOrg(req, res) {

  const { orgId } = req.params;

  console.log(orgId);

  const champs = await db.getChampsByOrg(orgId);

  console.log(champs);

  res.send(`Organization ID: ${orgId}`);

};

async function loadClass(req, res) {

  const { classId } = req.params;

  console.log(classId);

  const champs = await db.getChampsByClass(classId);

  console.log(champs);

  res.send(`Weight Class ID: ${classId}`);

};



module.exports = {
  usersLog,
  loadHome,
  loadOrg,
  loadClass
};