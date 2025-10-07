import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { User } from "../Models/User.Models.js";
import { uploadOnCloudinary} from "../utils/Cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"



const registerUser = asyncHandler(async (req, res) => {
  
 const { fullName, email, password, userName } = req.body;

if ([fullName, email, password, userName].some((field) => !field || field.trim() === "")) {
  throw new ApiErrors(400, "All fields are required");
}

  const existedUser = await User.findOne({
   $or: [{userName},{email}]
  });

  if (existedUser) {
      throw new ApiErrors(409, "User already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImagepath ;
  if(req.foiles && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImagepath = req.files.coverImage[0].path
  }

  if(!avatarLocalPath){
    throw new ApiErrors(400, "Avatar is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImagepath)

  if (!avatar) {
    throw new ApiErrors(400, "Avatar file is required");
  }

const user = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if(!createdUser){
    throw new ApiErrors(500, "something went wrong while registering user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered sucessfully")
  )


});

const loginUser = asyncHandler( async (req, res) => {
  const {userName, email, password} = req.body;

  if(!email || !password){
    throw new ApiErrors(400, "Username or email are required")
  }
})

export { registerUser };
