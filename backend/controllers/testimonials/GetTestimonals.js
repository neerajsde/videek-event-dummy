const Testimonal = require('../../models/testimonial');
const User = require('../../models/user');

exports.getTestimonalForAdmin = async (req, res) => {
    try {
        const FindAll = await Testimonal.find().sort({ createdAt: -1 });

        if (FindAll.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Not Found'
            });
        }

        const UpdatedTestimonals = await Promise.all(FindAll.map(async (testimonal) => {
            const currTestimonal = testimonal.toObject();
            const findUser = await User.findById(currTestimonal.user_id);
            
            // Sanitize user data before assigning it
            currTestimonal.user_name = findUser ? findUser.name : 'empty';
            currTestimonal.user_email = findUser ? findUser.email : 'empty email';

            delete currTestimonal.user_id;
            delete currTestimonal.createdAt;
            delete currTestimonal.__v;
            
            return currTestimonal;
        }));

        res.status(200).json({
            success: true,
            data: UpdatedTestimonals,
            message: 'Found Successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getTestimonals = async (req, res) => {
    try {
        // Find all testimonials sorted by creation date
        const FindAll = await Testimonal.find().sort({ createdAt: -1 });

        if (FindAll.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No testimonials found'
            });
        }

        // Filter for only published testimonials
        const PublishedTestimonals = FindAll.filter(testimonal => testimonal.publish === true);

        // Extract all unique user IDs for fetching related users in one query
        const userIds = PublishedTestimonals.map(testimonal => testimonal.user_id);
        const users = await User.find({ _id: { $in: userIds } });

        // Prepare the response
        const UpdatedTestimonals = PublishedTestimonals.map((testimonal) => {
            const currTestimonal = testimonal.toObject();

            // Find the corresponding user for this testimonial
            const findUser = users.find(user => user._id.equals(currTestimonal.user_id));

            // Sanitize user data before assigning it
            currTestimonal.user_name = findUser ? findUser.name : null;
            currTestimonal.designation = findUser ? findUser.designation : null;
            currTestimonal.desc = findUser ? findUser.message : null;
            currTestimonal.img = findUser ? findUser.user_img : null;

            // Remove unnecessary fields
            delete currTestimonal.user_id;
            delete currTestimonal.createdAt;
            delete currTestimonal.__v;

            return currTestimonal;
        });

        res.status(200).json({
            success: true,
            data: UpdatedTestimonals,
            message: 'Testimonials fetched successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
