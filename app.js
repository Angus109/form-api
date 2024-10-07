const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Field = require("./model/fileld.model")
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


const DB = process.env.DB_URL
const PORT = process.env.PORT || 3000;

mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to DB");

    app.listen(PORT, () => {
      console.log("listening on port 4000");
    });
  }
);



app.use(cookieParser());

app.use("/test", async (req, res, next)=>{
   return res.status(200).send({
    success: true,
    message: "endpoint is ready for test"
   })
} )



app.post("/", async (req, res, next) => {

const formDataString = req.body

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
      )


      // Split the string into key-value pairs
  const keyValuePairs = formDataString.split('&');

  // Create an empty object to store the parsed data
  const parsedObject = {};

  // Loop through each key-value pair
  for (const pair of keyValuePairs) {
    // Split the pair into key and value, handling spaces around the equal sign
    const [key, value] = pair.split(/=(.+)/);

    // Decode the value to handle potential URL encoding
    const decodedValue = decodeURIComponent(value);

    // Assign the decoded value to the key in the object
    parsedObject[key] = decodedValue;
  }
    
    console.log(parsedObject)



    const data = new Field({
        fname: parsedObject.FName,
        lname: parsedObject.LName,
        dob: parsedObject.DOB,
        dept: parsedObject.Dept,
        level: parsedObject.Level,
        email: parsedObject.Email,
        gender: parsedObject.Gender,
        age: parsedObject.Age,
        reg: parsedObject.Reg,
        comment: parsedObject.Comment
    
     })
    
    return res.status(200).send({
        success: true,
        result : data
     })
 }catch(error){
    return res.status(501).send({
        success: false,
        error: error
    })
 }


});

