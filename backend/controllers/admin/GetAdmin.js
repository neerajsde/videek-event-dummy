const Admin = require('../../models/admin');
const Vendor = require('../../models/vendor_category');
const Venue = require('../../models/venue');
const User = require('../../models/user');
const Testimonal = require('../../models/testimonial');
const Gallery = require('../../models/gallery');
const Blog = require('../../models/blogs');
const ContactForVendor = require('../../models/basic_contact_vendor');
const Contact = require('../../models/contact');
const Services = require('../../models/services');
const Wedding = require('../../models/real_weddings');

exports.getAdminDetails = async (req, res) => {
    try {
        const { token } = req.body;

        const userData = await Admin.find({ token });

        // Check if admin data was found
        if (!userData || userData.length === 0) {
            return res.status(301).json({
                success: false,
                message: 'Token not valid'
            });
        }

        // Remove sensitive fields from the admin data
        const adminDetails = { ...userData[0]._doc };

        const newData = {
            user_id: adminDetails._id,
            name: adminDetails.name,
            user_img: adminDetails.user_img,
        }

        // Send a successful response with the admin data
        res.status(200).json({
            success: true,
            adminData: newData,
            message: 'Admin data fetched'
        });
    } catch (err) {
        // Handle errors and return a 500 response
        res.status(500).json({
            success: false,
            message: err.message // Fix typo here
        });
    }
};

exports.getWebRealTimeActivity = async (req, res) => {
    try{
        const Users = await User.find();
        const Vendors = await Vendor.find();
        const Venues = await Venue.find();
        const Testimonials = await Testimonal.find();
        const Galleries = await Gallery.find();
        const Blogs = await Blog.find();
        const Contacts = await Contact.find();
        const ContactForVendors = await ContactForVendor.find();
        const AllServices = await Services.find();
        const Weddings = await Wedding.find();

        const newObj = {
            services: AllServices.length,
            users: Users.length,
            vendors: Vendors.length,
            venues: Venues.length,
            testimonals: Testimonials.length,
            gallery: Galleries.length,
            blogs: Blogs.length,
            contacts: Contacts.length,
            contactForVendors: ContactForVendors.length,
            weddings: Weddings.length,
        }

        res.status(200).json({
            success: true,
            data: newObj,
            message: 'Data fetched'
        });
    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}