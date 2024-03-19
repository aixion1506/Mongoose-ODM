const { Schema } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
        default: 0
    }       
}, {
    timestamps: true,
})

module.exports = UserSchema;