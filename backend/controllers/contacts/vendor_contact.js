const VenContact = require('../../models/basic_contact_vendor');
const User = require('../../models/user');
const Vendor = require('../../models/vendor_category');
const mailSender = require('../../utlis/mailSender');
const { contactUsMail } = require('../../mails/contact/RequestMail');
const { vendorNotificationMail } = require('../../mails/contact/VendorContactUsMail');
require('dotenv').config();

exports.submitVendorContact = async (req, res) => {
    try {
        const { name, email, phone, vendor, userId } = req.body;

        const requiredFields = ['name', 'email', 'phone','vendor', 'userId'];
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

        await VenContact.create({
            name, 
            email, 
            phone: `+91${phone}`,
            category:vendor,
            user: userId
        });

        const userData = await User.findById(userId);
        if(name !== userData.name){
            await User.findByIdAndUpdate(
                userId,
                {$set: {name: name}},
                {new: true}
            )
        }
        if(userData.phone === ''){
            await User.findByIdAndUpdate(
                userId,
                {$set: {phone: `+91${phone}`}},
                {new: true}
            )
        }
        if(userData.email === ''){
            await User.findByIdAndUpdate(
                userId,
                {$set: {email: email}},
                {new: true}
            )
        }

        let AllVendors = await Vendor.find({category: vendor});
        
        // Sending emails
        try {
            for(let i=0; i<AllVendors.length; i++){
                await mailSender(
                    AllVendors[i].email,
                    "New Contact Form Submission From Vimoo Wed",
                    vendorNotificationMail(AllVendors[i].name)
                );
            }
            await mailSender(
                email,
                "Thank You for Contacting Us",
                contactUsMail(name)
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