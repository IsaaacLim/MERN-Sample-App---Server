const express = require("express");
const router = express.Router();
const quickLinksController = require("../controllers/quickLinksController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/").get(quickLinksController.getAllQuickLinks);

router.use(verifyJWT);

router
  .route("/")
  .post(quickLinksController.createNewQuickLink)
  .patch(quickLinksController.updateQuickLink)
  .delete(quickLinksController.deleteQuickLink);

module.exports = router;
