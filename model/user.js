const mongoose = require('mongoose')
const schema = mongoose.Schema;

let userModelSchema = new schema({
    "fName": {type: String, require: true},
    "lName" : { type: String, required: true , unique: false },
    "emailId":   { type: String}
})

const availabilityModel =  mongoose.model('user',userModelSchema);

module.exports = availabilityModel;