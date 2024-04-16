// database connection
const mongoose  = require('mongoose');

// define the mongodb url
const mongoUrl = 'mongodb://localhost:27017/mydatabase';


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