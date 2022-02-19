const express = require('express');
const router = express.Router();
const authUtils=require('../utils/authUtils');

const categoryControler = require('../controllers/categoryController');

router.get('/', categoryControler.showCategoryList);
router.get('/add',authUtils.permitAuthenticatedUser, categoryControler.showAddCategoryForm);
router.get('/edit/:catId',authUtils.permitAuthenticatedUser, categoryControler.showEditCategoryForm);
router.get('/details/:catId', categoryControler.showCategoryDetails);

router.post('/add',authUtils.permitAuthenticatedUser, categoryControler.addCategory);
router.post('/edit',authUtils.permitAuthenticatedUser, categoryControler.updateCategory);
router.get('/delete/:catId',authUtils.permitAuthenticatedUser, categoryControler.deleteCategory);
module.exports = router;