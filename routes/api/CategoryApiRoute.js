const express = require('express');
const router = express.Router();

const catApiController = require('../../api/CategoryApi');

router.get('/', catApiController.getCategory);
router.get('/:catId', catApiController.getCategoryByID);
router.post('/', catApiController.createCategory);
router.put('/:catId', catApiController.updateCategory);
router.delete('/:catId', catApiController.deleteCategory);

module.exports = router;