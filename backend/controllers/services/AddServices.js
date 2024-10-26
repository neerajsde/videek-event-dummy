const Services = require('../../models/services');
const path = require('path');
const fs = require('fs');

exports.AddNewServices = async(req, res) => {
    try{
        const {category, subCategory, name, title, description} = req.body;
        
        const services_img = req.files?.services_img; 
        // Check for required fields
        const requiredFields = ['category', 'subCategory', 'name', 'title', 'description'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field.toUpperCase()}` });
            }
        }

        // Validate the services image
        if (!services_img) {
            return res.status(400).json({ success: false, message: 'Please upload the services image' });
        }

        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '..', 'ImagesFiles');
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Create the file path where the image will be stored on the server
        const timestamp = Date.now();
        const ext = path.extname(services_img.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Image upload path:", serverFilePath);

        // Move the image to the server's files directory
        services_img.mv(serverFilePath, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        const newServices = new Services({
            category, subCategory, name, title, description, img:`/files/${imageName}`
        })

        await newServices.save();
        return res.status(201).json({
            success: true,
            message: 'Service added successfully'
        });

    } catch(err){
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error:err.message
        })
    }
}