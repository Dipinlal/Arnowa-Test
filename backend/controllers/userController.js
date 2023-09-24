const User = require("../models/userModel");
const UserMessage = require("../models/messageModel");
exports.login = async(req,res,next) => {

   

 const { Name, Email, MobileNumber } = req.body;
 
  if (!Name || !Email || !MobileNumber) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }
  try {
    const currentTimeIST = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const sessionDuration = 5 * 60 * 1000;
    const logoutTime = new Date(new Date(currentTimeIST).getTime() + 5 * 60 * 1000).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const loginSession = {
      loginTime: currentTimeIST,
      logoutTime: logoutTime,
      sessionDuration: sessionDuration,
    };
    const existingUser = await User.findOne({ $or: [{ Email: Email }, { MobileNumber: MobileNumber }] });
    
    if(existingUser){
      if(existingUser.Email !=Email){
        return res
        .status(400)
        .json({ success: false, message: "User with Different Email Exist" });
      }
      if(existingUser.MobileNumber !=MobileNumber){
        return res
        .status(400)
        .json({ success: false, message: "User with Different Mobile number Exist" });
      }
     
      const user = await User.findOneAndUpdate(
        {Email:Email},
        { $addToSet: { timeOfLogin: [loginSession]} },
        {
          new: true,
          runValidators: true,
        }
      );
      let messagesForEmail;
      try {
         messagesForEmail = await UserMessage.find({ Email });
      } catch (error) {
        
      }
      return res.status(200).json({
        success: true,
        message: "Login success",
        user: user,
        messages:messagesForEmail
      });
    }
    
    const user = await User.create({
      Name,
      Email,
      MobileNumber,
      timeOfLogin: [loginSession]
    });
    let messagesForEmail;
    try {
       messagesForEmail = await UserMessage.find({ Email });
    } catch (error) {
      
    }
    
    res.status(200).json({
      success: true,
      message: "Login success",
      user: user,
      messages:messagesForEmail 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login Error",
      error: error.message
    });
  }

}
exports.userExist = async (req, res, next) => {


  try {
    const lastUser = await User.findOne().sort({ timeOfLogin: -1 });
    const {Email} = lastUser;

    if (lastUser && lastUser.timeOfLogin && lastUser.timeOfLogin.length > 0) {
      const currentTimeIST = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      const currentTimeISTDate = new Date(currentTimeIST);

      const isWithinLast5Minutes = lastUser.timeOfLogin.some((loginSession) => {
        const loginTimeDate = new Date(loginSession.loginTime);
        const logoutTimeDate = new Date(loginSession.logoutTime);
        const sessionDuration = loginSession.sessionDuration;
        
       
        return currentTimeISTDate > loginTimeDate && currentTimeISTDate < logoutTimeDate && 
               currentTimeISTDate - loginTimeDate < sessionDuration;
      });

      if (isWithinLast5Minutes) {

        let messagesForEmail;
        try{
          messagesForEmail = await UserMessage.find({ Email });
          return res.status(200).json({
            success: true,
            message: "Previous user details",
            user: lastUser,
            messages:messagesForEmail 
          });

        }catch(error){
          return res.status(200).json({
            success: true,
            message: "Previous user details",
            user: lastUser,
            messages:messagesForEmail 
          });

        }
       
       
      }
    }

    res.status(400).json({
      success: false,
      message: "Please Login"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Connection error",
      error: error.message
    });
  }
};


exports.logout = async (req, res, next) => {
  

  
  try {
    const user = await User.findOne().sort({ timeOfLogin: -1 });
   

    

    
    const latestLoginSession = user.timeOfLogin[user.timeOfLogin.length - 1];
    
    if (latestLoginSession) {
      const logoutTimeDate = new Date(latestLoginSession.logoutTime);

      const currentTimeIST = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      if(new Date(currentTimeIST)>logoutTimeDate){
        return res.status(400).json({
          success: false,
          message: "Session expired",
        });

      }
     
      const loginTime = new Date(latestLoginSession.loginTime);
      const sessionDuration = new Date(currentTimeIST) - loginTime;

     
      latestLoginSession.sessionDuration = sessionDuration;
      latestLoginSession.logoutTime = currentTimeIST; 

      
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Logout success",
      });
    } else {
      return res.status(400).json({ success: false, message: "No login session found" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout Error",
      error: error.message,
    });
  }
};
