const express = require('express');
const router = express.Router();

const {
   
    login,userExist, logout
    
  } = require("../controllers/userController");
const { sendMessage } = require('../controllers/messageController');
const { getAllUserData } = require('../controllers/adminController');

router.route('/login').put(login);
router.route('/checkUser').get(userExist);
router.route('/logout').get(logout);
router.route('/sendMessage').post(sendMessage);
router.route('/getAllUsers').get(getAllUserData);

module.exports = router;
