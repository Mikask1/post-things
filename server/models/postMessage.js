import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    id: String,
    title: String,
    message: String,
    userId: String,
    user: String,
    tags: {
        type: String,
        default: ""
    },
    file: String,
    likes: {
        type: [String],
        default: []
    },
    createdAtProperty: {
        type: Date,
        default: new Date()
    },
    comments: { 
        type: [{
            name: String,
            userId: String,
            message: String,
            createdAtProperty: {
                type: Date,
                default: new Date(),
            }
        }],
        default: []
    }
})

const PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage

