const Gallery  = require('../../models/gallery');

exports.getGalleryCategoryWithUnique = async (req, res) => {
    try{
        let AllCategory = await Gallery.find();

        if (AllCategory.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Gallery not found'
            });
        }

        const uniqueCategories = [...new Set(AllCategory.map(item => item.category))];

        res.status(200).json({
            success: true,
            message: 'Gallery found',
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

exports.getById = async (req, res) => {
    try{
        const { albumName } = req.params;
        let Album = await Gallery.findOne({category: albumName});

        if (!Album) {
            return res.status(404).json({
                success: false,
                message: 'Gallery Not Found'
            });
        }

        res.status(200).json({
            success: true,
            data: Album,
            message: 'Gallery found'
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

exports.getGalleryData = async (req, res) => {
    try{
        const findGallery = await Gallery.find();

        if(findGallery.length === 0){
            return res.status(400).json({
                success: false,
                message:'empty gallery data'
            })
        }

        res.status(200).json({
            success: true,
            data: findGallery,
            message: 'Gallery Found'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.getGalleryCategory = async (req, res) => {
    try{
        const { categoryName } = req.params;
        let AllCategory = await Gallery.find();

        if (AllCategory.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Album category not found'
            });
        }

        for(let i=0; i<AllCategory.length; i++){
            if(AllCategory[i].category.toLocaleLowerCase().replaceAll(/\s+/g, '-') === categoryName){
                const findCategory = await Gallery.find({category: AllCategory[i].category});
                if(findCategory.length > 0){
                    return res.status(200).json({
                        success: true,
                        data: findCategory[0],
                        message: 'All Album category found'
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