const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//load env
dotenv.config({path: './config/config.env'});

// load Models
const Bootcamp = require('./models/Bootcamp');

// connect DB
mongoose.connect(process.env.MONGO_URI);

// read JSON Files 
const Bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/data/bootcamps.json`, 'utf-8'));


// import into DB

const importData = async () =>{
    try {
        await Bootcamp.create(Bootcamps);
        console.log('Data Imported Successfully..');
    } catch (error) {
        console.error(error);
    }
}


// Delete data from DB

const deleteData = async () =>{
    try {
        await Bootcamp.deleteMany();
        console.log('Data Deleted Successfully..');
    } catch (error) {
        console.error(error);
    }
}


if (process.argv[2] == '-i'){
    importData();
} else if (process.argv[2] == '-d'){
    deleteData();
}