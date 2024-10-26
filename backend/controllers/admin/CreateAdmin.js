const admin = require('../../models/admin');
const bcrypt = require('bcrypt');
require('dotenv').config();

function validateEmail(email) {
    // Regular expression to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the regular expression
    return emailRegex.test(email);
}

// vaildate password
function validatePassword(password) {
    // Check if the password meets all criteria
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    if (!password.match(/[a-z]/)) {
        return "Password must contain at least one lowercase letter";
    }

    if (!password.match(/[A-Z]/)) {
        return "Password must contain at least one uppercase letter";
    }

    if (!password.match(/[0-9]/)) {
        return "Password must contain at least one digit";
    }

    if (!password.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
        return "Password must contain at least one special character";
    }

    // If password meets all criteria
    return true;
}

exports.createNewAdmin = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        // const img = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

        if(!validateEmail(email)){
            return (res.status(401).json({
                success:false,
                tag:'email',
                message:'Invaild email'
            }))
        }

        const findExistUser = await admin.find({email});
        if(findExistUser[0]){
            return (res.status(405).json({
                success:false,
                tag:'email',
                message:'admin already registered'
            }))
        }
        
        if(validatePassword(password) !== true){
            return (res.status(402).json({
                success:false,
                tag:'password',
                message:validatePassword(password)
            }))
        }
        
        // parse password
        let hashPassword = '';
        try{
            hashPassword = await bcrypt.hash(password, 10);
        } catch(err){
            return res.status(408).json({
                success:false,
                tag:'password',
                message:err.message
            })
        }

        const createUser = await admin.create(
            {name, email, password:hashPassword}
        );
        
        delete createUser.password;
        console.log(`✅ New Admin created sucessfully. \n\tAdminName: ${createUser.name}\n\t AdminEmail: ${createUser.email}`)
        res.status(200).json({
            success:true,
            message:'new admin created sucessfully',
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            tag:'error',
            message:'error in creating new user',
            error:err.message
        })
    }
}