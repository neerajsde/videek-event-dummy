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

exports.getWeddingCategory = async (req, res) => {
    try{
        const AllWeddings = await Weddings.find();

        if (AllWeddings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Empty Weddings Data'
            });
        }

        const uniqueCategories = [...new Set(AllWeddings.map(wedding => wedding.category))];

        res.status(200).json({
            success: true,
            message: 'Weddings Data found',
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * (i + 1));

        // Swap elements
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

exports.fetchCategoryWeddings = async (req, res) => {
    try{
        const { categoryName } = req.params;
        const AllWeddings = await Weddings.find();

        if (AllWeddings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Empty Weddings Data'
            });
        }

        let allData = [];
        for(let i=0; i<AllWeddings.length; i++){
            const currName = AllWeddings[i].category.trim().replace(/\s+/g,'-').toLowerCase();
            if(categoryName === currName){
                const categoryData = await Weddings.find({category: AllWeddings[i].category});
                for(let j=0; j<categoryData.length; j++){
                    if(categoryData[j].images.length > 0){
                        for(let k=0; k<categoryData[j].images.length; k++){
                            allData.push(categoryData[j].images[k]);
                        }
                    }
                }
            }
        }

        const shuffledArr = shuffleArray(allData);

        res.status(200).json({
            success: true,
            message: 'Weddings Data found',
            data: shuffledArr
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

exports.getAllWeddingsDataForAdmin = async (req, res) => {
    try {
        // Fetch all weddings and populate taggedVendor with IDs
        const AllWeddings = await Weddings.find().populate('taggedVendor');

        if (AllWeddings.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No weddings found',
            });
        }

        const uniqueCategories = new Set();
        const dataArr = await Promise.all(
            AllWeddings.map(async (wedding) => {
                const currWedding = wedding.toObject();
                uniqueCategories.add(currWedding.category);
                const newTaggedArr = await Promise.all(
                    currWedding.taggedVendor.map(async (vendorId) => {
                        const vendor = await Vendor.findById(vendorId);
                        if (vendor) {
                            return {
                                name: vendor.name,
                                category: vendor.category,
                            };
                        }
                        return null; // Handle invalid vendor cases
                    })
                );

                // Filter out null values (invalid vendors)
                currWedding.taggedVendor = newTaggedArr.filter((vendor) => vendor !== null);
                return currWedding;
            })
        );

        res.status(200).json({
            success: true,
            data: dataArr,
            services: Array.from(uniqueCategories),
            message: 'Found all weddings',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};
