const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

// @ desc       get all bootcamps
// @ route      GET api/v1/bootcamps
// @ access     Public
exports.getBootcamps = asyncHandler(async (req,res, next)=>{

    const bootcamps = await Bootcamp.find();
    res.status(200).json({success: true,count: bootcamps.length, data: bootcamps});
});
// @ desc       get specific bootcamp
// @ route      GET api/v1/bootcamps/:id
// @ access     Public
exports.getBootcamp = asyncHandler(async(req,res, next)=>{

    const {id} = req.params;
    const bootcamp = await Bootcamp.findById(id);

    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
    }
    res.status(200).json({success: true, data: bootcamp});
});
// @ desc       Create bootcamp
// @ route      POST api/v1/bootcamps
// @ access     Public
exports.createBootcamp = asyncHandler(async(req,res, next)=>{

    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({success: true, data: bootcamp});
});
// @ desc       Update bootcamp
// @ route      UPDATE api/v1/bootcamps
// @ access     Public
exports.updateBootcamp = asyncHandler(async(req,res, next)=>{
    const {id} = req.params;
    const bodyToUpdate = req.body;
    const bootcamp = await Bootcamp.findByIdAndUpdate(id, bodyToUpdate, {
        new:true,
        runValidators: true
    });

    if (!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
    }
    res.status(200).json({success: true, data: bootcamp});

});
// @ desc       Delete bootcamp
// @ route      DELETE api/v1/bootcamps
// @ access     Public
exports.deleteBootcamp = asyncHandler(async(req,res, next)=>{
    const {id} = req.params;

    const bootcamp = await Bootcamp.findByIdAndDelete(id);

    if (!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
    }
    res.status(200).json({success: true, data: {}});


});