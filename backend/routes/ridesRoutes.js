const express = require("express");
const ridesController = require("../controllers/ridesController");
const protect = require("../middlewares/protectMiddleware");
const restrictToAdmin = require("../middlewares/restrictAccessMiddleware");

const router = express.Router();

router
  .route("/")
  .get(ridesController.getBuses)
  .post(protect, restrictToAdmin, ridesController.createBus);

router
  .route("/:id")
  .patch(protect, restrictToAdmin, ridesController.cancelBus);

module.exports = router;
