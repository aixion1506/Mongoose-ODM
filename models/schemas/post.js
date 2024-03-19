const { Schema } = require('mongoose');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      likes: {
        type: Number,
        required: true,
        default: 0
      },
      category: String
    }, {
    timestamps: true,
});

module.exports = PostSchema;