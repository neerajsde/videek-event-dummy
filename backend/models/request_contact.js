const mongoose = require('mongoose');

const createdReqContact = new mongoose.Schema({
    name:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    function_date:{
        type:String,
        default:''
    },
    message:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Request-ContactUs', createdReqContact);