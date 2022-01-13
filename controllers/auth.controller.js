const path = require('path');
const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');


// @ desc       Register 
// @ route      POST api/v1/auth/register
// @ access     Public

exports.register = asyncHandler(async (req, res, next)=>{
   const {name, email, password, role} = req.body;

    const user = await User.findOne({email});
    if (user){
        return next(new ErrorResponse(`Email Already Exists`, 400));
    }
    else{
   // Create User
    const newUser = new User({name, email, password, role});
    const data = await newUser.save();

    // create token 
    const token = newUser.getSignedJwtToken();
    res.status(201).json({success: true, data, token});
    }

});