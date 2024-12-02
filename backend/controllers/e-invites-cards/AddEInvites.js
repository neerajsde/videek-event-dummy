const Invitaion = require('../../models/InvitaionCardDummy');
const path = require('path');
const fs = require('fs');

exports.AddNewDummyCard = async(req, res) => {
    try{
        const img = req.files?.img;
        const dummy_img = req.files?.dummy_img;
        if (!img || !dummy_img) {
            return res.status(400).json({ success: false, message: 'Please upload the card image' });
        }

        const uploadDir = path.join(__dirname, '../..', 'E-Invites-Cards');
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        // Create the file path where the image will be stored on the server
        let timestamp = Date.now();
        const ext = path.extname(img.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Image upload path:", serverFilePath);

        // Move the image to the server's files directory
        img.mv(serverFilePath, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        timestamp = Date.now();
        const ext2 = path.extname(dummy_img.name);
        const imageName2 = `${timestamp}${ext2}`;
        const serverFilePath2 = path.join(uploadDir, imageName2);

        console.log("Image upload path:", serverFilePath2);

        // Move the image to the server's files directory
        dummy_img.mv(serverFilePath2, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        const AddNewDummyCard = new Invitaion({
            img: `/files/${imageName}`, dummy_img: `/files/${imageName2}`
        })
        await AddNewDummyCard.save();
        return res.status(201).json({
            success: true,
            message: 'Dummy Invitaion Card Uploaded Successfully'
        });
    }  catch(err){
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error: err.message
        })
    }
}

exports.addUserEInvites = async (req, res) => {
    try{
        const {couple_name,location, date, time,venue_name, description} = req.body;
        const img = req.files?.img;
        const requiredFields = ['couple_name','location', 'date', 'time', 'description', 'venue_name'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field.toUpperCase()}` });
            }
        }
        // Validate the services image
        if (!img) {
            return res.status(400).json({ success: false, message: 'Please upload the card image' });
        }

        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '../..', 'E-Invites-Cards');
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Create the file path where the image will be stored on the server
        const timestamp = Date.now();
        const ext = path.extname(img.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Image upload path:", serverFilePath);

        // Move the image to the server's files directory
        img.mv(serverFilePath, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        const coupleName = couple_name.trim().split('and');
        const splitDate = date.split('-');
        const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
        const AddNewDummyCard = new Invitaion({
            couple_name: `${coupleName[0]} & ${coupleName[1]}`, location, date:formattedDate, time, desc:description, img:`/files/${imageName}`, venue_name
        })

        await AddNewDummyCard.save();
        return res.status(201).json({
            success: true,
            message: 'Dummy Invitaion Card Uploaded Successfully'
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error: err.message
        })
    }
}