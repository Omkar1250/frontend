import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import ProfileReducer from "../slices/profileSlice";
import postReducer from "../slices/postSlice"
const rootReducer = combineReducers({
        auth: authReducer,
        profile:ProfileReducer,
        post: postReducer,
})

export default rootReducer 