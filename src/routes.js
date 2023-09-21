const router = require("express").Router();
const homeController = require("./controllers/homeController.js");
const cubesController = require("./controllers/cubesController.js");

router.use(homeController);
router.use("/cubes", cubesController);

router.get("/404", (req, res) => {
    res.render("404");
});

router.get("*", (req, res) => {
    res.redirect("/404");
});

module.exports = router;