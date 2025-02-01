const catchAsync = require("../utils/catchAsync");
const Bus = require("../models/rideModel");
const AppError = require("../utils/appError");

exports.getBuses = catchAsync(async (req,res)=>{
    const buses = await Bus.find({status:{$ne:'canceled'}}).select('-__v');
    res.status(200).json({
        status:'success',
        length: buses.length,
        data:buses
    })
})

exports.createBus = catchAsync(async (req,res)=>{
    const { name, plateNumber, route, totalSeats, availableSeats, schedule, pricePerSeat } = req.body
    const newBus = await Bus.create({ name, plateNumber, route, totalSeats, availableSeats, schedule, pricePerSeat });
    res.status(201).json({
        status:'success',
        data:newBus
    })
})

exports.cancelBus = catchAsync(async (req,res,next)=>{
    const bus = await Bus.findById(req.params.id);

    if(!bus){
        next(new AppError('No bus found with that ID', 404))
    }

     // Mark the bus as canceled
     bus.status = 'canceled';
     await bus.save();
 
     // Optionally, update all bookings for this bus
    //  await Booking.updateMany({ busId: bus._id }, { $set: { status: 'canceled' } });
 

    res.status(200).json({
        status:'success',
        message:'Ride canceled successfully',
    })
})