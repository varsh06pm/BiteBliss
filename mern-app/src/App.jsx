import './App.css'
import Home from './screens/Home';
/*to make a single page application and while perform diff operations in our router
helps the page not relaod everytime we perform an operation on the page*/
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './screens/SignUp.jsx';
// Import statements...
import { CartProvider } from './components/ContextReducer.jsx';

function App() {

  return (
      <CartProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/login" element = {<Login/>}/>
              <Route exact path="/signup" element = {<SignUp/>}/>
            </Routes>
          </div>
        </Router>
      </CartProvider>
  );
}

export default App
