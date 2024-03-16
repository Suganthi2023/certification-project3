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

    console.log(quizzes);
    const[newquiz,setNewQuiz]=useState({
        name:'',
        questions:[],
    })

    const handleformTyping=(e)=>{
    //console.log(e.target.name,e.target.value);
        const newuserQuiz={
            ...newquiz,
            [e.target.name]:e.target.value
        }
        setNewQuiz(newuserQuiz);
    }

    const [quesidcounter,setQuestidCounter]=useState(1);

    const addQuestion=()=>{
        const newQuestion={
            quesid:quesidcounter,
            question:"",
            options:[],
            correctanswer:"",
            points:""
        }
        setNewQuiz({...newquiz,questions:[...newquiz.questions,newQuestion]});
        setQuestidCounter(prevCounter=>prevCounter+1);
    }

    const handleQuestionTyping=(index,e)=>{
        const newuserQuestions =[...newquiz.questions];
        if(e.target.name === "options"){
            newuserQuestions[index][e.target.name]=e.target.value.split(",").map((option)=>option.trim());
        } else if(e.target.name === "points"){
            newuserQuestions[index][e.target.name]=parseInt(e.target.value);
        } else {
            newuserQuestions[index][e.target.name]=e.target.value;
        }
        setNewQuiz({...newquiz,question:newuserQuestions})
    }

    const handleCreateQuiz=(e)=>{
        e.preventDefault();
        const nextId=quizzes.length+1
        const newQuiz={
            Quizid:nextId,
            name:newquiz.name,
            questions:newquiz.questions,
            Highestscore:0
        }
        setQuizzes([...quizzes,newQuiz]);
        setNewQuiz({name:"",questions:[]})
    }
    
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

            <h3>Create your Own Quiz</h3>
            <form onSubmit={handleCreateQuiz}>
                <div>
                    Quiz Name:<input type="text" name="name" value={newquiz.name} onChange={handleformTyping}/>
                </div>
                {newquiz.questions.map((question,index)=>
                 <div key={index}>
                        <h4>Question{question.quesid}</h4>
                        <div>
                            Question:<input type="text" name="question" 
                            value={question.question} onChange={(e)=>handleQuestionTyping(index,e)}/>
                        </div>
                        <div>
                            Options(Separate with ','):<input type="text" name="options"
                            value={question.options} onChange={(e)=>handleQuestionTyping(index,e)}/>
                        </div>
                        <div>
                            CorrectAnswer:<input type="text" name="correctanswer"
                            value={question.correctanswer} onChange={(e)=>handleQuestionTyping(index,e)}/>
                        </div>
                        <div>
                            Points:<input type="text" name="points"
                            value={question.points} onChange={(e)=>handleQuestionTyping(index,e)}/>
                        </div>
                 </div>
                )}
                <button type="button" onClick={addQuestion}>Add Question</button>
                <button type="submit">Submit</button>
            </form>
            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </div>
        </>           
        
    )
       
}   



  
  export default QuizHub;