const ReqContact = require('../../models/request_contact');
const mailSender = require('../../utlis/mailSender');
const { contactUsMail } = require('../../mails/contact/RequestMail');
const { contactRequestMailToAdmin } = require('../../mails/admins/RequestMail');
require('dotenv').config();

exports.submitRequestContact = async (req, res) => {
    try {
        const { name, country_code,  phone, email, function_date, message } = req.body;

        const requiredFields = ['name', 'phone', 'email', 'function_date', 'message'];
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

        await ReqContact.create({ name, phone:`${country_code} ${phone}`, email, function_date, message });

        // Sending emails
        try {
            await mailSender(
                email,
                "Thank You for Contacting Us",
                contactUsMail(name)
            );

            await mailSender(
                process.env.ADMIN_EMAIL,
                "New Contact Form Submission",
                contactRequestMailToAdmin(name, email, message)
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