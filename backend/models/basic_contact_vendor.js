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
    phone:{
        type: String,
        default:''
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    category:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('contact-for-vendor', creatednewVendor);