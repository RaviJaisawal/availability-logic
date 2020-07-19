"use strict";

let model = {};
const mongoose = require('mongoose');
const options =  { useNewUrlParser: true  , useUnifiedTopology: true}
try{
    mongoose.connect(`mongodb://localhost:27017/availability` , options)

}catch(e){
   console.log('Mongo conn error',e)
    res.status(500).send({ error: 'Connection Failed,Please try again.' })
}

model["availability"]=require("./availability"); 
model["user"]=require("./user"); 


module.exports = model;