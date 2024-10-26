const Vendor = require('../../models/vendor_category');

exports.getVendorFAQs = async (req, res) => {
    try {
        const { vendor_id } = req.params;

        // Validate vendor_id
        if (!vendor_id) {
            return res.status(400).json({
                success: false,
                message: 'Vendor ID is required'
            });
        }

        // Find the vendor and populate the FAQs
        const vendor = await Vendor.findById(vendor_id).populate('FAQs');
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found'
            });
        }

        // Return the vendor details along with FAQs
        res.status(200).json({
            success: true,
            message: 'Vendor and FAQs fetched successfully',
            data: {
                vendor_name: vendor.name,
                faqs: vendor.FAQs
            }
        });

    } catch (err) {
        // Handle server errors
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};