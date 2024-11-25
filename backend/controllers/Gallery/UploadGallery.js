const Gallery = require("../../models/gallery");

exports.createCategoryAlbum = async (req, res) => {
  try {
    const { category, title, desc } = req.body;

    const requiredFields = ["category", 'title', "desc"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `Please fill in the ${field.toUpperCase()}`,
        });
      }
    }

    const isFind = await Gallery.findOne({category:category});
    if(isFind){
      return res
      .status(200)
      .json({ success: true, data: isFind, message: "Gallery Exits" });
    }
    const newGallery = await Gallery.create({ category, title,  desc });
    return res
      .status(200)
      .json({ success: true, data: newGallery, message: "Create Gallery" });
  } 
  catch (err) {
    console.log("Image Uploading Error: ", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
