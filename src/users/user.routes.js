import express from "express";
import { deleteUser, getUsers, login, register,deleteUsers,updateUserRole, userDet} from "./user.controller.js";

const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/getUsers",getUsers)
userRouter.get("/userDet/:id",userDet)

userRouter.delete("/deleteUser/:id",deleteUser)
userRouter.delete("/deleteUsers",deleteUsers)
userRouter.put('/update-role/:userId', updateUserRole);

export default userRouter