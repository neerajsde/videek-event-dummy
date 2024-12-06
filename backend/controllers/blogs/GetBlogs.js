const Blogs = require('../../models/blogs');

function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "just now"; // For cases where the time difference is very small
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
        blogData.dateTime = timeAgo(blogData.createdAt);
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
                    updatedBlog.dateTime = timeAgo(updatedBlog.createdAt);
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
                    updatedBlog.dateTime = timeAgo(updatedBlog.createdAt);
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

exports.getLatestBlogsForTab = async (req, res) => {
    try {
        // Fetch the latest 5 blogs sorted by createdAt
        const latestBlogs = await Blogs.find({})
            .sort({ createdAt: -1 })
            .limit(5);

        if (latestBlogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No blogs available',
            });
        }

        // Prepare the 'Latest' category data
        const blogsData = [
            {
                category: 'latest',
                image: latestBlogs[0]?.img || null, // Use optional chaining to handle missing images
            },
        ];

        // Fetch unique categories and pick the first blog from each category
        const uniqueCategories = await Blogs.aggregate([
            { $group: { _id: '$category', firstBlog: { $first: '$$ROOT' } } },
        ]);

        uniqueCategories.forEach(({ _id: category, firstBlog }) => {
            // Avoid adding the 'Latest' category again
            if (category !== 'Latest') {
                blogsData.push({
                    category,
                    image: firstBlog?.img || null,
                });
            }
        });

        // Send the response
        return res.status(200).json({
            success: true,
            message: 'Blogs found',
            data: blogsData,
        });
    } catch (err) {
        console.error('Error fetching blogs:', err); // Log the error stack for debugging
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};


exports.getAllBlogsDataForAdmin = async (req, res) => {
    try{
        const AllBlogs = await Blogs.find().sort({ createdAt: -1 });
        if(AllBlogs.length === 0){
            return res.status(400).json({
                success: false,
                message: 'Empty Blogs'
            })
        }
        const uniqueCategories = [...new Set(AllBlogs.map(blog => blog.category))];
        res.status(200).json({
            success: true,
            data: AllBlogs,
            services: uniqueCategories,
            message: 'Found All Blogs'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}