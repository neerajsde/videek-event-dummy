const Venue = require('../../models/venue');
const Reviews = require('../../models/sub-models/reviews');

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
                delete currVenue._id;
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