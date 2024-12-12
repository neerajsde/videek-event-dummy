const User = require('../../models/user');
const path = require('path');
const fs = require('fs');
const { sendVerificationMail } = require('../../mails/user/VerificationMail');
const mailSender  = require('../../utlis/mailSender');

exports.changeUserProfilePic = async (req, res) => {
    try {
        const { user_id } = req.body;
        const profilePic = req.files?.img;

        if (!profilePic) {
            return res.status(400).json({ success: false, message: 'Please select the Profile Pic' });
        }

        const userDetails = await User.findById(user_id);
        if (!userDetails) {
            return res.status(404).json({ success: false, message: 'User data not found' });
        }

        if (userDetails.user_img && !userDetails.user_img.includes('http')) {
            const oldProfilePath = path.resolve(__dirname, `../${userDetails.user_img.replace('/files/', 'ImagesFiles/')}`);
            if (fs.existsSync(oldProfilePath)) {
                fs.unlinkSync(oldProfilePath);
            }
        }

        const uploadDir = path.resolve(__dirname, '../ImagesFiles');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const timestamp = Date.now();
        const ext = path.extname(profilePic.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        await profilePic.mv(serverFilePath);

        userDetails.user_img = `/files/${imageName}`;
        await userDetails.save();

        res.status(200).json({
            success: true,
            data: userDetails.user_img,
            message: 'Profile Pic updated successfully'
        });
    } catch (err) {
        console.error('Error in change User Profile Pic:', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};


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

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

exports.VerifyUserWithEmail = async (req, res) => {
    try{
        const {userId, email} = req.body;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'Something went wrong'
            })
        }

        if(!validateEmail(email)){
            return res.status(400).json({
                success: false,
                message: 'Please enter vaild email'
            })
        }

        const userData = await User.findById(userId);
        if(!userData){
            return res.status(400).json({
                success: false,
                message: 'user not found'
            })
        }

        const otp = generateHardPassword(6);
        if(userData.email !== email.trim()){
            userData.email = email.trim();
        }
        await userData.save();

        await mailSender(
            email, 
            "Verification mail with OTP", 
            sendVerificationMail(userData.name, otp)
        );

        res.status(200).json({
            success: true,
            otp: otp,
            message: 'OTP Sent Sucessfully'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.verifyOTPandUpdateUser = async(req, res) => {
    try{
        const {userId} = req.body;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'Something went wrong'
            })
        }

        const userData = await User.findById(userId);
        if(!userData){
            return res.status(400).json({
                success: false,
                message: 'user not found'
            })
        }
        userData.isVerified = true;
        await userData.save();
        res.status(200).json({
            success: true,
            message: 'Verified Successfully'
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.updateUserDetails = async(req, res) => {
    try{
        const {userId, name, phone, address, designation} = req.body;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        const userData = await User.findById(userId);
        if(!userData){
            return res.status(400).json({
                success: false,
                message: 'user not found'
            })
        }

        if(name) userData.name = name;
        if(phone) userData.phone = `+91${phone}`;
        if(address) userData.address = address;
        if(designation) userData.designation = designation;
        await userData.save();
        res.status(200).json({
            success: true,
            message: 'Updated Successfully'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}