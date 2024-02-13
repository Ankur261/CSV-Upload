const csvModel = require('../model/csvModel');
const csv = require('fast-csv');
const mongoose = require('../config/mongoose');
const path = require('path');


// Controller for Home Page of the application 
module.exports.homePage = async function (req, res) {

    const csvFile = await csvModel.find({}).timeout(30000).exec(function(err, data){
        console.log('Find sucess')
    });

    return res.render('csvHome', { csvFiles: csvFile });


}

// Controller for delete functionality of CSV file
module.exports.deleteFile = async function (req, res) {


    try {
        await csvModel.findByIdAndDelete(req.params.id);
        return res.json({ sucess: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error deleting item' });
    }

}


// Controller to open CSV file in the browser in tabular form
module.exports.openFile = function (req, res) {
    const fileId = req.params.id;
    csvModel.findById(fileId).then(data => {
        const parsedData = [];
        csv.parseString(data.fileContent, { headers: true })
            .on('data', (row) => {
                parsedData.push(row);
            }).on('error', (err) => {
                console.log(err);
                return;
            })
            .on('end', () => {
                const fileHeaders = Object.keys(parsedData[0]);
                const fileName = path.parse(data.fileName).name;
                return res.render('csvView', { fileName: fileName, csvheaders: fileHeaders, fileContent: parsedData });
            });
    });

}


// Controller to upload CSV file and save its name and content in MongoDB
module.exports.csvFileUpload = function  (req, res) {

    const parsedPath = path.parse(req.file.originalname);
    if (parsedPath.ext.toLowerCase() === '.csv') {
        const csvFileContent = req.file.buffer.toString();
        const csvFileName = req.file.originalname;
        csvModel.create({
            fileName: csvFileName,
            fileContent: csvFileContent
        }).then(() => {
            return res.redirect('back');
        }).catch((err) => {
            console.log(err);
            return res.send({ alert: "internal server error"})
        })
    }

    else

        return res.json({ alert: "Uploaded file extension is not .csv" })


}