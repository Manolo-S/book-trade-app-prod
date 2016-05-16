var express = require('express');
var router = express.Router();


router.use('/', function(req, res, next) {
	if (!req.user) {
		res.redirect('/');
	}
	next();
})



// router.get('/', function(req, res){
// 	res.render('addbooks')
// });

router.get('/', function(req, res){
	var userDetails = req.user.socialMedia + ',' + req.user.id + ',' + req.user.displayName;
	res.render('addbooks', {user: {
								userDetails: userDetails
							   }
						}
	)
});

module.exports = router;











