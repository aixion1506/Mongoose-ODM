const mongoose = require('mongoose');
const { Post } = require('./models');


async function main() {
    // 게시글 생성
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
    
    // 게시글 검색
    console.log('------검색 결과를 출력합니다------');
    const searchedPosts = await Post.find({
        author: ['sh', 'rani', 'ranikun'],
        likes: {
            $gt: 5,
            $lte: 10,
        },
        $or: [
            {category: { $exists: false }},
            {category: 'notice'}
        ]
    });
    console.log("---검색 결과---");
    console.log(searchedPosts);
    console.log("---------------");
    // return searchedPosts;

    // 저자 게시
    const authorPosts = await Post.find({}).populate('author'); 
    return {searchedPosts, authorPosts};
}
async function cleanUp() {
    await mongoose.connection.dropDatabase();
}

mongoose.connect("mongodb://localhost:27017/simpleBoard")
    .then(() => cleanUp())
    .then(() => main())
    .then((posts) => {
        console.log("---검색 결과---");
        console.log(posts);
        console.log("---------------");
        return;
      })
    .catch((err) => {
        console.error("오류가 발생했습니다.", err);
    })
    .finally(() => {
        process.exit();
    }
);