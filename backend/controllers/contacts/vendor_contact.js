const VenContact = require('../../models/basic_contact_vendor');
const mailSender = require('../../utlis/mailSender');
const { contactUsMail } = require('../../mails/contact/RequestMail');
const { contactRequestMailToAdmin } = require('../../mails/admins/RequestMail');
require('dotenv').config();

exports.submitVendorContact = async (req, res) => {
    try {
        const { name, email, vendor } = req.body;

        const requiredFields = ['name', 'email', 'vendor'];
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

        await VenContact.create({name, email, vendor});

        // Sending emails
        try {
            await mailSender(
                email,
                "Thank You for Contacting Us",
                contactUsMail(name)
            );

            await mailSender(
                process.env.ADMIN_EMAIL,
                "New Contact Form Submission - Vendor",
                contactRequestMailToAdmin(name, email, vendor)
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