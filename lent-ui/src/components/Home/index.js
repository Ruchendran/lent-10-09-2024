import {Component} from "react";
import Cookies from "js-cookie"
import {Link,Redirect} from "react-router-dom"
import Header from "../Header"
import "./index.css"
const operationList=[

    {
        "requestId":"get",
        "displayRequest":"GET"
    }
    ,
    {
        "requestId":"post",
        "displayRequest":"POST"
    }
    ,
    {
        "requestId":"put",
        "displayRequest":"PUT"
    }
    ,
    {
        "requestId":"delete",
        "displayRequest":"DELETE"
    }
    ,{
        "requestId":"view",
        "displayRequest":"VIEW"
    },
    {
        "requestId":"history",
        "displayRequest":"HISTORY"
    }

]


const List =(props)=>{
    const {sendProp}=props;
    const {requestId,displayRequest}=sendProp;
    const stile="stile1"
    // console.log(requestId)
    return(
        <Link className="link" to={requestId} >
            <li className="list" >
                <button className={stile}  >{displayRequest}</button>
            </li>
        </Link>
    )

}


class Home extends Component{

 


    render(){

        const Name=Cookies.get("name")

        if(Name===undefined){
            return <Redirect to="/login" />
        }

        return(
                <>
            <Header />
            <div className="home-main" >

              

                <h1 className="home-heading" >{`Welcome ${Name[0].toUpperCase()+Name.slice(1)}`}</h1>

                
                <p className="home-heading" >To Perform CRUD operation,click any button.</p>
                <ul className="ul-lists1" >
                
                    {operationList.map((s)=>(
                        <List key={s.requestId} sendProp={s}   />
                    ))}
                </ul>
                    
            </div>
            </>
        )
    }
}

export default Home