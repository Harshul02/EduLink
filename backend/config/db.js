const mongoose = require('mongoose');

var mongoURL = 'mongodb://localhost:27017/ashDB';

const connectDb = async()=> {
    try{
    mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true})
    console.log("MongoDB connected Successfully");
    }
    catch(err){
        console.log(err)

    }
}


module.exports = connectDb;