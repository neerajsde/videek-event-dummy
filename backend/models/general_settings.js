const mongoose = require('mongoose');

const generalSettings = new mongoose.Schema({
    title:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    alt_email:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    whatsapp:{
        type:String,
        default:''
    },
    fb_url:{
        type:String,
        default:''
    },
    ins_url:{
        type:String,
        default:''
    },
    twi_url:{
        type:String,
        default:''
    },
    yt_url:{
        type:String,
        default:''
    },
    logo:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    meta_keywords:{
        type:String,
        default:''
    },
    meta_desc:{
        type:String,
        default:''
    },
    google_analytics:{
        type:String,
        default:''
    },
    facebook_analytics:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('general-settings', generalSettings);