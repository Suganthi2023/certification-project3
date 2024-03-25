import { Link } from "react-router-dom";
import {useState} from 'react';

const About = () => {

    const [contact,setContact]=useState({
      name:"",
      email:"",
      message:""
    });    

    const handleFormTyping=(e)=>{
      e.preventDefault();
      const newContact ={
        ...contact,
        [e.target.name]:e.target.value
      }
      setContact(newContact);
    }

    const submitForm=(e)=>{
      e.preventDefault();

      if(!contact.name ||!contact.email || !contact.message){
        alert("Please fill in all required fields.")
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(contact.email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (message.length < 10) {
        alert("Please enter a longer message (at least 10 characters).");
        return;
      }

      const submissionMessage = `Thank you, ${contact.name}! Your message has been received. We value your submission.`;
      alert(submissionMessage);

    // After Submission received message, clearing the form fields.
    setContact({
      name:"",
      email:"",
      message:""
    });
    

  }
  return (
    <>
      <div className='About'>
        <h3> Contact Us</h3>
        <p>Send us your queries!</p>
        <form onSubmit={submitForm}>
          <label htmlFor="name">*Name:</label>
          <input type="text" name="name" value={contact.name} onChange={handleFormTyping} required/>
          <br/>
          <label htmlFor="email">*Email:</label>
          <input type="email" name="email" value={contact.email} onChange={handleFormTyping}required/>
          <br/>
          <label htmlFor="message">*Message:</label>
          <textarea id="message" name="message" value={contact.message} onChange={handleFormTyping}required></textarea>
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Link to="/">
          <button className="bhome">Back to Home</button>
      </Link>
    
    </>
    
  )
}

export default About