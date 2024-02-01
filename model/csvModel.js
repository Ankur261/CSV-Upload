const mongoose = require('mongoose');

// Uploaded CSV file Schema
const csvSchema = new mongoose.Schema(
    {   // CSV file name
        fileName: {
            type: String,
            require: true,
        },
        // Content of CSV file
        fileContent: {
            type: String,
            require: true,
        }
    },
    {
        timeStamps: true
    }
);

// CSV file model
module.exports = csvModel = mongoose.model('csvModel', csvSchema);
