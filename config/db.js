const mongoose = require('mongoose');


const dbConnection= async()=>{

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: `);
    //${conn.conneciton.host}
}

module.exports = dbConnection;