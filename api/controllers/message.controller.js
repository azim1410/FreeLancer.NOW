import createError from "../utils/createError.js";
import conversationModel from "../models/conversation.model.js"
import messageModel from "../models/message.model.js";
export const createMessage = async (req, res, next ) => {
    const newMsg = new messageModel({
        conversationId : req.body.conversationId,
        userId : req.userId,
        desc : req.body.desc
    })
    try{
        const savedMsg = await newMsg.save()
        await conversationModel.findOneAndUpdate({id : req.body.conversationId} ,
            {
            $set : {
                readBySeller:req.isSeller,
                readByBuyer : !req.isSeller,
                lastMessage : req.body.desc
            },
        }
        ,{
            new : true
        })

        res.status(201).send(savedMsg)
    }
    catch(err){
        next(err);
    }
}
export const getAllMessage = async  (req, res, next) => {
    const msg = await messageModel.find({conversationId: req.params.id});
    res.status(200).send(msg)
    try{

    }
    catch(err){
        next(err)
    }
}