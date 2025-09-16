// // api/index.js  ✅ create this file inside "api" folder

// import express from "express";
// import cors from "cors";
// import "./mongodb.js"; // or mysql.js (whichever you use)

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ import your routes here
// // import userRoutes from "./routes/user.js"
// // app.use("/users", userRoutes);

// app.get("/", (req, res) => {
//   res.json({ message: "Backend running on Vercel!" });
// });

// // ✅ Export handler instead of app.listen()
// export default app; 
 
 
 
 const express=require('express');

//import express from "express";

//import { createServerlessHandler } from "@vercel/node";
const Joi=require('joi');
const config= require('config');
const cors =require('cors');
const path = require('path');
const studentDetails=require('./router/detail');
const {mongoConnect,getDB} =require('./mongodb');



const app = express();


app.use(express.json());
app.use(cors());


app.use('/student',studentDetails);

const port=process.env.PORT || 3000;

// mongoConnect(client =>{
//      console.log("connect to MongoDB");

// });
app.listen(port,()=>{
    console.log(`listeing on port ${port}`)
    
});
// export default createServerlessHandler(app);