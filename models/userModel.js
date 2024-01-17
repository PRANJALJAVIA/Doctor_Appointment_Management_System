const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: false
    },
    name: {
        type: String,
        require:[true, 'name is required.']
    },
    password: {
        type: String, 
        require:[true, 'password is required.']
    },
    email: {
        type: String,
        require:[true, 'email is required.']
    },
    mobile:{
        type: String,
        require:[true, 'mobile number is required.']
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    isDoctor:{
        type: Boolean,
        default: false
    },
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;