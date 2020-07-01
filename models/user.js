const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema({
    email: { type: String },
    name: { type: String },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    permission: { type: Number, required: true, default: 1}
}, { timestamps: true })

const User = mongoose.model('user', UserSchema);

const create = (userData) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(userData.password).digest("base64");
    userData.password = salt + "$" + hash;
    userData.permission = 1;
    var u = new User(userData)
    return u.save();
}

module.exports = {
    User,
    create
}