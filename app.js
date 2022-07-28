const express = require('express'); // express 가져오기
const connect = require("./schemas");//schema js가 있는지 먼저 보고 폴더가 있는지 본다 
const app = express();
const port = 3000;

connect();

const indexRouter = require("./routes/index"); //app.js가 routes의 index.js 불러옴
const postsRouter = require("./routes/posts"); //app.js가 posts.js의 존재를 가져옴
const commentRouter = require("./routes/comment"); //app.js가 routes의 comment.js 불러옴

const requestMiddleware = (req, res, next) => {    // 미들웨어 함수 만들기
    console.log("Request Url:", req.originalUrl);
    next(); //next 없으면 안돌아감
};

app.use(express.json()); //바디로 들어오는 json 형태의 데이터를 이용가능케 해줌
app.use(requestMiddleware); // 미들웨어 실행

app.use("/", indexRouter); //"/"로 들어왔을때만 indexRouter 실행
app.use("/posts", postsRouter); //"/posts"로 들어왔을때만 postsRouter 실행
app.use("/comments", commentRouter); //"/comments"로 들어왔을때만 commentRouter 실행

// app.get('/', (req, res) => {
//   res.send('과제 시작!');
// });

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!'); // 제대로 작동하는지 확인
});