const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
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
                year: req.body.year.toString(),
                month: req.body.month,
                day: req.body.day
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
    const date = req.body.date;
    const time = req.body.timing;
    const userEmail = req.body.userEmail;
    const docId = req.body.docId;

    try{
        //for updating status of appointment
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

        //for getting user name using userEmail
        const user = await userModel.findOne({email: userEmail});
        const userName = user.name;
        
        //for getting doctor name using docId
        const doctor = await doctorModel.findOne({_id: docId});
        const FirstDocName = doctor.firstName;
        const LastDocName = doctor.lastName; 

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
        const mailOption = {
            from: "patelpranjal1172@gmail.com",
            // to: "pranjaljavia762@gmail.com",
            to: req.body.userEmail,
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
                    <p>Dear ${userName},</p>
                    <p>We are pleased to inform you that your appointment for <strong>Dr. ${FirstDocName} ${LastDocName}</strong> has been approved.</p>
                    <p>Please review the details below:</p>
                    <ul>
                        <li><strong>Date:</strong> ${date}</li>
                        <li><strong>Timing:</strong> ${time}</li>
                    </ul>
                    <p>If you have any questions or concerns, feel free to contact us.</p>
                    <p>Thank you for choosing our services.</p>
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
        
        return res.status(200).json({ success: true, message: `${userName}'s appointment approved` });
    }
    catch(error){
        console.error("Error approving appointment:", error);
        return res.status(500).json({ error: error });
    }
}

//for rejecting appointment
const rejectAppointmentCtrl = async (req, res) => {
    const date = req.body.date;
    const time = req.body.timing;
    const userEmail = req.body.userEmail;
    const docId = req.body.docId;

    try{
        const appointment = await appointmentModel.findOneAndDelete({
            timing: req.body.timing,
            date: req.body.date,
            docId: req.body.docId,
        });

        //for getting user name using userEmail
        const user = await userModel.findOne({email: userEmail});
        const userName = user.name;
        
        //for getting doctor name using docId
        const doctor = await doctorModel.findOne({_id: docId});
        const FirstDocName = doctor.firstName;
        const LastDocName = doctor.lastName; 

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
            html : `
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Appointment Rejected</title>
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
                        color: #ff0000; /* Red color for emphasis */
                    }
                    p {
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Appointment Rejected</h2>
                    <p>Dear ${userName},</p>
                    <p>We regret to inform you that your appointment with <strong>Dr. ${FirstDocName} ${LastDocName}</strong> cannot be approved at this time due to the doctor's busy schedule.</p>
                    <p>The appointment was scheduled for:</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Time:</strong> ${time}</p>
                    <p>Please consider rescheduling your appointment or contacting us for further assistance.</p>
                    <p>We apologize for any inconvenience this may cause.</p>
                    <p>Thank you for your understanding.</p>
                    <p>The Appointment Team</p>
                </div>
            </body>
            </html>            
            `,
        }

        transporter.sendMail(mailOption, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log("Email sent: " + info.response);
            }
        });

        // console.log("Message sent: %s", info.messageId);
        return res.status(200).json({ success: true, message: `${userName}'s appointment rejected` });
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