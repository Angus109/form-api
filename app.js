const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const FormModel = require("./model/field.model");

const dotenv = require("dotenv")

dotenv.config({ path: ".env" });

const app = express();
const DASHBOARD_URL = process.env.DASHBOARD_URL


const cors = require("cors");
app.use(cors({ credentials: false }));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());



const PORT = process.env.PORT ;

mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log('connection established'))
.catch(()=>console.log('Failed to establish connection'))




app.listen(PORT, ()=>console.log(`Listening to port ${PORT}`))



app.post("/test", async (req, res, next)=>{
   return res.status(200).send({
    success: true,
    message: "endpoint is ready for test"
   })
} )



app.post("/form", async (req, res, next) => {

const {formDataString, formDataObject} = req.body


if(!formDataString || !formDataObject){
  return res.status(403).send({
    success: false,
    message:"formDataString, fomDatObject is required"
  })
}

if(!formDataObject.FName || !formDataObject.LName  || !formDataObject.DOB || !formDataObject.Dept || !formDataObject.Level || !formDataObject.Email || !formDataObject.Gender || !formDataObject.Age || !formDataObject.Reg || !formDataObject.Comment){
  return res.status(403).send({
    success: false,
    message:"FName, LName , Email, DOB, Dept, Level, Gender, Age, Reg, Comment is required"
  })
}




 try{


  fetch(
    "https://script.google.com/macros/s/AKfycbwmSHRQLk9RcHI0yrv2HqO83vcvanYbMMbz51ENL12YxDg2o4Lyw70LFVE_0xxWVxlP6A/exec",
    {
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    }
  );

  
    const data = new FormModel({
        fname: formDataObject.FName,
        lname: formDataObject.LName,
        dob: formDataObject.DOB || "",
        dept: formDataObject.Dept || "",
        level: formDataObject.Level || "",
        email: formDataObject.Email ,
        gender: formDataObject.Gender || "",
        age: formDataObject.Age || "",
        reg: formDataObject.Reg || "",
        comment: formDataObject.Comment || ""
    
     })
    const result = await data.save()


 
    
    res.json({
        success: true,
        result : result
     })
 }catch(error){
   res.status(500).send({
    success: false,
    error: error
   })
 }


});

