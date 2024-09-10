import {Component} from "react"
import Cookies from "js-cookie"

import {Redirect} from "react-router-dom"

import Header from "../Header"

import "./index.css"

class Get extends Component{

    state={
        username:"",
        list:"",
        is:false,
        notfound:true
    }

    submit=async(e)=>{
        e.preventDefault()
        const {username}=this.state;

        const tableName=Cookies.get("name")

        const verifing=await fetch(`http://localhost:4000/${tableName}`)



        const jsonResult=await verifing.json()

     

        const final=jsonResult.find((s)=>(
            s.name===username.toUpperCase()
        ))


      
      
        if(final===undefined){

            if(username===""){
               this.setState({
                error:"Do not hold input empty!"
               })
            }
            else{

            this.setState({
                notfound:false,
                error:"",
                username:""
            })
        }

        }
        
        else{
        

           

            
   


            console.log(username)

            console.log(tableName)
       
            const url= `http://localhost:4000/${username.toUpperCase()}/${tableName}`

         

         const api=  await fetch(url)


    

        const output= await api.json()

       console.log(api.ok)

        if(username===""){
                this.setState({
                    error:"Do not hold input empty! "
                })
        }

       else{
        this.setState({
            list:output,
            is:true,
            username:"",
            error:"",
            notfound:true

        })

       }
    }

    }

    Input=(e)=>{
        this.setState({
            username:e.target.value
        })
    }

 

    render(){

        const {list,username,is,error,notfound}=this.state;

        const Name=Cookies.get("name")

        if(Name===undefined){
            return <Redirect to="/login" />
        }

     

    


    

        

        return(
            <>
            <Header />
            <div className="get-main" >
                
            <form className="get" onSubmit={this.submit} >
                <input id="s1" placeholder="Enter the name to get" className="get-field" value={username} onChange={this.Input} />
                <button className="post-button" type="submit" >GET</button>
                {error!==""?<p className="er-msg" >{error}</p>:null}
                </form>
                <hr className="line" />

              <div className="get-out" >
               
     {notfound? <>  {is?  


               <table className="get-table" >
                    <tr>
                    <th className="get-heading" >
                            Index
                        </th>
                        <th className="get-heading" >
                            Name
                        </th>
                        <th className="get-heading" >
                            Amount
                        </th>
                        <th className="get-heading" >
                            Date
                        </th>
                    </tr>
                    <tr>
                        <td className=" align" >
                            1
                        </td>
                        <td className=" align" >
                            {list.name}
                        </td>
                        <td className=" align" >
                            {list.amount}
                        </td>
                        <td className="align" >
                            {list.Date}
                        </td>
                    </tr>
                </table>  :null} </>:<div className="notfound-user" > <img src="https://img.freepik.com/free-vector/400-error-bad-request-concept-illustration_114360-1921.jpg?size=626&ext=jpg&ga=GA1.1.1402966856.1700817280&semt=ais" alt="notfound" className="user-notfound-img" /> 
                
                <h1 className="post-form-heading" >User Does Not Exist!</h1>

                </div>
                
                }
                </div>

            </div>
            </>
        )
    }
}


export default Get