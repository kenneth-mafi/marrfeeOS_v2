const express = require("express");
const { register, loginEmail, setPin, loginPin } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);// creates account with no pin. 
router.post("/login", loginEmail); // login with email + password
router.post("/set-pin", setPin); // userID + new pinCode
router.post("/login-pin", loginPin); // login with userID + pinCode 

module.exports = router;
