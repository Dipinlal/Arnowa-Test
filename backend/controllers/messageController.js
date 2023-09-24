const User = require("../models/userModel")
const UserMessage = require("../models/messageModel");

exports.sendMessage = async(req,res,next) => {

    const { Message,Email,timeOfLogin } = req.body;
    

    try {

      const newMessage = new UserMessage({
        Message,Email,timeOfLogin
      });
  
      const savedMessage = await newMessage.save();
      const messagesForEmail = await UserMessage.find({ Email });
     
        
     
  
      res.status(201).json({ success: true, message: 'Message saved successfully',messagesForEmail });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
}