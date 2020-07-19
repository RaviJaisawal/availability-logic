const mongoose = require('mongoose')
const schema = mongoose.Schema;

let availabilityModelSchema = new schema({
    "startTime": {type: Number, require: true},
    "endTime" : { type: Number, required: true},
    "userId":   { type: String}
})

const availabilityModel =  mongoose.model('availability',availabilityModelSchema);

module.exports = availabilityModel;