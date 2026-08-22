const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", usersController.loadHome);

usersRouter.get("/organization/:orgId", usersController.loadOrg);

usersRouter.get("/weightclass/:classId", usersController.loadClass);


module.exports = usersRouter;