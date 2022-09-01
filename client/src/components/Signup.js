import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    let history= useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault();    

    if(credentials.password===credentials.cpassword){

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  
        },body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}) 
      });
      const json= await response.json()
      //console.log(json)

      if(json.success){
        // Save the authtoken & redirect
        localStorage.setItem("token", json.authtoken)
        props.showAlert("Account created successfully", "success")
        history.push('/')
      }
      else{
        props.showAlert("Invalid Credentials", "danger")
      }
    }
    else
      props.showAlert("Invalid Credentials", "danger")
  };

  const onChange= (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className="container col-6">
      <h3 className="mb-3">Create an account</h3>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          aria-describedby="emailHelp"
          value={credentials.name}
          onChange={onChange}
          minLength={3}
          required
        />
      </div>
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
          required
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
          minLength={5}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="cpassword"
          name="cpassword"
          value={credentials.cpassword}
          onChange={onChange}
          minLength={5}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    </div>
  );
};

export default Signup;
