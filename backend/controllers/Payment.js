const Razorpay = require("razorpay");
const crypto = require("crypto");
const Vendor = require('../models/vendor_category');
const VendorEnquiery = require('../models/basic_contact_vendor');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.REZORPAY_KEY_ID,
    key_secret: process.env.REZORPAY_KEY_SECRET,
});

exports.PaymentOrder = async (req, res) => {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid amount provided',
        });
    }

    const options = {
        amount: amount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({
            success: true,
            order,
        });
    } catch (error) {
        console.error('Error creating payment order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment order',
            error: error.message,
        });
    }
};

exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    if (!order_id || !payment_id || !signature) {
        return res.status(400).json({
            success: false,
            message: 'Invalid payment details provided',
        });
    }

    const hmac = crypto
        .createHmac("sha256", process.env.REZORPAY_KEY_SECRET)
        .update(order_id + "|" + payment_id)
        .digest("hex");

    if (hmac === signature) {
        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Payment verification failed",
        });
    }
};

exports.updateVendorForUnlock = async (req, res) => {
    const { vendorId, enquiryId } = req.body;

    if (!vendorId || !enquiryId) {
        return res.status(400).json({
            success: false,
            message: 'Vendor ID and Enquiry ID are required',
        });
    }

    try {
        const [isVendor, isEnquiry] = await Promise.all([
            Vendor.findById(vendorId),
            VendorEnquiery.findById(enquiryId),
        ]);

        if (!isVendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found',
            });
        }

        if (!isEnquiry) {
            return res.status(404).json({
                success: false,
                message: 'Vendor enquiry not found',
            });
        }

        const updatedVendor = await Vendor.findByIdAndUpdate(
            vendorId,
            { $push: { clientInformation: enquiryId } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Unlocked Successfully',
            updatedVendor,
        });
    } catch (err) {
        console.error('Error updating vendor:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
};
