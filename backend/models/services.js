const mongoose = require('mongoose');

const creatednewServices = new mongoose.Schema({
    category:{
        type:String,
        default:''
    },
    subCategory:{
        type:String,
        default:''
    },
    name:{
        type:String,
        default:''
    },
    title:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('services', creatednewServices);