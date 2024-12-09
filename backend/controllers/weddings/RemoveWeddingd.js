const RealWedding = require('../../models/real_weddings');
const path = require('path');
const fs = require('fs').promises; // Use the promise-based version for async operations

// Function to delete an image
const deleteImg = async (imgName) => {
    try {
        const imagePath = path.join(__dirname, '../..', 'RealWeddings', path.basename(imgName));

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

exports.RemoveRealWeddingById = async (req, res) => {
    try {
        const { weddingId } = req.params;

        if (!weddingId) {
            return res.status(400).json({ success: false, message: 'RealWedding ID is required' });
        }

        // Find the RealWedding by ID
        const RealWeddings = await RealWedding.findById(weddingId);

        if (!RealWeddings) {
            return res.status(404).json({ success: false, message: 'RealWedding not found' });
        }

        // Remove associated album images
        if (Array.isArray(RealWeddings.images)) {
            await Promise.all(RealWeddings.images.map((albumImg) => deleteImg(albumImg)));
        }

        // Remove the RealWedding from the database
        await RealWedding.findByIdAndDelete(weddingId);

        return res.status(200).json({
            success: true,
            message: 'RealWedding deleted successfully',
        });
    } catch (err) {
        console.error('Error deleting RealWedding:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};
