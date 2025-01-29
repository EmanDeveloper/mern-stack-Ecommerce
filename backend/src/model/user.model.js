import mongoose,{Schema} from "mongoose"
import  passportLocalMongoose from "passport-local-mongoose"

const userSchema=new Schema({
    email:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:Number
    },
    country:{
        type:String
    }
},{timestamps:true});

userSchema.plugin(passportLocalMongoose);

export const User=mongoose.model("User",userSchema)