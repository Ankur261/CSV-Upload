const express = require('express') ;
const controller = require('../controller/csvController');
const multer = require('multer') ;

const router = express.Router() ;

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

router.get('/', controller.homePage) ;
router.post('/upload', upload.single('csvFile'), controller.csvFileUpload) ;
router.delete('/delete/:id', controller.deleteFile) ;
router.get('/open/:id', controller.openFile) ;

module.exports = router ;