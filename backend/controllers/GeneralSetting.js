const GeneralSettings = require('../models/general_settings');
const path = require('path');
const fs = require('fs');

exports.getGeneralSettings = async (req, res) => {
    try{
        const webData = await GeneralSettings.find();
        if(webData.length < 0){
            return res.status(404).json({
                success: false,
                message: 'Please Add General data'
            });
        }

        res.status(200).json({
            success: true,
            data: webData[0],
            message: 'Settings loaded successfully'
        });
    } catch (err) {
        console.error('Error in Getting GeneralSettings:', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
}

exports.submitGeneralSettings = async (req, res) => {
    try {
        const {
            title,
            email,
            alt_email,
            phone,
            whatsapp,
            fb_url,
            ins_url,
            twi_url,
            yt_url,
            address,
            meta_keywords,
            meta_desc,
            google_analytics,
            facebook_analytics
        } = req.body;

        console.log(req.body);

        // Check if the settings record exists
        const existingSettings = await GeneralSettings.findOne();

        if (existingSettings) {
            // Update the existing record
            const updatedSettings = await GeneralSettings.findByIdAndUpdate(
                existingSettings._id,
                {
                    title,
                    email,
                    alt_email,
                    phone,
                    whatsapp,
                    fb_url,
                    ins_url,
                    twi_url,
                    yt_url,
                    address,
                    meta_keywords,
                    meta_desc,
                    google_analytics,
                    facebook_analytics
                },
                { new: true, runValidators: true }
            );

            return res.status(200).json({
                success: true,
                data: updatedSettings,
                message: 'Settings updated successfully'
            });
        }

        // Create a new record
        const newSettings = await GeneralSettings.create({
            title,
            email,
            alt_email,
            phone,
            whatsapp,
            fb_url,
            ins_url,
            twi_url,
            yt_url,
            address,
            meta_keywords,
            meta_desc,
            google_analytics,
            facebook_analytics
        });

        res.status(201).json({
            success: true,
            data: newSettings,
            message: 'Settings created successfully'
        });
    } catch (err) {
        console.error('Error in submitGeneralSettings:', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};

exports.changeLogo = async (req, res) => {
    try {
        const logo = req.files?.img;

        // Check for required fields
        if (!logo) {
            return res.status(400).json({ success: false, message: 'Please select the logo' });
        }

        // Find the general settings document
        const generalSettings = await GeneralSettings.findOne();
        if (!generalSettings) {
            return res.status(404).json({ success: false, message: 'General settings not found' });
        }

        // Remove the existing logo file if it exists
        if (generalSettings.logo) {
            const oldLogoPath = path.join(__dirname, '..', generalSettings.logo.replace('/files/', 'imp-photos/'));
            if (fs.existsSync(oldLogoPath)) {
                fs.unlinkSync(oldLogoPath);
            }
        }

        // Define the directory where the new logo will be saved
        const uploadDir = path.join(__dirname, '..', 'imp-photos');

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Create the file path where the logo will be stored
        const ext = path.extname(logo.name);
        const imageName = `logo${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Logo path:", serverFilePath);

        // Move the logo to the server's files directory
        await logo.mv(serverFilePath);

        // Update the logo path in the database
        generalSettings.logo = `/files/${imageName}`;
        await generalSettings.save();

        res.status(200).json({
            success: true,
            data: generalSettings,
            message: 'Logo updated successfully'
        });
    } catch (err) {
        console.error('Error in changeLogo:', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};
