import{Routes,Route} from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditQuiz from "./Editquiz";
import PlayQuiz from "./Playquiz";
import { useDispatch,useSelector } from "react-redux";
import {setQuizzes,createQuiz} from "../reducers/hubReducer";

function QuizHub() {
  /*  const [quizzes,setQuizzes]= useState([      //Intial State of the Quizzes. In this state we have predefined quizzes.
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
    ])*/
    const dispatch=useDispatch();
    const quizzes=useSelector(state=>{return state.quizhub.quizzes})
    console.log(quizzes);
    //This is the copy of the part of the state which gets used to create a new quiz by the user
    const[newquiz,setNewQuiz]=useState({
        name:'',
        questions:[],
    })

    //To handle the user typing in the form fields.
    const handleformTyping=(e)=>{
        e.preventDefault();
    //console.log(e.target.name,e.target.value);
        const newuserQuiz={
            ...newquiz,
            [e.target.name]:e.target.value
        }
        setNewQuiz(newuserQuiz);
    }

    //const [quesidcounter,setQuestidCounter]=useState(1); This one used during the form development stage
    //This callback function is to add more questions set to the new quiz while creating and to set the copy of the state.
    const addformfield=()=>{
        const newQuestion={
            quesid:newquiz.questions.length+1,
            question:"",
            options:[],
            correctAnswer:"",
            points:""
        }
        setNewQuiz({...newquiz,questions:[...newquiz.questions,newQuestion]});
       // setQuestidCounter(prevCounter=>prevCounter+1);
    }
    //This call back function is to check that options are seperated by commas and converting points to integer in order to calculate the score 
    //when the quiz gets played.
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

    //This function uses the above functions, copy of the state to create the new quiz and updates the 
    //intial state of quizzes to reflect the addition to quizzes list.
    const handleCreateQuiz=(e)=>{
        e.preventDefault();
        /*const nextId=quizzes.length+1
        const newQuiz={
            Quizid:nextId,
            name:newquiz.name,
            questions:newquiz.questions,
            HighestScore:0
        }*/
        const newQuiz={
            name:newquiz.name,
            questions:newquiz.questions
        }
        console.log(newQuiz);
        dispatch(createQuiz({newQuiz}));
        setNewQuiz({name:"",questions:[]});
    }

    //This function to delete the quiz from the state as well as from the local storage when the
    //user click the delete button.
    const deleteQuiz = (Quizid,Qname)=>{
        
        console.log("The quiz getting deleted is:",Qname)
        const newquizzes = quizzes.filter((quiz)=>{
            if (quiz.name === Qname){
                return false;
            } else {
                localStorage.removeItem(Qname);
                return true;
            }
        })
        setQuizzes(newquizzes);
    }

    //Call back function which gets passed to the Editquiz component through router
    //in order to add new questions to the selected quiz
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

       //Call back function which gets passed to the Editquiz component through router
       //in order for the user to edit the already existing questions in the selected quiz
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
    //call back function which gets passed to the Editquiz component through router in order
    //for the user to delete questions from selected quiz
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
    
    //Call back function to update the HighestScore for the quiz that gets played by the user.
    /*const highScoreupdate =(Quiz,Quizid,highscore)=>{
        console.log("the current highestscore is:",Quiz.HighestScore);
        console.log("this is quiz getting update:",Quizid);
        console.log("this is the score getting updated:",highscore);
        setQuizzes(quizzes=>{
            return quizzes.map(quiz=>{
                if(quiz.Quizid===Quizid){
                   return {...quiz,HighestScore:highscore};
                }
                    return quiz;
            })
            
        })
    }*/

    //call back function to store the quiz in the local storage when the user clicks save button in the UI
    const saveTostorage=(Quiz)=>{
        quizzes.forEach((quiz)=>{
            if(quiz.Quizid===Quiz.Quizid){
                localStorage.setItem(Quiz.name, JSON.stringify(Quiz))
            }
        });

    };

    //state to keep the name of the quiz type by the user which the user wants to load from the local storage
    const[typeNameload,setTypeNameload]=useState({
        name:""
    });

    //state to keep the message that gets displayed in the UI when the quiz is not found in the localstorage 
    const[quiznotfound,setQuizNotfound]=useState('');
    //call back function to capture the value fo the form field that user types.
    const handleUsertype=(e)=>{
        e.preventDefault(); 
        const typename ={
            ...typeNameload,[e.target.name]:e.target.value
        }       
        setTypeNameload(typename);        
    }

    //call back function to the load the quiz from the local storage when the user clicks load button and this uses states typeNameload, quiznotfound 
    // as well as handleUsertype.
    const loadFromstorage=(quiztoload)=>{       
            console.log(quiztoload);       
            
            const storedquizzes= JSON.parse(localStorage.getItem(quiztoload));
            if(storedquizzes){
                setQuizzes([...quizzes,storedquizzes]);
            }else{
                setQuizNotfound(`Quiz "${quiztoload}" not found`);
            }   
            setTypeNameload({name:""})
    }   



    
return (
        <>  
        <h3>DashBoard</h3>
        {/*Dynamic routes to components which also passes the props to the child components*/}
        <Routes>
            
            {quizzes.map((quiz)=> (
                <Route key={quiz.Quizid} path={`/QuizHub/${quiz.Quizid}/playquiz`} 
                element={<PlayQuiz quiz={quiz} quizId={quiz.Quizid} />}/>
            ))}
            {quizzes.map((quiz)=>(
                <Route key={quiz.Quizid} path={`/QuizHub/${quiz.Quizid}/editquiz`} 
                element={<EditQuiz quiz={quiz} quizId={quiz.Quizid} addquestion={addquestiontoquiz}
                EditQuestion={editQuestion} DeleteQuestion={deleteQuestion}/>}/>
            ))}

            
        </Routes>
        
        <div>
            {/*The interface which displays the list of quiznames with buttons to play,edit,save and delete */}
            This is the Game Page
            {quizzes.map((quiz)=>(
                <div key={quiz.Quizid}>
                    <h3>{quiz.Quizid}.{quiz.name}</h3>
                    <Link to={`/QuizHub/${quiz.Quizid}/playquiz`} >
                        <button> Play </button>
                    </Link>
                    <Link to={`/QuizHub/${quiz.Quizid}/editquiz`} >
                        <button> Edit </button>
                    </Link>
                    <button onClick={()=>{deleteQuiz(quiz.Quizid,quiz.name)}}>Delete</button>
                    <button onClick={()=>{saveTostorage(quiz)}}>Save</button>
                </div>
            ))}

            <div>
                {/*Form for the user to type in the name of the quiz to be loaded with load button */}
            <h3>Enter the Quiz Name</h3>
            <input type="text"  name="name" value={typeNameload.name} onChange={handleUsertype}/>
            <button onClick={()=>{loadFromstorage(typeNameload.name)}}>Load</button>
            <p>{quiznotfound}</p>
            </div>


            <h3>Create your Own Quiz</h3>
                {/*Form with various inputs to create a new quiz */}
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
                            CorrectAnswer:<input type="text" name="correctAnswer"
                            value={question.correctAnswer} onChange={(e)=>handleQuestionTyping(index,e)}/>
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
            {/* Link to go back to the Home page when button is clicked */}
            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </div>
        </>           
        
    )
       
}   



  
  export default QuizHub;