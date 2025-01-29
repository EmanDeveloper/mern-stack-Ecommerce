import {apiError} from "../utils/apiError.js"
import {AsyncWrap} from "../utils/AsyncWrap.js"

const login=AsyncWrap(async(req,res,next)=>{

    if(!req.isAuthenticated()){
        throw new apiError(400,"Please login first");
    }

    next();
})

export {login}