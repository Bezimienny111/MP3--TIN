const express = require('express');
const router = express.Router();
const newsControler = require('../controllers/newsController');
const authUtils=require('../utils/authUtils');

router.get('/', newsControler.showNewsList);
router.get('/add',authUtils.permitAuthenticatedUser, newsControler.showAddNewsForm);
router.get('/edit/:newId',authUtils.permitAuthenticatedUser, authUtils.permitUserAuthenticatedUser, newsControler.showEditNewsForm);
router.get('/details/:newId', newsControler.showNewsDetails);


router.post('/add',authUtils.permitAuthenticatedUser, newsControler.addNews);
router.post('/edit',authUtils.permitAuthenticatedUser, newsControler.updateNews,);
router.get('/delete/:newId',authUtils.permitAuthenticatedUser, newsControler.deleteNews);
module.exports = router;
//authUtils.permitUserAuthenticatedUser