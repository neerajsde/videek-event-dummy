const Venue = require('../../models/venue');
const Reviews = require('../../models/sub-models/reviews');
const FAQ = require('../../models/sub-models/faq');
const path = require('path');
const fs = require('fs').promises;

// Function to delete an image
const deleteImg = async (imgName) => {
    try {
        const imagePath = path.join(__dirname, '../..', 'VenueImages', path.basename(imgName));
        await fs.access(imagePath); // Check if the file exists
        await fs.unlink(imagePath); // Delete the file
        console.log(`Image file deleted: ${imagePath}`);
    } catch (err) {
        console.log(`Error deleting image: ${imgName}`, err.message);
    }
};

exports.RemoveVenueById = async (req, res) => {
    try {
        const { venueId } = req.params;

        if (!venueId) {
            return res.status(400).json({ success: false, message: 'Venue ID is required' });
        }

        // Find the Venue by ID
        const venue = await Venue.findById(venueId);

        if (!venue) {
            return res.status(404).json({ success: false, message: 'Venue not found' });
        }

        // Delete main image if present
        if (venue.img) {
            await deleteImg(venue.img);
        }

        // Remove associated reviews
        if (Array.isArray(venue.reviews)) {
            await Promise.all(
                venue.reviews.map(async (reviewId) => {
                    try {
                        await Reviews.findByIdAndDelete(reviewId);
                    } catch (err) {
                        console.error(`Failed to delete review ${reviewId}:`, err.message);
                    }
                })
            );
        }

        // Remove associated FAQs
        if (Array.isArray(venue.FAQs)) {
            await Promise.all(
                venue.FAQs.map(async (faqId) => {
                    try {
                        await FAQ.findByIdAndDelete(faqId);
                    } catch (err) {
                        console.error(`Failed to delete FAQ ${faqId}:`, err.message);
                    }
                })
            );
        }

        // Remove associated album images
        if (Array.isArray(venue.albums)) {
            await Promise.all(
                venue.albums.map(async (albumImg) => {
                    try {
                        await deleteImg(albumImg);
                    } catch (err) {
                        console.error(`Failed to delete album image ${albumImg}:`, err.message);
                    }
                })
            );
        }

        // Remove the Venue from the database
        await Venue.findByIdAndDelete(venueId);

        return res.status(200).json({
            success: true,
            message: 'Venue deleted successfully',
        });
    } catch (err) {
        console.error('Error deleting venue:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};
