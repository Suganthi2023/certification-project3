import { Link } from "react-router-dom";
import {useState} from "react";
import { useDispatch } from "react-redux";
import {questionAdd,questionDelete,questionEdit} from "../reducers/hubReducer"

//Functional Child Component - Which displays the list of questions with options to edit or delete
//and form fields for adding or editing questions for the selected quiz. This component uses props and functions 
//passed from the parent component for the above said operations.
function EditQuiz({quiz,quizId,addquestion,EditQuestion,DeleteQuestion}) {
    //console.log(quiz.Quizid);
    //console.log(quiz.name);
    const dispatch=useDispatch();
    //setting a copy for the quesions form from the questoins array in quizzes state
    const[newQuestion,setNewQuestion]=useState({ 
        quesid:quiz.questions.length,       
        question:'',
        options:[],
        correctAnswer:'',
        points:''
    });

    // To capture the value from the form field that user types when adding new questions(with options,points,correct answer)
    // to update the copy state
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
    // when the submit button is clicked, this function gets activated, which calls the addquestion function from parent
    // to add new question to the quiz
    const handleAddQuestion = (e)=>{
       e.preventDefault();
       const newques = {
           quesid:newQuestion.quesid+1,
           question:newQuestion.question,
           options:newQuestion.options,
           correctAnswer:newQuestion.correctAnswer,
           points:newQuestion.points
       }              
        dispatch(questionAdd({quizId,newques}));
        setNewQuestion({
            question:'',
            options:[],
            correctanswer:'',
            points:''
        })
    }

    //copy of the state to store the edited question when the user edits.
    const[editedQuestion,setEditedQuestion] = useState({
        equesid: '',
        equestion:"",
        eoptions:[],
        ecorrectAnswer:"",
        epoints:""

    })

    // To capture the value from the form field that user types when editing existing questions(with options,points,correct answer)
    // to update the editedQuestion state.
    const handleEditInput=(e)=>{
        e.preventDefault();
        console.log(e.target.name,e.target.value);
        const newEdit = {
            ...editedQuestion,[e.target.name]:e.target.value}
            if(e.target.name === "eoptions"){
                newEdit[e.target.name] = e.target.value.split(",").map((option)=>option.trim());
            } else if(e.target.name==="epoints"){
                newEdit[e.target.name]=parseInt(e.target.value);
            } else{
                newEdit[e.target.name]=e.target.value;
            }
        
        setEditedQuestion(newEdit);
        }
    
    // When the user clicks the edit button next to the question, this functions gets all the information
    //(quesition, options, correctAnswer,points) for the question and fills the edit form for the user to edit.
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

    //When the user press the submit button, this function gets activated which captures the edited question set,
    // then calls the EditQuestion function from parent which in turn updates the questions for the corresponding quiz 
    // in the quizzes in the parent state.
    const handleEditQuestion=(e)=>{
        e.preventDefault();
        const neweditq ={
            quesid:editedQuestion.equesid,
            question:editedQuestion.equestion,
            options:editedQuestion.eoptions,
            correctAnswer:editedQuestion.ecorrectAnswer,
            points:editedQuestion.epoints
        }
         dispatch(questionEdit({quizId,neweditq}));
        setEditedQuestion({
            equestid:'',
            equestion:'',
            eoptions:[],
            ecorrectAnswer:'',
            epoints:''
        })
    }

    //When delete button is clicked, this function calls the DelteQuestion from the parent
    //which deletes the questions from the quiz
    const handleDeleteQuestion=(question)=>{
        const deletequestion={
            quesid:question.quesid,
            question:question.question,
            options:question.options,
            correctanswer:question.correctanswer,
            points:question.points
        }
        dispatch(questionDelete({quizId,deletequestion}));
       
    }
    
    return (      
        
        <>
            <div className="editlist">
                {/*UI to display the questions for the selected quiz for editing, deleting questions and buttons for the same
                and form fields for adding and editing questions. */}
                <div className="grd1">
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
                            <button onClick={()=>handleEdit(question)}>Edit</button>
                            <button onClick={()=>handleDeleteQuestion(question)}>Delete</button> 
                            <br/>
                            <br/>
                        </div>                          
                    ))}
                </div>
                <div className="grd2">
                    {/*Form the user to new question to the quiz */}
                    <h3>To Add Question to your Quiz</h3>
                    <form onSubmit={handleAddQuestion}>
                        <div>
                            Question:<input type="text" name="question" value={newQuestion.question} onChange={handleInputType}/>
                        </div>
                        <div>
                            Options:<input type="text" name="options" value={newQuestion.options} onChange={handleInputType}/>
                        </div>
                        <div>
                            CorrectAnswer:<input type="text" name="correctAnswer" value={newQuestion.correctAnswer} onChange={handleInputType}/>
                        </div>
                        <div>
                            Points:<input type="text" name="points" value={newQuestion.points} onChange={handleInputType}/>
                        </div>
                        <button type="submit">Submit</button>
                        <br/>
                        <br/>
                        <br/>
                        <h4>To Edit A Question in the Quiz</h4>
                        <h5>Press edit button next to the question</h5>
                    </form> 
                    {/*Form for the user to edit an existing question in the quiz */}
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
                    {/*Link to go back to the parent component */}
                    <Link to ="/QuizHub">
                    <button>Back to Hub</button>
                </Link>
            </div>
            

        </>
        
        
    )
   
}

export default EditQuiz;
