const express = require('express');
const router = express.Router();
const newsmanControler = require('../controllers/newsmanController');
const authUtils=require('../utils/authUtils');

router.get('/', newsmanControler.showNewsmanList);
router.get('/add',authUtils.permitAdminAuthenticatedUser, newsmanControler.showAddNewsmanForm);
router.get('/edit/:manId',authUtils.permitAdminAuthenticatedUser, newsmanControler.showEditNewsmanForm);
router.get('/details/:manId', newsmanControler.showNewsmanDetails);

router.post('/add',authUtils.permitAdminAuthenticatedUser, newsmanControler.addNewsman);
router.post('/edit',authUtils.permitAdminAuthenticatedUser, newsmanControler.updateNewsman);
router.get('/delete/:manId',authUtils.permitAdminAuthenticatedUser, newsmanControler.deleteNewsman);
module.exports = router;