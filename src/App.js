import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router  , Switch} from "react-router-dom"
import Home from './Home';

const App  = () => {

 return (
   
  <Router>
  <Switch>
  <Home/>
 </Switch>
 </Router>
 )

 
}

export default App;
