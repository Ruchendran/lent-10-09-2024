const express=require("express")
const path=require("path")
const {CleanWebpackPlugin} =require("clean-webpack-plugin")
const {open} =require("sqlite")
const sqlite3=require("sqlite3")
const cors=require("cors")
const { Console } = require("console")
const app=express();
app.use(express.json())
app.use(cors())
let db =null;
const dbPath=path.join(__dirname,"lend.db")
initiate=async()=>{

    try{
        db= await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
        app.listen(4000,()=>(
            console.log("Server Running at http://localhost:4000/")
        ))
    }
    catch(e){
        console.log(`DB error: ${e.message}`)

        process.exit(1)
    }

}

initiate();

app.get("/admin/users",async(request,response)=>{
    const que=`
    select * from userTable
    `;
    const userList=await db.all(que);
    // console.log(userList)
    response.send(userList)
});



app.delete("/admin/delete/:name",async(request,response)=>{
    const {name}=request.params;
    // console.log(name);
    const que1=`
    drop table '${name.toLocaleLowerCase()}'
    `;
    const final1=await db.run(que1);
    const histDelete='hist'+name.toLowerCase()
    // console.log(histDelete)
    const que2=`
      drop table '${histDelete.toLocaleLowerCase()}'
    `;
    const final2=await db.run(que2);
    const que3=`
    delete from userTable where name="${name}"
    `;
    const final3=await db.run(que3);

    response.send({delte:"deletedsss"})

})
// app.delete("/")

// above are newly addded
app.get("/table/:user/:histTable/",async(request,response)=>{
    const {user,histTable}=request.params;

   

    const que=`create table ${user} (name varchar(40),amount int,Date datetime) `;

    const que1=`create table ${histTable} (name varchar(40),amount int,type varchar(40),Date datetime) `;

    const final=await db.run(que);

    const final1=await db.run(que1)

    response.send("table done")
})


app.post("/userslist",async(request,response)=>{

    const {name,password}=request.body;

    // console.log(name)
    const data=new Date()

    const str=`${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`

    const que=`insert into userTable (name,password,Date)
    
    values("${name}","${password}","${str}")
    `;
    const final =await db.run(que);

    response.send("Succesfully user has to posted!")
})



app.get("/history/:name/:tableName",async(request,response)=>{

    const {name,tableName}=request.params;



    const que=`
    
    select * from ${tableName} where name="${name}"
    order by Date asc 
    `;
    const final =await db.all(que);

    response.send(final)
})


app.get("/getTable",async(request,response)=>{
    const que=`SELECT name FROM sqlite_master WHERE type = "table"
    `;

    const final =await db.all(que);

    response.send(final)
})





app.get("/lists",async(request,response)=>{
    const que=`
    select * from userTable
    `;
    const final =await db.all(que);

    

    response.send(final);


})




app.post("/",async(request,response)=>{
    
    const {name,amount,table} =request.body;

    const date=new Date()

   

    const date1=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`



    const que=`
    
    insert into ${table} (name,amount,Date)

    values("${name}",${amount},"${date1}")

    `

    const final=await db.run(que)

    response.send("Succesfully Added New User!")
})


app.put("/:name",async(request,response)=>{

    const {name}=request.params;

    const {amount,operation,table}=request.body;

   let que="";
    if(operation==="add"){
        que=`
        update ${table} set amount=amount+${amount} where name="${name}"
        `;
    }
    if(operation==="reduce"){
        que=`
        update ${table} set amount=amount-${amount} where name="${name}"
        `;
    }

    const final=await db.run(que)

    response.send("Successfully Updated")

   })



   app.delete("/:username",async(request,response)=>{

    const {username}=request.params;

    const {table}=request.body;

    const que=`
    
    delete from ${table} where name="${username}"
    `;

    const final=await db.run(que)

    response.send("Succesfully Deleted!")
   })



   app.get("/:table",async(request,response)=>{

    const {table}=request.params;

    const que=`
    
    select * from ${table}
    order by name asc,
        amount desc
    `;
    const final =await db.all(que);

    response.send(final);
})


app.get("/:name/:table",async(request,response)=>{

   const {name,table}=request.params;

    const que=`
    
    select * from ${table} where name="${name}"
    `;

    const final=await db.get(que);

    response.send(final);
})



app.post("/history",async(request,response)=>{

    const {username,amount,type,histTable}=request.body;

    console.log(histTable)

    const date= new Date()

    const date1=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    const que=`insert into ${histTable} (name,amount,type,Date) 
    
    
    values ("${username}",${amount},"${type}","${date1}")
    `;

    const final=await db.run(que);

    response.send("Succesfully Created!")

    
})

app.delete("/history/:username/:histTable",async(request,response)=>{

    const {username,histTable}=request.params;
    
    const que=`
    
    delete from ${histTable} where name="${username}"
    `;

    const final =await db.run(que);

    response.send("Successfully Deteled!")

})



//newly addded the api

































module.exports=app;

















