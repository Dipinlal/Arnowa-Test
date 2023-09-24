const mongoose = require("mongoose");
const validator = require("validator");

const userMessageSchema = new mongoose.Schema({
  
 Message: {
    type: String,
    required: [true, "Please enter message"],
   
  },
  Email: {
    type: String,
    required: true,
    
  },

  timeOfLogin: {
    type:String,
    
  },
});

let model = mongoose.model("UserMessage", userMessageSchema); 
module.exports = model;
