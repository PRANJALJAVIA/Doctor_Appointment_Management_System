const docModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const approveDoc = async (req, res, next)=> {
    console.log(req.body.userId);
    try{
        const doc = await docModel.findOneAndUpdate(
            {userId : req.body.userId},
            {
                $set: {
                    status: "approved",
                },
            },
            { new: true }
        );
        next();
    }catch(error){
        return res.status(500).json({error : error});
    }
}

const approveDocUser = async (req, res)=> {
    try{
        const user = await userModel.findOneAndUpdate(
            {_id : req.body.userId},
            {
                $set: {
                    isDoctor: true,
                },
            },
            { new: true }
        );
    }catch(error){
        return res.status(500).json({error: error});
    }
}

module.exports={
    approveDoc,
    approveDocUser,
}