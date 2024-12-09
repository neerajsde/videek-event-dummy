const Venue = require('../../models/venue');
const FAQs = require('../../models/sub-models/faq');
const path = require('path');
const fs = require('fs');

exports.addFAQIntoVenue = async (req, res) => {
    try {
        const { user_id, question, answere } = req.body;

        // Check if required fields are provided
        if (!user_id || !question || !answere) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Find venue by ID
        const isFound = await Venue.findById(user_id);
        if (!isFound) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        // Create new FAQ
        const newFAQ = await FAQs.create({
            question,
            answere
        });

        // Push new FAQ into venue's FAQs array
        const addNewFAQ = await Venue.findByIdAndUpdate(
            user_id,
            { $push: { FAQs: newFAQ._id } },
            { new: true }
        );

        if (!addNewFAQ) {
            return res.status(500).json({
                success: false,
                message: 'Failed to add FAQ to venue'
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            message: 'FAQ added successfully',
            data: addNewFAQ
        });
    } catch (err) {
        // Handle any server errors
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.deleteFAQFromVenue = async (req, res) => {
    try {
        const { venue_id, faq_id } = req.body;

        // Check if required fields are provided
        if (!venue_id || !faq_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Find the venue by ID
        const venue = await Venue.findById(venue_id);
        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        // Remove the FAQ reference from the venue's FAQs array
        const updatedVenue = await Venue.findByIdAndUpdate(
            venue_id,
            { $pull: { FAQs: faq_id } },  // Remove the FAQ reference
            { new: true }                 // Return the updated document
        );

        if (!updatedVenue) {
            return res.status(500).json({
                success: false,
                message: 'Failed to remove FAQ from venue'
            });
        }

        // Delete the FAQ document from the FAQs collection
        const deletedFAQ = await FAQs.findByIdAndDelete(faq_id);
        if (!deletedFAQ) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found'
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            message: 'FAQ deleted successfully',
            data: updatedVenue
        });

    } catch (err) {
        // Handle any server errors
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.updateFAQInVenue = async (req, res) => {
    try {
        const { venue_id, faq_id, question, answere } = req.body;

        // Check if required fields are provided
        if (!venue_id || !faq_id || !question || !answere) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Find the Venue by ID
        const venue = await Venue.findById(venue_id);
        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        // Check if the FAQ exists in the Venue's FAQs array
        if (!venue.FAQs.includes(faq_id)) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found in this venue'
            });
        }

        // Update the FAQ in the FAQs collection
        const updatedFAQ = await FAQs.findByIdAndUpdate(
            faq_id,
            { question, answere },
            { new: true }
        );

        if (!updatedFAQ) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found'
            });
        }

        // Success response with the updated FAQ
        res.status(200).json({
            success: true,
            message: 'FAQ updated successfully',
            data: updatedFAQ
        });
    } catch (err) {
        // Handle any server errors
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.uploadVenueAlbumImg = async (req, res) => {
    try {
        const { id } = req.body;
        const img = req.files?.img;

        // Check for required fields
        if (!id) {
            return res.status(400).json({ success: false, message: 'Please enter id' });
        }

        const findGallery = await Venue.findById(id);
        if (!findGallery) {
            return res.status(404).json({ success: false, message: 'Not Found' });
        }

        // Validate the services image
        if (!img) {
            return res.status(400).json({ success: false, message: 'Please select an image' });
        }

        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '../..', 'VenueImages');

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
        const upadtedData = await Venue.findByIdAndUpdate(
            id,
            { $push: { albums: `/files/${imageName}` } },
            { new: true }
        );

        res.status(201).json({
            success: true,
            data: {
                id: upadtedData._id,
                venue_name: upadtedData.name,
                images: upadtedData.albums
            },
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


exports.deleteVenueAlbumImg = async (req, res) => {
    try {
        const { id, imgPath } = req.body;

        // Check for required fields
        if (!id || !imgPath) {
            return res.status(400).json({ success: false, message: 'Please provide id and imgPath' });
        }

        // Find the venue
        const findGallery = await Venue.findById(id);
        if (!findGallery) {
            return res.status(404).json({ success: false, message: 'Venue not found' });
        }

        // Check if the image exists in the venue's album
        const imgIndex = findGallery.albums.indexOf(imgPath);
        if (imgIndex === -1) {
            return res.status(404).json({ success: false, message: 'Image not found in the album' });
        }

        // Remove the image from the album array
        findGallery.albums.splice(imgIndex, 1);
        await findGallery.save();

        // Construct the server file path
        const serverFilePath = path.join(__dirname, '../..', imgPath.replace('/files/', 'VenueImages/'));

        // Remove the file from the server
        if (fs.existsSync(serverFilePath)) {
            fs.unlinkSync(serverFilePath);
        }

        res.status(200).json({
            success: true,
            data: {
                id: findGallery._id,
                venue_name: findGallery.name,
                images: findGallery.albums
            },
            message: 'Image deleted successfully'
        });

    } catch (err) {
        console.log('Image Deletion Error: ', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};


exports.UpdateVenueDetailsFormAdmin = async(req, res) => {
    try{
        const {venue_id, type, name, phone, whatsapp, email, location, description, price, rooms} = req.body;
        
        const venue_img = req.files?.img; 
        // Check for required fields
        const requiredFields = ['venue_id','type', 'name', 'phone', 'whatsapp', 'email', 'location', 'description', 'price', 'rooms'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field.toUpperCase()}` });
            }
        }

        // Validate the services image
        let imageName = '';
        if (venue_img) {
            const uploadDir = path.join(__dirname, '../..', 'VenueImages');
        
            // Check if the directory exists, if not, create it
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Create the file path where the image will be stored on the server
            const timestamp = Date.now();
            const ext = path.extname(venue_img.name);
            imageName = `${timestamp}${ext}`;
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
        }
        
        if(venue_img && imageName !== ''){
            await Venue.findByIdAndUpdate(
                venue_id,
                {$set: {name: name,type:type, phone:phone, whatsapp: whatsapp, email:email, location:location, rooms:rooms, description:description, price_range:price, img:`/files/${imageName}`}},
                {new: true}
            )
        }
        else{
            await Venue.findByIdAndUpdate(
                venue_id,
                {$set: {name: name, type:type, phone:phone, whatsapp: whatsapp, email:email,location:location, rooms:rooms, description:description, price_range:price}},
                {new: true}
            )
        }

        return res.status(201).json({
            success: true,
            message: 'Venue updated successfully'
        });

    } catch(err){
        console.log('Venue Updation Error: ', err.message)
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error:err.message
        })
    }
}