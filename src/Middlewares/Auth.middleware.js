import { User } from "../Models/User.Models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies.accessToken || req.headers("authorization")?.replace("Bearer", "");
        
        if(!token) {
            throw new ApiErrors(401, "Unaouthorized: No Token Provided");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken._id).select("-password -refreshToken -__v");
    
        if(!user) {
            throw new ApiErrors(401, "Unauthorized: Invalied access token")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiErrors(401, "Unauthorized: Invalid access token")
    }
})