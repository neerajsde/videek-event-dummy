const Gallery = require('../../models/gallery');
const path = require('path');
const fs = require('fs').promises;

// Function to delete an image
const deleteImg = async (imgName) => {
    try {
        const imagePath = path.join(__dirname, '../..', 'Gallery', path.basename(imgName));
        await fs.access(imagePath); // Check if the file exists
        await fs.unlink(imagePath); // Delete the file
        console.log(`Image file deleted: ${imagePath}`);
    } catch (err) {
        console.log(`Error deleting image: ${imgName}`, err.message);
    }
};

exports.RemoveGalleryForAdmin = async (req, res) => {
    try {
        const { galleryId } = req.params;

        // Check if gallery ID is provided
        if (!galleryId) {
            return res.status(400).json({ success: false, message: 'gallery ID is required' });
        }

        // Find the gallery by ID
        const gallery = await Gallery.findById(galleryId);

        if (!gallery) {
            return res.status(404).json({ success: false, message: 'gallery not found' });
        }

        // Remove associated album images
        if (Array.isArray(gallery.images)) {
            await Promise.all(
                gallery.images.map(async (albumImg) => {
                    try {
                        await deleteImg(albumImg);
                    } catch (err) {
                        console.error(`Failed to delete album image ${albumImg}:`, err.message);
                    }
                })
            );
        }

        // Remove the gallery from the database
        await Gallery.findByIdAndDelete(galleryId);

        return res.status(200).json({
            success: true,
            message: 'gallery deleted successfully'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};
