const Venue = require('../../models/venue');
const Reviews = require('../../models/sub-models/reviews');
const User = require('../../models/user');

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

exports.getPopularVenue = async (req, res) => {
    try{
        const AllVenue = await Venue.find();
        if (AllVenue.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Empty Venue'
            });
        }

        const uniqueCategories = [...new Set(AllVenue.map(venue => venue.type))];
        const popularVenues = [];
        for(let i=0; i<uniqueCategories.length; i++){
            const sameTypeVenue = await Venue.find({type: uniqueCategories[i]});
            if(sameTypeVenue.length > 0){
                const newObject = {
                    id: sameTypeVenue[0]._id,
                    name: sameTypeVenue[0].type,
                    img: sameTypeVenue[0].img,
                    image_missing: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
                }
                popularVenues.push(newObject);
            }
        }

        if (popularVenues.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Empty Venue'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Popular venue found',
            data: popularVenues
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

exports.getAllVenues = async (req, res) => {
    try{
        const AllVenue = await Venue.find();
        if (AllVenue.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Empty Venue'
            });
        }
        const allVenuesData = [];
        for(let i=0; i<AllVenue.length; i++){
            allVenuesData.push({
                id: AllVenue[i]._id,
                name: AllVenue[i].name
            })
        }

        if (allVenuesData.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Empty Venue'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Popular venue found',
            data: allVenuesData
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

exports.getVenueCategory = async (req, res) => {
    try{
        const { categoryName } = req.params;
        let AllVenue = await Venue.find().sort({ createdAt: -1 });

        if (AllVenue.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Empty Venues'
            });
        }

        if(categoryName === 'all'){
            let VenuesData = [];
            for(let k=0; k<AllVenue.length; k++){
                // Calculate total reviews
                const currVenue = AllVenue[k].toObject();
                const totalReviews = await Promise.all(currVenue?.reviews.map(async (reviewId) => {
                    const currReviewer = await Reviews.findById(reviewId);
                    return currReviewer ? currReviewer.noOfStars : 0;
                }));
                
                delete currVenue.createdAt;
                delete currVenue.__v;
                delete currVenue.description;
                currVenue.total_images = currVenue.albums.length;
                delete currVenue.reviews;
                delete currVenue.albums;
                delete currVenue.FAQs;
                currVenue.avg_ratings = totalReviews.length > 0 ? (totalReviews.reduce((sum, stars) => sum + stars, 0) / totalReviews.length).toFixed(1) : "4.8";
                VenuesData.push(currVenue);
            }
            return res.status(200).json({
                success: true,
                data: VenuesData,
                message: 'All venues category found'
            });
        }

        for(let i=0; i<AllVenue.length; i++){
            if(AllVenue[i].type.toLowerCase().replaceAll(/\s+/g, '-').replace('/','-') === categoryName){
                const findCategory = await Venue.find({type: AllVenue[i].type});
                if(findCategory.length > 0){
                    let VenuesData = [];
                    for(let k=0; k<findCategory.length; k++){
                        // Calculate total reviews
                        const currVenue = findCategory[k].toObject();
                        const totalReviews = await Promise.all(currVenue?.reviews.map(async (reviewId) => {
                            const currReviewer = await Reviews.findById(reviewId);
                            return currReviewer ? currReviewer.noOfStars : 0;
                        }));
                        
                        delete currVenue.createdAt;
                        delete currVenue.__v;
                        delete currVenue._id;
                        delete currVenue.description;
                        currVenue.total_images = currVenue.albums.length;
                        delete currVenue.reviews;
                        delete currVenue.albums;
                        delete currVenue.FAQs;
                        currVenue.avg_ratings = totalReviews.length > 0 ? (totalReviews.reduce((sum, stars) => sum + stars, 0) / totalReviews.length).toFixed(1) : "4.8";
                        VenuesData.push(currVenue);
                    }
                    // console.log(VendorsData);
                    return res.status(200).json({
                        success: true,
                        data: VenuesData,
                        message: 'All venues category found'
                    });
                }
            }
        }

        res.status(405).json({
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


exports.getVenueByName = async (req, res) => {
    try{
        const { Name } = req.params;
        let AllVenue = await Venue.find().populate(['FAQs', 'reviews']);

        if (AllVenue.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            });
        }

        for (let i = 0; i < AllVenue.length; i++) {
            const venueNameFormatted = AllVenue[i].name.toLowerCase().replaceAll(/\s+/g, '-');
            if (venueNameFormatted === Name) {
                const currVenue = AllVenue[i].toObject();
                const updateLetestReview = [...currVenue?.reviews].reverse();
                let reviewers = [];
                const maxReviews = 5; // accordingly change
                const totalReviews = await Promise.all(updateLetestReview.map(async (reviewId) => {
                    const currReviewer = await Reviews.findById(reviewId);
                    if(reviewers.length <= maxReviews){
                        const userDetails = await User.findById(currReviewer.user);
                        const newReviewObject = {
                            comment: currReviewer.comment,
                            stars: parseFloat(currReviewer.noOfStars).toFixed(1),
                            images: currReviewer.images,
                            user_name: userDetails.name,
                            user_img: userDetails.user_img,
                            user_Verified: userDetails.isVerified,
                            date: timeAgo(currReviewer.createdAt)
                        }
                        reviewers.push(newReviewObject);
                    }
                    return currReviewer ? currReviewer.noOfStars : 0;
                }));

                currVenue.avg_ratings = totalReviews.length > 0 ? (totalReviews.reduce((sum, stars) => sum + stars, 0) / totalReviews.length).toFixed(1) : "4.8";
                currVenue.total_reviews = currVenue.reviews.length;
                currVenue.reviews = reviewers;
                delete currVenue.createdAt;
                delete currVenue.__v;
                
                return res.status(200).json({
                    success: true,
                    data: currVenue,
                    message: 'Found Venue Data'
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

exports.getVenueFAQs = async (req, res) => {
    try {
        const { venue_name } = req.params;

        // Validate vendor_id
        if (!venue_name) {
            return res.status(400).json({
                success: false,
                message: 'Venue Name is required'
            });
        }

        // Find the vendor and populate the FAQs
        const venue = await Venue.findOne({name: venue_name}).populate('FAQs');
        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        // Return the venue details along with FAQs
        res.status(200).json({
            success: true,
            message: 'Venue and FAQs fetched successfully',
            data: {
                id: venue._id,
                venue_name: venue.name,
                faqs: venue.FAQs,
                images: venue.albums
            }
        });

    } catch (err) {
        // Handle server errors
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getAllVenueDataForAdmin = async (req, res) => {
    try{
        const AllVenue = await Venue.find().sort({ createdAt: -1 });
        if(AllVenue.length === 0){
            return res.status(400).json({
                success: false,
                message: 'Empty Venues'
            })
        }
        const uniqueCategories = [...new Set(AllVenue.map(venue => venue.type))];
        const newArr = [];
        for(let i=0; i<AllVenue.length; i++){
            const currData = AllVenue[i];
            const newObj = {
                _id: currData._id,
                category: currData.type,
                name: currData.name,
                phone: currData.phone,
                email: currData.email,
            }
            newArr.push(newObj);
        }
        res.status(200).json({
            success: true,
            data: newArr,
            services: uniqueCategories,
            message: 'Found All Venues'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

exports.getVenueDetailsForAdmin = async (req, res) => {
    try {
        const { venue_name } = req.params;

        // Validate vendor_id
        if (!venue_name) {
            return res.status(400).json({
                success: false,
                message: 'Venue name is required'
            });
        }

        // Find the vendor and populate the FAQs
        const venue = await Venue.findOne({name: venue_name});
        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        const currData = venue;
        const newObj = {
            _id: currData._id,
            type: currData.type,
            name: currData.name,
            phone: currData.phone,
            whatsapp: currData.whatsapp,
            email: currData.email,
            description: currData.description,
            price_range: currData.price_range,
            location: currData.location,
            rooms: currData.rooms,
            img: currData.img
        }

        // Return the venue details along with FAQs
        res.status(200).json({
            success: true,
            message: 'Venue data found',
            data: newObj
        });

    } catch (err) {
        // Handle server errors
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};