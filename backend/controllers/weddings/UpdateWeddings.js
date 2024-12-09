const RealWedding = require("../../models/real_weddings");
const Vendor = require("../../models/vendor_category");

// Update Real Wedding endpoint
exports.updateWeddingData = async (req, res) => {
  try {
    const {
      WeddingId,
      category,
      name,
      title,
      location,
      description,
      date,
      tags,
    } = req.body;

    // Validate required fields
    if (!WeddingId) {
      return res.status(400).json({ success: false, message: "WeddingId is required." });
    }

    // Parse tags if it's a JSON string
    let parsedTags = [];
    try {
      parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid tags format." });
    }

    // Fetch all vendors and find matching tags
    const allVendors = await Vendor.find();
    const uniqueTagsArray = allVendors
      .filter((vendor) =>
        parsedTags.some(
          (tag) => vendor.name.toLowerCase().trim() === tag.toLowerCase().trim()
        )
      )
      .map((vendor) => vendor._id);

    // Prepare updated data
    const updatedData = {
      category,
      couple_name: name,
      title,
      location,
      description,
      date,
      taggedVendor: uniqueTagsArray,
    };

    // Update the wedding in the database
    const updatedWedding = await RealWedding.findByIdAndUpdate(
      WeddingId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedWedding) {
      return res.status(404).json({ success: false, message: "Wedding not found." });
    }

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Wedding updated successfully.",
      data: updatedWedding,
    });
  } catch (error) {
    console.error("Error updating real wedding:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};
