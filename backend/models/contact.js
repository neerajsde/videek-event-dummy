const mongoose = require('mongoose');

const creatednewContact = new mongoose.Schema({
    name:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    subject:{
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

module.exports = mongoose.model('contact-us', creatednewContact);