import { Link } from "react-router-dom";

function PlayQuiz({quiz}) {
    
    console.log(quiz.name);
    return (
        <>
            <div>
              This is to play game              
            </div>
            <Link to ="/QuizHub">
                <button>Back to Hub</button>
            </Link>

        </>
        
        
    )
   
}

export default PlayQuiz;
