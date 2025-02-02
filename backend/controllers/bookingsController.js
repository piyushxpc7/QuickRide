const Bookings = require("../models/bookingModels");
const Ride = require("../models/rideModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const generateQRCode = require("../utils/generateQRCode");

exports.createBookings = catchAsync(async (req, res, next) => {
  const { rideId, seatsBooked, notes } = req.body;
  const ride = await Ride.findById(rideId);
  if (!ride) {
    return next(new AppError("No ride found with that ID", 404));
  }
  if (ride.availableSeats < seatsBooked) {
    return next(new AppError("Not enough seats available", 400));
  }

  const booking = await Bookings.create({
    user: req.userId,
    ride: rideId,
    seatsBooked,
    notes,
  });

  await booking.save();
  const qrCode = await generateQRCode(booking._id.toString());

  booking.qrCode = qrCode;
  await booking.save();

  // Populate ride and user details for the ticket
  // const populatedBooking = await Booking.findById(booking._id)
  //   .populate("user", "email")
  //   .populate("ride", "name route.from route.to");

  // Send the ticket to the user's email
  // await sendTicket(populatedBooking.user.email, qrCode, populatedBooking);

  res.status(201).json({
    status: "success",
    data: booking,
  });
});
