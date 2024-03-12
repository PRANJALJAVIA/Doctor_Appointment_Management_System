const userModel = require("../models/userModel");
const doctorModel = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const doctorModels = require("../models/doctorModel");

const UpdateUserProfile = async (req, res)=> {
    try{
        const user = await userModel.findOneAndUpdate(
            {email : req.body.email},
            {
                $set: {
                    name : req.body.name,
                    mobile : req.body.mobile
                },
            },
            { new: true }
        );
        if(user){
            return res.status(200).json({ message: "User profile updated successfully" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch(error){
        return res.status(500).json({error : error});
    }
}

const UpdateUserPassword = async (req, res)=> {
    try{
        const pass = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);

        const user = await userModel.findOneAndUpdate(
            {_id : req.body._id},
            {
                $set: {
                    password : hashedPassword
                },
            },
            { new: true }
        ); 

        if(user){
            return res.status(200).json({ message: "Password Updated successfully" });
        }
        else{
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch(error){
        return res.status(500).json({error : error});
    }
}

const UpdateDoctorProfile = async (req, res)=> {
    try{
        const user = await doctorModel.findOneAndUpdate(
            {userId: req.body.docId},
            {
                $set : {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    address: req.body.address,
                    website: req.body.website,
                    specialization : req.body.specialization,
                    experience : req.body.experience,
                    feesPerConsultant : req.body.feesPerConsultant,
                    timings : req.body.timings,
                },
            },
            { new: true },
        );

        if(user){
            return res.status(200).json({ message: "User profile updated successfully" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch(error){
        return res.status(500).json({error: error});
    }
}

module.exports={
    UpdateUserProfile,
    UpdateUserPassword,
    UpdateDoctorProfile
}