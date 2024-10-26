const Blogs = require('../../models/blogs');

function convertDateTime(dateTime, timeZone = 'Asia/Kolkata') {
    const date = new Date(dateTime);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timeZone
    };

    return date.toLocaleString('en-IN', options);
}

exports.getBlogCategoryWithUnique = async (req, res) => {
    try{
        let AllBlogs = await Blogs.find();

        if (AllBlogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Blogs not found'
            });
        }

        const uniqueCategories = [...new Set(AllBlogs.map(blog => blog.category))];

        res.status(200).json({
            success: true,
            message: 'Blogs found',
            data: uniqueCategories
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

exports.getBlogById = async (req, res) => {
    try{
        const { blogId } = req.params;
        const findBlog = await Blogs.findOne({uId: blogId});

        if(!findBlog){
            return res.status(404).json({
                success: false,
                message: 'Not Found'
            })
        }

        const blogData = findBlog.toObject();
        blogData.dateTime = convertDateTime(blogData.createdAt);
        delete blogData.createdAt;
        delete blogData._id;

        res.status(200).json({
            success: true,
            message: 'Blog found',
            data: blogData
        });

    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

exports.getLatestBlogsWithCategory = async (req, res) => {
    try {
        // Fetch all blogs in one go
        let AllBlogs = await Blogs.find();
        
        if (AllBlogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No blogs available'
            });
        }

        // Fetch the latest 5 blogs sorted by createdAt in descending order
        let latestBlogs = AllBlogs.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

        // Structure blog data, starting with the latest blogs category
        let blogsData = [
            {
                category: 'Latest',
                blogs: latestBlogs.map(blog => {
                    let updatedBlog = blog.toObject();
                    updatedBlog.dateTime = convertDateTime(updatedBlog.createdAt);
                    delete updatedBlog.description;
                    delete updatedBlog.createdAt;
                    return updatedBlog;
                })
            }
        ];

        // Get unique categories
        const uniqueCategories = [...new Set(AllBlogs.map(blog => blog.category))];

        // Loop through each category to gather blogs for each
        uniqueCategories.forEach(category => {
            const categoryBlogs = AllBlogs.filter(blog => blog.category === category);

            const categoryData = {
                category,
                blogs: categoryBlogs.map(blog => {
                    let updatedBlog = blog.toObject();
                    updatedBlog.dateTime = convertDateTime(updatedBlog.createdAt);
                    delete updatedBlog.createdAt;
                    return updatedBlog;
                })
            };

            // Add each category's blogs to blogsData array
            blogsData.push(categoryData);
        });

        // Send the final response
        return res.status(200).json({
            success: true,
            message: 'Blogs found',
            data: blogsData
        });

    } catch (err) {
        // Error handling for any server issues
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};

