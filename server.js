
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const path = require('path');

require("dotenv").config();






// self declaration
const config = require("./dbconfiguration/dbconnect.js")
const recordRoute = require("./route/recordroute.js");

const userRoute = require("./route/userroute.js");



//App setup
mongoose.Promise = global.Promise;
app.use(cors())
app.use(bodyParser.json());
process.env.JWT_KEY
//


// using mongoose to connect to db
mongoose.connect(config.DB, { useNewUrlParser:true}).then(
() => {console.log("database connected")},
 err =>{console.log("not connected" +  err)}
)


// app listening to 8080 local host
app.listen(8080, function () {
    console.log("the server is runing at port 8080");
});




app.use("/", recordRoute)

app.use("/", userRoute)







