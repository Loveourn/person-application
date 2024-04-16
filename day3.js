//  web dev- client,server,database
// mongodb store dtaa easily than sql formats
// databass has its own server 
// databases = database, table = collection , colun = field , row(record) = documents
// insertOne,updateOne,deleteOne,--- database.table.methodname 
const express  = require('express');
const app = express();
const db = require('./db');
const Person  = require('./models/person')
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes)


const port = process.env.PORT || 3000; // Use 3000 as a default

app.listen(port,()=>[
    console.log("port is listening at port:3000"),
])
