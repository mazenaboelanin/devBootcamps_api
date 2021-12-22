const express = require('express')
const dotenv = require('dotenv');
 // Third party logger 
const morgan = require('morgan');
const connectDB = require('./config/db');
const { append } = require('express/lib/response');
const logger = require('./middleware/logger');
// load env vars
dotenv.config({path: './config/config.env'});

// connect to database
connectDB();

// Route Files
const bootcampRoutes = require('./routes/bootcamps.routes');

const app = express()
const PORT = process.env.PORT || 5000;

// dev logging middleware 
if (process.env.NODE_ENV == "development"){
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcampRoutes);






app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`))