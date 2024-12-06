const Blogs = require('../../models/blogs');
const path = require('path');
const fs = require('fs');

exports.RemoveBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;

        // Check if service ID is provided
        if (!blogId) {
            return res.status(400).json({ success: false, message: 'Blog ID is required' });
        }

        // Find the service by ID
        const blog = await Blogs.findById(blogId);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // Get the image file path - Adjusting to the 'ImagesFiles' directory
        const imagePath = path.join(__dirname, '../..', 'Blogs', path.basename(blog.img)); 

        // Check if the image exists and delete it
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Image file deleted: ${imagePath}`);
        } else {
            console.log('Image file not found:', imagePath);
        }

        // Remove the service from the database
        await Blogs.findByIdAndDelete(blogId);

        return res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};
