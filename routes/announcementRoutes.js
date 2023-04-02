const express = require("express");
const router = express.Router();
const announcementsController = require("../controllers/announcementsController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/").get(announcementsController.getAllAnnouncements);

router.use(verifyJWT);

router
  .route("/")
  .post(announcementsController.createNewAnnouncement)
  .patch(announcementsController.updateAnnouncement)
  .delete(announcementsController.deleteAnnouncement);

module.exports = router;
