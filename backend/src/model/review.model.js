import mongoose,{Schema} from "mongoose"

const reviewSchema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    review:{
        type:String
    },
    rating:{
        type:Number
    }
},{timestamps:true})

export const Review=mongoose.model("Review",reviewSchema)