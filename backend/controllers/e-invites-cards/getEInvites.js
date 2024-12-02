const EInvites = require('../../models/InvitaionCardDummy');

exports.getEInviteCardById = async (req, res) => {
    try{
        const { cardId } = req.params;
        const Card = await EInvites.findById(cardId);
        if(!Card){
            return res.status(404).json({
                success: false,
                message:'Not Found'
            })
        }

        res.status(200).json({
            success: true,
            data: Card,
            message: 'Found'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

exports.allEInvitesCards = async (req, res) => {
    try{
        const allInvites = await EInvites.find();
        if(allInvites.length < 0){
            return res.status(404).json({
                success: false,
                message:'Empty E-Invites Cards'
            })
        }

        res.status(200).json({
            success: true,
            data:allInvites,
            message: 'Found'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}