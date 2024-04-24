const mongoos = require('mongoose');

const UserSchema = new mongoos.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    email : String,
    password: String,
    confirmPassword: String,
})
module.exports = mongoos.model('users', UserSchema);