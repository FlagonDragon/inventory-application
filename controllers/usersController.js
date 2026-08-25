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

  res.render("viewCategory", { champs: champs })

};

async function loadClass(req, res) {

  const { classId } = req.params;

  console.log(classId);

  const champs = await db.getChampsByClass(classId);

  console.log(champs);

  res.render("viewCategory", { champs: champs })

};

async function loadChamp(req, res) {

  const { champId } = req.params;

  console.log(champId);

  const champ = await db.getChampById(champId);

  console.log(champ);

  res.render("viewItem", { champ: champ })

};

async function loadCreateGet(req, res) {

  res.render("viewCreate");

};

async function loadCreatePost(req, res) {

  const { name, weight, org } = req.body;

  console.log(name, weight, org);
  
  res.redirect("/");

};

module.exports = {
  usersLog,
  loadHome,
  loadOrg,
  loadClass,
  loadChamp,
  loadCreateGet,
  loadCreatePost
};