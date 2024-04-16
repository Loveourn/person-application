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
app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes)

app.listen(3000,()=>[
    console.log("port is listening at port:3000"),
])
