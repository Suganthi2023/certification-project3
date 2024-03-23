import { Link } from "react-router-dom";
import {useState} from "react";

function EditQuiz({quiz,quizId,addquestion,EditQuestion,DeleteQuestion}) {
    //console.log(quiz.Quizid);
    //console.log(quiz.name);
    
    const[newQuestion,setNewQuestion]=useState({ 
        quesid:quiz.questions.length,       
        question:'',
        options:[],
        correctanswer:'',
        points:''
    });

    const handleInputType =(e)=>{
        e.preventDefault();
        console.log(e.target.name,e.target.value);
        const newQues = {
            ...newQuestion,[e.target.name]:e.target.value}
            if(e.target.name === "options"){
                newQues[e.target.name] = e.target.value.split(",").map((option)=>option.trim());
            } else if(e.target.name==="points"){
                newQues[e.target.name]=parseInt(e.target.value);
            } else{
                newQues[e.target.name]=e.target.value;
            }
        
        setNewQuestion(newQues);
        }

    const handleAddQuestion = (e)=>{
       e.preventDefault();
       const newques = {
           quesid:newQuestion.quesid+1,
           question:newQuestion.question,
           options:newQuestion.options,
           correctanswer:newQuestion.correctanswer,
           points:newQuestion.points
       }              
        addquestion(quiz,quizId,newques);
        setNewQuestion({
            question:'',
            options:[],
            correctanswer:'',
            points:''
        })
    }

    const[editedQuestion,setEditedQuestion] = useState({
        equesid: '',
        equestion:"",
        eoptions:[],
        ecorrectAnswer:"",
        epoints:""

    })

    const handleEditInput=(e)=>{
        e.preventDefault();
        console.log(e.target.name,e.target.value);
        const newEdit = {
            ...editedQuestion,[e.target.name]:e.target.value}
            if(e.target.name === "eoptions"){
                newEdit[e.target.name] = e.target.value.split(",").map((option)=>option.trim());
            } else if(e.target.name==="epoints"){
                newEdit[e.target.name]=((e.target.value).trim()===""||isNaN(parseInt(e.target.value))?'':parseInt(e.target.value));
            } else{
                newEdit[e.target.name]=e.target.value;
            }
        
        setEditedQuestion(newEdit);
        }
    
    const handleEdit = (question)=>{
        setEditedQuestion({
            equesid:question.quesid,
            equestion:question.question,
            eoptions:question.options,
            ecorrectAnswer:question.correctAnswer,
            epoints:question.points

        });
        console.log("the data type of pointse is:", typeof(pointse))
    }

    const handleEditQuestion=(e)=>{
        e.preventDefault();
        const neweditq ={
            quesid:editedQuestion.equesid,
            quesiton:editedQuestion.equestion,
            options:editedQuestion.eoptions,
            correctAnswer:editedQuestion.ecorrectAnswer,
            points:editedQuestion.epoints
        }
         EditQuestion(quizId,neweditq)
        setEditedQuestion({
            equestid:'',
            equestion:'',
            eoptions:[],
            ecorrectAnswer:'',
            epoints:''
        })
    }

    const handleDeleteQuestion=(question)=>{
        const deletequestion={
            quesid:question.quesid,
            question:question.question,
            options:question.options,
            correctanswer:question.correctanswer,
            points:question.points
        }
        DeleteQuestion(quizId,deletequestion);
       
    }
    
    return (      
        
        <>
            <div>
            This is to Edit Game
            {quiz.questions.map((question)=>(
                <div key={question.quesid}>
                    <h4>Question{question.quesid}</h4> 
                    <h5>{question.question}</h5>                   
                    <ul>
                        {question.options.map((option,index)=> (
                            <li key={index}>{option}</li>
                        ))}                        
                    </ul>
                    <button onClick={()=>handleEdit(question)}>Edit</button>
                    <button onClick={()=>handleDeleteQuestion(question)}>Delete</button> 
                    <br/>
                    <br/>
                </div>                          
            ))}
            
            <form onSubmit={handleAddQuestion}>
                <div>
                    Question:<input type="text" name="question" value={newQuestion.question} onChange={handleInputType}/>
                </div>
                <div>
                    Options:<input type="text" name="options" value={newQuestion.options} onChange={handleInputType}/>
                </div>
                <div>
                    CorrectAnswer:<input type="text" name="correctanswer" value={newQuestion.correctanswer} onChange={handleInputType}/>
                </div>
                <div>
                    Points:<input type="text" name="points" value={newQuestion.points} onChange={handleInputType}/>
                </div>
                <button type="submit">Submit</button>      
            </form> 

            <form onSubmit={handleEditQuestion}>                        
                    
                        <div>
                            Question:<input type="text" name="equestion" value={editedQuestion.equestion} onChange={handleEditInput}/>
                        </div>
                        <div>
                            Options:<input type="text" name="eoptions" value={editedQuestion.eoptions} onChange={handleEditInput}/>
                        </div>
                        <div>
                            CorrectAnswer:<input type="text" name="ecorrectAnswer" value={editedQuestion.ecorrectAnswer} onChange={handleEditInput}/>
                        </div>
                        <div>
                            Points:<input type="text" name="epoints" value={editedQuestion.epoints} onChange={handleEditInput}/>
                        </div>
                                   

                <button type="submit">Submit</button>
            </form>
            </div>

            <Link to ="/QuizHub">
                <button>Back to Home</button>
            </Link>

        </>
        
        
    )
   
}

export default EditQuiz;
