const express = require("express");
const app = express();
const path = require("node:path");
const { send } = require("node:process");
// const usersRouter = require("./routes/usersRouter");
const pool = require("./db/pool");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use("/", usersRouter);

async function getChamps() {

  const { rows } = await pool.query("SELECT * FROM champions");

  return rows;

}

app.get("/", async (req, res) => {

  const champs = await getChamps();

  console.log("The champs: ", champs);

  res.send('hullo')

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
