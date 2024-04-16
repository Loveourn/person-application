 
const express  = require('express');
const app = express();
const db = require('./db');
const passport = require('./auth')
const Person  = require('./models/person');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());

// middleware function
const logRequest = (req,res,next) =>{
    console.log(`${new Date().toLocaleDateString()}  log of request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);





app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});


app.get('/',function(req,res){
    res.send('Welcome to Person Managment App!');
})
const personRoutes = require('./routes/personRoutes');
app.use('/person',localAuthMiddleware,personRoutes)

const port = process.env.PORT || 3000; // Use 3000 as a default

app.listen(port,()=>[
    console.log("port is listening at port:3000"),
]);

