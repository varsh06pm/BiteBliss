import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function SignUp() {
    //useState is used when the first(consider as variable) is to be changed with setFirst without reloading 
    //and should reflect on the webpage
    const [credential, setcredential] = useState({name:"",email:"",password:"",geolocation:""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        //synthetic event:  when u click the submit button the page will not reload to stop it from
        //reloading synthetic event is used with help of preventDefault on the event that is passed
        //(always an event is passed or used when even happen and we need to stop the default behaviour of it)
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //name,email,password,location should be same as put in the backend while making schema
            body: JSON.stringify({name:credential.name, email: credential.email, password: credential.password, location:credential.geolocation})
        });
        //handling the response
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter valid credentials")
        }
        if (json.success) {
            navigate("/");
        }
    }

    const onchange = (event) => {
        //this will change the value after we start enetring in the field
        setcredential({...credential,[event.target.name]:event.target.value})
    }
    return (
        <>
            <div className='container'>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name= 'name' value={credential.name} onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name= 'email' value={credential.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name= 'password' value={credential.password} onChange={onchange} id="exampleInputPassword1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" name= 'geolocation' value={credential.geolocation} onChange={onchange} id="exampleInputAddress"/>
                </div>
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to = "/login" className='m-3 btn btn-danger'>User Exists </Link>
            </form>
            </div>
        </>
    )
}
