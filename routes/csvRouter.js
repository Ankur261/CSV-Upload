const express = require('express');
const controller = require('../controller/csvController');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// home page router
router.get('/', controller.homePage);
//CSV file upload router
router.post('/upload', upload.single('csvFile'), controller.csvFileUpload);
// CSV file delete router
router.delete('/delete/:id', controller.deleteFile);
// CSV file open router 
router.get('/open/:id', controller.openFile);

module.exports = router;