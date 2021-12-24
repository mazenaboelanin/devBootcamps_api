const ErrorResponse = require("../utlis/errorResponse");

const errorHandler = (err, req, res, next)=>{

    let error = {...err};
    error.message = err.message;

    // log to console 
    console.log(err);

    // mongoose false objectId
    if(err.name === 'CastError'){

        const message = `Bootcamp not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // mongoose duplicate fields
    if (err.code === 11000){
        const message = 'Duplicate fields values entered';
        error = new ErrorResponse(message, 400);
    }

    // mongoose Validation Error 
    if (err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({success: false, error: error.message || 'Server Error'});

}


module.exports = errorHandler;