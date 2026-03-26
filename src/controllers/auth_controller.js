import userModel from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
    const {username, email, password, role='user'} = req.body
    try {
        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
        });

        if(isUserAlreadyExists){
            return res.status(400).json({message: "user already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            username,
            email, 
            password: hashedPassword,
            role
        })

        const token = jwt.sign({
            id: user._id,
            role: user.role
        },process.env.JWT_SECRET)

        res.cookie("token",token)

        res.status(201).json({message: "user created successfully", user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }})

    } catch (error) {
        console.log(error)
        res.status(400).json({message: "user can't be created"})
    }
}

export const Login = async (req, res) => {
    const {username, email, password} = req.body
    try {

        const user = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
        })

        if(!user){
            return res.status(400).json({message: "user doesn't exist"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        },process.env.JWT_SECRET)

        res.cookie("token",token)

        res.status(200).json({message:"user logged in successfully", user:{
            id: user._id,
            username: user.username,
            email: user.email
        }})

    } catch (error) {
        console.log(error)
        res.status(400).json({message: "problem in login controller", error})
    }
}

export const Logout = async (req, res) => {
    const token = req.cookies.token
    if(!token){
        res.status(403).json({message: "user is not logged in"})
    }
    res.clearCookie("token")
    res.status(200).json({message: "Logout successfully"})
}