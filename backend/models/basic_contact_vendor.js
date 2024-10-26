const mongoose = require('mongoose');

const creatednewVendor = new mongoose.Schema({
    name:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    vendor:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('contact-for-vendor', creatednewVendor);