import {apiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {AsyncWrap} from "../utils/AsyncWrap.js"

import {Review} from "../model/review.model.js";
import {Product} from "../model/product.model.js"

const createReview=AsyncWrap(async(req,res)=>{

    const {id}=req.params;
    const {review,rating}=req.body;

    const owner=req.user?._id;

    if(!review || !rating){
        throw new apiError(400,"Please add all field")
    }

    if(rating<1 || rating>5){
        throw new apiError(400,"Rating should be between 1 - 5")
    }

    const product=await Product.findById(id);

    if(!product){
        throw new apiError(400,"Product not available");
    }

    const addReview=await Review.create({
        review,
        rating,
        owner
    })

    product. reviews.push(addReview);

    await product.save();

    return res.status(200).json(new ApiResponse(200,"Review added"))
})

const deleteReview=AsyncWrap(async(req,res)=>{
    const {Rid,Pid}=req.params;

    await Product.findByIdAndUpdate(Pid,{$pull:{reviews:Rid}},{new:true});
    
    await Review.findByIdAndDelete(Rid);

    return res.status(200).json(new ApiResponse(200,"Review deleted success fully "))

})

export {createReview,
    deleteReview
}