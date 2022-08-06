import axios from "axios"

const localhost = "http://localhost:5000"
const server = "https://post-things.herokuapp.com"
const API = axios.create({ baseURL: localhost})

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req
})

// posts
export const fetchPosts = () => API.get("/posts")
export const createPost = (post) => API.post("/posts", post)
export const updateLike = (id, likes) => API.patch(`/posts/${id}/like`, {likes: likes})
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post)
export const deletePost = (id) => API.delete(`posts/${id}`)
export const addComment = (comment, userId, name, postID) => API.post(`posts/${postID}/comments`, {comment, userId, name})
export const deleteComment = (postID, commentID) => API.delete(`posts/${postID}/${commentID}`)

// user
export const signIn = (loginData) => API.post("/user/signin", loginData)
export const signUp = (loginData) => API.post("/user/signup", loginData)