const db = require("../db/queries");

async function loadHome(req, res) {

  const orgs = await db.getOrgs();
  const classes = await db.getClasses();

  res.render("viewHome", {title1: 'Organizations', categories1: orgs, title2: 'Weight Classes', categories2: classes })

};

async function loadOrg(req, res) {

  const { orgId } = req.params;

  const champs = await db.getChampsByOrg(orgId);

  res.render("viewCategory", { champs: champs, type: 'organization', orgId: orgId })

};

async function loadClass(req, res) {

  const { classId } = req.params;

  const champs = await db.getChampsByClass(classId);

  res.render("viewCategory", { champs: champs, type: 'weightclass', classId: classId })

};

async function loadChamp(req, res) {

  const { champId } = req.params;

  const champ = await db.getChampById(champId);

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
  
    let orgsArray = [];

    for (let key in req.body) {
    
      if (Number.isInteger(Number(key))) {
        orgsArray.push(Number(key));
      }

    }

    await db.addToOrgs(name, orgsArray);

  } else {

    await db.addCategory(type, name);

  }
  
  res.redirect("/");

};

async function loadEditGet(req, res) {

  const { type, id } = req.query;

  if( type == 'champion') {

    const orgs = await db.getOrgs();
    const weights = await db.getClasses();
    let orgsArray = [];

    res.render("viewEditItem", {type: type, id: id, orgs: orgs, weights: weights});
    

  } else {

    res.render("viewEditCategory", {type: type, id: id});

  }


};

async function loadEditPost(req, res) {

  const { name, type, id, weight, deleteData, password} = req.body;

  if (password != process.env.EDITPW) {

    res.render("viewWrongPW");

    return;

  }

  if (deleteData == 'no') {

    res.redirect("/");

    return;

  }

  if (deleteData == 'yes') {
    
    await db.deleteInfo(type, id);

    res.redirect("/");

    return;
  }
  
  let orgsArray = [];

  // for loop singles out keys with numbers with are table ids of checked organizations in form

  for (let key in req.body) {
  
    if (Number.isInteger(Number(key))) {
      orgsArray.push(Number(key));
    }

  }
  
  await db.editCategory(type, id, name, weight, orgsArray);

  res.redirect("/");

};

module.exports = {
  loadHome,
  loadOrg,
  loadClass,
  loadChamp,
  loadCreateGet,
  loadCreatePost,
  loadEditGet,
  loadEditPost
};