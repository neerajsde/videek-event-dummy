const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  noOfStars: { type: Number, required: true },
  comment: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
