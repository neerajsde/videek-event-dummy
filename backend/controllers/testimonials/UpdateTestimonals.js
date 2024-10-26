const Testimonal = require('../../models/testimonial');

exports.UpdatePublishTestimonals = async (req, res) => {
    try{
        const { testimonalId } = req.body;

        if(!testimonalId){
            return res.status(402).json({
                success: false,
                message: 'Something went wrong. Please refresh'
            });
        }

        const findTestimonials = await Testimonal.findById(testimonalId);
        if(!findTestimonials){
            return res.status(402).json({
                success: false,
                message: 'Testimonal Not Found'
            });
        }

        await Testimonal.findByIdAndUpdate(
            testimonalId,
            {$set: {publish: true}},
            {new: true}
        );
        res.status(200).json({
            success: true,
            message: 'Published Sucessfully'
        })

    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.UnUpdatePublishTestimonals = async (req, res) => {
    try{
        const { testimonalId } = req.body;

        if(!testimonalId){
            return res.status(402).json({
                success: false,
                message: 'Something went wrong. Please refresh'
            });
        }

        const findTestimonials = await Testimonal.findById(testimonalId);
        if(!findTestimonials){
            return res.status(402).json({
                success: false,
                message: 'Testimonal Not Found'
            });
        }

        await Testimonal.findByIdAndUpdate(
            testimonalId,
            {$set: {publish: false}},
            {new: true}
        );
        res.status(200).json({
            success: true,
            message: 'Un-Published Sucessfully'
        })

    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}