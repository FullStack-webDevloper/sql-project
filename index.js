const { faker } = require('@faker-js/faker');
const mysql=require("mysql2");
const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));


const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    database:"data",
    password:"Altamash@8"
});
let  getRandomUser= ()=>{
  return [
     faker.string.uuid(),
     faker.internet.userName(),
     faker.internet.email(),
     faker.internet.password(),
    
  ]
};
//Home page
let q= "SELECT count(*) FROM usersdata";
app.get("/",(req,res)=>{
  try{
    connection.query(q,(err,result)=>{
if (err)throw err;
let count=(result[0] ["count(*)"]);
res.render("home.ejs",{count}); 
})
}catch(err){
    console.log(err)
    res.send("some error occured")
};
});
//Show Page 

app.get("/users",(req, res)=>{
  let q= "SELECT * FROM usersdata";
  try{
    connection.query(q,(err,users)=>{
if (err)throw err;
res.render("show .ejs" ,{users}); 
})
}catch(err){
    console.log(err)
    res.send("some error occured")
};
});
//Edit Page
app.get("/users/:id/edit",(req,res)=>{
  let {id}= req.params;
  let q=`SELECT * FROM usersdata WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
if (err)throw err;
let user= result[0];
res.render("edit.ejs",{user});
})
}catch(err){
    console.log(err)
    res.send("some error occured")
};
 
})
//Upadate User
app.patch("/users/:id",(req,res)=>{
  let {id}= req.params;
  let {password:formpass, username: newUsername}= req.body;
  let q=`SELECT * FROM usersdata WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
if (err)throw err;
let user= result[0];
if(formpass !=user.password){
res.send("Wrong Password");
}else{
  let q2=`UPDATE usersdata SET username='${newUsername}'WHERE id='${id}'`;
  connection.query(q2, (req,result)=>{
    if(err) throw err
res.redirect("/users");
  });
}});
}catch(err){
    console.log(err)
    res.send("some error occured")
};
});
//Destroy page
// app.delete("/users/:id",(req,res)=>{
//   let {id}= req.params;
//    let {password:formpass, username: newUsername}= req.body;
//   let q=`SELECT * FROM usersdata WHERE id='${id}'`;
//   try{
//     connection.query(q,(err,result)=>{
// if (err)throw err;
// let user= result[0];
// if(formpass !=user.password){
// res.send("Wrong Password you can delete this user");
// }else{
//   let q3=`DELETE usersdata FROM WHERE id='${id}'`;
//   connection.query(q3, (req,result)=>{
//     if(err) throw err
// res.redirect("/users");
//   });
// }

// })
// }catch(err){
//     console.log(err)
//     res.send("some error occured")
// };
// })
// try{
//     connection.query(q,[data],(err,res)=>{
// if (err)throw err;
// console.log(res);
// })
// }catch(err){
//     console.log(err)
// };
// connection.end();


// console.log( getRandomUser());