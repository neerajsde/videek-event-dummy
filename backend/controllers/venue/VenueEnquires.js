const VenueEnquiery = require('../../models/venue_enquiry');
const User = require('../../models/user');
const Venue = require('../../models/venue');
const { notifyAdminMail } = require('../../mails/admins/NotifyAdminMail');
const { notifyUserMail } = require('../../mails/user/NotifyVenueMail');
const mailSender = require('../../utlis/mailSender');
require('dotenv').config();

exports.submitVenueEnquires = async (req, res) => {
    try{
        const {venueId, userId} = req.body;
        if(!venueId || !userId){
            return res.status(400).json({
                success: false,
                message:'Something went wrong'
            })
        }

        const userData = await User.findById(userId);
        if(!userData){
            return res.status(400).json({
                success: false,
                message:'user data not found'
            })
        }

        const venueData = await Venue.findById(venueId);
        if(!venueData){
            return res.status(400).json({
                success: false,
                message:'venue data not found'
            })
        }

        const newContact = await VenueEnquiery.create({
            user_name: userData.name,
            email: userData.email ? userData.email : 'none',
            phone: userData.phone ? userData.phone : 'none',
            venue_name: venueData.name,
            venue_location: venueData.location
        })

        if(userData.email){
            await mailSender(
                userData.email,
                `Thank You for choosing ${venueData.name}, Venue`,
                notifyUserMail(userData.name, venueData.name)
            );

            await mailSender(
                process.env.ADMIN_EMAIL,
                `New Contact for Venue - ${venueData.name},`,
                notifyAdminMail(userData.name, userData.email, venueData.name)
            );
        }

        res.status(200).json({
            success: true,
            message: 'Sent Successfully'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}