import {Component} from "react"
import Cookies from "js-cookie"
import {Redirect } from "react-router-dom"



import Header from "../Header"

import "./index.css"


class Delete extends Component{

    state={
        username:"",
        error:"",
        statusText:"",
        userNotFound:""
    }

    submit=async(e)=>{
        e.preventDefault()


        const tableName=Cookies.get("name")

        const {username}=this.state;

        const verifying =await fetch(`http://localhost:4000/${tableName}`)

        const jsonData=await verifying.json()

        const visit=jsonData.find((s)=>(
            s.name===username.toUpperCase()
        ))

        if(username===""){
            this.setState({
                error:"Do not hold input field empty!",
                userNotFound:""
            })
        }
        else{

        if(visit===undefined){
            this.setState({
                    userNotFound:"User Does Not Exists!",
                    username:"",
                    error:""
            })
        }
        else{

      

        const details={"table":tableName}
        
        const url=`http://localhost:4000/${username.toUpperCase()}`

        const options={
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(details)
        }

        const api=await fetch(url,options)

        const histTable="hist"+tableName.toLowerCase()

        const histUrl=`http://localhost:4000/${username.toUpperCase()}/${histTable}`

        const histApi=await fetch(histUrl,options)

        if(api.ok===true){
            
            this.setState({
                userNotFound:"",
                statusText:"Successfully Deleted!",
                error:""
            })
        }

        this.setState({
            username:""
        })

    }
    }
       

    }

    Input1=(e)=>{
        this.setState({
            username:e.target.value
        })
        

    }

    render(){

        const {error,username,statusText,userNotFound}=this.state;



        const Name=Cookies.get("name")

        if(Name===undefined){
            return <Redirect to="/login" />
        }
    
        return(
            <>
            <Header />
            <div className="delete-main" >
                    <form className="delete-form" onSubmit={this.submit} >
                        <h1 className="post-form-heading" >Delete User</h1>

                        <div className="delete-field" >
                                <label className="post-form-label" htmlFor="s1" >Username</label>
                                <input  className="field" id="s1" value={username} placeholder="Enter the Username" onChange={this.Input1} />
                        </div>
                        <button className="post-button" type="submit" >DELETE</button>
                     
                        {error!==""?<p className="er-msg" >{error}</p>:null}
                    
                    </form>

                   {userNotFound!==""?<h1 className="er-msg" >{userNotFound}</h1> :<h1 className="post-success" >{statusText}</h1>}
            </div>
            </>
        )
    }
}

export default Delete