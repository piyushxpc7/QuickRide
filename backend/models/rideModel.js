const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    }, // name of the bus or company name
    plateNumber: {
      type: String,
      required: [true, "Please provide a plate number"],
      unique: true,
      minlength: 7,
    },
    route: {
      from: {
        type: String,
        required: [true, "Please provide a starting point"],
      },
      to: {
        type: String,
        required: [true, "Please provide a destination"],
      },
    },
    totalSeats: {
      type: Number,
      required: [true, "Please provide the total number of seats"],
    }, // total number of seats in the bus
    availableSeats: {
      type: Number,
      default: this.totalSeats,
    }, // number of available seats in the bus
    pricePerSeat: {
      type: Number,
      required: [true, "Please provide a price"],
    }, // price of the bus ticket
    schedule: {
      type: Date,
      required: [true, "Please provide a schedule"],
    }, // date and time of bus departure
    status: { type: String, enum: ['active', 'canceled' , 'completed'], default: 'active' },
  },
  {
    timestamps: true,
  }
);

// automatically adjust availableSeats instead of throwing an error, use a pre-save hook
rideSchema.pre("save", function (next) {
  if (this.availableSeats > this.totalSeats) {
    this.availableSeats = this.totalSeats; // ✅ Auto-fix invalid values
  }
  next();
});



const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
