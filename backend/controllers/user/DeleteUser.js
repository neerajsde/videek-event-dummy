const User = require('../../models/user');

exports.BlockUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if service ID is provided
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Find the service by ID
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message:'user data not found'
            })
        }

        userDetails.block = true;
        userDetails.token = '';
        userDetails.save();

        return res.status(200).json({
            success: true,
            message: 'User blocked successfully'
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
}

exports.unBlockUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if service ID is provided
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Find the service by ID
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message:'user data not found'
            })
        }

        userDetails.block = false;
        userDetails.save();

        return res.status(200).json({
            success: true,
            message: 'User un-blocked successfully'
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
}