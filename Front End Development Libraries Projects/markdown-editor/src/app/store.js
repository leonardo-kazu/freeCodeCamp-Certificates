import { configureStore } from "@reduxjs/toolkit";
import editorReducer from '../slices/editorSlice';

export const store = configureStore({
    reducer: {
        editor: editorReducer,
    }
})