const doctorModel = require("../models/doctorModel");

//apply doctor controller

const applyDocCtrl = async (req, res) => {
    try{
        var doct = await doctorModel.create({
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            specialization: req.body.specialization,
            website: req.body.website,
            feesPerConsultant: req.body.feesPerConsultant,
            timings: req.body.timings,
            experience: req.body.experience,
        })

        await doct.save();

        res.status(200).send({message: "Doctor registreation successful", success: true});

    }catch(error){
        return res.status(500).json({error: error})
    }
};

module.exports = {
    applyDocCtrl,
}


