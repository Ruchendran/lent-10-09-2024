import {Component} from "react"

import Cookies from "js-cookie"

import {Redirect} from "react-router-dom"

import Header from "../Header"

import "./index.css"


export const Table=(props)=>{
    const {data,no}=props;

    const {name,index,amount,Date}=data;


    return(
        <table className="table" >
        <tr>
        <td className=" align index-width1 index1" >
            {index}
        </td>
        <td className=" align index-width2 index2" >
            {data.name}
        </td>
        <td className=" align index-width3 index3" >
            {data.amount}
        </td>
        <td className=" align index-width4 index4" >
            {data.Date}
        </td>
    </tr>
    </table>
    )

  


}

class View extends Component{

    state={
        list:[],
        filterText:""
    }

    componentDidMount(){
        this.api()
    }

    api=async()=>{

        const {filterText}=this.state;

        const tableName=Cookies.get("name")
        

        if(tableName===undefined){
            console.log("hiii done")
        }
        else{

        const url=`http://localhost:4000/${tableName}`
        const send=await fetch(url);
        
        const output=await send.json()

        console.log(output)

        for (let i=0 ;i<output.length;i++){
            output[i]["index"]=i+1
        }
        

        this.setState({
            list:output
        })

    }       

      

    }


    filter=(e)=>{
      
        this.setState({
            filterText:e.target.value
        })
      
        
    }

    render(){

        const {list,filterText}=this.state;
        
 
        const Name=Cookies.get("name")

        // console.log(Name)

        if(Name===undefined){
            return <Redirect to="/login" />
        }

      

        const filterList=list.filter((s)=>(
            s.name.includes(filterText.toUpperCase())
        ))

       

        return(
            <div className="view-first">
            <Header/>
            <div className="view-main" >
          <div className="filterDiv" >
            <input className="filterInput" placeholder="Search" onChange={this.filter} value={filterText} />
          </div>
            <hr className="line line1" />
            
                {/* <div className="over" > */}
                
                    <table className="view-table" >

                        <tr>

                        <th className="get-heading index-width1" >
                                    Index
                                </th>
                                <th className="get-heading index-width2" >
                                    Name
                                </th>
                                <th className="get-heading index-width3 " >
                                    Amount
                                </th>
                                <th className="get-heading index-width4" >
                                    Date
                                </th>
                                </tr>
                
                    </table>
                    {filterList.map((s)=>(
                                <Table no={s.index} key={s.name} data={s} />
                            ))}
            
                {/* </div> */}
            </div>
            </div>
        )
    }
}

export default View