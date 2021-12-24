const Bootcamp = require('../models/Bootcamp');

// @ desc       get all bootcamps
// @ route      GET api/v1/bootcamps
// @ access     Public
exports.getBootcamps = async (req,res, next)=>{

    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({success: true,count: bootcamps.length, data: bootcamps});
    } catch (error) {
        res.status(400).json({success:false, error});
    }

}
// @ desc       get specific bootcamp
// @ route      GET api/v1/bootcamps/:id
// @ access     Public
exports.getBootcamp = async(req,res, next)=>{
    const {id} = req.params;
    try {
        const bootcamp = await Bootcamp.findById(id);
        if(!bootcamp){
            res.status(400).json({success: false, msg: 'invalid ID'});
        }
        res.status(200).json({success: true, data: bootcamp});
    } catch (error) {
        res.status(400).json({success:false, error});    
    }
}
// @ desc       Create bootcamp
// @ route      POST api/v1/bootcamps
// @ access     Public
exports.createBootcamp = async(req,res, next)=>{
   try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({success: true, data: bootcamp});
   } catch (error) {
       res.status(400).json({success:false, error});
       
   }
}
// @ desc       Update bootcamp
// @ route      UPDATE api/v1/bootcamps
// @ access     Public
exports.updateBootcamp = async(req,res, next)=>{
    const {id} = req.params;
    const bodyToUpdate = req.body;

    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(id, bodyToUpdate, {
            new:true,
            runValidators: true
        });

        if (!bootcamp){
            res.status(400).json({success: false, msg: 'invalid ID'});
        }
        res.status(200).json({success: true, data: bootcamp});
    } catch (error) {
        res.status(400).json({success:false, error});
    }

    res.status(200).json({success: true, msg: 'update bootcamps'});
}
// @ desc       Delete bootcamp
// @ route      DELETE api/v1/bootcamps
// @ access     Public
exports.deleteBootcamp = async(req,res, next)=>{
    const {id} = req.params;
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(id);

        if (!bootcamp){
            res.status(400).json({success: false, msg: 'invalid ID'});
        }
        res.status(200).json({success: true, data: {}});
    } catch (error) {
        res.status(400).json({success:false, error});
    }

    res.status(200).json({success: true, msg: 'update bootcamps'});

}