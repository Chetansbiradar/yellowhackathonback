const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    upi: {
        type: String,
        default:null
    }
});

module.exports = mongoose.model('User', UserSchema);
    