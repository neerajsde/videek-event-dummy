const ContactUs = require('../../models/contact');
const mailSender = require('../../utlis/mailSender');
const { contactUsMailToUser } = require('../../mails/contact/SendToUser');
const { notifyAdminMail } = require('../../mails/admins/NotifyMail');
const json2xls = require('json2xls');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

exports.submitContact = async (req, res) => {
    try {
        const { name, phone, email, subject, message } = req.body;

        const requiredFields = ['name', 'phone', 'email', 'subject', 'message'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field.toUpperCase()}` });
            }
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
        }

        await ContactUs.create({ name, phone:`+91${phone}`, email, subject, message });

        // Sending emails
        try {
            await mailSender(
                email,
                "Thank You for Contacting Us",
                contactUsMailToUser(name)
            );

            await mailSender(
                process.env.ADMIN_EMAIL,
                "New Contact Form Submission",
                notifyAdminMail(name, email, message)
            );
        } catch (emailError) {
            console.error('Error sending email:', emailError.message);
            return res.status(500).json({
                success: false,
                message: 'Error sending emails.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Submitted Successfully'
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};

function getISTDateAndTime(createdAt) {
    // Parse the ISO date
    const date = new Date(createdAt);

    // Convert to IST using locale and timezone
    const options = { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    const formatter = new Intl.DateTimeFormat("en-IN", options);
    
    // Split the formatted date and time
    const formattedDateTime = formatter.format(date);
    const [datePart, timePart] = formattedDateTime.split(", ");

    return {
        date: datePart.replaceAll("/", "-"), // Convert MM/DD/YYYY to DD/MM/YYYY
        time: timePart
    };
}

exports.downloadContactUsData = async (req, res) => {
    try {
        const AllData = await ContactUs.find();
        
        if(AllData.length === 0){
            return res.status(404).json({
                success: false,
                message: 'Empty Contact Us Data',
            });
        }
        const data = [];
        for(let i=0; i<AllData.length; i++){
            const {date, time} = getISTDateAndTime(AllData[i].createdAt);
            data.push({
                Name:AllData[i].name,
                Email:AllData[i].email,
                Phone:AllData[i].phone,
                Date: date,
                Time: time,
                Subject:AllData[i].subject,
                Message:AllData[i].message
            });
        }

        const xls = json2xls(data);
        const uploadDir = path.join(__dirname,'../..', 'uploads');

        // Create upload directory if it does not exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, 'contact-us.xlsx');

        // Write the Excel file
        fs.writeFileSync(filePath, xls, 'binary');

        // Send the Excel file as a response
        res.download(filePath, 'contact-us.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err.message);
                return res.status(500).json({
                    success: false,
                    message: 'Error sending file.',
                });
            }

            // Optionally delete the file after sending
            fs.unlink(filePath, (unlinkError) => {
                if (unlinkError) {
                    console.error('Error deleting file:', unlinkError.message);
                }
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};
