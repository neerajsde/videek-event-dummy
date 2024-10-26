const Blogs = require('../../models/blogs');
const path = require('path');
const fs = require('fs');

exports.AddNewBlogs = async(req, res) => {
    try{
        const {category, title, description} = req.body;
        
        const blog_img = req.files?.blog_img; 
        // Check for required fields
        const requiredFields = ['category', 'title', 'description'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ success: false, message: `Please fill in the ${field.toUpperCase()}` });
            }
        }

        // Validate the services image
        if (!blog_img) {
            return res.status(400).json({ success: false, message: 'Please upload the blog image' });
        }

        // Define the directory where the file will be saved
        const uploadDir = path.join(__dirname, '../..', 'Blogs');
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Create the file path where the image will be stored on the server
        const timestamp = Date.now();
        const ext = path.extname(blog_img.name);
        const imageName = `${timestamp}${ext}`;
        const serverFilePath = path.join(uploadDir, imageName);

        console.log("Image upload path:", serverFilePath);

        // Move the image to the server's files directory
        blog_img.mv(serverFilePath, (err) => {
            if (err) {
                console.error('Error while moving image:', err);
                // Send response and stop further execution
                return res.status(500).json({ success: false, message: 'Error while uploading image' });
            }
        });

        const prevAllBlogs = await Blogs.find();

        const AddNewBlogs = new Blogs({
            category, title, description, img:`/files/${imageName}`, uId: `${prevAllBlogs.length + 1}`
        })

        await AddNewBlogs.save();
        return res.status(201).json({
            success: true,
            message: 'Blog uploaded successfully'
        });

    } catch(err){
        console.log('Blogs Uploading Error: ', err.message)
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error:err.message
        })
    }
}