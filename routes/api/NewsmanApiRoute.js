const express = require('express');
const router = express.Router();

const catApiController = require('../../api/NewsmanApi');

router.get('/', catApiController.getNewsmans);
router.get('/:newsmanID', catApiController.getNewsmanById);
router.post('/', catApiController.createNewsman);
router.put('/:newsmanID', catApiController.updateNewsman);
router.delete('/:newsmanID', catApiController.deleteNewsman);

module.exports = router;