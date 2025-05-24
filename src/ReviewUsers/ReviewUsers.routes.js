import { authMiddleware } from "../../MiddleWare/MiddleWare.js";
import { AddReview,deleteAllReview,deleteReview,getAllReview, updateReview } from "./ReviewUsers.controller.js";
import express from "express"

const userReviews=express.Router()

userReviews.post("/addReviews",authMiddleware,AddReview)
userReviews.get("/getAllReview",getAllReview)
userReviews.delete("/deleteAllReview",deleteAllReview)
userReviews.delete("/deleteReview/:id",deleteReview)
userReviews.put("/updateReview/:id",updateReview)

export default userReviews;