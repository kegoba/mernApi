const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema ({

  name :{
        type:  String
    },
        product :{
        type:  String
    },
        amount :{
        type:  Number
    },
        description :{
        type:  String
    },
        date: {
            type: Date,
            default: Date.now,
    },
        token: { 
            type: String 
        },


})


module.exports = mongoose.model("goods", Item)
