import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const justCheck=asyncHandler(async(req,res,next)=>{

        // get all balak
        
    res.status(200).json(new ApiResponce(200,null,"Working fine"));
}
)
const getAllUsers=asyncHandler(async(req,res,next)=>{
    // get all users
    const users=await User.find().select("-password -refreshToken");  
    if(!users)
        throw new ApiError(404,"No user found");
    res.status(200).json(new ApiResponce(200,users,"All users fetched successfully"));    
})

export {
    justCheck,
    getAllUsers
}