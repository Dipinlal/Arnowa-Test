const User = require("../models/userModel");
const UserMessage = require("../models/messageModel");

exports.getAllUserData = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    const users = await Promise.all(
      allUsers.map(async (user) => {
        const messages = await UserMessage.findOne({ Email: user.Email }).sort({ timeOfLogin: -1 });
        const lastMessage = messages ? messages.Message : "No messages";

        const userData = {
          Name: user.Name,
          Email: user.Email,
          MobileNumber: user.MobileNumber,
          lastMessage,
          lastLoginTime: user.timeOfLogin[user.timeOfLogin.length - 1].loginTime // Assuming the loginTime is stored in an array in user model
        };

        return userData;
      })
    );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Connection error",
      error: error.message,
    });
  }
};
