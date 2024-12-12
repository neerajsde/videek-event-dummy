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