const Gallery = require('../../models/gallery');
const path = require('path');
const fs = require('fs');

exports.uploadGalleryImg = async (req, res) => {
    try {
        const { id } = req.body;
        const img = req.files?.img;

        // Check for required fields
        if (!id) {
            return res.status(400).json({ success: false, message: 'Please enter id' });
        }

        const findGallery = await Gallery.findById(id);
        if (!findGallery) {
            return res.status(404).json({ success: false, message: 'Not Found' });
        }

        // Validate the services image
        if (!img) {
            return res.status(400).json({ success: false, message: 'Please select an image' });
        }

        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '../..', 'Gallery');

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
        await img.mv(serverFilePath);

        // Update the gallery with the image path
        await Gallery.findByIdAndUpdate(
            id,
            { $push: { images: `/files/${imageName}` } },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully'
        });

    } catch (err) {
        console.log('Image Uploading Error: ', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};
