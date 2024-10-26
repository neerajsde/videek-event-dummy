const mongoose = require('mongoose');

const creatednewViews = new mongoose.Schema({
    date:{
        type:String,
        default:''
    },
    time:{
        type:String,
        default:''
    },
    location:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('website-views', creatednewViews);