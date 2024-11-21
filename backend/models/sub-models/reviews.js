const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  noOfStars: { type: Number, required: true },
  comment: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  images:[{
    type:String
  }],
  amount:{
    type: Number
  },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
