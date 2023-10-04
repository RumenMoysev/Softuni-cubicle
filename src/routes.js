const router = require("express").Router();
const homeController = require("./controllers/homeController.js");
const cubesController = require("./controllers/cubesController.js");
const accessoriesController = require('./controllers/accessoriesController.js');
const userController = require('./controllers/userController.js')

router.use(homeController);
router.use("/cubes", cubesController);
router.use("/accessories", accessoriesController);
router.use("/users", userController)

router.get("/404", (req, res) => {
    res.render("404");
});

router.get("*", (req, res) => {
    res.redirect("/404");
});

module.exports = router;