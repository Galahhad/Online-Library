const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
  isRented: {
    type: Boolean,
    default: false,
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
