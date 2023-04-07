import { createSlice } from "@reduxjs/toolkit";

const generalSlider = createSlice({
    name: "general",
    initialState: { theme: "dark" },
    reducers: {
        setTheme(state, action) {
            return state = {
                ...state,
                theme: action.payload
            }
        } 
    }
})

const { actions } = generalSlider
export const { setTheme } = actions
export default generalSlider.reducer