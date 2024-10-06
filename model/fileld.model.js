const mongoose = require('mongoose');

const DataEntrySchema = mongoose.Schema({
    fname: {
        type: String, 
    },
    lname: {
        type: String,
   },
    dob: {
        type: String,
    },
    email: {
        type: String,
    },
    dept:{
            type:String
        },
    reg:{
            type:String
        },
    school: {
            type: String
        },
    age:{
        type:String
    },
    level: {
        type: String
    },
    comment: {
        type: String
    }


}, 
{ timestamps: true }
);

const field =    mongoose.model("DataEntry", DataEntrySchema);
module.exports =field

