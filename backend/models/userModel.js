const mongoose = require("mongoose");
const validator = require("validator");

const loginSessionSchema = new mongoose.Schema({
  loginTime: {
    type: String,
    required: true,
  },
  logoutTime: {
    type: String, 
  },
  sessionDuration: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please enter user name"],
  },
  Email: {
    type: String,
    unique: true,
    required: [true, "Please enter email"],
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  MobileNumber: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return /^(0|91)?[6-9]\d{9}$/.test(value);
      },
      message: 'Please enter a valid mobile number',
    },
  },
  timeOfLogin: {
    type: [loginSessionSchema], 
  },
});

let model = mongoose.model("User", userSchema);
module.exports = model;
