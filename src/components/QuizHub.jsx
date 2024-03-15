import{Routes,Route} from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditQuiz from "./Editquiz";
import PlayQuiz from "./Playquiz";

function QuizHub() {
    const [quizzes,setQuizzes]= useState([
        {
            Quizid:1,
            name:"GeneralKnowledge",
            questions:[
                {
                    quesid:1,
                    question:"What is a group of crows called?",
                    options:["A killer","A Murder","Crows","Crowd"],
                    correctanswer:"A killer",
                    points : 5
                },
                {
                    quesid:2,
                    question:"How many dots appear on a pair of dice?",
                    options:["42","24","12","6"],
                    correctanswer:"42",
                    points: 5
                },
                {
                    quesid:3,
                    question:"Where is the strongest human muscle located?",
                    options:["Thighs","Head","Arms","Jaw"],
                    correctanswser:"Jaw",
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
                    correctanswer:"Ottawa",
                    points: 5

                },
                {
                    quesid:2,
                    question:"On what continent would you find the world's largest desert?",
                    options:["Asia","Africa","America","Antartica"],
                    correctanswer:"Antartica",
                    points: 5

                },
                {
                    quesid:3,
                    question:"Which country features a shipwreck on its national flag?",
                    options:["India","Bermuda","Malaysia","Singapore"],
                    correctanswer:"Bermuda",
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
                    correctanswer:"Apples",
                    points:5
                },
                {
                    quesid:2,
                    question:"Which country drinks the most coffee?",
                    options:["Ireland","Denmark","Swedan","Finland"],
                    correctanswer:"Finland",
                    points:5
                },
                {
                    quesid:3,
                    question:"where did sushi originate?",
                    options:["China","Japan","Dubai","USA"],
                    correctanswer:"China",
                    points:5
                }
            ],
            HighestScore:0
        }
    ])

    //console.log(quizzes[0]);
    
return (
        <>  
        <h3>DashBoard</h3>
        <Routes>
            
            {quizzes.map((quiz)=> (
                <Route key={quiz.Quizid} path={`/QuizHub/${quiz.Quizid}/playquiz`} element={<PlayQuiz quiz={quiz}/>}/>
            ))}
            {quizzes.map((quiz)=>(
                <Route key={quiz.Quizid} path={`/QuizHub/${quiz.Quizid}/editquiz`} element={<EditQuiz quiz={quiz}/>}/>
            ))}

            
        </Routes>
        
        <div>
            This is the Game Page
            {quizzes.map((quiz)=>(
                <div key={quiz.Quizid}>
                    <h3>{quiz.name}</h3>
                    <Link to={`/QuizHub/${quiz.Quizid}/playquiz`} >
                        <button> Play </button>
                    </Link>
                    <Link to={`/QuizHub/${quiz.Quizid}/editquiz`} >
                        <button> Edit </button>
                    </Link>
                </div>
            ))}
            <Link to="/home">
                <button>Back to Home</button>
            </Link>
        </div>
        </>           
        
    )
       
}   



  
  export default QuizHub;