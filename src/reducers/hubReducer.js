import { createSlice } from "@reduxjs/toolkit";

const initialState = [     
{
    Quizid:1,
    name:"GeneralKnowledge",
    questions:[
        {
            quesid:1,
            question:"What is a group of crows called?",
            options:["A killer","A Murder","Crows","Crowd"],
            correctAnswer:"A Murder",
            points : 5
        },
        {
            quesid:2,
            question:"How many dots appear on a pair of dice?",
            options:["42","24","12","6"],
            correctAnswer:"42",
            points: 5
        },
        {
            quesid:3,
            question:"Where is the strongest human muscle located?",
            options:["Thighs","Head","Arms","Jaw"],
            correctAnswer:"Jaw",
            points: 5
        }

],
    HighestScore:0
},
{
    Quizid:2,
    name:"Geography",
    questions:[
        {
            quesid:1,
            question:"What is the Capitol of Canada?",
            options:["Toronto","Calgary","Ottawa","Vancouver"],
            correctAnswer:"Ottawa",
            points: 5

        },
        {
            quesid:2,
            question:"On what continent would you find the world's largest desert?",
            options:["Asia","Africa","America","Antartica"],
            correctAnswer:"Antartica",
            points: 5

        },
        {
            quesid:3,
            question:"Which country features a shipwreck on its national flag?",
            options:["India","Bermuda","Malaysia","Singapore"],
            correctAnswer:"Bermuda",
            points:5
        }
    ],
    HighestScore:0
},
{
    Quizid:3,
    name:"Food and Drink",
    questions:[
        {
            quesid:1,
            question:"Pink Ladies and Granny Smiths are types of what fruit?",
            options:["Oranges","Bananas","Apples","Mangoes"],
            correctAnswer:"Apples",
            points:5
        },
        {
            quesid:2,
            question:"Which country drinks the most coffee?",
            options:["Ireland","Denmark","Swedan","Finland"],
            correctAnswer:"Finland",
            points:5
        },
        {
            quesid:3,
            question:"where did sushi originate?",
            options:["China","Japan","Dubai","USA"],
            correctAnswer:"China",
            points:5
        }
    ],
    HighestScore:0
}
]

const hubSlice = createSlice({
    name:'quizzes',
    initialState,
    reducers: {
        createHub(state,action){
            console.log(action);
            return state;
        }
        
    }
})

export const {createHub}=hubSlice.actions;
export default hubSlice.reducer;


