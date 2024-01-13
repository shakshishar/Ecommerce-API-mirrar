const mongoose=require('mongoose');

// connecting mongoose to its default server and ecommerce DB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_api',{ useNewUrlParser: true, useUnifiedTopology: true });

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in db connection'));

db.once('open',()=>{
    console.log('Database Connect successfully');

});

module.exports=db;