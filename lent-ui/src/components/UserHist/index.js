import {Component} from "react"

import {Redirect } from "react-router-dom"

import Cookies from "js-cookie"

import Header from "../Header"

import "./index.css"


const HistList=(props)=>{
    const {lists}=props;

    const {name,type,amount,Date,index}=lists;

    return(
        <table className="list-table" >
            <tr>
                <td className="lists-stile header1 head1" >
                    {index}
                </td>
                <td className="lists-stile header2 head2" >
                    {name}
                </td>
                <td className="lists-stile header3 head3" >
                    {amount}
                </td>
                <td className="lists-stile header4 head4" >
                    {type}
                </td>
                <td className="lists-stile header5 head5" >
                    {Date}
                </td>
            </tr>
        </table>
    )
}


class History extends Component{

    state={
        error:"",
        username:"",
        list:"",
        is:false,
        userNotFound:true
    }

    Input=(e)=>{
        this.setState({
            username:e.target.value
        })
    }

    submit=async(e)=>{
        e.preventDefault()

        const {username}=this.state

        const tableName=Cookies.get("name")

        const api=await fetch(`http://localhost:4000/${tableName}`)

        

        const result=await api.json()

        const verified=result.find((s)=>(
            s.name===username.toUpperCase()
        ))
        
     
        
        if(username===""){
            this.setState({
                error:"Please Do not hold input empty!"
            })
        }
        else{

            if(verified===undefined){
                    this.setState({
                        userNotFound:false,
                        is:true,
                        error:""
                    })
            }
            else{


                const histTable="hist"+tableName.toLowerCase()

                const api1=await fetch(`http://localhost:4000/history/${username.toUpperCase()}/${histTable}`)

                const jsonData=await api1.json()
                
                for(let i=0;i<jsonData.length;i++){
                    jsonData[i]["index"]=i+1
                }

                
                


                this.setState({
                    is:true,
                    error:"",
                    userNotFound:true,
                    list:jsonData
                })

            }

        }

        
    }


    render()
    {
        const {username,error,userNotFound,is,list}=this.state

        const Name=Cookies.get("name")

        if(Name===undefined){
            return <Redirect  to="/"/>
        }
        
        return(
            <>
            <Header />
            <div className="hist-main" >
            <form className="get" onSubmit={this.submit} >
                <input id="s1" placeholder="Enter the name to get" className="get-field" value={username} onChange={this.Input} />
                <button className="post-button" type="submit" >GET</button>
                {error!==""?<p className="er-msg" >{error}</p>:null}
                </form>
                <hr className="line" />

            {is?<>{userNotFound? <div className="sester" >
                

                
               

                <table className="hist-table" >
                        <tr>
                            <th className="header1" >
                                Index
                            </th>
                            <th className="header2" >
                                Name
                            </th>
                            <th className="header3" >
                                Amount
                            </th>
                            <th className="header4" >
                                Type
                            </th>
                            <th className="header5">
                                Date
                            </th>
                        </tr>
                    </table>
                    {list.map((s)=>(
                        <HistList key={s.index} lists={s} />
                    ))}
                
              
               
              </div>:<>
              <div className="notfound-user" > <img src="https://img.freepik.com/free-vector/400-error-bad-request-concept-illustration_114360-1921.jpg?size=626&ext=jpg&ga=GA1.1.1402966856.1700817280&semt=ais" alt="notfound" className="user-notfound-img" /> 
                
                <h1 className="post-form-heading" >User Does Not Exist!</h1>

                </div>
              
              </>}</>:null}
            </div>
            </>
        )
    }
}

export default History