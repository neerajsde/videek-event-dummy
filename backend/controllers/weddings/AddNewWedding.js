const RealWedding = require('../../models/real_weddings');
const Vendor = require('../../models/vendor_category');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

// Create new real wedding
exports.createNewRealWedding = async (req, res) => {
    try {
        const { category, couple_name, location, title, description, date, taggedVendor } = req.body;

        // Check required fields
        const requiredFields = ['category', 'couple_name', 'location', 'title', 'description', 'date', 'taggedVendor'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field.toUpperCase()}` });
            }
        }

        // Format date
        const formattedDate = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');

        // Ensure taggedVendor is an array
        const tags = Array.isArray(taggedVendor) ? taggedVendor : taggedVendor.split(',').map(tag => tag.trim());

        // Find tagged vendors
        const tagsArr = [];
        for (const tag of tags) {
            const vendorData = await Vendor.findOne({ name: tag });
            if (vendorData) {
                tagsArr.push({ _id: vendorData._id });
            }
        }

        // Create Real Wedding entry
        const newData = await RealWedding.create({
            category,
            couple_name,
            location,
            title,
            description,
            date: formattedDate,
            taggedVendor: tagsArr
        });

        return res.status(200).json({
            success: true,
            ids: newData._id,
            message: 'Uploaded Successfully'
        });
    } catch (err) {
        console.error('Error in RealWedding-> Add:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


// Upload real wedding image
exports.uploadRealWeddingImg = async (req, res) => {
    try {
        const { id } = req.body;
        const img = req.files?.img;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Please enter id' });
        }

        const findGallery = await RealWedding.findById(id);
        if (!findGallery) {
            return res.status(404).json({ success: false, message: 'Not Found' });
        }

        if (!img) {
            return res.status(400).json({ success: false, message: 'Please select an image' });
        }

        // Validate file extension
        const ext = path.extname(img.name).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if (!allowedExtensions.includes(ext)) {
            return res.status(400).json({ success: false, message: 'Invalid image format. Please upload a valid image file.' });
        }

        const uploadDir = path.join(__dirname, '../..', 'RealWeddings');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const timestamp = Date.now();
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        await img.mv(serverFilePath);

        await RealWedding.findByIdAndUpdate(
            id,
            { $push: { images: `/files/${imageName}` } },
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
