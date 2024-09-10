import {Component} from "react"
import Cookies from "js-cookie"
import {Redirect} from "react-router-dom"
import Header from "../Header"
import "./index.css"


const buttonList=[

    {
        "buttonId":"add",
        "displayButtonText":"Add"
    }
    ,{
        "buttonId":"reduce",
        "displayButtonText":"Reduce"
    }

]


const Button=(props)=>{
        
        const {buttonProp,getId,is}=props;
        const {buttonId,displayButtonText}=buttonProp;

        const clicked=()=>(
            getId(buttonId)
        )
        
        const highlight=is ? "highlight-button":"select-button"
       
        return(
            <button className={highlight} onClick={clicked} type="button" >{displayButtonText}</button>
        )

}


class Put extends Component{

    state={
        selectId:"",
        error:"",
        username:"",
        amount:"",
        statusText:"",
        userNotFound:"",
        typeerror:""
    }


    getId=(id)=>{
      
        this.setState({
            selectId:id
        })
    }

    submit=async(e)=>{

        e.preventDefault()
        const {selectId,amount,username,error}=this.state;

        const tableName=Cookies.get("name")

        const verifying= await fetch(`http://localhost:4000/${tableName}`)

       

        const jsonData=await verifying.json()

       

        const exist= jsonData.find((s)=>(
            s.name===username.toUpperCase()
        ))
    
        if(amount==="" ||username==="" || selectId===""){
            this.setState({
                userNotFound:"",
                error:"Please Fill all the user inputs!",
                statusText:"",
                typeerror:""
                
            })
        }
        else{

            if(isNaN(amount)===false){

            if(exist===undefined){
                
                this.setState({
                    userNotFound:"User Not Found!",
                    username:"",
                    amount:"",
                    selectId:"",
                    error:"",
                    typeerror:""
                })
            }
            
         
                 else{

      

        const data={"operation":selectId,"amount":parseInt(amount),"table":tableName}
        const url=`http://localhost:4000/${username.toLocaleUpperCase()}`
        const options={
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }
        const api=await fetch(url,options)


        const hist={"username":username.toUpperCase(),"amount":parseInt(amount),"type":selectId,"histTable":"hist"+tableName}

        const histData={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(hist)
        }


        const useHist=await fetch("http://localhost:4000/history",histData)


        if(api.ok===true){

         
            this.setState({
                statusText:"Successfully Updated!",
                error:"",
                userNotFound:"",
                typeerror:""
            })
        }

        this.setState({
            username:"",
            amount:"",
            selectId:""
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

    Input1=(e)=>{
        this.setState({
            username:e.target.value
        })
    }

    Input2=(e)=>{
        this.setState({
            amount:e.target.value
        })
    }

    render(){
        const {selectId,error,username,amount,statusText,userNotFound,typeerror}=this.state;

        const Name=Cookies.get("name")

        if(Name===undefined){
            return <Redirect to="/login" />
        }

      

        return(
            
            <>
            <Header />
            <div className="put-main" >

                <form className="put-form" onSubmit={this.submit} >
                        <h1 className="put-heading" >Update User</h1>
                        <div className="put-field" >

                            <label htmlFor="s1" className="post-form-label"  >Username</label>
                            <input id="s1" className="field" placeholder="Enter the Username" value={username} onChange={this.Input1} />

                            <label htmlFor="s2" className="post-form-label"  >Amount</label>
                            <input id="s2" className="field" placeholder="Enter the Amount" value={amount} onChange={this.Input2} />

                        </div>

                        <div className="put-select" >
                               {buttonList.map((s)=>(
                                <Button key={s.buttonId} buttonProp={s} getId={this.getId} is={selectId===s.buttonId} />
                               ))}
                        </div>

                        <button className="post-button" type="submit" >UPDATE</button>

                     {error!==""?<p className="er-msg" >{error}</p>:null}
                     {typeerror===""?"":<p className="er-msg" >{typeerror}</p>}
                </form>

                {userNotFound!==""?<h1 className="er-msg" >{userNotFound}</h1>:<h1 className="post-success" >{statusText}</h1>}

            </div>
            </>
        )
    }
}

export default Put