// @ desc       get all bootcamps
// @ route      GET api/v1/bootcamps
// @ access     Public
exports.getBootcamps = (req,res, next)=>{
    res.status(200).json({success: true, msg: 'show all bootcamps'});
}
// @ desc       get specific bootcamp
// @ route      GET api/v1/bootcamps/:id
// @ access     Public
exports.getBootcamp = (req,res, next)=>{
    res.status(200).json({success: true, msg: 'show specific bootcamp'});
}
// @ desc       Create bootcamp
// @ route      POST api/v1/bootcamps
// @ access     Public
exports.createBootcamp =(req,res, next)=>{
    res.status(200).json({success: true, msg: 'Create new bootcamp'});
}
// @ desc       Update bootcamp
// @ route      UPDATE api/v1/bootcamps
// @ access     Public
exports.updateBootcamp = (req,res, next)=>{
    res.status(200).json({success: true, msg: 'update bootcamps'});
}
// @ desc       Delete bootcamp
// @ route      DELETE api/v1/bootcamps
// @ access     Public
exports.deleteBootcamp = (req,res, next)=>{
    res.status(200).json({success: true, msg: 'delete bootcamps'});
}