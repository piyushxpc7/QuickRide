const express = require('express');
const protect = require('../middlewares/protectMiddleware');
const bookingsController = require('../controllers/bookingsController');
const router = express.Router();

router.route('/').post(protect , bookingsController.createBookings);






module.exports = router;