const express = require('express');
const Comments = require("../schemas/comment");
const router = express.Router();

// router.get('/', (req, res) => {      //테스트용
// 	res.send('this is comment page');
// });

// router.get('/:commentId', (req, res) => {  
// 	res.send('this is postId page');
// });

router.get("/:postId", async (req, res) => {  //댓글 전체 조회
    const { postId } = req.params;

	const [comment] = await Comments.find({postId : postId}).sort({ commentDate: -1 }).select('commentDate comment');
    res.json({
        comment,
    });
});

router.post("/:postId", async (req, res) => {  // 댓글 작성 api
    const { username, password, comment } = req.body;
    const { postId } = req.params;
		
    const createdComments = await Comments.create({ username, password, comment, postId }); //이 코드가 실행이 완료되고 넘어가게 await 추가
	if (comment.length=== 0){
		return res.json({success: false, errorMessage: "댓글 내용을 입력해주세요!"}); //되지는 않음. require이기 때문 애초에 거부
	}

    res.json({ posts: createdComments });
});

router.patch("/:commentId", async (req, res) => { // 댓글 수정 api
    const { commentId } = req.params;    // 위에랑 같아야함
    const { password, comment } = req.body;

	const existComment = await Comments.findOne({ _id: commentId });

	if(comment.length < 1) {
        res.json({ error: "댓글을 입력해주세요." });
        return;
    };

    if (password === existComment.password) {
        await Comments.updateOne({ _id: commentId }, { $set: { comment } });
        res.json({ success: true});
    };

    res.send( "비밀번호가 잘못되었습니다" );
	
});

router.delete("/:commentId", async (req,res)=> {  //댓글 삭제
	const { commentId } = req.params;
	const { password } = req.body;
	
	const existComment = await Comments.findOne({ _id: commentId });
    
    if (password === existComment.password) {
        await Comments.deleteOne({ _id: postId }, { postId });
        res.json({ success: true });
    };

	res.json({ success: false });
});





module.exports = router; //다른 파일에서 접근할 수 있게 내보내줌