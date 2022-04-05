const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const utils = require("../utils/utils");

exports.verifyToken = async (req, res, next) => {
  let token = req.headers.token;
  if (token == undefined || token == "") {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
  try {

    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (verifyToken) {
      next();
    }
  } catch (err) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
};


exports.generateToken = async (req, res) => {
    
    try{
        const PhoneNumber = req.body.enter_any_ten_digit_phoneNumber

    const token = await jwt.sign({ PhoneNumber: PhoneNumber }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
  
    utils.commonResponce(
        res,
        200,
        "successfully generated token ",
        {token:token}
    )
    }catch (error) {
        utils.commonResponce(res, 500, "Unexpected Server Error ", error.toString())
    }
  };
