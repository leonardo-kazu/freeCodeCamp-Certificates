import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    normalText: "# this a h1 heading\n\n## this is a subheading\n\n[links](https://www.freecodecamp.org) We got links boys\n\n`code you say?`\n\n```\nCode blocks also boy\n```\n\n- And some lists\n- INSIDE OF ANOTHER LIST\n- ANOTHER ONE\n- AND ANOTHER ONE\n\n> Block quotes? i can't believe it\n\n**simply bold**\n\nAnd the closure...\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)"
    ,
    editorMaximized: false,
    previewMaximized: false
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setNormalText: (state, action) => {
            console.log(action)
            state.normalText = action.payload;
        },

        handleEditorMaximized: (state) => {
            state.editorMaximized = !state.editorMaximized;
        },

        handlePreviewMaximized: (state) => {
            state.previewMaximized = !state.previewMaximized;
        }
    }
})

export const {setNormalText, handleEditorMaximized, handlePreviewMaximized} = editorSlice.actions

export const getEditorMaximized = (state) => state.editor.editorMaximized
export const getPreviewerMaximized = (state) => state.editor.previewMaximized
export const getText = (state) => state.editor.normalText

export default editorSlice.reducer