const User = require('../../models/user');
const InvitationCard = require('../../models/InvitaionCard');
const path = require('path');
const fs = require('fs');

exports.saveEInvitesCardToUser = async (req, res) => {
    try {
        const { userId, urls } = req.body;
        const card_img = req.files?.card_img;

        // Validate required fields
        if (!userId || !urls || !card_img) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Define and create the upload directory
        const uploadDir = path.join(__dirname, '../..', 'UserEInvitesCards');
        try {
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
        } catch (err) {
            console.error('Error creating upload directory:', err.stack);
            return res.status(500).json({ success: false, message: 'Failed to create upload directory' });
        }

        // Create the file path for the uploaded image
        const timestamp = Date.now();
        const ext = path.extname(card_img.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("User E-Invites Card upload path:", serverFilePath);

        // Move the image to the server
        await new Promise((resolve, reject) => {
            card_img.mv(serverFilePath, (err) => {
                if (err) reject(err);
                else resolve();
            });
        }).catch((err) => {
            console.error('Error while moving image:', err.stack);
            return res.status(500).json({ success: false, message: 'Image upload failed' });
        });

        // Check if URL exists and update it
        const urlExists = await InvitationCard.findOne({userId: userId});
        let newInvitation = '';
        if (urlExists) {
            newInvitation = await InvitationCard.findByIdAndUpdate(
                urlExists._id,
                {$set: {cardImg: `/files/${imageName}`, url: urls}},
                {new: true}
            )
        } else {
            // Add new E-Invite
            newInvitation = await InvitationCard.create({
                cardImg: `/files/${imageName}`, url: urls, userId: userData._id
            });
            await User.findByIdAndUpdate(
                userId,
                { $push: { EInvites: newInvitation._id } },
                { new: true }
            );
        }

        return res.status(201).json({
            success: true,
            id: newInvitation._id,
            message: 'Saved successfully'
        });
    } catch (err) {
        console.error('E-Invites Cards Uploading Error:', err.stack);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};
