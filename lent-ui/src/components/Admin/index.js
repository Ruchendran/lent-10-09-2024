import React from 'react'
import { useState } from 'react';
// import { Table } from '../View'

import  "./index.css"

export const Table=(props)=>{
  const {data,no,deleteName}=props;
  const {name,index,amount,Date}=data;

  const onDelete=(value)=>{
    deleteName(value);
  }

  return(
      <table className="table" >
      <tr>
      <td className=" align index-width1 index1" >
          {no}
      </td>
      <td className=" align index-width2 index2" >
          {data.name}
      </td>
      <td className=" align index-width3 index3" >
        {data.Date}
      </td>
      <td className=" align index-width4 index4" >
        <i className="bi bi-trash" onClick={()=>onDelete(data.name)} ></i>
      </td>
  </tr>
  </table>
  )




}

function  Admin() {
  const url='http://localhost:4000/admin/users';
   const [userData,setData]=useState('');
   const [i,setUint]=useState(0);
   
   const fetchApi=async()=>{
    const getUserList=await fetch(url);
    const jsonUserList=await getUserList.json()
      // return jsonUserList
      setUint(i+1)
      setData(jsonUserList)
      console.log("hit")
     
     
   }
if(i===0){
  // console.log(i)
  fetchApi();
}
//  console.log(userData)



const deleteName=async (name)=>{
  const options={
    method:"DELETE",
    headers:{
        "Content-Type":"application/json"
    },
    // body:JSON.stringify(details)
  }
    // console.log(name)
    const deleteUrl=`http://localhost:4000/admin/delete/${name}`;
    const DeleteRequest=await fetch(deleteUrl,options);
     fetchApi();
    

  }

  return (
    <>
    <div className='admin'>
      {/* <div className='over'> */}
      <table className="view-table" >
        <tr>
            <th className="get-heading index-width1" >
                Index
            </th>
            <th className="get-heading index-width2" >
                Name
            </th>
            <th className="get-heading index-width3 " >
                Date
            </th>
            <th className="get-heading index-width4" >
               Delete
            </th>
          </tr>

      </table>
        {userData ===''?'': userData.map((s,index)=>(
                      
                      <Table no={index+1} key={s.name} data={s} deleteName={deleteName} />
                   
                  ))}
      {/* </div> */}
    </div>

                  
</>
  )
}

export default Admin