import {Component} from "react"
import Cookies from "js-cookie"
import "./index.css"

class Login extends Component{

    state={
        username:"",
        password:"",
        error:"",
        selectType:"Log User",
        nameExist:false,
        tableError:""
    }

 





 

    user=(e)=>{
        this.setState({
            username:e.target.value
        })
    }

    hide=(e)=>{
        this.setState({
            password:e.target.value
        })
    }

    Done=async(e)=>{

        e.preventDefault()

        const {history}=this.props;
      
     const {username,password,selectType}=this.state;
        if(username==="" || password===""){
            this.setState({
                error:"Please Give Valid Credentials!"
            })
        }

        else{

            Cookies.set("password",password,{expires:30});
            Cookies.set("name",username.toLocaleLowerCase(),{expires:30})

            if(selectType==="New User"){
                console.log(password,username);
                
                const getUser=await fetch("http://localhost:4000/lists")
                const jsonUser=await getUser.json();
                console.log(jsonUser);

                const filter = jsonUser.find((s)=>(
                    s.name===username   
                ));
                console.log(filter)
           
                if(filter===undefined){
                    const details={"name":username,"password":password}
                    const options={
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(details)
                    }
                    const apiForuser= await fetch("http://localhost:4000/userslist",options)
                    const getTables= await fetch("http://localhost:4000/getTable")
                    const tableJson=await getTables.json()
                    const tableFilter=tableJson.find((s)=>(
                    s.name===username
                   ))

                    if(tableFilter===undefined){
                        const histTable="hist"+username.toLowerCase()
                        const apitable=await fetch(`http://localhost:4000/table/${username.toLowerCase()}/${histTable}`);
                    }
                
                    this.setState({
                        nameExist:false,
                        username:"",
                        password:""
                    })

                    history.replace("/")


                    
                }
                else{
                   
                        this.setState({
                            nameExist:true,
                            username:"",
                            password:""
                        })
                }
            }
            
            if(selectType==="Log User"){

                const getUser=await fetch("http://localhost:4000/lists")

                const jsonUser=await getUser.json()

                const LoginFilter=jsonUser.filter((s)=>(
                    s.password===password && s.name===username
                ))
                    if(LoginFilter.length===0){
                       this.setState({
                        error:"Ur Credentials is Wrong!"
                       })
                    }
                    else{
                        history.replace("/")
                    }

                
           

            }


                
          

            

            
      

            
        }
        }

        newUser=(e)=>{
           
            this.setState({
                selectType:"New User",
                error:""
            })
        }

        loginUser=(e)=>{
         
            this.setState({
                selectType:"Log User",
                error:""
            })
        }

    render(){


        const {error,selectType,nameExist,username,password}=this.state;
       
         return(
            <>

           
            <div className="log-main" >
              
                 <form className="login" onSubmit={this.Done} >

                        <img src="https://t3.ftcdn.net/jpg/04/49/10/90/240_F_449109029_JufAjfMU9DnEElRJKHVJrM19iIFdyzhF.jpg" className="img-logo" alt="logo" />                    
                        <h1 className="text" >{selectType==="New User"?"Create New User":"Sign In"}</h1>
                        <div className="use" >
                            <label className="text" htmlFor="input1" >Username</label>
                            <input id="input1" type="text" value={username} placeholder="Enter Your name" className="fie" onChange={this.user}  />
                            <label className="text"  htmlFor="input2"  >Password</label>
                            <input id="input2" type="password" value={password} placeholder="Enter Your Password" className="fie" onChange={this.hide}/>
                        </div>

                        <button className="sign" type="submit"  >Login</button>

                        {error!==""?<p className="er-msg" >{error}</p>:""}

                        <div className="login-sign" >

                        
                        <button className="user-log" onClick={this.newUser} type="button" >Create New User</button>

                        <button className="user-log" onClick={this.loginUser} type="button" >Sign In</button>
                        </div>

                        <p className="er-msg" >{nameExist?"Name Already exists!":""}</p>
                        
                 </form>
            </div>
            </>
        )
    }

}


export default Login