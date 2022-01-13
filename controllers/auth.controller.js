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




// @ desc       Login 
// @ route      POST api/v1/auth/login
// @ access     Public

exports.login = asyncHandler(async (req, res, next)=>{
    const {email, password} = req.body;
 
    // validate email and password
    if(!email || !password){
        return next(new ErrorResponse(`Please Enter email and Password`, 400));
    }

    // check if user exists
    const user = await User.findOne({email}).select('+password');
    if (!user){
         return next(new ErrorResponse(`invalid email`, 400));
     }
     else{
         console.log(user);
    
        // match password
        const match = await user.matchPassword(password);

        if(!match){
            return next(new ErrorResponse(`invalid Password`, 400));
        }
        else {
            // create token 
            const token = user.getSignedJwtToken();
            res.status(201).json({success: true, user: user._id, token});
        }

     }
 
 });