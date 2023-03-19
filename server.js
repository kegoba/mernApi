
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const config = require("./models/db.js")
const mydata = require("./models/db.model.js")

const route = require("./route/recordroute.js");
mongoose.Promise = global.Promise;
app.use(cors())
app.use(bodyParser.json());




mongoose.connect(config.DB, { useNewUrlParser:true}).then(
() => {console.log("database connected")},
 err =>{console.log("not connected" +  err)}
)
app.listen(8080, function () {
    console.log("the server is runing at port 8080");
});




app.use("/", route)






