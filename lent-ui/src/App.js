import {Component} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter,Switch,Route,Redirect,Link,useLocation} from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Post from "./components/Post"
import Put from "./components/Put"
import Delete from "./components/Delete"
import Get from "./components/Get"
import View from "./components/View"
import NotFound from "./components/NotFound"
import History from "./components/UserHist"
import Admin from "./components/Admin";
import Reuse from "./components/Reuse"
import './App.css';




class App extends Component{
  render(){
    return(
    
      <div className="main">

   
      <BrowserRouter> 

         <Reuse/>
        
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/put" component={Put} />
          <Route exact path="/delete" component={Delete} />
          <Route exact path="/get" component={Get} />
          <Route exact path="/view" component={View} />
          <Route exact path="/history" component={History} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
      </div>
     
    )
  }
}


export default App;
