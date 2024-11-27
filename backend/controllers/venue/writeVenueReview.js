const Review = require('../../models/sub-models/reviews');
const Venue = require('../../models/venue');
const User = require('../../models/user');
const path = require('path');
const fs = require('fs');

exports.addVenueReviews = async (req, res) => {
  try {
    const { user_id, venue_id, experience, rating, amount } = req.body;

    // Validate required fields
    const requiredFields = ['user_id', 'venue_id', 'experience', 'rating', 'amount'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ 
          success: false, 
          message: `Please fill in the ${field}` 
        });
      }
    }

    // Verify user exists
    const userDetails = await User.findById(user_id);
    if (!userDetails) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found. Please provide a valid user ID.' 
      });
    }

    // Verify venue exists
    const venueDetails = await Venue.findById(venue_id);
    if (!venueDetails) {
      return res.status(404).json({ 
        success: false, 
        message: 'Venue not found. Please provide a valid venue ID.' 
      });
    }

    // Create a new review
    const newReview = await Review.create({
      noOfStars: rating,
      user: user_id,
      comment: experience,
      amount: amount,
    });

    // Update the venue's review list
    const updatedVenue = await Venue.findByIdAndUpdate(
      venue_id,
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    if (!updatedVenue) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to associate the review with the venue.' 
      });
    }

    // Respond with success
    res.status(201).json({
      success: true,
      message: 'Review added successfully!',
      review_id: newReview._id,
    });
  } catch (err) {
    console.error('Add Venue Review Error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};

// upload Image on reviews
exports.uploadVenueReviewImg = async (req, res) => {
  try {
      const { id } = req.body;
      const img = req.files?.img;

      // Check for required fields
      if (!id) {
          return res.status(400).json({ success: false, message: 'Review id found' });
      }

      const findReview = await Review.findById(id);
      if (!findReview) {
          return res.status(404).json({ success: false, message: 'Not Found' });
      }

      // Validate the services image
      if (!img) {
          return res.status(400).json({ success: false, message: 'Please upload an image' });
      }

      // Define the directory where the file will be saved
      const uploadDir = path.join(__dirname, '../..', 'VenueImages');

      // Check if the directory exists, if not, create it
      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Create the file path where the image will be stored on the server
      const timestamp = Date.now();
      const ext = path.extname(img.name);
      const imageName = `${timestamp}${ext}`;
      const serverFilePath = path.join(uploadDir, imageName);

      console.log("Image upload path:", serverFilePath);

      // Move the image to the server's files directory
      await img.mv(serverFilePath);

      // Update the gallery with the image path
      await Review.findByIdAndUpdate(
          id,
          { $push: { images: `/files/${imageName}` } },
          { new: true }
      );

      res.status(201).json({
          success: true,
          message: 'Image uploaded successfully'
      });

  } catch (err) {
      console.log('Image Uploading Error: ', err.message);
      res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          error: err.message
      });
  }
};
