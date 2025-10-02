import { asyncHandler } from "../utils/AsyncHandler.js";
import { apiErrors } from "../utils/ApiErrors.js";
import { User } from "../Models/User.Models.js";
import { uploadOnCloudinary} from "../utils/Cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"



const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "OK" });

  const { fullName, email, password } = req.body;

  console.log(fullName, email, password);

  if ([fullName, email, password].some((field) => field.trim() === "")) {
    throw new apiErrors(400, "All fields are required");
  }

  const existedUser = await User.findOne({
   $or: [{userName},{email}]
  });

  if (existedUser) {
      throw new apiErrors(409, "User already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new apiErrors(400, "Avatar is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
    throw new apiErrors(400, "Avatar file is required");
  }

const user = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url
  })

  const createdUser = await user.findById(user._id).select("-password -refreshToken")

  if(!createdUser){
    throw new apiErrors(500, "something went wrong while registering user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered sucessfully")
  )



});

export { registerUser };
