const db = require("../db/queries");

async function usersLog(req, res) {

  const champs = await db.getChamps();

  console.log("The champs: ", champs);

  res.send('hullo')

};

module.exports = {
  usersLog
};