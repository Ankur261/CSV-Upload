const csvModel = require('../model/csvModel');
const csv = require('fast-csv');
const mongoose = require('../config/mongoose') ;
const path = require('path') ;

module.exports.homePage = async function (req, res) {

    const csvFile = await csvModel.find({});

    return res.render('csvHome', { csvFiles: csvFile });



}

module.exports.deleteFile = async function (req, res) {


    try {
        await csvModel.findByIdAndDelete(req.params.id);
        return res.json({ sucess: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error deleting item' });
    }

}

module.exports.openFile = function (req, res) {
    const fileId = req.params.id;
    csvModel.findById(fileId).then(data => {
        const parsedData = []; 
        csv.parseString(data.fileContent, { headers: true })
            .on('data', (row) => {
                parsedData.push(row);
            }).on('error', (err) => {
                console.log(err);
                return ;
            })
            .on('end', () => {
                const fileHeaders = Object.keys(parsedData[0]);
                const fileName = path.parse(data.fileName).name ;
                return res.render('csvView', { fileName: fileName, csvheaders: fileHeaders, fileContent: parsedData });
            });
    });

}

module.exports.csvFileUpload = function (req, res) {

    const csvFileContent = req.file.buffer.toString();
    const csvFileName = req.file.originalname;

    csvModel.create({
        fileName: csvFileName,
        fileContent: csvFileContent
    }).then(() => {
        return res.redirect('/csv');
    }).catch((err) => {
        console.log(err);
        return res.send({ upload: "unsucessful" })
    })

}