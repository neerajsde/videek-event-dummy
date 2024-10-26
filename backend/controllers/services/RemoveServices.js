const Services = require('../../models/services');
const path = require('path');
const fs = require('fs');

exports.RemoveService = async (req, res) => {
    try {
        const { serviceId } = req.params;

        // Check if service ID is provided
        if (!serviceId) {
            return res.status(400).json({ success: false, message: 'Service ID is required' });
        }

        // Find the service by ID
        const service = await Services.findById(serviceId);

        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        // Get the image file path - Adjusting to the 'ImagesFiles' directory
        const imagePath = path.join(__dirname, '..', 'ImagesFiles', path.basename(service.img)); 

        // Check if the image exists and delete it
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Image file deleted: ${imagePath}`);
        } else {
            console.log('Image file not found:', imagePath);
        }

        // Remove the service from the database
        await Services.findByIdAndRemove(serviceId);

        return res.status(200).json({
            success: true,
            message: 'Service and its image were deleted successfully'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};
