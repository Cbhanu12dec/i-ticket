const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userID: String,
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: String,
  phoneNumber: {
    type: String,
    required: false,
  },

  address: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipcode: String,
  },
  role: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", usersSchema);
