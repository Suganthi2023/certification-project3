import { Link } from "react-router-dom";
import { useState } from "react";

function PlayQuiz({quiz}) {
    
   //console.log({quiz});
   const[userAnswers,setUserAnswers]=useState({});
   const[score,setScore]=useState();

   const handleAnswerType=(e,quesid)=>{
       e.preventDefault();
       const response= {...userAnswers,[quesid]:e.target.value};
       setUserAnswers(response);
   }

   const handleanswerCheck=()=>{
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
       setScore(newScore);
       //console.log(newScore);
       setUserAnswers({});
   }

  
   
   //console.log(quiz.name);
   return (
       <>
           <div>
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
                   <button onClick={handleanswerCheck}>Submit</button>
               </div>
               <div>
                   Score:{score}
                  
               </div>
            

           </div>
           <Link to ="/QuizHub">
               <button>Back to Hub</button>
           </Link>

       </>
       
       
   )

   
}

export default PlayQuiz;
