const Services = require('../../models/services');
const path = require('path');
const fs = require('fs');

exports.UpdateService = async (req, res) => {
    try {
        const { serviceId, category, subCategory, name, title, description } = req.body;
        const services_img = req.files?.services_img;

        // Find the service by ID
        let service = await Services.findById(serviceId);

        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        // Update fields if provided in the request
        if (category) service.category = category;
        if (subCategory) service.subCategory = subCategory;
        if (name) service.name = name;
        if (title) service.title = title;
        if (description) service.description = description;

        // Handle the image update if a new image is uploaded
        if (services_img) {
            // Delete the old image
            const oldImagePath = path.join(__dirname, '..', 'ImagesFiles', path.basename(service.img));
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
                console.log(`Old image deleted: ${oldImagePath}`);
            }

            // Save the new image
            const timestamp = Date.now();
            const ext = path.extname(services_img.name);
            const newImageName = `${timestamp}${ext}`;
            const newServerFilePath = path.join(__dirname, '..', 'ImagesFiles', newImageName);

            services_img.mv(newServerFilePath, (err) => {
                if (err) {
                    console.error('Error while moving new image:', err);
                    return res.status(500).json({ success: false, message: 'Error while uploading new image' });
                }
            });

            // Update the image path in the service
            service.img = `/files/${newImageName}`;
        }

        // Save the updated service
        await service.save();

        return res.status(200).json({
            success: true,
            message: 'Service updated successfully',
            data: service
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};
