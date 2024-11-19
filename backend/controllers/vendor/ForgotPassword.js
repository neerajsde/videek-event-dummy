const Vendor = require('../../models/vendor_category');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailSender = require('../../utlis/mailSender');
const { sendForgotPasswordOTPMail } = require('../../mails/vendor/ForgotOtpMail');

function validateEmail(email) {
    // Regular expression to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the regular expression
    return emailRegex.test(email);
}

function generateHardPassword(length = 6) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '123456789';

    const allCharacters = upper + lower + digits;
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}

exports.sendOtpVendor = async (req, res) => {
    try{
        const { email } = req.body;

        if(!validateEmail(email)){
            return res.status(401).json({
                success: false,
                message:'Invaild Email'
            })
        }
        const isFound = await Vendor.findOne({email: email});
        if(!isFound){
            return res.status(404).json({
                success: false,
                message:'Vendor Not Found'
            })
        }

        const otpCode = generateHardPassword();
        await mailSender(
            isFound.email, 
            "OTP Verification for Reset Password",
            sendForgotPasswordOTPMail(isFound.name, otpCode)
        );    
        return res.status(200).json({
            success:true,
            message:'Otp sent sucessfully',
            otp:otpCode,
        });

    } catch(err){
        console.log('Forgot Password - Vendor Error(OTP): ',err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

function validatePassword(password) {
    // Check if the password meets all criteria
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    if (!password.match(/[a-z]/)) {
        return "Password must contain at least one lowercase letter";
    }

    if (!password.match(/[A-Z]/)) {
        return "Password must contain at least one uppercase letter";
    }

    if (!password.match(/[0-9]/)) {
        return "Password must contain at least one digit";
    }

    if (!password.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
        return "Password must contain at least one special character";
    }

    // If password meets all criteria
    return true;
}

exports.resetVendorPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if(validatePassword(newPassword) !== true){
            return (res.status(402).json({
                success:false,
                message:validatePassword(newPassword)
            }))
        }

        // Find the vendor in the database
        const vendor = await Vendor.findOne({ email: email });
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor Not Found'
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the vendor's password
        vendor.password = hashedPassword;
        await vendor.save();

        // Send response
        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });

    } catch (err) {
        console.error('Forgot Password - Vendor Error: ', err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};