const Venue = require('../../models/venue');
const path = require('path');
const fs = require('fs');

exports.getVenueCategoryWithUnique = async (req, res) => {
    try{
        let AllVenue = await Venue.find();

        if (AllVenue.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        const uniqueCategories = [...new Set(AllVenue.map(venue => venue.type))];

        res.status(200).json({
            success: true,
            message: 'Venue found',
            data: uniqueCategories
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

exports.AddNewVenue = async(req, res) => {
    try{
        const {category, name, phone, whatsapp, email, description, location, price, rooms} = req.body;
        
        const venue_img = req.files?.img; 
        // Check for required fields
        const requiredFields = ['category','name', 'phone', 'whatsapp', 'email', 'description', 'location', 'price', 'rooms'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field.toUpperCase()}` });
            }
        }

        // Validate the services image
        if (!venue_img) {
            return res.status(400).json({ success: false, message: 'Please upload the vendor image' });
        }

        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '../..', 'VenueImages');
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Create the file path where the image will be stored on the server
        const timestamp = Date.now();
        const ext = path.extname(venue_img.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Image upload path:", serverFilePath);

        // Move the image to the server's files directory
        venue_img.mv(serverFilePath, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        const newVenue = new Venue({
            type:category, name, phone:`+91${phone}`, whatsapp:`+91${whatsapp}`, email, description, img:`/files/${imageName}`, location, rooms, price_range:price
        })
        await newVenue.save();

        return res.status(201).json({
            success: true,
            message: 'Venue added successfully'
        });

    } catch(err){
        console.log('Venue Add, While Error: ', err.message)
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error:err.message
        })
    }
}