const mongoose = require('mongoose');
const schema = mongoose.Schema;

let resultSchema = new schema({
    eid:{type:String},
    wrongCount:{type:Number},
    finalResult:{type:Array},
    userName:{type:String},
    correctCount:{type:Number},
    lastAttemptDate:{type:String},
    examFamily:{type:String},
    examDescription:{type:String}
})

module.exports = mongoose.model('results', resultSchema);