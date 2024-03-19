const { Schemas } = require('mogoose');

const PostSchema = new Schemas({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
      },
      likes: {
        type: Number,
        required: true,
        default: 0
      },
      category: String
    }, {
    timestapms: true,
});

module.exports = PostSchema;