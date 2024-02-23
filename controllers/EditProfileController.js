const userModel = require("../models/userModel");

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

module.exports={
    UpdateUserProfile
}