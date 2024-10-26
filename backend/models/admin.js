const mongoose = require('mongoose');

const creatednewAdmin = new mongoose.Schema({
    name:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    user_img:{
        type: String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    token:{
        type:String,
        default:''
    },
    isActive:{
        type: Boolean,
        default: false
    },
    admin_type:{
        type: String,
        default: ''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('admin', creatednewAdmin);