const mongoose = require('mongoose');


 mongoose.connect(process.env.MONGODB_CONNECT_URI);



const db = mongoose.connection; 

db.on('error', (error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

db.once('open', () => {
  console.log("*** Connected to Database :: MongoDB ***");
});

module.exports = db;
