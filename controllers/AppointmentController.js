const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv')

//check availibility
const checkAvailibilityCtrl = async (req, res) => {
    try{
        const appointment = await appointmentModel.findOne({
            docId : req.body.docId,
            timing : req.body.timing,
            date : req.body.date, 
        });

        if(appointment){
            return res.status(200).json({message: "Appointment not available", success : false});
        }
        else{
            //to add appointment
            const Appointment = await appointmentModel.create({
                userEmail : req.body.userEmail,
                docId : req.body.docId,
                timing : req.body.timing,
                date : req.body.date, 
                userName: req.body.userName,
            });
            await Appointment.save();
            return res.status(200).json({message: "Appointment booked succesfully", success : true});
        }
    }catch(error){
        return res.status(500).json({error: error})
    }
}

const getAppointmentListCtrl = async (req, res) => {
    try{
        const uId = req.body.userId;
        
        const dId = await doctorModel.findOne({userId: uId})
        const appointmentList = await appointmentModel.find({docId: dId._id.toString()});
        
        if(appointmentList) {
            return res.status(200).json({
                message: "appointment list",
                success: true,
                data: appointmentList,
            });
        }
        else{
            return res.status(200).json({
                message: "No appointment found",
                success: false,
                data: [],
            });
        }
    }
    catch(error){
        return res.status(500).json({ error: error });
    }
}

//approving appointment controller
const approveAppointmentCtrl = async (req, res) => {
    try{
        const appointment = await appointmentModel.findOneAndUpdate(
            {
                timing: req.body.timing,
                date: req.body.date,
                docId: req.body.docId,
            },
            {
                $set:{
                    status: true,
                }
            },
            { new: true }
        );

        // if (appointment) {
        //     // Update the state here if necessary
        //     // Example: setAppointmentList(updatedAppointmentList);
            
        //     // Show success message to the user
        //     message.success('Appointment approved successfully');
            
        //     // Send any other necessary response to the client
        //     res.status(200).json({ success: true });
        // } else {
        //     // Show error message if appointment not found
        //     message.error('Appointment not found');
        //     res.status(404).json({ error: 'Appointment not found' });
        // }

        // let testAccount = await nodemailer.createTestAccount();
        
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "patelpranjal1172@gmail.com",
                pass: process.env.EMAIL_PASSWORD
            }
        });
        console.log(req.body.userEmail)
        const mailOption = {
            from: "patelpranjal1172@gmail.com",
            // to: "pranjaljavia762@gmail.com",
            to: req.body.userEmail,
            subject: "appointment approved",
            text: "Your appointment has been approved",
        }

        transporter.sendMail(mailOption, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log("Email sent: " + info.response);
            }
        });

        // console.log("Message sent: %s", info.messageId);
        return res.status(200).json({ success: true });
    }
    catch(error){
        console.error("Error approving appointment:", error);
        return res.status(500).json({ error: error });
    }
}

module.exports = {
    checkAvailibilityCtrl,
    getAppointmentListCtrl,
    approveAppointmentCtrl
}