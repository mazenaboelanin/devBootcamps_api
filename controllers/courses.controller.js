const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc       get all Courses
// @route      GET api/v1/courses
// @route      GET api/v1/bootcamps/:bootcampId/courses
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


// @desc       get single Course
// @route      GET api/v1/courses/:id
// @access     Public

exports.getCourse = asyncHandler(async( req, res, next)=>{

    const {id} = req.params;
    const course = await Course.findById(req.params.id).populate({
        path:'bootcamp',
        select:'name description'
    });;

    if(!course){
        return next(new ErrorResponse(`No course with this id ${id}`, 404));
    }

    res.status(200).json({
        success:true,
        data:course
    });
});



// @desc       Add Course
// @route      POST api/v1/bootcamps/:bootcampId/courses
// @access     private

exports.addCourse = asyncHandler( async (req, res, next)=>{

    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if(!bootcamp){
        return next(new ErrorResponse(`No Bootcamp with this id ${req.params.bootcampId}`, 404));
    }

    const course = await Course.create(req.body);

    res.status(201).json({
        success:true,
        data:course
    });
});




// @desc       Update Course
// @route      POST api/v1/courses/:id
// @access     private

exports.updateCourse = asyncHandler( async (req, res, next)=>{

    const {id} = req.params;

    let course = await Course.findById(id);

    if(!course){
        return next(new ErrorResponse(`No Course with this id ${id}`, 404));
    }

    course = await Course.findByIdAndUpdate(id, req.body ,{
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: course
    });
});



// @desc       Delete Course
// @route      POST api/v1/courses/:id
// @access     private

exports.deleteCourse = asyncHandler( async (req, res, next)=>{

    const {id} = req.params;

    const course = await Course.findById(id);

    if(!course){
        return next(new ErrorResponse(`No Course with this id ${id}`, 404));
    }

    await course.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});