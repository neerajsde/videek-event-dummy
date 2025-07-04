const mongoose = require('mongoose');

const creatednewUser = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    designation:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default: ''
    },
    phone:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    user_img:{
        type:String,
        default:''
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    EInvites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invitation-Card' 
        }
    ],
    address:{
        type:String,
        default:''
    },
    token:{
        type:String,
        default:''
    },
    isActive:{
        type:Boolean,
        default:false
    },
    block:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('user', creatednewUser);