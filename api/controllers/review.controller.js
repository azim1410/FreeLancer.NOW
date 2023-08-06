import Review from "../models/review.model.js"
import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js";
export  const createReview  = async(req, res, next) =>{
    if(req.isSeller){
        return next(createError(400, "seller cannot create review"))
    }
    
    const newReview = new Review({
        userId : req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
    }); 
    try{
        const review = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.userId,
        });

        if(review)
            return next(createError(403, "you already have a review"))

        const savedreview = await newReview.save();
        

        await Gig.findByIdAndUpdate(req.body.getId, {$inc : {totalStars: req.body.start , starNumber:1}})
        res.status(201).send(savedreview);

    }
    catch(err){
        next(err);
    }
}

export const getReviews = async(req, res, next) =>{
    try{
        const reviews = await Review.find({gigId : req.params.gigid});
        res.status(200).send(reviews);
    }
    catch(err){
        next(err);
    }
}

export const deleteReview = async(req, res, next) =>{
    try{

    }
    catch(err){
        res.status(400).send(err);
        
    }
}