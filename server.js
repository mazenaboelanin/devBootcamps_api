const express = require('express')
const dotenv = require('dotenv');
 // Third party logger 
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const logger = require('./middleware/logger');
// load env vars
dotenv.config({path: './config/config.env'});

// connect to database
connectDB();

// Route Files
const bootcampRoutes = require('./routes/bootcamps.routes');
const courseRoutes = require('./routes/courses.routes');

const app = express()

// Body Parser
app.use(express.json());

//PORT
const PORT = process.env.PORT || 5000;

// dev logging middleware 
if (process.env.NODE_ENV == "development"){
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcampRoutes);
app.use('/api/v1/courses', courseRoutes);

// using error Handler Middleware
app.use(errorHandler);






app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`))