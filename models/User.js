const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
    account: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        default: Date.now()
    },
    avatar: {
        type: String,
        default: ''
    },
    nickname: {
        type: String,
        default: ''
    },
});

module.exports = User = mongoose.model("users", UserSchema);