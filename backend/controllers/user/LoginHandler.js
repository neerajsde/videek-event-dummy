const user = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../../utlis/mailSender');
const { sendUserWelcomeMail } = require('../../mails/user/WelcomeMail');
require('dotenv').config();
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
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
    return true;
}
function generateHardPassword(length = 8) {
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

exports.loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!validateEmail(email)) {
            return res.status(401).json({
                success: false,
                tag: 'email',
                message: 'Invalid email'
            });
        }

        const passwordValidation = validatePassword(password);
        if (passwordValidation !== true) {
            return res.status(402).json({
                success: false,
                tag: 'password',
                message: passwordValidation
            });
        }

        let userData = null;
        const findExistUser = await user.findOne({ email });

        if (findExistUser) {
            try {
                const isValidPass = await bcrypt.compare(password, findExistUser.password);
                if (!isValidPass) {
                    return res.status(401).json({
                        success: false,
                        tag: 'password',
                        message: "Wrong password"
                    });
                } else {
                    userData = findExistUser;
                }
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    tag: 'error',
                    message: "Something went wrong"
                });
            }
        } else {
            const name = email.split('@')[0];
            const img = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;
            let hashPassword = '';
            try {
                hashPassword = await bcrypt.hash(password, 10);
            } catch (err) {
                return res.status(408).json({
                    success: false,
                    tag: 'password',
                    message: err.message
                });
            }
            userData = await user.create({
                name: name, email, password: hashPassword, user_img: img
            });

            await mailSender(
                userData.email, 
                "Welcome", 
                sendUserWelcomeMail(userData.name)
            );
        }

        const payload = {
            id: userData._id,
            name: userData.name,
            email: userData.email,
        };

        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "10d"
        });

        await user.findByIdAndUpdate(
            userData._id,
            { token: token },
            { new: true }
        );

        const options = {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.cookie("DJevents", token, options);
        res.status(200).json({
            success: true,
            token,
            user_id: userData._id,
            message: 'Logged In successfully'
        });
        console.log("User Logged In Successfully: email- ", userData.email);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Endpoint to send OTP
exports.loginWithMobile = async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }

    try {
        // Check if user exists
        let userData = await user.findOne({ phone: phoneNumber });

        if (!userData) {
            const name = 'unknown';
            const img = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

            userData = await user.create({
                name: name,
                phone: phoneNumber,
                user_img: img,
            });
        }

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Send OTP via Twilio
        try{
            const message = await client.messages.create({
                body: `Your OTP is: ${otp}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber,
            });
            console.log('Message SID:', message.sid);
        } catch(err){
            return res.status(500).json({ success: false, message: 'OTP Not Sent'});
        }

        // Generate JWT token
        const payload = {
            id: userData._id,
            name: userData.name,
            mobile: userData.phone,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '10d',
        });

        await user.findByIdAndUpdate(userData._id, { token: token }, { new: true });

        // Set cookie
        const options = {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie('DJevents', token, options);

        // Return response
        res.status(200).json({
            success: true,
            token,
            user_id: userData._id,
            otp: otp,
            message: 'Logged In successfully',
        });

        console.log('User Logged In Successfully: mobile- ', userData.phone);
    } catch (error) {
        console.error('User Error in loginWithMobile:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};


exports.getUserDetails = async (req, res) => {
    try {
        const { token } = req.body;

        const userData = await user.find({ token });

        // Check if admin data was found
        if (!userData || userData.length === 0) {
            return res.status(301).json({
                success: false,
                message: 'Token not valid'
            });
        }

        // Remove sensitive fields from the admin data
        const adminDetails = { ...userData[0]._doc };

        const newData = {
            user_id: adminDetails._id,
            name: adminDetails.name,
            user_img: adminDetails.user_img,
            email: adminDetails.email,
            mobile: adminDetails.phone
        }

        // Send a successful response with the admin data
        res.status(200).json({
            success: true,
            userData: newData,
            message: 'User data fetched'
        });
    } catch (err) {
        // Handle errors and return a 500 response
        res.status(500).json({
            success: false,
            message: err.message // Fix typo here
        });
    }
};