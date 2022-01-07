const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//load env
dotenv.config({path: './config/config.env'});

// load Models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

// connect DB
mongoose.connect(process.env.MONGO_URI);

// read JSON Files 
const Bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/data/bootcamps.json`, 'utf-8'));

const courses = JSON.parse(fs.readFileSync(`${__dirname}/data/courses.json`, 'utf-8'));


// import into DB
const importData = async () =>{
    try {
        await Bootcamp.create(Bootcamps);
        //await Course.create(courses);
        console.log('Data Imported Successfully..');
        process.exit();
    } catch (error) {
        console.error(error);
    }
}



// Delete data from DB

const deleteData = async () =>{
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('Data Deleted Successfully..');
        process.exit();
    } catch (error) {
        console.error(error);
    }
}


if (process.argv[2] == '-i'){
    importData();
} else if (process.argv[2] == '-d'){
    deleteData();
}