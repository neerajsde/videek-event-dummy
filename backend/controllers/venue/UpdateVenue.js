const Venue = require('../../models/venue');
const FAQs = require('../../models/sub-models/faq');

exports.addFAQIntoVenue = async (req, res) => {
    try {
        const { user_id, question, answere } = req.body;

        // Check if required fields are provided
        if (!user_id || !question || !answere) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Find venue by ID
        const isFound = await Venue.findById(user_id);
        if (!isFound) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        // Create new FAQ
        const newFAQ = await FAQs.create({
            question,
            answere
        });

        // Push new FAQ into venue's FAQs array
        const addNewFAQ = await Venue.findByIdAndUpdate(
            user_id,
            { $push: { FAQs: newFAQ._id } },
            { new: true }
        );

        if (!addNewFAQ) {
            return res.status(500).json({
                success: false,
                message: 'Failed to add FAQ to venue'
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

exports.deleteFAQFromVenue = async (req, res) => {
    try {
        const { venue_id, faq_id } = req.body;

        // Check if required fields are provided
        if (!venue_id || !faq_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Find the vendor by ID
        const venue = await Venue.findById(venue_id);
        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        // Remove the FAQ reference from the venue's FAQs array
        const updatedVenue = await Venue.findByIdAndUpdate(
            venue_id,
            { $pull: { FAQs: faq_id } },  // Remove the FAQ reference
            { new: true }                 // Return the updated document
        );

        if (!updatedVenue) {
            return res.status(500).json({
                success: false,
                message: 'Failed to remove FAQ from venue'
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
            data: updatedVenue
        });

    } catch (err) {
        // Handle any server errors
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.updateFAQInVenue = async (req, res) => {
    try {
        const { venue_id, faq_id, question, answere } = req.body;

        // Check if required fields are provided
        if (!venue_id || !faq_id || !question || !answere) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Find the vendor by ID
        const venue = await Venue.findById(venue_id);
        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        // Check if the FAQ exists in the vendor's FAQs array
        if (!venue.FAQs.includes(faq_id)) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found in this venue'
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