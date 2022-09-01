import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let history= useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault();    

    const response = await fetch("https://inotebookmern.herokuapp.com/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  
        },body: JSON.stringify({email: credentials.email, password: credentials.password}) 
      });
      const json= await response.json()
      //console.log(json)
      
      if(json.success){
        // Save the authtoken & redirect
        localStorage.setItem("token", json.authtoken)
        props.showAlert("Successfully Logged In", "success")
        history.push('/')
      }
      else{
        props.showAlert("Invalid Credentials", "danger")
      }
  };

  const onChange= (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <>
    <h3 className="container col-6 mb-3">Login to use iNotebook</h3>
    <form className="container col-6" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          value={credentials.email}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
    </>
  );
};

export default Login;
