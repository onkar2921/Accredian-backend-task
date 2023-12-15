const express=require("express");
const route=express.Router()

// import middleware
const AuthMiddleware=require("../Middlewares/AuthMiddleware")



// imports controllers

const {SignUpController,LoginController,GetUserDataController}=require("../Controllers/AuthController")



// signup
route.post("/signup",SignUpController);


// login
route.post("/login",LoginController)


// get user details
route.get("/getuser",AuthMiddleware,GetUserDataController)




module.exports = route