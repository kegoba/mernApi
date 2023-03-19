const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
const AppRouter = express.Router()
const itemModel = require("../models/db.model.js")


AppRouter.post("/api/create", async (req, res) =>{
    let data =  new itemModel(req.body)
    data.save()
    .then(todo =>{
        res.status(200).json({"record" : "Record added"})
    })
    .catch(err=>{
        res.status(400).send( "record not save")
    })
})



AppRouter.get("/api/displayrecord",(req, res) =>{

    itemModel.find(function(err, record){
        if(err){
            console.log(err)
            err.send(400).json("record not found")

        }
       
        else{
        res.send(record)
    }
    })
   
})

AppRouter.get("/api/getrecord/:id",(req, res) =>{

    itemModel.findById(req.params.id, (err, data)=>{
        if (err){
            res.json("record not found")
        }
        else{
            res.json(data)
        }
    })
})

AppRouter.delete("/api/deleterecord/:id", (req, res) =>{
    itemModel.findByIdAndRemove(req.params.id, (err, data)=>{
        if (err){
            res.json("could not delete record")
        }
        else{
            res.json("record deleted successfully")
        }
    })
})


AppRouter.route("/api/updates/:id",(req, res)=>{
    itemModel.findById(req.params.id,(err, data)=>{
        if (err){
            res.status(400).json(" record not found")
        }
        else{
            data.id = req.body.id
            data.name = req.body.name
            data.description =req.body.description
            data.amount = req.body.amount
            data.product = req.body.product
            data.save()
            .then(reco =>{
            res.status(200).json(data)  
            })
            .catch(err=>{
                res.status(400).json("unable to update record")
            })
        }
    })
})


module.exports = AppRouter;