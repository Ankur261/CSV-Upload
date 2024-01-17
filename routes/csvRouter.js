const express = require('express') ;
const controller = require('../controller/csvController');

const router = express.Router() ;

router.get('/', controller.homePage) ;

module.exports = router ;