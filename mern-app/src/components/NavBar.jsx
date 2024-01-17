import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function NavBar() {
  const [cartView,setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();

  const handleLogOut = () =>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success" >
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-bold" to="/">GoFood</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav me-auto mb-2">
                        <li className='nav-item'>
                            <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                        </li>
                        {/*only when we have the authToken in the localStorage we will get MyOrders in Home page*/ }
                        {(localStorage.getItem("authToken"))?
                           <li className='="nav-item'>
                               <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                           </li>
                        :"" }
                    </ul>    
                    {/*when we dont have the authToken in the localStorage we will get Login and sign up page in Home page which means
                    we have not logged in or signed up*/ }
                    {(!localStorage.getItem("authToken"))?
                    <div className='d-flex'>
                            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                            <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
                    </div> 
                    : 
                    <div>
                        <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                            My Cart {" "}
                            <Badge pill bg="danger" > {data.length} </Badge>
                        </div>
                        {cartView ? <Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>:null}
                        <div className='btn bg-white text-danger mx-2' onClick={handleLogOut}>Log Out</div>
                    </div>
                    }
                    
                </div>
            </div> 
        </nav>
    </div>
  )
}
