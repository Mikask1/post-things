import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user.js"

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            return res.status(401).json({ message: "Email or password is incorrect." })
        }

        const verifyPassword = await bcrypt.compare(password, existingUser.password)

        if (!verifyPassword) {
            return res.status(401).json({ message: "Email or password is incorrect." })
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.privateKey, { expiresIn: "1h" })
        res.status(200).json({ result: existingUser, token })
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body

        const usernameUser = await User.findOne({ name: name })
        if (usernameUser) {
            return res.status(401).send({ message: "User already exists with that username" })
        }
        
        const emailUser = await User.findOne({ email: email })
        if (emailUser) {
            return res.status(401).send({ message: "User already exists with that email" })
        }
        
        if (password !== confirmPassword){
            return res.status(401).send({ message: "Password does not match" })
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ name: name, email: email, password: hashedPassword, })

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.privateKey, { expiresIn: "1h" })
        
        
        res.status(200).json({ result, token })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" })
    }
}