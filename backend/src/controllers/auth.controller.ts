import express,{ Request,Response } from "express"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

const prisma = new PrismaClient()

export const signup = (async(req:Request,res:Response) => {
    try {
        const {fullName,username,password,confirmPassword,email} = req.body;
        if(password != confirmPassword){
            return res.status(400).json({error : "Passwords don't match"})
        }
        //@ts-ignore
        const user = await prisma.user.findUnique({where:{username}})
        if(user){return res.status(400).json({error : "User already exists"})}

        //hash password  
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const profilePic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

        const newUser = await prisma.user.create({
            data:{
            fullName,
            username,
            password : hashedPassword,
            email : email,
            profilePic: profilePic,
            }
        })

        generateTokenAndSetCookie(newUser.id,res)
        res.status(201).json({
            id:newUser.id,
            fullName: newUser.fullName,
            username : newUser.username,
            email: newUser.email,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal server error"})
    }
})as express.RequestHandler


export const login = (async(req:Request,res:Response) => {
    try {
        const {email,password} = req.body;
        //@ts-ignore
        const user = await prisma.user.findUnique({where:{email}})

        if(!user){
            return res.json({Error: "user not found in database please sign up"})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")

        if(!isPasswordCorrect){
            return res.json({Error :" incorrect password"})
        }
        generateTokenAndSetCookie(user?.id,res);
        res.status(200).json({
            id : user?.id,
            fullName : user?.fullName,
            email : user?.email,
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal server error"})
    }
})as express.RequestHandler

export const logout = (async(req:Request,res:Response) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message : "logged out successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal server error"})
    }
} )as express.RequestHandler