const mongoose = require('mongoose')
const Schema = mongoose.Schema


const User = new Schema ({
    email: {
          type : String,
          required: true
    },
    password :{
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true
    },
    created_at :{
        type: Date,
        default : Date.now
    },
    token: { 
            type: String 
        },
})



module.exports= mongoose.model('userProfile' , User)




