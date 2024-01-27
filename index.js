const express = require('express') ;
const path = require('path') ;

const app = express() ;

app.use(express.static(path.join(__dirname, '/assets')));

app.use(express.json());
app.use(express.urlencoded({extended: true})) ;


app.set('view engine', 'ejs') ;
app.set('ejs', './views') ;

app.use('/csv', require('./routes/csvRouter')) ;




app.listen(3000, () => {
    console.log('Server is running on port 3000')
});