import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
    name:'story',
    initialState:{
        stories:[],
        // selectedPost:null
    },
    reducers:{
        //actions
        setStories:(state, action) => {
            state.stories = action.payload;
        },
        // setSelectedPost:(state, action) => {
        //     state.selectedPost = action.payload;
        // }
    }
});

export const {setStories } = storySlice.actions;
export default storySlice.reducer;