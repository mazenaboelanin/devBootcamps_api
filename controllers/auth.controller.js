const path = require('path');
const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/user');


// @ desc       Register User
// @ route      POST api/v1/auth/register
// @ access     Public

exports.register = asyncHandler(async (req, res, next)=>{
    res.status(200).json({success: true});
});