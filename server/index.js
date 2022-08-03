import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import postRoutes from "./routes/posts.js" 
import userRoutes from "./routes/user.js"
import path from "path"
import dotenv from "dotenv"

import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({
    path: path.resolve(__dirname, './.env')
})

const PORT = process.env.PORT

const app = express()

app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ limit: "1mb", extended: true, }))
app.use(cors())

// Routes
app.use("/posts", postRoutes)
app.use("/user", userRoutes)
app.get("/", (req, res) => {
    res.send("Hello, welcome to Post Things API")
})


// MongoDB Atlas Cloud
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((err) => console.log(err.message))







