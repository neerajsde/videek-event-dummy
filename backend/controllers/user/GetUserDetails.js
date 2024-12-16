const User = require('../../models/user');

exports.getUserDetailsById = async (req, res) => {
    try{
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'required user id'
            })
        } 

        const userData = await User.findById(userId);
        if(!userData){
            return res.status(404).json({
                success: false,
                message: 'user data not found'
            })
        }
        delete userData.token;
        delete userData.password;
        delete userData.createdAt;
        
        return res.status(200).json({
            success: true,
            data: userData,
            message: 'found user data'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getAllUsersData = async (req, res) => {
    try {
        // Fetch all users sorted by creation date
        const allUsers = await User.find().sort({ createdAt: -1 });

        // Check if users exist
        if (!allUsers || allUsers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No users found',
            });
        }

        // Create unique names array
        const uniqueNames = [...new Set(allUsers.map((user) => user.name))];

        // Exclude sensitive fields like 'password' and 'token'
        const sanitizedUsers = allUsers.map((user) => {
            const { password, token, ...rest } = user.toObject(); // Convert Mongoose document to plain object
            return rest;
        });

        // Respond with success
        res.status(200).json({
            success: true,
            data: sanitizedUsers,
            uniqueNames,
            message: 'All user data fetched successfully',
        });
    } catch (err) {
        // Handle internal server error
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};
