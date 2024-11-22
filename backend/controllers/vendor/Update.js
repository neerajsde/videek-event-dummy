const Vendor = require('../../models/vendor_category');
const FAQs = require('../../models/sub-models/faq');
const path = require('path');
const fs = require('fs');

exports.addFAQIntoVendor = async (req, res) => {
    try {
        const { user_id, question, answere } = req.body;

        // Check if required fields are provided
        if (!user_id || !question || !answere) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Find vendor by ID
        const isFound = await Vendor.findById(user_id);
        if (!isFound) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found'
            });
        }

        // Create new FAQ
        const newFAQ = await FAQs.create({
            question,
            answere
        });

        // Push new FAQ into vendor's FAQs array
        const addNewFAQ = await Vendor.findByIdAndUpdate(
            user_id,
            { $push: { FAQs: newFAQ._id } },
            { new: true }
        );

        if (!addNewFAQ) {
            return res.status(500).json({
                success: false,
                message: 'Failed to add FAQ to vendor'
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

exports.deleteFAQFromVendor = async (req, res) => {
    try {
        const { vendor_id, faq_id } = req.body;

        // Check if required fields are provided
        if (!vendor_id || !faq_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Find the vendor by ID
        const vendor = await Vendor.findById(vendor_id);
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found'
            });
        }

        // Remove the FAQ reference from the vendor's FAQs array
        const updatedVendor = await Vendor.findByIdAndUpdate(
            vendor_id,
            { $pull: { FAQs: faq_id } },  // Remove the FAQ reference
            { new: true }                 // Return the updated document
        );

        if (!updatedVendor) {
            return res.status(500).json({
                success: false,
                message: 'Failed to remove FAQ from vendor'
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
            data: updatedVendor
        });

    } catch (err) {
        // Handle any server errors
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.updateFAQInVendor = async (req, res) => {
    try {
        const { vendor_id, faq_id, question, answere } = req.body;

        // Check if required fields are provided
        if (!vendor_id || !faq_id || !question || !answere) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Find the vendor by ID
        const vendor = await Vendor.findById(vendor_id);
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found'
            });
        }

        // Check if the FAQ exists in the vendor's FAQs array
        if (!vendor.FAQs.includes(faq_id)) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found in this vendor'
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

exports.uploadVendorAlbumImg = async (req, res) => {
    try {
        const { id } = req.body;
        const img = req.files?.img;

        // Check for required fields
        if (!id) {
            return res.status(400).json({ success: false, message: 'Please enter id' });
        }

        const findGallery = await Vendor.findById(id);
        if (!findGallery) {
            return res.status(404).json({ success: false, message: 'Not Found' });
        }

        // Validate the services image
        if (!img) {
            return res.status(400).json({ success: false, message: 'Please select an image' });
        }

        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '../..', 'VendorAlbum');

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
        await Vendor.findByIdAndUpdate(
            id,
            { $push: { albums: `/files/${imageName}` } },
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

function isValidYouTubeUrl(url) {
    // Regular expression to match various YouTube URL formats
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})(.*)?$/;

    // Test the URL against the regex
    return youtubeRegex.test(url);
}

exports.addVideoLinks = async (req, res) => {
    try{
        const { vendor_id, url } = req.body;
        if(!vendor_id){
            return res.status(404).json({
                success: false,
                message: 'Vendor id required'
            })
        }
        if(!url){
            return res.status(404).json({
                success: false,
                message: 'url required'
            })
        }
        if(!isValidYouTubeUrl(url)){
            return res.status(404).json({
                success: false,
                message: 'Please enter Vaild URL'
            })
        }
        const updateVendor = await Vendor.findByIdAndUpdate(
            vendor_id,
            {$push: {youtube_links: url }},
            {new: true}
        )
        if(updateVendor){
            res.status(200).json({
                success: true,
                message:'Video link added successfully'
            })
        }
        else{
            res.status(300).json({
                success: false,
                message:'something went wrong'
            })
        }
    } catch(err){
        console.log('Error while adding YT Video Link From Vendor: ', err.message);
        res.status(500).json({
            success: false,
            message:'Internal server error',
            error:err.message
        })
    }
}


exports.deleteVideoLink = async (req, res) => {
    try {
        const { vendor_id, url } = req.body;

        // Validate inputs
        if (!vendor_id) {
            return res.status(404).json({
                success: false,
                message: 'Vendor id required',
            });
        }
        if (!url) {
            return res.status(404).json({
                success: false,
                message: 'URL required',
            });
        }

        // Find vendor and remove the specific URL from the youtube_links array
        const updatedVendor = await Vendor.findByIdAndUpdate(
            vendor_id,
            { $pull: { youtube_links: url } },
            { new: true }
        );

        if (updatedVendor) {
            res.status(200).json({
                success: true,
                message: 'Video link deleted successfully',
                data: updatedVendor,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Vendor not found or URL does not exist',
            });
        }
    } catch (err) {
        console.error('Error while deleting YT Video Link for Vendor: ', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
};
