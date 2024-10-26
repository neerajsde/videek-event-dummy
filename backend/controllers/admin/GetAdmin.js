const Admin = require('../../models/admin')

exports.getAdminDetails = async (req, res) => {
    try {
        const { token } = req.body;

        const userData = await Admin.find({ token });

        // Check if admin data was found
        if (!userData || userData.length === 0) {
            return res.status(301).json({
                success: false,
                message: 'Token not valid'
            });
        }

        // Remove sensitive fields from the admin data
        const adminDetails = { ...userData[0]._doc };

        const newData = {
            user_id: adminDetails._id,
            name: adminDetails.name,
            user_img: adminDetails.user_img,
        }

        // Send a successful response with the admin data
        res.status(200).json({
            success: true,
            adminData: newData,
            message: 'Admin data fetched'
        });
    } catch (err) {
        // Handle errors and return a 500 response
        res.status(500).json({
            success: false,
            message: err.message // Fix typo here
        });
    }
};