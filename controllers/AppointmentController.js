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
            to: "pranjaljavia762@gmail.com",
            // to: req.body.userEmail,
            subject: "appointment approved",
            html: `
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Appointment Approved</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                    h2 {
                        color: #007bff;
                    }
                    p {
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Your Appointment has been Approved!</h2>
                    <p>Dear User,</p>
                    <p>We are pleased to inform you that your appointment has been approved.</p>
                    <p>Please review the details below:</p>
                    <ul>
                        <li><strong>Date:</strong> {{ req.body.date }}</li>
                        <li><strong>Timing:</strong> {{ req.body.timing }}</li>
                    </ul>
                    <p>If you have any questions or concerns, feel free to contact us.</p>
                    <p>Thank you for choosing our services.</p>
                    <p>Best Regards,</p>
                    <p>The Appointment Team</p>
                </div>
            </body>
            </html>            
            `
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

const rejectAppointmentCtrl = async (req, res) => {
    try{
        const appointment = await appointmentModel.findOneAndDelete({
            timing: req.body.timing,
            date: req.body.date,
            docId: req.body.docId,
        });

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
            subject: "appointment rejected",
            text: "Your appointment has been rejected",
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
        console.error("Error rejecting appointment:", error);
        return res.status(500).json({ error: error });
    }
}

module.exports = {
    checkAvailibilityCtrl,
    getAppointmentListCtrl,
    approveAppointmentCtrl,
    rejectAppointmentCtrl
}