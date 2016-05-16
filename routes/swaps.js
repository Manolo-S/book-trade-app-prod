var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next) {
	if (!req.user) {
		res.redirect('/');
	}
	next();
})



router.get('/', function(req, res){
	res.render('swaps');
});

// router.get('/', function(req, res){
// 	res.render('index', {user: {
// 								id: req.user.id,
// 								service: req.user.service
// 							   }
// 						}
// 	)
// });

module.exports = router;











