import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const playSlice = createSlice({
    name:'play',
    initialState,
    reducers: {
        userAnswers(state,action){
            console.log(action);
            return state;
        }
    }
})

export const {userAnswers} = playSlice.actions;
export default playSlice.reducer;