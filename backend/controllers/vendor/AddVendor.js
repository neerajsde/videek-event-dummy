const Vendor = require('../../models/vendor_category');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const mailSender = require('../../utlis/mailSender');
const { sendVendorRegistrationMail } = require('../../mails/vendor/SignUpVendorMail');

function generateHardPassword(length = 8) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '123456789';

    const allCharacters = upper + lower + digits;
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}

exports.AddNewVendor = async(req, res) => {
    try{
        const {category, name, phone, whatsapp, email, title, description} = req.body;
        
        const vendor_img = req.files?.img; 
        // Check for required fields
        const requiredFields = ['category','name', 'phone', 'whatsapp', 'email', 'title', 'description'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field.toUpperCase()}` });
            }
        }

        // Validate the services image
        if (!vendor_img) {
            return res.status(400).json({ success: false, message: 'Please upload the vendor image' });
        }

        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '..', 'ImagesFiles');
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Create the file path where the image will be stored on the server
        const timestamp = Date.now();
        const ext = path.extname(vendor_img.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Image upload path:", serverFilePath);

        // Move the image to the server's files directory
        vendor_img.mv(serverFilePath, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        const Gen_password = generateHardPassword();
        // parse password
        let hashPassword = '';
        try{
            hashPassword = await bcrypt.hash(Gen_password, 10);
        } catch(err){
            return res.status(408).json({
                success:false,
                message:err.message
            })
        }
        const newVendor = new Vendor({
            category, name, phone, whatsapp, email, title, description, img:`/files/${imageName}`, password: hashPassword,
        })
        await newVendor.save();

        await mailSender(
            newVendor.email, 
            "Welcome",
            sendVendorRegistrationMail(newVendor.name, newVendor.email,  Gen_password)
        );  

        return res.status(201).json({
            success: true,
            message: 'Vendor added successfully'
        });

    } catch(err){
        console.log('Vendors Added Error: ', err.message)
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error:err.message
        })
    }
}