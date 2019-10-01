const mongoose = require('mongoose');
const schema = mongoose.Schema;

let UserSchema = new schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
})

module.exports = mongoose.model('User', UserSchema);