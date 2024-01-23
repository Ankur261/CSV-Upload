const  csvModel  = require('../model/csvModel');
const {parse} = require('csv-parse') ;

const fs = require('fs') ;

const db = require('../config/mongoose.js') ;


module.exports.homePage = async function (req, res) {
    async function deleteFile(fileId) {
        console.log('hekko')
        const result = await csvModel.findByIdAndDelete(fileId) ;
    }

    async function openFile(fileId) {
        const result = await csvModel.findById(fileId) ;
        
    }
    try {
        const csvFiles = await csvModel.find({}) ;
        console.log(csvFiles) ;
    return res.render('csvHome', {csvFiles: csvFiles, deleteFile: deleteFile})
    } catch (error) {
        console.error(error, 'Error fetching csvFiles from mongodb model')
        return res.status(500).send('Internal Server Error')
    }
}

module.exports.csvFileUpload = function (req, res) {

    const csvFileContent = req.file.buffer.toString() ;
    const csvFileName = req.file.originalname ;

    csvFileModel.create({
        fileName: csvFileName,
        fileContent: csvFileContent
    }).then(() => {
        return res.send({upload: "sucessful"}) ;
    }).catch((err) => {
        console.log(err);
        return res.send({upload: "unsucessful"})
    })

}