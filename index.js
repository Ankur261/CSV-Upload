const express = require('express') ;
const path = require('path') ;
require('dotenv').config() ;
const app = express() ;

app.use(express.static(path.join(__dirname, '/assets')));

app.use(express.json());
app.use(express.urlencoded({extended: true})) ;


app.set('view engine', 'ejs') ;
app.set('ejs', './views') ;

app.use('/', require('./routes/csvRouter')) ;




app.listen(3000, () => {
    console.log('Server is running on port 3000')
});