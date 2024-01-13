//importing required package
const express=require('express');
const bodyParser = require('body-parser');
const db=require('./config/mongoose');

//initializing express
const app=express();


// parser to get form data
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());
app.use('/products',require('./routes/products'));


//Starting the server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});