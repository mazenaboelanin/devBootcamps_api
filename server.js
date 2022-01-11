const path = require('path');
const express = require('express')
const dotenv = require('dotenv');
 // Third party logger 
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const logger = require('./middleware/logger');
const fileUpload = require('express-fileupload');
// load env vars
dotenv.config({path: './config/config.env'});

// connect to database
connectDB();

// Route Files
const bootcampRoutes = require('./routes/bootcamps.routes');
const courseRoutes = require('./routes/courses.routes');
const authRoutes = require('./routes/auth.routes');

const app = express()

// Body Parser
app.use(express.json());


//PORT
const PORT = process.env.PORT || 5000;

// dev logging middleware 
if (process.env.NODE_ENV == "development"){
    app.use(morgan('dev'));
}

// load file upload
app.use(fileUpload());

// set public as static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcampRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/auth', authRoutes);

// using error Handler Middleware
app.use(errorHandler);






app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`))