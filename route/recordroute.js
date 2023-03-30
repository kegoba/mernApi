const express = require("express")
const AppRouter = express.Router()

// database connection
const itemModel = require("../models/record.model.js")

// TO ADD RECORD TO DB
AppRouter.post("/api/create", (req, res) =>{
    let data =  new itemModel(req.body)
    data.save()
    .then(todo =>{
        res.status(200).json({"record" : "Record added"})
    })
    .catch(err=>{
        res.status(400).send( "record not save")
    })
})


// TO DISPLAY ALL THE RECORD IN THE DB
AppRouter.get("/api/displayrecord", (req, res) =>{

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

// TO GET A SINGLE RECORD
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

// TO DELETE A SINGLE TO RECORD
AppRouter.delete("/api/deleterecord/:id",  async (req, res) =>{
    await itemModel.findByIdAndRemove(req.params.id, (err, data)=>{
        if (err){
            res.json("could not delete record")
        }
        else{
            res.json("record deleted successfully")
        }
    })
})


// TO UPDATE A SINGLE RECORD
AppRouter.post("/api/updates/:id",(req, res)=>{
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