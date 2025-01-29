import mongoose,{Schema} from "mongoose"
import {Review} from "./review.model.js"

const productSchema=new Schema({
    productName:{
        type:String
    },
    productImage:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    stock:{
        type:Number
    },
    category:{
        type:String
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
        }
    ],
},{timestamps:true});

productSchema.post("findOneAndDelete",async(product)=>{
    if(product){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

export const Product=mongoose.model("Product",productSchema)