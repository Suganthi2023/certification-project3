import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userAnswers:{},
    score:''
};

const playSlice = createSlice({
    name:'play',
    initialState,
    reducers: {
        setUserAnswers(state,action){
            console.log(action);
            return {...state,userAnswers:action.payload};
        },
        setScore(state,action){
            console.log(action);
            return {...state,score:action.payload};
        }
    }
})

export const {setUserAnswers, setScore} = playSlice.actions;
export default playSlice.reducer;