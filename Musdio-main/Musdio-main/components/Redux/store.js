import { configureStore } from "@reduxjs/toolkit";
import facebookSlider from "./facebookSlider";
import generalSlider from "./generalSlider";
import musicSlider from "./musicSlider";
import userSlider from "./userSlider"
const store = configureStore({
    reducer: {
        musics: musicSlider,
        facebook: facebookSlider,
        user: userSlider,
        general: generalSlider,
    }
})

export default store

