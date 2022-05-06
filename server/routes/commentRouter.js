const router = require("express").Router();
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/getComments/:id", commentCtrl.getComments);
router.get("/getStartComments/:id", commentCtrl.getStarComment);
module.exports = router;
