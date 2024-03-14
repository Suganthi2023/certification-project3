import { Link } from "react-router-dom"

const About = () => {
  return (
    <>
      <div>
        <h3>About Page</h3>
      <p>Hello</p>
      </div>
      <Link to="/Home">
          <button>Back to Home</button>
      </Link>
    
    </>
    
  )
}

export default About