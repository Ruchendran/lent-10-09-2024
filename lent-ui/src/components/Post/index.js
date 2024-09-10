import {Component} from "react"

import {Redirect} from "react-router-dom"

import Cookies from "js-cookie"


import Header from "../Header"

import "./index.css"


class Post extends Component{

    state={
        username:"",
        amount:"",
        error:"",
        statusText:"",
        exist:false,
        list:[],
        typeerror:""
    }

    Input1=(e)=>{
        this.setState({
            username:e.target.value,
            statusText:"",
            exist:false
        })
    }

    Input2=(e)=>{
        this.setState({
            amount:(e.target.value),
            statusText:"",
            exist:false
        })
    }

    Submit=async(e)=>{
        e.preventDefault()

        const {amount,username}=this.state

        const tableName= Cookies.get("name")

        const getUrl=`http://localhost:4000/${tableName}`

        const getResult=await fetch(getUrl)

        const jsonResult= await getResult.json()

        const verifing=jsonResult.find((s)=>(
                    s.name===username.toUpperCase()
        ))


        if(amount==="" || username===""){
            this.setState({
                error:"Do not hold Input fied empty",
                statusText:"",
                exist:false,
                typeerror:""
            })

    }
    else{

        if(isNaN(amount)===false){

       

        if(verifing===undefined){

           
         
        

            const data={"name":username.toUpperCase(),"amount":parseInt(amount),"table":tableName}

            const url="http://localhost:4000/"
            const options={
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
            const api=await fetch(url,options)

            const hist={"username":username.toUpperCase(),"amount":parseInt(amount),"type":"add","histTable":"hist"+tableName}

            const histData={
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(hist)
            }


            const useHist=await fetch("http://localhost:4000/history",histData)



            
       
          

    
            this.setState({
                username:"",
                amount:"",
                exist:false,
                error:"",
                typeerror:""
            })

            if(api.ok===true){
                this.setState({
                    statusText:"Successfully Created New User!",

                    
                  
                    
                })
            
            }

        }

        else{
            this.setState({
                exist:true,
                username:"",
                amount:"",
                error:"",
                typeerror:"",
                statusText:""
            })
        }

    }



    else{
        this.setState({
            typeerror:"please amount will be int!"
        })
    }

}

      
    }

    render(){

        const {error,username,amount,statusText,exist,typeerror}=this.state


    

   

        const Name=Cookies.get("name")

        if(Name===undefined){
            return<Redirect to="/login" />
        }

    

        return(
            <>

            <Header />

           <div className="post-main">

                  
                   
                    
                    <form className="post-form" onSubmit={this.Submit} >
                        <h1 className="post-form-heading" >
                            Create User
                        </h1>
                      
                        <div className="post-field" >

                            <label htmlFor="s1" className="post-form-label" >Username</label>
                            <input id="s1" className="field" onChange={this.Input1} type="text" value={username}  placeholder="Enter Username"  />
                            <label htmlFor="s2" className="post-form-label" >Amount</label>
                            <input id="s2" className="field" onChange={this.Input2}  type="text" value={amount} placeholder="Enter Amount You Given" />
                        </div>

                        <button className="post-button" type="submit" >POST</button>

                        {error!==""?<p className="er-msg" >{error}</p>:null}

                        {typeerror===""?"":<p className="er-msg" >{typeerror}</p>}

                       
                        
                    </form>

                    <h1 className="post-success" >{statusText}</h1>

                    {exist?<h1 className="post-success-exist" >User already exists!</h1>:""}

                    

           </div>
           </>
        )
    }
}

export default Post
