const RealWedding = require('../../models/real_weddings');
const Vendor = require('../../models/vendor_category');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

// Create new real wedding
exports.createNewRealWedding = async (req, res) => {
    try {
        const { couple_name, location, title, description, date, taggedVendor } = req.body;

        const requiredFields = ['couple_name', 'location', 'title', 'description', 'date', 'taggedVendor'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field.toUpperCase()}` });
            }
        }

        // Format date
        const formattedDate = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');

        // Find tagged vendors
        const tags = taggedVendor.split(',');
        const tagsArr = await Promise.all(
            tags.map(async (tag) => {
                const trimmedStr = tag.trim();
                const vendorData = await Vendor.findOne({ name: trimmedStr });
                if (vendorData) {
                    return {
                        _id: vendorData._id
                    };
                } else {
                    return res.status(400).json({ success: false, message: `Vendor not found-> ${trimmedStr}` });
                }
            })
        );

        const newData = await RealWedding.create({
            couple_name, location, title, description, date: formattedDate, taggedVendor: tagsArr
        });

        res.status(200).json({
            success: true,
            ids: newData._id,
            message: 'Uploaded Successfully'
        });

    } catch (err) {
        console.log('Real Wedding-> Add', err.message);
        res.status(500).json({
            success: false,
            message: err.message
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
