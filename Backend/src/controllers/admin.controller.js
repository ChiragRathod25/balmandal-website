import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const justCheck=asyncHandler(async(req,res,next)=>{

        // get all balak
        
    res.status(200).json(new ApiResponce(200,null,"Working fine"));
}
)

export {
    justCheck
}