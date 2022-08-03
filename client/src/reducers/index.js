import {combineReducers} from "redux"

import authReducer from "./auth"
import postsReducer from "./posts"

export default combineReducers({ posts: postsReducer, auth: authReducer})