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
                    correctAnswer:"A killer",
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

    //const [quesidcounter,setQuestidCounter]=useState(1);

    const addformfield=()=>{
        const newQuestion={
            quesid:newquiz.questions.length+1,
            question:"",
            options:[],
            correctanswer:"",
            points:""
        }
        setNewQuiz({...newquiz,questions:[...newquiz.questions,newQuestion]});
       // setQuestidCounter(prevCounter=>prevCounter+1);
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

    const deleteQuiz = (Quizid)=>{
        
        console.log("The quiz getting deleted is:",Quizid)
        const newquizzes = quizzes.filter((quiz)=>{
            if (quiz.Quizid === Quizid){
                return false;
            } else {
                return true;
            }
        })
        setQuizzes(newquizzes);
    }


    const addquestiontoquiz=(quiz,QuizId,newQuestion)=>{
        console.log('we are currently looking at Quizid: ',quiz.Quizid);
        setQuizzes(quizzes =>{
            return quizzes.map(quiz =>{
                if(quiz.Quizid===QuizId){
                    //console.log(quiz.questions);        
                    //console.log(newQuestion);
                    //const newquestion = quiz.questions.concat(newQuestion)
                    //console.log(newquestion);
                    return{...quiz,questions:quiz.questions.concat(newQuestion)};
                }else{
                    return quiz;
                }
            })
       })}

       const editQuestion=(QuizId,newQuestion)=>{
        console.log('We are currently looking at Quizid:',QuizId);
        console.log('The question that we are changing now',newQuestion.quesid);
        setQuizzes(quizzes =>{
            return quizzes.map(quiz =>{
                if(quiz.Quizid===QuizId){
                    const editedquestions = quiz.questions.map(question =>{
                        if(question.quesid === newQuestion.quesid){
                            return newQuestion;                            
                        } else{
                            //console.log(question);
                            return question;
                        }
                      })
                      //console.log({questions:editedquestions})
                      return{...quiz,questions:editedquestions};
                    }
                    return quiz;
                    })
                })}
    const deleteQuestion=(QuizId,DeletedQuestion)=>{
        console.log('We are deleting this quiz:',QuizId);
        console.log("we are deleting this question:",DeletedQuestion.quesid);
        setQuizzes(quizzes =>{
            return quizzes.map(quiz =>{
                if(quiz.Quizid===QuizId){
                    const newquestionset = quiz.questions.filter(question =>{
                        if(question.quesid === DeletedQuestion.quesid){
                            return false;
                        }else{
                            //console.log(question);
                            return true;
                        }
                    })
                        return {...quiz,questions:newquestionset};
                } else {
                    return quiz;
                }
            })
        })
    }       


    
return (
        <>  
        <h3>DashBoard</h3>
        <Routes>
            
            {quizzes.map((quiz)=> (
                <Route key={quiz.Quizid} path={`/QuizHub/${quiz.Quizid}/playquiz`} element={<PlayQuiz quiz={quiz}/>}/>
            ))}
            {quizzes.map((quiz)=>(
                <Route key={quiz.Quizid} path={`/QuizHub/${quiz.Quizid}/editquiz`} 
                element={<EditQuiz quiz={quiz} quizId={quiz.Quizid} addquestion={addquestiontoquiz}
                EditQuestion={editQuestion} DeleteQuestion={deleteQuestion}/>}/>
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
                    <button onClick={()=>{deleteQuiz(quiz.Quizid)}}>Delete</button>
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
                <button type="button" onClick={addformfield}>Add Question</button>
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