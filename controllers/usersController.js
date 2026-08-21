const db = require("../db/queries");

async function usersLog(req, res) {

  const champs = await db.getChamps();

  console.log(champs);

  res.send('hullo')

};

async function loadHome(req, res) {

  const orgs = await db.getOrgs();

  console.log(orgs);

  res.render("viewHome", {title: 'Organizations', categories: orgs})

};



module.exports = {
  usersLog,
  loadHome,
};