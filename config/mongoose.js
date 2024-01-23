const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/csv-upload");

const db = mongoose.connection;

db.on('error', (error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

db.once('open', () => {
  console.log("*** Connected to Database :: MongoDB ***");
});

module.exports = db;
