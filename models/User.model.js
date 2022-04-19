const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  secondName: {
    type: String,
    default: "",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  rentedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
