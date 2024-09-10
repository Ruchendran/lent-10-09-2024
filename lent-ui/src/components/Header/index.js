import {Link,withRouter} from "react-router-dom"
import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css'
import Cookies from "js-cookie"
import {IoFilterSharp}  from "react-icons/io5";
import "./index.css"
const Header=(props)=>{

    const SignOut=()=>{

        Cookies.remove("password")
        Cookies.remove("name")

        const {history}=props;

        history.replace("/login")
        
    }

    return(
    <div className="header-main" >

        <img src="https://t3.ftcdn.net/jpg/04/49/10/90/240_F_449109029_JufAjfMU9DnEElRJKHVJrM19iIFdyzhF.jpg" className="header-img" alt="header-image" />

        <ul className="ul-lists" >
        <Link to="/" className="link" >
            <li className="lists" >
                Home
            </li>
            </Link>


            <Link to="/post" className="link" >
            <li className="lists" >
                Post
            </li>
            </Link>

            <Link to="/put" className="link" >
            <li className="lists" >
                Put
            </li>
            </Link>

            <Link to="/get" className="link" >
            <li className="lists" >
                Get
            </li>
            </Link>

            <Link to="/delete" className="link" >
            <li className="lists" >
                Delete
            </li>
            </Link>

            <Link to="/view" className="link" >
            <li className="lists" >
                View
            </li>
            </Link>

            <Link to="/history" className="link" >
            <li className="lists" >
                History
            </li>
            </Link>


            
        </ul>

        <button className="signOut" onClick={SignOut} >Logout</button>

        <Popup trigger={<button className="trig-but" > {<IoFilterSharp className="trig" />}  </button>}  className="pop"  >
            <ul className="ul" >


            <Link to="/" className="link" >
            <li className="lists" >
                Home
            </li>
            </Link>


            <Link to="/post" className="link" >
            <li className="lists" >
                Post
            </li>
            </Link>

            <Link to="/put" className="link" >
            <li className="lists" >
                Put
            </li>
            </Link>

            <Link to="/get" className="link" >
            <li className="lists" >
                Get
            </li>
            </Link>

            <Link to="/delete" className="link" >
            <li className="lists" >
                Delete
            </li>
            </Link>

            <Link to="/view" className="link" >
            <li className="lists" >
                View
            </li>
            </Link>

            <Link to="/history" className="link" >
            <li className="lists" >
                History
            </li>
            </Link>

            <button className="signout-s" onClick={SignOut} >
                    Logout
            </button> 
            </ul>
              

        </Popup>
        
    </div>
)}

export default withRouter(Header)