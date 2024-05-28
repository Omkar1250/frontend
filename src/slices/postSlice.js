import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    post: null,
    editPost: false,

}
const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        setStep: (state , action) => {
            state.step = action.payload

        },
        setPost: (state, action) => {
            state.post = action.payload
        },
        setEditPost: (state, action) => {
            state.editPost = action.payload
        },
        resetPostState:(state, action) => {
            state.step = 1
            state.post = null
            state.editPost= false
        },
    }      
})

export const {
    setStep,
    setPost,
    setEditPost,
    resetPostState,
} = postSlice.actions

export default postSlice.reducer