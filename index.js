const express = require('express') ;
const ejs = require('ejs') ;
const {parse} = require('csv-parse') ;
const fs = require('fs') ;
const app = express() ;
app.use(express.json());

app.use(express.urlencoded({extended: true})) ;
app.use('/csv', require('./routes/csvRouter')) ;
app.use('/assets', express.static('assets'));

app.set('view engine', 'ejs') ;
app.set('ejs', './views') ;




app.listen(3000, () => {
    console.log('Server is running on port 3000')
});