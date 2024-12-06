const Blogs = require('../../models/blogs');
const path = require('path');
const fs = require('fs');

exports.UpdateBlogs = async (req, res) => {
    try {
        const { blogId, category, title, description } = req.body;
        const blog_img = req.files?.services_img;

        // Find the service by ID
        let Blog = await Blogs.findById(blogId);

        if (!Blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // Update fields if provided in the request
        if (category) Blog.category = category;
        if (title) Blog.title = title;
        if (description) Blog.description = description;

        // Handle the image update if a new image is uploaded
        if (blog_img) {
            // Delete the old image
            const oldImagePath = path.join(__dirname, '../..', 'Blogs', path.basename(Blog.img));
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
                console.log(`Old image deleted: ${oldImagePath}`);
            }

            // Save the new image
            const timestamp = Date.now();
            const ext = path.extname(blog_img.name);
            const newImageName = `${timestamp}${ext}`;
            const newServerFilePath = path.join(__dirname, '../..', 'Blogs', newImageName);

            blog_img.mv(newServerFilePath, (err) => {
                if (err) {
                    console.error('Error while moving new image:', err);
                    return res.status(500).json({ success: false, message: 'Error while uploading new image' });
                }
            });

            // Update the image path in the service
            Blog.img = `/files/${newImageName}`;
        }

        // Save the updated service
        await Blog.save();

        return res.status(200).json({
            success: true,
            message: 'Blog updated successfully'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};
