const Gallery = require("../../models/gallery");

exports.updateAlbum = async (req, res) => {
  try {
    const { id, title, desc } = req.body;

    const requiredFields = ["id", 'title', "desc"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `Please fill in the ${field.toUpperCase()}`,
        });
      }
    }

    const update = await Gallery.findByIdAndUpdate(
        id,
        {$set: {title: title, desc: desc}},
        {new: true}
    );

    return res
      .status(200)
      .json({ success: true, message: "Updated Gallery Successfully" });
  } 
  catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
