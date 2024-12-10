const Contact = require('../../models/contact');
const VendorContact = require('../../models/basic_contact_vendor');
const Vendor = require('../../models/vendor_category');
const mailSender = require('../../utlis/mailSender');
const { contactUsMailToUser } = require('../../mails/contact/SendToUser');
const { notifyAdminMail } = require('../../mails/admins/NotifyMail');
const { vendorNotificationMail } = require('../../mails/contact/VendorContactUsMail');
require('dotenv').config();

exports.submitRequestContact = async (req, res) => {
    try {
        const { userId, name, country_code,  phone, email, function_date, message, vendorName, vendorCategory } = req.body;

        const requiredFields = ['userId','name', 'phone', 'email', 'function_date', 'message', 'vendorName', 'vendorCategory'];
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

        await VendorContact.create({
            name, 
            email, 
            phone: `${country_code}${phone}`,
            category: vendorCategory,
            user: userId
        });

        let AllVendors = await Vendor.find({category: vendorCategory});
        
        // Sending emails
        try {
            for(let i=0; i<AllVendors.length; i++){
                await mailSender(
                    AllVendors[i].email,
                    "New Contact Form Submission From Vimoo Wed",
                    vendorNotificationMail(AllVendors[i].name)
                );
            }
        } catch (emailError) {
            console.error('Error sending email:', emailError.message);
            return res.status(500).json({
                success: false,
                message: 'Error sending emails.',
            });
        }

        await Contact.create({ name, phone:`${country_code}${phone}`, email, subject:`Contact Regarding Vendor "${vendorName}" (${vendorCategory}) - Required on ${function_date}`, message });

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