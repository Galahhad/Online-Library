const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
