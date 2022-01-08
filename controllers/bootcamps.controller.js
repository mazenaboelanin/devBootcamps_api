const path = require('path');
const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

// @ desc       get all bootcamps
// @ route      GET api/v1/bootcamps
// @ access     Public
exports.getBootcamps = asyncHandler(async (req,res, next)=>{
    const bootcamps = await Bootcamp.find().populate({
        path: 'courses',
        select: 'title description'
    });
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
// @ route      UPDATE api/v1/bootcamps/:id
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
// @ route      DELETE api/v1/bootcamps/:id
// @ access     Public
exports.deleteBootcamp = asyncHandler(async(req,res, next)=>{
    const {id} = req.params;

    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
    }

    bootcamp.remove();
    res.status(200).json({success: true, data: {}});


});






// @ desc       Upload Bootcamp Photo
// @ route      put api/v1/bootcamps/:id/photo
// @ access     Public
exports.uploadBootcampPhoto = asyncHandler(async(req,res, next)=>{
    const {id} = req.params;

    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
    }

    if(!req.files){
        return next(new ErrorResponse(`Please Upload a file`, 404));
    }
    //console.log(req.files);
    
    const file = req.files.file;

    // check the file type photo with file extension
    if(!file.mimetype.startsWith('image')){
        return next(new ErrorResponse(`Please upload an image file`, 404));
    }
    
    // check the filesize 
    if(file.size > process.env.MAX_FILE_UPLOAD){
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 404));
    }

    // create custom file name
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err =>{
        if (err){
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Bootcamp.findByIdAndUpdate(id, {photo: file.name});
        res.status(200).json({
            success: true,
            data: file.name
        });
    });

    console.log(file.name);

});