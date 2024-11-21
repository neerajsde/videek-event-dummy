const Testimonial = require('../../models/testimonial');
const User = require('../../models/user');
const { notifyAdminTestimonialMail } = require('../../mails/admins/TestimonalMail');
const { sendThankYouMail } = require('../../mails/user/ThankYouMail');
const { sendUserWelcomeMail } = require('../../mails/user/WelcomeMail');
const mailSender = require('../../utlis/mailSender');

exports.AddNewTestimonials = async (req, res) => {
    try {
        const { user_id, email, name, designation, message } = req.body;

        // If user_id does not exist, create a new user and add testimonial
        if (!user_id) {
            const requiredFields = ['email', 'name', 'designation', 'message'];
            for (const field of requiredFields) {
                if (!req.body[field]) {
                    return res.status(400).json({
                        success: false,
                        message: `Please fill in the ${field.toUpperCase()}`,
                    });
                }
            }

            const FindExistsUser = await User.findOne({email: email});
            if(FindExistsUser){
                return res.status(400).json({
                    success: false,
                    message: `Please try another email`,
                });
            }

            // Create new user
            const newUser = await User.create({
                name: name,
                email: email,
                designation,
                user_img: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
            });

            // Send welcome email to user
            await mailSender(email, "Welcome", sendUserWelcomeMail(name));

            // Create testimonial for the new user
            await Testimonial.create({
                user_id: newUser._id,
                message: message
            });

            // Send thank you email to user
            await mailSender(email, "Thank You", sendThankYouMail(name));

            // Send testimonial notification email to admin
            await mailSender(
                process.env.ADMIN_EMAIL,  // Make sure to use the admin email here
                "New Testimonial Review Submitted",
                notifyAdminTestimonialMail(name, email, message)
            );

            return res.status(200).json({
                success: true,
                message: 'Testimonial submitted successfully.'
            });
        }

        // If user_id exists, add testimonial for the existing user
        if (user_id) {
            const existingUser = await User.findById(user_id);
            
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Your data not found.'
                });
            }

            if(existingUser.designation === ''){
                await User.findByIdAndUpdate(
                    user_id,
                    {$set: {designation: designation}},
                    {new: true}
                )
            }

            // Create testimonial for the existing user
            await Testimonial.create({
                user_id: user_id,
                message: message
            });

            // Send thank you email to the user
            await mailSender(existingUser.email, "Thank You", sendThankYouMail(existingUser.name));

            // Send testimonial notification email to admin
            await mailSender(
                process.env.ADMIN_EMAIL,  // Send email to admin
                "New Testimonial Review Submitted",
                notifyAdminTestimonialMail(existingUser.name, existingUser.email, message)
            );

            return res.status(200).json({
                success: true,
                message: 'Testimonial submitted successfully.'
            });
        }

        // Catch-all error response
        return res.status(400).json({
            success: false,
            message: 'Invalid request.'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
