const mongoose = require('mongoose');
const { Post } = require('./models');

async function main() {
    console.log('------게시글을 생성합니다------');
    await Post.create([
        {title: 'first', content: 'first post'},
        {title: 'second', content: 'second post'},
    ]);

    const posts = await Post.find({});

    console.log('------게시글을 생성되었습니다------');
    posts.map(({ title, content, createdAt}) => {
        console.log(`제목: ${title}, 내용: ${content}, 작성일자: ${createdAt}`);
    });

    console.log('------제목이 없는 게시글을 생성합니다-----');
    try {
        await Post.create({ content: 'post with no title'});
    } catch(err) {
        console.log('------게시글이 생성에 오류가 발생했습니다-----');
        console.log(err.message);
    }
}

async function cleanUp() {
    await mongoose.connection.dropDatabase();
}

mongoose.connect("mongodb://localhost:27017/simpleBoard")
    .then(() => cleanUp())
    .then(() => main())
    .catch((err) => {
        console.error("오류가 발생했습니다.", err);
    })
    .finally(() => {
        process.exit();
    });