const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true, 'first name is required']
    },
    lastName:{
        type:String,
        required:[true, 'last name is required']
    },
    phone:{
        type:String,
        required:[true, 'phone no is required']
    },
    email:{
        type:String,
        required:[true, 'email is required']
    },   
    address:{
        type:String,
        required:[true, 'address is required']
    },
    specialization:{
        type:String,
        required:[true, 'specialization is required']
    },
    website:{
        type:String,
    },
    experience:{
        type:Number,
        required:[true, 'experience is required']
    },
    feesPerConsultant:{
        type:Number,
        required:[true, 'please enter the amount']
    },
    timings:{
        type:Object,
        required:[true, 'work timing is required']
    },
    status: {
        type:String,
        default: "pending"
    },
},
{timestamps: true}
);

const doctorModels = mongoose.model('doctors', doctorSchema)
module.exports = doctorModels