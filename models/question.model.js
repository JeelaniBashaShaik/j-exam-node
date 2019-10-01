const mongoose = require('mongoose');
const schema = mongoose.Schema;

let questionSchema = new schema({
    eid:{type:String, required:true},
    qid:{type:Number, required:true},
    description:{type:String, required:true},
    option1:{type:String, required:true},
    option2:{type:String, required:true},
    option3:{type:String, required:true},
    option4:{type:String, required:true},
    answer:{type:String, required:true}
})

module.exports = mongoose.model('questions', questionSchema);