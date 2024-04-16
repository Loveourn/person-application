// database connection
const mongoose  = require('mongoose');
require('dotenv').config();



// define the mongodb url
// const mongoUrl = 'mongodb://localhost:27017/mydatabase';
const mongoUrl = process.env.MONGODB_URL;


mongoose.connect(mongoUrl,{
})

const db = mongoose.connection;


db.on('connected',() => {
    console.log("database connected")
});

db.on('error',(error) => {
    console.log("error is this",error)
});

db.on('disconnected',() => {
    console.log("database disconnected")
});

module.exports = db;