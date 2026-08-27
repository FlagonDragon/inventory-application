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

  res.render("viewCategory", { champs: champs, orgId: orgId })

};

async function loadClass(req, res) {

  const { classId } = req.params;

  console.log(classId);

  const champs = await db.getChampsByClass(classId);

  console.log(champs);

  res.render("viewCategory", { champs: champs, classId: classId })

};

async function loadChamp(req, res) {

  const { champId } = req.params;

  console.log(champId);

  const champ = await db.getChampById(champId);

  console.log(champ);

  res.render("viewItem", { champ: champ, champId: champId })

};

async function loadCreateGet(req, res) {

  const orgs = await db.getOrgs();
  const weights = await db.getClasses();

  res.render("viewCreate", {orgs: orgs, weights: weights});

};

async function loadCreatePost(req, res) {

  const { type, name, weight } = req.body;

  if (!type) {

    await db.createChamp(name);

    await db.addToWeight(name, weight);

    console.log(req.body);
  
    let orgsArray = [];

    for (let key in req.body) {
    
      if (Number.isInteger(Number(key))) {
        orgsArray.push(Number(key));
      }

    }

    console.log(orgsArray);

    await db.addToOrgs(name, orgsArray);

  } else {

    await db.addCategory(type, name);

  }
  
  res.redirect("/");

};

async function loadEditGet(req, res) {

  const { type, id } = req.query;

  if( type == 'champion') {

  console.log('userscontroller editGet');
  // console.log(name, type, id, org, weight);

    const orgs = await db.getOrgs();
    const weights = await db.getClasses();
    let orgsArray = [];

    res.render("viewEditItem", {type: type, id: id, orgs: orgs, weights: weights});
    

  } else {

    res.render("viewEditCategory", {type: type, id: id});

  }


};

async function loadEditPost(req, res) {

  const { name, type, id, weight} = req.body;

  console.log(req.body);
  
  let orgsArray = [];

  for (let key in req.body) {
  
    if (Number.isInteger(Number(key))) {
      orgsArray.push(Number(key));
    }

  }

  console.log(orgsArray);
  
  await db.editCategory(type, id, name, weight, orgsArray);

  res.redirect("/");

};

module.exports = {
  usersLog,
  loadHome,
  loadOrg,
  loadClass,
  loadChamp,
  loadCreateGet,
  loadCreatePost,
  loadEditGet,
  loadEditPost
};