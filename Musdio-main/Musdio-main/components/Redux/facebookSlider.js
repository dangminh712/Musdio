import { createSlice } from "@reduxjs/toolkit";

const isLoggedin = false
const userData = null
const isImageLoading = false

const facebookSlider = createSlice({
    name: "facebook",
    initialState: {isLoggedin, userData, isImageLoading},
    reducers: {
        setLogginStatus(state) {
            state.isLoggedin = !state.isLoggedin
        },
        setUser(state, action) {
            state.userData = action.payload
        },
        setImageStatus(state) {
            state.isImageLoading = !state.isImageLoading
        } 
    }
})

const { actions } = facebookSlider
export const { setLogginStatus, setUser, setImageAvatarStatus } = actions
export default facebookSlider.reducer