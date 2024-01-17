import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
  const [credential, setcredential] = useState({ email: "", password: ""})
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //name,email,password,location should be same as put in the backend while making schema
      body: JSON.stringify({ email: credential.email, password: credential.password })
    });
    //handling the response
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter valid email id and password")
    }
    //everytime we try to login a new authToken is generated keeping the credentials secure
    if (json.success) {
      localStorage.setItem("authToken",json.authToken)
      navigate("/");
    }
  }

  const onchange = (event) => {
    //this will change the value after we start enetring in the field
    setcredential({ ...credential, [event.target.name]: event.target.value })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name= 'email' value={credential.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name= 'password' value={credential.password} onChange={onchange} id="exampleInputPassword1"/>
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to = "/signup" className='m-3 btn btn-danger'>New User</Link>
        </form>
      </div>
    </>
  )
}
