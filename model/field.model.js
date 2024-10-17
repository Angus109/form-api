const mongoose = require('mongoose');



const DataEntrySchema = mongoose.Schema({
    fname: String,
    lname: String,
    dob: String,
    email: String,
    dept: String,
    reg: String,
    level:String,
    gender: String,
    age: String,
    comment: String

}, 
{ timestamps: true }
);



const FormModel = mongoose.model("Data", DataEntrySchema);
module.exports = FormModel


