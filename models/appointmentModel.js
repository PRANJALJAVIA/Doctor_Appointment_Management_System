const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    Id:{
        type: String,
    },
    userEmail:{
        type: String,
        require: [true, 'user email is required'],
    },
    userName:{
        type: String, 
        require: [true, 'user name is required'],
    },
    docId:{
        type: String, 
        require: [true, 'doctor id is required'],
    },
    timing:{
        type: Object,
        required: [true, 'timing is required'],
    },
    date:{
        type: String,
        required: [true, 'date is required']
    },
    status:{
        type: Boolean,
        default: false,
    },
    year:{
        type: String, 
        required: [true, 'year is required'],
    },
    month:{
        type: String,
        required: [true, 'month is required'],
    },
    day:{
        type: String, 
        required: [true, 'day is required'],
    }
})

const appointmentModels = mongoose.model('appointments' ,appointmentSchema);
module.exports = appointmentModels