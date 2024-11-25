const mongoose = require('mongoose');

const creatednewGallery = new mongoose.Schema({
    category:{
        type:String,
        default:''
    },
    title:{
        type:String,
        default:''
    },
    desc:{
        type:String,
        default:''
    },
    images:[{
        type:String
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('gallery', creatednewGallery);