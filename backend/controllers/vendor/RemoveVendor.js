const Vendor = require('../../models/vendor_category');
const Reviews = require('../../models/sub-models/reviews');
const FAQ = require('../../models/sub-models/faq');
const path = require('path');
const fs = require('fs').promises; // Use the promise-based version for async operations

// Function to delete an image
const deleteImg = async (imgName) => {
    try {
        const imagePath = path.join(__dirname, '../..', 'VendorAlbum', path.basename(imgName));

        // Check if the image exists and delete it
        try {
            await fs.access(imagePath); // Check if the file exists
            await fs.unlink(imagePath); // Delete the file
            console.log(`Image file deleted: ${imagePath}`);
        } catch (err) {
            console.log(`Image file not found or could not be deleted: ${imagePath}`, err.message);
        }
    } catch (err) {
        console.log('Error deleting image:', err.message);
    }
};

exports.RemoveVendorById = async (req, res) => {
    try {
        const { vendorId } = req.params;

        if (!vendorId) {
            return res.status(400).json({ success: false, message: 'Vendor ID is required' });
        }

        // Find the vendor by ID
        const vendor = await Vendor.findById(vendorId);

        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }

        // Get and delete vendor images
        const images = [vendor.img, vendor.user_img].filter(Boolean); // Ensure they are defined
        for (const image of images) {
            const imagePath = path.join(__dirname, '..', 'ImagesFiles', path.basename(image));
            try {
                await fs.access(imagePath);
                await fs.unlink(imagePath);
                console.log(`Image file deleted: ${imagePath}`);
            } catch (err) {
                console.log(`Image file not found: ${imagePath}`, err.message);
            }
        }

        // Remove associated reviews and FAQs
        if (Array.isArray(vendor.reviews)) {
            await Promise.all(vendor.reviews.map((reviewId) => Reviews.findByIdAndDelete(reviewId)));
        }
        if (Array.isArray(vendor.FAQs)) {
            await Promise.all(vendor.FAQs.map((faqId) => FAQ.findByIdAndDelete(faqId)));
        }

        // Remove associated album images
        if (Array.isArray(vendor.albums)) {
            await Promise.all(vendor.albums.map((albumImg) => deleteImg(albumImg)));
        }

        // Remove the vendor from the database
        await Vendor.findByIdAndDelete(vendorId);

        return res.status(200).json({
            success: true,
            message: 'Vendor deleted successfully',
        });
    } catch (err) {
        console.error('Error deleting vendor:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};
