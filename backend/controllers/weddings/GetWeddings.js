const Weddings = require('../../models/real_weddings');
const Vendor = require('../../models/vendor_category');
const Reviews = require('../../models/sub-models/reviews');

exports.getWeddingsData = async (req, res) => {
    try {
        // Fetch recent 3 weddings by sorting based on creation time
        const recentWeddings = await Weddings.find().sort({ createdAt: -1 }).limit(3);

        if (recentWeddings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No recent weddings found'
            });
        }

        res.status(200).json({
            success: true,
            data: recentWeddings,
            message: 'Found recent weddings data'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


exports.getRealWeddingByCoupleName = async (req, res) => {
    try{
        const { coupleName } = req.params;
        let AllWeddings = await Weddings.find();

        if (AllWeddings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            });
        }

        for (let i = 0; i < AllWeddings.length; i++) {
            const coupleNameFormatted = AllWeddings[i].couple_name.toLowerCase().replaceAll(/\s+/g, '-');
            if (coupleNameFormatted === coupleName) {
                const findCouple = AllWeddings[i].toObject();
                const allTaggedVendors = findCouple.taggedVendor;

                if (Array.isArray(allTaggedVendors)) {
                    // Fetch vendors concurrently
                    const newTaggedVendors = await Promise.all(allTaggedVendors.map(async (vendor) => {
                        const currVendor = await Vendor.findById(vendor._id);
                        if (!currVendor) return null; // Handle case where vendor is not found
            
                        // Calculate total reviews
                        const totalReviews = await Promise.all(currVendor?.reviews.map(async (reviewId) => {
                            const currReviewer = await Reviews.findById(reviewId);
                            return currReviewer ? currReviewer.noOfStars : 0;
                        }));
            
                        const avg_ratings = totalReviews.length > 0 ? (totalReviews.reduce((sum, stars) => sum + stars, 0) / totalReviews.length).toFixed(1) : "4.8";
            
                        return {
                            category: currVendor.category,
                            name: currVendor.name,
                            avg_ratings,
                            phone: currVendor.phone,
                            intro: currVendor.title
                        };
                    }));
                    delete findCouple.taggedVendor;
                    findCouple.taggedVendor = newTaggedVendors.filter(vendor => vendor !== null);
                } else {
                    findCouple.taggedVendor = [];
                }
                return res.status(200).json({
                    success: true,
                    data: findCouple,
                    message: 'Found Real Weddings Data'
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