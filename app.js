const express = require("express");
const app = express();

// Source - https://stackoverflow.com/a/72024831
// Posted by Suhasini
// Retrieved 2026-08-28, License - CC BY-SA 4.0

app.use('/css',express.static('public' +'/css'));

const path = require("node:path");
const usersRouter = require("./routes/usersRouter");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
