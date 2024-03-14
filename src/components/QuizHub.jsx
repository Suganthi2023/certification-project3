import { Link } from "react-router-dom"
const QuizHub = () => {
    return (
        <>
            <div>
                <h3>Dashboard</h3>
                <p>Hello</p>
            </div>
            <Link to="/Home">
                <button>Back to Home</button>
            </Link>

        </>
      
    )
  }
  
  export default QuizHub