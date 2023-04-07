import { createSlice } from "@reduxjs/toolkit";

const isLoggedin = false
const userData = null
const isImageLoading = false

const userSlider = createSlice({
    name: "user",
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
        },
        deleteUserInfo(state){
            state.userData = null
            state.isImageLoading = false
            state.isLoggedin = false
        },  
        deleteFavoriteSong(state, action) {
            state.userData.favoriteMusics = state.userData.favoriteMusics.filter((songId) => {
                return songId != action.payload
            })
        },
        addFavoriteSong(state, action) {
            state.userData.favoriteMusics = [...state.userData.favoriteMusics , action.payload] 
        }

    }
})

const { actions } = userSlider
export const { setLogginStatus, setUser, setImageAvatarStatus,deleteUserInfo, deleteFavoriteSong, addFavoriteSong } = actions
export default userSlider.reducer