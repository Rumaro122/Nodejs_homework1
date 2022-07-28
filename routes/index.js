const express = require('express');
const Goods = require("../schemas/index");
const router = express.Router();

router.get('/', (req, res) => {   
	res.send('this is main page');
});


module.exports = router; //다른 파일에서 접근할 수 있게 내보내줌