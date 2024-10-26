const Vendor = require('../../models/vendor_category');

exports.getVendorCategoryWithUnique = async (req, res) => {
    try{
        let AllVendors = await Vendor.find();

        if (AllVendors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Vendors not found'
            });
        }

        const uniqueCategories = [...new Set(AllVendors.map(vendor => vendor.category))];

        res.status(200).json({
            success: true,
            message: 'Vendors found',
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

exports.getCategory = async (req, res) => {
    try{
        const { categoryName } = req.params;
        let AllVendors = await Vendor.find();

        if (AllVendors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Vendors category not found'
            });
        }

        for(let i=0; i<AllVendors.length; i++){
            if(AllVendors[i].category.toLocaleLowerCase().replaceAll(/\s+/g, '-') === categoryName){
                const findCategory = await Vendor.find({category: AllVendors[i].category});
                if(findCategory.length > 0){
                    let VendorsData = [];
                    for(let k=0; k<findCategory.length; k++){
                        // Calculate total reviews
                        const currVendor = findCategory[k].toObject();
                        const totalReviews = await Promise.all(currVendor?.reviews.map(async (reviewId) => {
                            const currReviewer = await Reviews.findById(reviewId);
                            return currReviewer ? currReviewer.noOfStars : 0;
                        }));
                        
                        delete currVendor.createdAt;
                        delete currVendor.__v;
                        delete currVendor.token;
                        delete currVendor.password;
                        delete currVendor._id;
                        delete currVendor.description;
                        delete currVendor.youtube_links;

                        if(currVendor.FAQs.length !== 0 && currVendor.albums.length !== 0){
                            currVendor.total_images = currVendor.albums.length;
                            delete currVendor.reviews;
                            delete currVendor.albums;
                            delete currVendor.FAQs;
                            currVendor.avg_ratings = totalReviews.length > 0 ? (totalReviews.reduce((sum, stars) => sum + stars, 0) / totalReviews.length).toFixed(1) : "4.8";
                            VendorsData.push(currVendor);
                        }
                    }
                    console.log(VendorsData);
                    return res.status(200).json({
                        success: true,
                        data: VendorsData,
                        message: 'All vendors category found'
                    });
                }
            }
        }

        res.status(200).json({
            success: false,
            message: 'Not found'
        });
    } 
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

exports.getVendorCategories = async (req, res) => {
    try {
        let AllVendors = await Vendor.find();

        if (AllVendors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No vendors found'
            });
        }

        const uniqueCategories = [...new Set(AllVendors.map(vendor => vendor.category))];
        
        let categories = [];
        const vendorsPerPage = 4; // Set the number of vendors per page
        let totalPages = Math.ceil(uniqueCategories.length / vendorsPerPage);
        
        for (let page = 1; page <= totalPages; page++) {
            const startIndex = (page - 1) * vendorsPerPage;
            const endIndex = startIndex + vendorsPerPage;
            const categoriesOnPage = uniqueCategories.slice(startIndex, endIndex);

            let data = await Promise.all(
                categoriesOnPage.map(async category => {
                    let categoryData = await Vendor.find({ category });
                    return {
                        id: categoryData[0]._id,
                        name: category,
                        image: categoryData[0].img,
                        title: categoryData[0].title
                    };
                })
            );

            categories.push({
                page,
                totalPages,
                data
            });
        }

        res.status(200).json({
            success: true,
            data:categories,
            message:'Found Sucessfully'
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};


exports.getVendorDetails = async (req, res) => {
    try {
        const { token } = req.body;

        const userData = await Vendor.find({ token });

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


exports.getVendorAlbumImages = async (req, res) => {
    try {
        const { vendor_id } = req.params;

        // Validate vendor_id
        if (!vendor_id) {
            return res.status(400).json({
                success: false,
                message: 'Vendor ID is required'
            });
        }

        const vendor = await Vendor.findById(vendor_id);
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Vendor and Album fetched successfully',
            data: vendor.albums
        });

    } catch (err) {
        // Handle server errors
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


exports.getVendorByName = async (req, res) => {
    try{
        const { Name } = req.params;
        let AllVendors = await Vendor.find().populate('FAQs');

        if (AllVendors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            });
        }

        for (let i = 0; i < AllVendors.length; i++) {
            const vendorNameFormatted = AllVendors[i].name.toLowerCase().replaceAll(/\s+/g, '-');
            if (vendorNameFormatted === Name) {
                const currVendor = AllVendors[i].toObject();
                const totalReviews = await Promise.all(currVendor?.reviews.map(async (reviewId) => {
                    const currReviewer = await Reviews.findById(reviewId);
                    return currReviewer ? currReviewer.noOfStars : 0;
                }));

                currVendor.avg_ratings = totalReviews.length > 0 ? (totalReviews.reduce((sum, stars) => sum + stars, 0) / totalReviews.length).toFixed(1) : "4.8";
                delete currVendor.token;
                delete currVendor.password;
                delete currVendor.createdAt;
                delete currVendor.__v;
                
                return res.status(200).json({
                    success: true,
                    data: currVendor,
                    message: 'Found Vendor Data'
                });
            }
        }        

        res.status(404).json({
            success: false,
            message: 'Not found'
        });
    } 
    catch(err){
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}