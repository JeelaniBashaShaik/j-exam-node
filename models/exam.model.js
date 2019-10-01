const mongoose = require('mongoose');
const schema = mongoose.Schema;

let examSchema = new schema({
    eid:{type:String, required:true},
    family:{type:String, required:true},
    description:{type:String, required:true},
})

module.exports = mongoose.model('exams', examSchema);