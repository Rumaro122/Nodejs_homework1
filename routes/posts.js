const express = require('express');
const Posts = require("../schemas/posts");
const router = express.Router();

// router.get('/', (req, res) => {   //왜 posts로 했을때 안열릴까?
// 	res.send('this is post page'); // 활성화 시키면 먼저 실행이 되기 때문에 아래 posts를 불러올 수 없음
// });

// router.get('/:postId', (req, res) => {  //테스트용
// 	res.send('this is postId page');
// });

router.get("/", async (req, res) => {  //포스트 전체 조회
    const posts = await Posts.find({}).sort({ postDate: -1 }).select('postName username postDate');
    res.json({
        posts         //{postDate:-1} 작성일 기준 내림차순 정렬
    });
});

router.get("/:postId", async (req, res) => {  // 게시글 상세 조회 api = "/:postId" = :은 아무값을 의미 postId는 단지 명칭
    const { postId } = req.params; //url 값을 받아오는것

    const [detail] = await Posts.find({ _id: postId })

    res.json({
        detail
    });
});

router.post("/", async (req, res) => {  // 게시글 작성 api
    const { postName, username, password, content } = req.body;

    // const posts= await Posts.find({ password }); // 비밀번호 겹치지 않게 하기 (근데 좀 아닌거 같다)
    // if (posts.length) {
    //     return res.status(400).json({success: false, errorMessage: "이미 있는 데이터입니다."}); // 같은 포스트 두개 입력 X
    // }

    const createdPosts = await Posts.create({ postName, username, password, content }); //이 코드가 실행이 완료되고 넘어가게 await 추가

    res.json({ posts: createdPosts });
});

router.patch("/:postId", async (req, res) => { // 게시글 수정 api
    const { postId } = req.params;
    const { password, content } = req.body;
        
    const existPost = await Posts.findOne({ _id: postId });
    
    if(content.length < 1) {
        res.json({ error: "게시물을 작성해주세요." });
        return;
    };
    
    if (password === existPost.password) {
        await Posts.updateOne({ _id: postId }, { $set: { content } });
        res.json({ success: true});
    };

    res.send( "비밀번호가 잘못되었습니다" );
});

router.delete("/:postId", async (req, res) => {  //게시글 삭제
    const { postId } = req.params;
    const { password } = req.body;

    const existPost = await Posts.findOne({ _id: postId });
    
    if (password === existPost.password) {
        await Posts.deleteOne({ _id: postId }, { postId });
        res.json({ success: true });
    };

    res.json({ success: false });
});




module.exports = router; //다른 파일에서 접근할 수 있게 내보내줌