import express from "express";
import { deleteUser, getUsers, login, register,deleteUsers } from "./user.controller.js";

const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/getUsers",getUsers)
userRouter.delete("/deleteUser/:id",deleteUser)
userRouter.delete("/deleteUsers",deleteUsers)

export default userRouter