const express = require("express");
const ridesController = require("../controllers/ridesController");
const protect = require("../middlewares/protectMiddleware");
const restrictToAdmin = require("../middlewares/restrictAccessMiddleware");

const router = express.Router();

router
  .route("/")
  .get(ridesController.availableRides)
  .post(protect, restrictToAdmin, ridesController.createRide);

router
  .route("/:id")
  .patch(protect, restrictToAdmin, ridesController.cancelRide)
  .put(protect, restrictToAdmin, ridesController.updateRide)

  router
  .route("/search")
  .get(ridesController.searchRides);
module.exports = router;
