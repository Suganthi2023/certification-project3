import { Link } from "react-router-dom";
import { useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import {setUserAnswers,setScore} from '../reducers/playReducer'
import {updateHighestScore} from "../reducers/hubReducer"
//functional component - child component
//This displays the quiz selected by the user and lets the user to play the quiz.when answers are
//submitted by the user, it calculates as well as checks and updates the highestore score which also
//displays the same respectively.
function PlayQuiz({quiz,quizId}) {
    const dispatch=useDispatch();
   //console.log({quiz});

   //State to keep track of user types answers for questions which is used to check the answers with 
   //correct answer for the corresponding questions.
   //const[userAnswers,setUserAnswers]=useState({});
     const userAnswers=useSelector(state=>state.play.userAnswers);
     console.log("The current userAnswers state is ",userAnswers);

   //State to keep the score the quiz.
   //const[score,setScore]=useState();
     const score = useSelector(state=>state.play.score);

   //Function to get the value from the field when the user types the answer and display it in the field.
   const handleAnswerType=(e,quesid)=>{
       e.preventDefault();
       const response= {...userAnswers,[quesid]:e.target.value};
       console.log("The user typed this:",response);
       //setUserAnswers(response);
       dispatch(setUserAnswers(response));
   }

   //Function to check the userAnswers with the correctAnswer for the each questions in the quiz
   const handleanswerCheck=(quizId)=>{
       let newScore=0;
      console.log("Quiz Object:",quiz);
       quiz.questions.forEach((question) =>{
           const userAnswer=String(userAnswers[question.quesid]).trim().toLowerCase();
           const correctanswer=String((question.correctAnswer)).trim().toLowerCase()
           console.log("Current Question:",question)
          console.log(question.points);
           console.log("userAnswer is:", userAnswer);
          console.log("CorrectAnswer is:",correctanswer)
           if(userAnswer === correctanswer){
               newScore=newScore+question.points;
               
           }           
       })
       //Condition to check whether the current score is higher than the highestscore so far obtained in the quiz.
       //this condition calls the updateHighscore function from parent for this purpose and updates the highestscore accordingly 
       //in the state in the parent component.
       if(quiz.HighestScore<=newScore){
            dispatch(updateHighestScore({quizId,newScore}));
        } 
        //updating the score state.
       //setScore(newScore);
       //console.log(newScore);
       //setUserAnswers({});
       dispatch(setScore(newScore));
       dispatch(setUserAnswers({}));
   }

  
   
   //console.log(quiz.name);
   return (
       <>
           <div>
            {/*UI to display the questions, answer form field, submit button, score and Highestscore */}
             <h2>{quiz.name}</h2> 
             {quiz.questions.map((question)=>(
               <div key={question.quesid}>
                   <h4>Question{question.quesid}</h4> 
                   <h5>{question.question}</h5>                   
                   <ul>
                       {question.options.map((option,index)=> (
                           <li key={index}>{option}</li>
                       ))}                        
                   </ul>
                   <br/>
                   <br/>
                   Enter your Answer:
                   <input type="text" name={question.quesid} value={userAnswers[question.quesid] !== undefined? userAnswers[question.quesid]:""} onChange={(e)=>handleAnswerType(e,question.quesid)} required/>                 
               </div>                          
                ))}
               <div>
                   <button onClick={()=>handleanswerCheck(quizId)}>Submit</button>
               </div>
               <div>
                   Score:{score}
                   <br/>
                   HighestScore:{quiz.HighestScore}
                  
               </div>
            

           </div>
           {/*Link to the parent component */}
           <Link to ="/QuizHub">
               <button>Back to Hub</button>
           </Link>

       </>
       
       
   )

   
}

export default PlayQuiz;
