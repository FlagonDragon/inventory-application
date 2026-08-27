const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", usersController.loadHome);

usersRouter.get("/organization/:orgId", usersController.loadOrg);

usersRouter.get("/weightclass/:classId", usersController.loadClass);

usersRouter.get("/champion/:champId", usersController.loadChamp);

usersRouter.get("/create", usersController.loadCreateGet);
usersRouter.post("/create", usersController.loadCreatePost);

usersRouter.get("/edit", usersController.loadEditGet);
usersRouter.post("/edit", usersController.loadEditPost);





module.exports = usersRouter;