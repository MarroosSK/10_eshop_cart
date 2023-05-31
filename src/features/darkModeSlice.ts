import { createSlice } from "@reduxjs/toolkit";
import { DarkModeType } from "../types/types";

const initialState: DarkModeType = {
    mode: "light"
}

export const darkModeSlice = createSlice({
    name: "darkModeSlice",
    initialState,
    reducers:{
        toggleDarkMode: (state) => {state.mode = state.mode === "light" ? "dark" : "light"}
    }
})

export const {toggleDarkMode} = darkModeSlice.actions
export default darkModeSlice.reducer