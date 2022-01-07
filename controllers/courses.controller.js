const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

// @desc       get all Courses
// @route      GET api/v1/courses
// @route     GET api/v1/bootcamps/:bootcampId/courses
// @access     Public

exports.getCourses = asyncHandler(async(req, res, next)=>{
    let query;
    // check if there is params
    if(req.params.bootcampId){
        query = Course.find({bootcamp: req.params.bootcampId});
    }else {
        query = Course.find().populate({ 
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;

    res.status(200).json({sucess: true, count:courses.length, data: courses});

});