const mongoose = require('mongoose') ;

const csvSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            require: true,
        },

        fileContent: {
            type: String,
            require: true,
        }
    },
    {
        timeStamps: true,
    }
) ;

module.exports = function deleteFile (fileId) {

}

module.exports =  csvModel = mongoose.model('csvModel', csvSchema) ;
