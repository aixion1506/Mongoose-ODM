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
}, {
    timestapms: true,
})

module.exports = PostSchema;