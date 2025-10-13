import { Router } from "express";
import { changeCurrentPassword, getcurrentUser, getuserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAavatar, updateUserCoverImage } from "../controllers/user.controller.js";
import {upload} from "../Middlewares/multer.middleware.js"
import { verifyJWT } from "../Middlewares/Auth.middleware.js";

const router =  Router();

router.route("/register").post( 
    upload.fields([
        {
            name: "avatar",
            maxCount:1
        },
        {
            name: "coverImage",
            maxCount:1
        },
    ]),
    registerUser
)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT ,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/current-user").get(verifyJWT, getcurrentUser);

router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAavatar);

router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/C/:userName").get(verifyJWT, getuserChannelProfile);

router.route("/watchHistory").get(verifyJWT, getWatchHistory);





export default router;