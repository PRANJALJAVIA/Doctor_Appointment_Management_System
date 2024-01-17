const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    Id:{
        type: String,
    },
    userId:{
        type: String,
        require: [true, 'user id is required'],
    },
    docId:{
        type: String, 
        require: [true, 'doctor id is required'],
    },
    timing:{
        type: Object,
        required: [true, 'timing is required'],
    },
    status:{
        type: Boolean,
        default: false,
    }
})

const appointmentModels = mongoose.model('appointments' ,appointmentSchema);
module.exports = appointmentModels